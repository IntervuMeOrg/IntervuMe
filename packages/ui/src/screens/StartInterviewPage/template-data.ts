export const templateData = [
  {
    category: "Software Engineering",
    items: [
      "Frontend Developer",
      "Backend Developer", 
      "Full Stack Developer",
      "Mobile Developer"
    ],
    descriptions: [
      "We're looking for a Frontend Developer to join our engineering team and help us build beautiful, user-centric web applications. You'll work closely with designers, product managers, and backend engineers to bring UI/UX designs to life using modern frameworks like React, Angular, or Vue. Your responsibilities will include implementing responsive layouts, optimizing web performance, and ensuring accessibility compliance. The ideal candidate has a keen eye for detail, a solid understanding of JavaScript/TypeScript, and experience working in agile development environments.",
      "As a Backend Developer, you will be responsible for building and maintaining scalable, secure, and high-performance server-side applications. You'll work with technologies such as Node.js, Java, or Python, and leverage frameworks like Express, Spring Boot, or Django to design APIs, manage databases, and implement business logic. You'll collaborate cross-functionally to integrate services, handle data-intensive tasks, and ensure system reliability. We value clean code, strong problem-solving skills, and a deep understanding of RESTful architecture and database design (SQL/NoSQL).",
      "We're hiring a Full Stack Developer who is comfortable working across the entire tech stack—from crafting responsive UI components to building scalable APIs and services. You'll take ownership of features from concept to deployment, integrating frontend and backend systems seamlessly. You should be proficient in one or more frontend frameworks (React, Angular, Vue) and backend environments (Node.js, Python, Java, etc.), and have experience with databases and CI/CD pipelines. This role is ideal for engineers who thrive in dynamic environments and enjoy solving end-to-end technical challenges.",
      "We're seeking a Mobile Developer to create and maintain high-quality mobile applications for iOS and Android platforms. You'll work with cross-functional teams to design, build, and ship mobile features using technologies like React Native, Flutter, or native languages such as Swift/Kotlin. Your responsibilities will include implementing UI components, managing state and navigation, and integrating with RESTful APIs and third-party services. We're looking for someone who understands mobile performance optimization, offline-first design, and platform-specific UX best practices."
    ]
  },
  {
    category: "DevOps",
    items: [
      "DevOps Engineer",
      "Site Reliability Engineer", 
      "Cloud Engineer"
    ],
    descriptions: [
      "We are looking for a DevOps Engineer to help us automate, scale, and improve our deployment processes. You will work on infrastructure as code, CI/CD pipelines, container orchestration with Docker and Kubernetes, and ensure our environments are stable and reproducible across all development stages.",
      "As a Site Reliability Engineer, you'll focus on ensuring uptime, reliability, and efficiency across large-scale systems. You'll implement monitoring and alerting systems, conduct incident response drills, and build automation to improve system resiliency. Familiarity with cloud infrastructure and high-availability patterns is essential.",
      "We're seeking a Cloud Engineer to manage and optimize our cloud-native infrastructure on AWS, Azure, or GCP. You'll work with development teams to provision scalable environments, monitor usage, enforce security, and optimize for cost and performance. Experience with IaC tools like Terraform or Pulumi is a plus."
    ]
  },
  {
    category: "Backend",
    items: [
      "Java Developer",
      "Python Developer",
      "Node.js Developer",
      ".NET Developer"
    ],
    descriptions: [
      "We are hiring a Java Developer to design and develop backend systems for enterprise applications. You'll work with Spring Boot, RESTful services, microservices architecture, and integrate with databases and messaging systems. Experience with CI/CD and containerization is a strong plus.",
      "Looking for a Python Developer with experience in building scalable backend services using Django or Flask. Responsibilities include API development, data processing, and integrating with third-party platforms. Knowledge of asynchronous programming and cloud deployments is desirable.",
      "As a Node.js Developer, you will build backend services and APIs using Node.js and Express. You'll work on real-time applications, implement security and performance best practices, and collaborate with frontend developers and product teams.",
      "Seeking a .NET Developer to join our backend team. You'll build enterprise-grade web services using .NET Core, contribute to microservices architecture, and deploy to Azure. Familiarity with REST APIs, SQL Server, and unit testing is required."
    ]
  },
  {
    category: "Google SW-1",
    items: [
      "Software Engineer L3",
      "Software Engineer L4"
    ],
    descriptions: [
      "As a Software Engineer L3 at Google, you'll be part of a team working on cutting-edge technology at scale. You'll implement features, fix bugs, and learn from senior engineers through code reviews and design discussions. This role is ideal for recent graduates or those with up to 2 years of experience.",
      "The L4 Software Engineer at Google is expected to design and develop features with minimal guidance, contribute to system architecture, and lead small-scale initiatives. You'll collaborate across teams, improve engineering practices, and support scalable product development."
    ]
  },
  {
    category: "Amazon SW-2", 
    items: [
      "SDE I",
      "SDE II"
    ],
    descriptions: [
      "SDE I at Amazon is an entry-level software engineer role where you'll be responsible for developing features under guidance, writing clean and efficient code, and participating in code reviews. You'll be expected to follow Amazon's engineering practices and dive deep into operational excellence.",
      "SDE II at Amazon is a mid-level role for experienced developers who can independently design and implement complex systems. You'll own significant portions of the codebase, mentor junior engineers, and work closely with product managers to deliver customer-focused solutions."
    ]
  }
];

export const getTemplateDescription = (templateName: string): string => {
  for (const category of templateData) {
    const index = category.items.findIndex(item => item === templateName);
    if (index !== -1) {
      return category.descriptions[index];
    }
  }
  return "";
};