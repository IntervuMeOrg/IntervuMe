import { useState } from 'react';
import { useCurrentUser } from '../lib/authentication/authentication-hooks';
import { interviewApi } from '../lib/interview/interview-api';
import api from '../lib/api';

export const DebugPage = () => {
  const [testResults, setTestResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const user = useCurrentUser();

  const runTests = async () => {
    setIsLoading(true);
    const results: any[] = [];

    // Test 1: Check if user is authenticated
    try {
      results.push({
        test: 'Authentication Status',
        status: user.data ? 'PASS' : 'FAIL',
        data: user.data ? { id: user.data.id, email: user.data.email } : 'Not authenticated',
      });
    } catch (error) {
      results.push({
        test: 'Authentication Status',
        status: 'ERROR',
        data: error,
      });
    }

    // Test 2: Test basic API connectivity
    try {
      const response = await api.get('/api/health');
      results.push({
        test: 'API Health Check',
        status: 'PASS',
        data: response.data,
      });
    } catch (error: any) {
      results.push({
        test: 'API Health Check',
        status: 'FAIL',
        data: error.response?.data || error.message,
      });
    }

    // Test 3: Test creating an interview
    if (user.data?.id) {
      try {
        const createResponse = await interviewApi.createInterview({
          userId: user.data.id,
          jobDescription: 'Test interview for debugging',
          startTime: new Date().toISOString(),
          timeLimit: 60,
          notes: 'Debug test',
        });
        results.push({
          test: 'Create Interview',
          status: 'PASS',
          data: createResponse.data,
        });

        // Test 4: Test getting interview with questions
        try {
          const questionsResponse = await interviewApi.getInterviewWithQuestions(createResponse.data.id);
          results.push({
            test: 'Get Interview with Questions (Full Details)',
            status: 'PASS',
            data: {
              interviewId: questionsResponse.data.id,
              questionsCount: questionsResponse.data.interviewQuestions.length,
              sampleQuestion: questionsResponse.data.interviewQuestions[0],
              hasQuestionContent: questionsResponse.data.interviewQuestions[0]?.question || questionsResponse.data.interviewQuestions[0]?.title || 'No content'
            },
          });
        } catch (error: any) {
          results.push({
            test: 'Get Interview with Questions (Full Details)',
            status: 'FAIL',
            data: error.response?.data || error.message,
          });
        }
      } catch (error: any) {
        results.push({
          test: 'Create Interview',
          status: 'FAIL',
          data: error.response?.data || error.message,
        });
      }
    }

    setTestResults(results);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Debug Interview System</h1>
          
          <div className="mb-6">
            <button
              onClick={runTests}
              disabled={isLoading}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {isLoading ? 'Running Tests...' : 'Run Debug Tests'}
            </button>
          </div>

          {testResults.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-800">Test Results</h2>
              {testResults.map((result, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border-2 ${
                    result.status === 'PASS'
                      ? 'border-green-200 bg-green-50'
                      : result.status === 'FAIL'
                      ? 'border-red-200 bg-red-50'
                      : 'border-yellow-200 bg-yellow-50'
                  }`}
                >
                  <div className="flex items-center mb-2">
                    <span className="font-medium text-gray-800">{result.test}</span>
                    <span
                      className={`ml-2 px-2 py-1 rounded text-xs font-medium ${
                        result.status === 'PASS'
                          ? 'bg-green-100 text-green-800'
                          : result.status === 'FAIL'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {result.status}
                    </span>
                  </div>
                  <pre className="text-sm text-gray-600 overflow-x-auto">
                    {JSON.stringify(result.data, null, 2)}
                  </pre>
                </div>
              ))}
            </div>
          )}

          <div className="mt-8 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-medium text-blue-900 mb-2">What This Debug Page Tests:</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• <strong>Authentication:</strong> Are you logged in?</li>
              <li>• <strong>API Connectivity:</strong> Can frontend reach backend?</li>
              <li>• <strong>Interview Creation:</strong> Can you create interviews?</li>
              <li>• <strong>Question Loading:</strong> Can you load questions?</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}; 