import axios from "axios";
import { RunResult, Judge0Response, RunUserCode } from "./code-execution-types";
import { codingQuestionService } from "../coding-question/codingQuestion.service";
import { CodingQuestion } from "../coding-question/codingQuestion-types";

const toBase64 = (s: string) => Buffer.from(s, "utf-8").toString("base64");
const fromBase64 = (s: string) => Buffer.from(s, "base64").toString("utf-8");

export const codeExecutionService = {
  async run(request: RunUserCode): Promise<RunResult> {
    const {
      questionId,
      languageId,
      language,
      userCode,
      stdin,
      expected,
      timeLimit,
    } = request;

    const question = await codingQuestionService.get(questionId);

    const sourceCode = await codeExecutionService.buildFullSource(question, request);

    console.log(sourceCode);
    // send to Judge0
    const resp = await axios.post<Judge0Response>(
      `${process.env.JUDGE0_URL}/submissions?base64_encoded=true&wait=true`,
      {
        language_id: languageId,
        source_code: toBase64(sourceCode),
        stdin: toBase64(stdin),
      },
      { headers: { "X-Auth-Token": process.env.JUDGE0_KEY! } }
    );

    const data = resp.data;
    let status = data.status.description;
    const timeUsed = parseFloat(data.time || "0");

    // custom limits
    if (timeUsed > timeLimit) status = "Time Limit Exceeded";
    if ((data.memory ?? 0) > 131_072) status = "Memory Limit Exceeded";

    // decode output
    const stdout = data.stdout ? fromBase64(data.stdout) : "";

    // correctness check
    if (status === "Accepted") {
      status = stdout.trim() === expected.trim() ? "Correct" : "Wrong Answer";
    }

    return { stdout, status, time: timeUsed };
  },

  async buildFullSource(
    question: CodingQuestion,
    request: RunUserCode
  ): Promise<string> {
    const { language, userCode } = request;
    const { codeHeader, codeStarter, codeFooter } = question.starterCode;

    // Base parts
    const header = codeHeader[language];
    const starter = codeStarter[language];
    const footer = codeFooter[language];

    let body: string;
    if (language === "python") {
      // ensure List import once
      const headerWithTyping = header.includes("from typing")
        ? header
        : `${header}\nfrom typing import List`;

      const indent = "        "; // 8 spaces
      const indented = userCode
        .split("\n")
        .map((line) => indent + line)
        .join("\n");

      body = [headerWithTyping, starter, indented, footer].join("\n");
    } else {
      // C++/Java: no extra indentation required
      body = [header, starter, userCode, footer].join("\n");
    }

    return body;
  },
};
