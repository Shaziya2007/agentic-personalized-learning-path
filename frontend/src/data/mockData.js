/**
 * Isolated Academic Mock Data
 * System and Method for Generating Personalized and Adaptive Learning Paths with Outcome-Based Education Alignment
 * 
 * IMPORTANT:
 * All mock data is consolidated here so it can be swapped seamlessly
 * when connecting to the Spring Boot REST backend endpoints.
 */

// ==========================================
// 1. PREDEFINED COURSE OUTCOMES (COs)
// ==========================================
export const PREDEFINED_COS = [
  {
    id: "CO1",
    code: "CO1",
    title: "Algorithmic Analysis & Foundational Principles",
    description: "Analyze, formulate, and select fundamental data structures and algorithmic complexity patterns to solve structured computational problems.",
    bloomLevel: "Analyze (Level 4)",
    targetAttainment: 75,
    currentAttainment: 82,
    relatedLearningObjectives: [
      "LO1.1: Evaluate asymptotic time and space complexity",
      "LO1.2: Implement balanced graph and tree traversal methods"
    ],
    contributingTopicIds: ["T101", "T102"]
  },
  {
    id: "CO2",
    code: "CO2",
    title: "Modular Software Architecture & Design Patterns",
    description: "Design and implement scalable, maintainable modular software systems adhering to recognized architectural design patterns and SOLID principles.",
    bloomLevel: "Create (Level 6)",
    targetAttainment: 70,
    currentAttainment: 68,
    relatedLearningObjectives: [
      "LO2.1: Construct decoupled microservice boundaries",
      "LO2.2: Apply structural and behavioral design patterns"
    ],
    contributingTopicIds: ["T103", "T201"]
  },
  {
    id: "CO3",
    code: "CO3",
    title: "Robust Data Persistence & API Engineering",
    description: "Implement transactional data persistence mechanisms, relational schema models, and secure stateless RESTful API endpoints.",
    bloomLevel: "Apply (Level 3)",
    targetAttainment: 75,
    currentAttainment: 74,
    relatedLearningObjectives: [
      "LO3.1: Execute ACID-compliant transaction boundaries",
      "LO3.2: Develop resilient REST contracts with structured validation"
    ],
    contributingTopicIds: ["T202", "T203"]
  },
  {
    id: "CO4",
    code: "CO4",
    title: "System Performance Optimization & Caching",
    description: "Evaluate latency bottlenecks, implement tiered caching hierarchies, and optimize asynchronous event processing throughput.",
    bloomLevel: "Evaluate (Level 5)",
    targetAttainment: 70,
    currentAttainment: 58,
    relatedLearningObjectives: [
      "LO4.1: Profile query bottlenecks and execution plans",
      "LO4.2: Implement distributed memory caching strategies"
    ],
    contributingTopicIds: ["T301"]
  },
  {
    id: "CO5",
    code: "CO5",
    title: "DevSecOps, Automated Testing & Cloud Deployment",
    description: "Formulate automated unit/integration test suites and configure continuous deployment pipelines with security and observability monitoring.",
    bloomLevel: "Apply (Level 3)",
    targetAttainment: 80,
    currentAttainment: 45,
    relatedLearningObjectives: [
      "LO5.1: Build high-coverage automated regression suites",
      "LO5.2: Configure containerized deployment environments"
    ],
    contributingTopicIds: ["T302"]
  }
];

// ==========================================
// 2. PREDEFINED PROGRAM OUTCOMES (POs)
// ==========================================
export const PREDEFINED_POS = [
  {
    id: "PO1",
    code: "PO1",
    title: "Engineering Knowledge",
    description: "Apply the knowledge of mathematics, science, and engineering fundamentals to the solution of complex computer engineering problems.",
    targetAttainment: 75,
    currentAttainment: 80,
    alignedCOs: ["CO1", "CO2"]
  },
  {
    id: "PO2",
    code: "PO2",
    title: "Problem Analysis",
    description: "Identify, formulate, review research literature, and analyze complex engineering problems reaching substantiated conclusions.",
    targetAttainment: 70,
    currentAttainment: 72,
    alignedCOs: ["CO1", "CO4"]
  },
  {
    id: "PO3",
    code: "PO3",
    title: "Design & Development of Solutions",
    description: "Design solutions for complex engineering problems and design system components or processes that meet specified needs with appropriate consideration.",
    targetAttainment: 75,
    currentAttainment: 69,
    alignedCOs: ["CO2", "CO3"]
  },
  {
    id: "PO4",
    code: "PO4",
    title: "Conduct Investigations of Complex Problems",
    description: "Use research-based knowledge and research methods including design of experiments, analysis and interpretation of data to provide valid conclusions.",
    targetAttainment: 65,
    currentAttainment: 61,
    alignedCOs: ["CO4", "CO5"]
  },
  {
    id: "PO5",
    code: "PO5",
    title: "Modern Tool Usage",
    description: "Create, select, and apply appropriate techniques, resources, and modern engineering and IT tools including prediction and modeling.",
    targetAttainment: 80,
    currentAttainment: 64,
    alignedCOs: ["CO3", "CO5"]
  }
];

// ==========================================
// 3. DEFAULT LEARNER PROFILE
// ==========================================
export const INITIAL_LEARNER_PROFILE = {
  name: "Alex Rivera",
  email: "alex.rivera@university.edu",
  learningGoal: "Full-Stack Cloud Architecture & Distributed Systems",
  currentSkills: "JavaScript, HTML/CSS, Basic Python, Git",
  experienceLevel: "Beginner", // Beginner | Intermediate | Advanced
  weakAreas: "Data Structures & Algorithms, Asynchronous Concurrency, SQL Optimization",
  availableHoursPerWeek: 12,
  targetDuration: "8 Weeks",
  joinedDate: "2026-09-01",
  studentId: "CSE-2026-0482"
};

// ==========================================
// 4. GENERATED LEARNING ROADMAP
// ==========================================
export const INITIAL_ROADMAP = {
  id: "roadmap-701",
  title: "Personalized Adaptive Path: Full-Stack Cloud Architecture",
  learningGoal: "Full-Stack Cloud Architecture & Distributed Systems",
  targetDuration: "8 Weeks",
  availableHoursPerWeek: 12,
  overallProgress: 40,
  totalTopics: 8,
  completedTopics: 3,
  currentPhaseId: "phase-2",
  currentTopicId: "T201",
  phases: [
    {
      id: "phase-1",
      phaseNumber: 1,
      title: "Foundations & Core Systems Architecture",
      description: "Establish mathematical rigor in algorithmic design and asynchronous runtime mechanics.",
      duration: "Weeks 1 - 2",
      milestone: "Construct an in-memory transactional cache adhering to strict Big-O bounds.",
      isCompleted: true,
      topics: [
        {
          id: "T101",
          phaseId: "phase-1",
          topicName: "Algorithmic Complexity & Big-O Notation",
          learningObjective: "Formulate asymptotic upper and lower bounds for iterative and recursive procedures.",
          explanation: "Algorithmic complexity analysis allows software engineers to predict system scalability and execution limits before deployment. Big-O notation measures the upper bound of time or memory as input size N grows toward infinity. Understanding worst-case vs average-case behavior prevents runaway compute costs in high-concurrency enterprise services.",
          resources: [
            { title: "MIT OpenCourseWare: Introduction to Algorithms", type: "Lecture", url: "https://ocw.mit.edu" },
            { title: "Computational Complexity & Space Bounds Guide", type: "Reading", url: "#" },
            { title: "Interactive Complexity Chart Visualizer", type: "Tool", url: "#" }
          ],
          activities: [
            "Mathematical deduction of recurrence relations using the Master Theorem.",
            "Benchmarking linear search O(N) vs binary search O(log N) on 1,000,000 records."
          ],
          milestone: "Pass theoretical Big-O validation with benchmark telemetry.",
          co: "CO1",
          po: "PO1",
          status: "Completed", // Not Started | In Progress | Completed | Needs Review
          score: 90,
          estimatedHours: 4
        },
        {
          id: "T102",
          phaseId: "phase-1",
          topicName: "Data Structures: Trees, Hash Maps & Graphs",
          learningObjective: "Implement balanced binary search trees, hash collision strategies, and graph adjacency structures.",
          explanation: "Data structures provide organized layouts for memory manipulation. Hash maps deliver amortized O(1) lookups via deterministic hashing algorithms, while trees and graphs facilitate hierarchical and networked data relationships, essential for routing tables and dependency graphs.",
          resources: [
            { title: "Visualgo Data Structure Visualizations", type: "Interactive", url: "https://visualgo.net" },
            { title: "Hash Collision Resolutions: Probing vs Chaining", type: "Reading", url: "#" },
            { title: "Graph Traversal Algorithms: BFS & DFS in Practice", type: "Tutorial", url: "#" }
          ],
          activities: [
            "Implement a generic Hash Map with separate chaining collision resolution.",
            "Write Breadth-First and Depth-First traversal for cyclic graphs."
          ],
          milestone: "Zero-collision hash map benchmark pass.",
          co: "CO1",
          po: "PO2",
          status: "Completed",
          score: 85,
          estimatedHours: 5
        },
        {
          id: "T103",
          phaseId: "phase-1",
          topicName: "Asynchronous Concurrency & Event Loops",
          learningObjective: "Analyze non-blocking I/O execution models and resolve synchronization hazards.",
          explanation: "Modern server architectures avoid OS-level thread exhaustion by utilizing asynchronous non-blocking event loops. Understanding microtask queues, macrotask scheduling, and atomic primitives is vital for designing high-throughput web gateways.",
          resources: [
            { title: "Event Loop Under the Hood", type: "Video", url: "#" },
            { title: "Concurrency Primitives: Promises, Semaphores & Mutexes", type: "Reading", url: "#" }
          ],
          activities: [
            "Implement a worker thread pool queue with concurrency throttling.",
            "Simulate and resolve a race condition using atomic locking."
          ],
          milestone: "Event queue load testing sustaining 5,000 req/sec.",
          co: "CO2",
          po: "PO1",
          status: "Completed",
          score: 80,
          estimatedHours: 5
        }
      ]
    },
    {
      id: "phase-2",
      phaseNumber: 2,
      title: "Microservices, REST Contracts & Data Persistence",
      description: "Build decoupled distributed endpoints with relational schemas and atomic transactions.",
      duration: "Weeks 3 - 5",
      milestone: "Deploy a multi-service REST architecture with automated schema migrations.",
      isCompleted: false,
      topics: [
        {
          id: "T201",
          phaseId: "phase-2",
          topicName: "Architectural Patterns & REST Contract Design",
          learningObjective: "Design idempotent, versioned RESTful APIs adhering to Open API specifications and layered architecture.",
          explanation: "Representational State Transfer (REST) leverages HTTP semantics (GET, POST, PUT, DELETE) along with standardized response headers and status codes. Clean layered architecture separates controller endpoints from business service logic and domain repositories.",
          resources: [
            { title: "OpenAPI 3.0 Specification Best Practices", type: "Documentation", url: "#" },
            { title: "Designing Resilient REST APIs", type: "Guide", url: "#" }
          ],
          activities: [
            "Write a formal OpenAPI YAML specification for a multi-tenant order system.",
            "Implement idempotent request token verification."
          ],
          milestone: "Validated OpenAPI contract with 100% endpoint test coverage.",
          co: "CO2",
          po: "PO3",
          status: "In Progress",
          score: null,
          estimatedHours: 6
        },
        {
          id: "T202",
          phaseId: "phase-2",
          topicName: "Relational Schema Modeling & ACID Transactions",
          learningObjective: "Model normalized 3NF schemas, manage foreign keys, and configure database transaction isolation levels.",
          explanation: "Data integrity depends upon the relational ACID guarantees (Atomicity, Consistency, Isolation, Durability). Selecting correct isolation levels (Read Committed vs Repeatable Read vs Serializable) protects applications from dirty reads and serialization anomalies.",
          resources: [
            { title: "PostgreSQL Architecture & Internals", type: "Reading", url: "#" },
            { title: "Database Transaction Isolation Levels Explained", type: "Interactive", url: "#" }
          ],
          activities: [
            "Design an entity-relationship schema in third normal form (3NF).",
            "Simulate concurrent debit/credit banking transactions and observe phantom reads."
          ],
          milestone: "Pass automated concurrency consistency validation under 100 simultaneous transactions.",
          co: "CO3",
          po: "PO3",
          status: "Not Started",
          score: null,
          estimatedHours: 6
        },
        {
          id: "T203",
          phaseId: "phase-2",
          topicName: "Service Security, JWT & RBAC Authorization",
          learningObjective: "Implement stateless JSON Web Token authentication with Role-Based Access Control and cryptographic signing.",
          explanation: "Stateless microservices authenticate clients using signed JWT tokens containing claims and expiration timestamps. Role-based access control (RBAC) ensures only authorized roles (e.g. Student, Instructor, Admin) can access protected endpoints.",
          resources: [
            { title: "RFC 7519 - JSON Web Token (JWT) Standard", type: "Reading", url: "#" },
            { title: "OWASP Top 10 API Security Risks", type: "Documentation", url: "#" }
          ],
          activities: [
            "Implement asymmetric RS256 token signing and verification.",
            "Construct a security filter middleware inspecting role scopes on protected routes."
          ],
          milestone: "Zero unauthorized access leaks in automated penetration test suite.",
          co: "CO3",
          po: "PO5",
          status: "Not Started",
          score: null,
          estimatedHours: 5
        }
      ]
    },
    {
      id: "phase-3",
      phaseNumber: 3,
      title: "Optimization, Resilience & Cloud Deployment",
      description: "Optimize query execution, configure tiered caching, and establish CI/CD automated deployment pipelines.",
      duration: "Weeks 6 - 8",
      milestone: "Achieve sub-50ms p99 latency across distributed microservice topology.",
      isCompleted: false,
      topics: [
        {
          id: "T301",
          phaseId: "phase-3",
          topicName: "Query Optimization, Indexing & Distributed Caching",
          learningObjective: "Analyze B-Tree query plans, resolve N+1 queries, and implement Redis cache-aside strategies.",
          explanation: "Slow database queries are the primary cause of latency spikes. Proper indexing on foreign keys and compound query fields transforms linear full-table scans into logarithmic index lookups. Adding an in-memory distributed cache like Redis reduces database CPU pressure.",
          resources: [
            { title: "High Performance Query Optimization Guide", type: "Book Summary", url: "#" },
            { title: "Distributed Cache-Aside vs Write-Through Strategies", type: "Reading", url: "#" }
          ],
          activities: [
            "Use EXPLAIN ANALYZE to optimize a slow JOIN query from 850ms down to 12ms.",
            "Implement a cache-aside pattern with TTL invalidation."
          ],
          milestone: "90% cache hit ratio on simulated read traffic.",
          co: "CO4",
          po: "PO4",
          status: "Not Started",
          score: null,
          estimatedHours: 6
        },
        {
          id: "T302",
          phaseId: "phase-3",
          topicName: "Automated CI/CD Pipelines & Cloud Containerization",
          learningObjective: "Build Docker images, automate integration tests, and manage continuous deployment pipelines.",
          explanation: "Continuous integration guarantees that every code commit is automatically built, linted, and tested against regressions. Containerization via Docker packages dependencies identically across development and cloud environments.",
          resources: [
            { title: "Production Containerization Best Practices", type: "Guide", url: "#" },
            { title: "Automated Pipeline Configurations", type: "Tutorial", url: "#" }
          ],
          activities: [
            "Write a multi-stage Dockerfile minimizing image footprint to under 100MB.",
            "Configure an automated pipeline running unit tests on pull requests."
          ],
          milestone: "Automated green build pipeline deploying to container runtime.",
          co: "CO5",
          po: "PO5",
          status: "Not Started",
          score: null,
          estimatedHours: 6
        }
      ]
    }
  ]
};

// ==========================================
// 5. TOPIC ASSESSMENT QUESTION BANK
// ==========================================
export const ASSESSMENT_QUESTIONS = {
  // Topic T201: Architectural Patterns & REST Contract Design
  T201: {
    topicId: "T201",
    topicTitle: "Architectural Patterns & REST Contract Design",
    courseOutcome: "CO2",
    programOutcome: "PO3",
    passingScore: 50,
    questions: [
      {
        id: "q1",
        question: "Which HTTP method is defined by RFC 7231 as idempotent and used to completely replace an existing resource representation?",
        options: [
          "POST",
          "PUT",
          "PATCH",
          "CONNECT"
        ],
        correctIndex: 1, // PUT
        conceptTested: "HTTP Method Idempotency & Semantics",
        explanation: "PUT is idempotent: executing it multiple times with the same payload produces the exact same server resource state as executing it once."
      },
      {
        id: "q2",
        question: "In layered Clean Architecture, which component should contain the core business rules without depending on database or UI frameworks?",
        options: [
          "Database Repositories",
          "HTTP Controllers",
          "Domain Entities & Use Cases",
          "DTO Serializers"
        ],
        conceptTested: "Layered Software Architecture",
        correctIndex: 2, // Domain Entities & Use Cases
        explanation: "In Clean Architecture, domain entities and use cases represent enterprise business rules and must remain independent of external frameworks, libraries, or storage."
      },
      {
        id: "q3",
        question: "What HTTP status code must an API return when an authenticated client attempts to access a resource for which they lack authorized permissions?",
        options: [
          "401 Unauthorized",
          "403 Forbidden",
          "404 Not Found",
          "400 Bad Request"
        ],
        correctIndex: 1, // 403 Forbidden
        conceptTested: "Authentication vs Authorization Status Codes",
        explanation: "401 indicates unauthenticated credentials (identity not established), whereas 403 Forbidden indicates the caller is recognized but lacks sufficient authorization privileges."
      },
      {
        id: "q4",
        question: "Which design pattern is best suited for decoupling microservice request handlers from the concrete algorithms used to process payments?",
        options: [
          "Singleton Pattern",
          "Strategy Pattern",
          "Prototype Pattern",
          "Proxy Pattern"
        ],
        correctIndex: 1, // Strategy Pattern
        conceptTested: "Behavioral Design Patterns",
        explanation: "The Strategy pattern defines a family of interchangeable algorithms (e.g. CreditCardStrategy, PaypalStrategy) and encapsulates each one, letting the algorithm vary independently from clients."
      },
      {
        id: "q5",
        question: "When designing REST endpoints, what is the recommended practice for URI naming conventions?",
        options: [
          "Use verbs representing actions (e.g., /getUsers, /createOrder)",
          "Use plural nouns representing resources (e.g., /api/v1/users, /api/v1/orders)",
          "Embed SQL table names with primary key data types",
          "Use random UUIDs directly as top-level paths"
        ],
        correctIndex: 1, // Plural nouns
        conceptTested: "RESTful Resource URI Conventions",
        explanation: "RESTful URI design emphasizes plural nouns representing resource collections, while standard HTTP verbs (GET, POST, PUT, DELETE) express the requested action."
      }
    ]
  },

  // Fallback / default questions for other topics
  DEFAULT: {
    topicId: "GENERIC",
    topicTitle: "Conceptual Assessment & Outcome Validation",
    courseOutcome: "CO1",
    programOutcome: "PO1",
    passingScore: 50,
    questions: [
      {
        id: "g1",
        question: "What is the primary objective of asymptotic analysis in algorithm design?",
        options: [
          "Measuring execution time on specific hardware chips",
          "Evaluating resource growth rate relative to increasing input size N",
          "Counting the exact number of assembly instructions generated by the compiler",
          "Eliminating memory leaks in dynamic heap allocations"
        ],
        correctIndex: 1,
        conceptTested: "Algorithmic Growth Rates",
        explanation: "Asymptotic analysis isolates hardware clock frequency and compiler variances to calculate how execution time scales as input size approaches infinity."
      },
      {
        id: "g2",
        question: "Which data structure provides constant amortized time complexity O(1) for insert and search operations?",
        options: [
          "Binary Search Tree",
          "Hash Map with effective distribution",
          "Singly Linked List",
          "Max Heap"
        ],
        correctIndex: 1,
        conceptTested: "Hash Table Complexity",
        explanation: "A hash table with a uniform distribution function and low load factor achieves amortized O(1) operations."
      },
      {
        id: "g3",
        question: "Under Bloom's Revised Taxonomy, which cognitive level corresponds to designing an architectural system to satisfy outcome specifications?",
        options: [
          "Remembering (Level 1)",
          "Applying (Level 3)",
          "Evaluating (Level 5)",
          "Creating (Level 6)"
        ],
        correctIndex: 3,
        conceptTested: "Bloom's Taxonomy Levels",
        explanation: "Synthesizing disparate components into a cohesive new architecture represents Bloom's Level 6: Creating."
      },
      {
        id: "g4",
        question: "What is the consequence of an unindexed foreign key in a relational database with millions of rows?",
        options: [
          "Automatic cascade deletion failure",
          "Sequential table scan leading to high CPU and query latency",
          "Violation of First Normal Form (1NF)",
          "Immediate deadlock on any SELECT statement"
        ],
        correctIndex: 1,
        conceptTested: "Relational Indexing",
        explanation: "Without an index, the database engine must execute a sequential scan across all data pages to join related foreign records."
      },
      {
        id: "g5",
        question: "Which parameter is essential for ensuring idempotency in distributed payment transactions?",
        options: [
          "Unique Idempotency Key header",
          "HTTP Keep-Alive timeout",
          "Random User-Agent string",
          "Increased socket buffer size"
        ],
        correctIndex: 0,
        conceptTested: "Distributed System Idempotency",
        explanation: "A client-generated idempotency key allows the receiver to recognize duplicated transmissions and return the cached initial result safely."
      }
    ]
  }
};

// ==========================================
// 6. ADAPTIVE RECOMMENDATION SCENARIOS
// ==========================================
export const ADAPTIVE_SCENARIOS = {
  // Scenario A: Weak Performance (<50%)
  WEAK: {
    type: "WEAK",
    score: 40,
    statusText: "Weak Performance",
    thresholdLabel: "Below 50%",
    summary: "Fundamental conceptual gaps identified in HTTP semantics and layered architectural isolation.",
    weakConcepts: [
      "HTTP Method Idempotency & Semantics",
      "Layered Software Architecture (Clean Boundaries)"
    ],
    explanation: "Because your score of 40% is below the required 50% threshold, your roadmap has been dynamically adjusted to include prerequisite foundational instruction before progressing to multi-tier persistence.",
    adaptationSteps: [
      {
        stepNumber: 1,
        title: "Weak Concept Identified",
        description: "Misunderstanding of idempotent HTTP operations and dependency inversion in Clean Architecture."
      },
      {
        stepNumber: 2,
        title: "Prerequisite Remedial Module Injected",
        description: "Inserted module 'Remedial 201R: HTTP RFC Standards & Clean Architecture Fundamentals' (4 Hours)."
      },
      {
        stepNumber: 3,
        title: "Targeted Remedial Drills",
        description: "Assigned 2 interactive code refactoring exercises on idempotent request handlers."
      },
      {
        stepNumber: 4,
        title: "Mandatory Reassessment Scheduled",
        description: "Reassessment scheduled upon completion of remedial module to verify CO2 attainment."
      },
      {
        stepNumber: 5,
        title: "Roadmap Continuation",
        description: "Topic T202 (Relational Modeling) unlocked once remedial reassessment passes >= 50%."
      }
    ],
    injectedTopic: {
      id: "T201-REM",
      phaseId: "phase-2",
      topicName: "Remedial 201R: HTTP Standards & Architecture Fundamentals",
      learningObjective: "Master idempotent operations, status code hierarchies, and dependency rule isolation.",
      explanation: "This remedial module reinforces core concepts needed to pass CO2. You will practice isolating domain entities from controllers and verifying idempotency.",
      resources: [
        { title: "Refactoring to Clean Architecture: Hands-on Primer", type: "Tutorial", url: "#" },
        { title: "RFC 7231 Idempotency Deep Dive", type: "Interactive", url: "#" }
      ],
      activities: [
        "Interactive quiz on HTTP status codes (401 vs 403).",
        "Refactoring a tight-coupled controller into decoupled service interfaces."
      ],
      milestone: "Pass 5-question prerequisite diagnostic.",
      co: "CO2",
      po: "PO3",
      status: "Needs Review",
      isRemedial: true,
      estimatedHours: 3
    }
  },

  // Scenario B: Moderate Performance (50% - 79%)
  MODERATE: {
    type: "MODERATE",
    score: 60,
    statusText: "Moderate Performance",
    thresholdLabel: "50% - 79%",
    summary: "Satisfactory foundational understanding achieved, with minor reinforcement needed in behavioral design patterns.",
    weakConcepts: [
      "Behavioral Design Patterns (Strategy vs Factory)"
    ],
    explanation: "Your score of 60% meets the passing criteria for CO2. Additional targeted reinforcement exercises have been added to your current phase to bolster design pattern mastery before entering Phase 3.",
    adaptationSteps: [
      {
        stepNumber: 1,
        title: "Moderate Performance Evaluated",
        description: "Met the 50% threshold with clear competence in HTTP semantics and URI design."
      },
      {
        stepNumber: 2,
        title: "Reinforcement Practice Injected",
        description: "Added 2 supplementary architectural design drills on Strategy pattern implementation."
      },
      {
        stepNumber: 3,
        title: "Progress Maintained",
        description: "Roadmap proceeds normally to Topic T202 while keeping review notes active."
      }
    ],
    injectedTopic: null
  },

  // Scenario C: Strong Performance (>=80%)
  STRONG: {
    type: "STRONG",
    score: 100,
    statusText: "Strong Performance",
    thresholdLabel: "80% and above",
    summary: "Exemplary mastery demonstrated across all architectural and REST contract standards.",
    weakConcepts: [],
    explanation: "With a score of 100%, you have achieved high CO2 and PO3 attainment! The system recommends accelerated progression and has unlocked an advanced honors topic.",
    adaptationSteps: [
      {
        stepNumber: 1,
        title: "Strong Performance Verified",
        description: "Achieved maximum score (100%) across all architectural evaluation questions."
      },
      {
        stepNumber: 2,
        title: "Skip Redundant Reinforcement",
        description: "Automated bypass of introductory drills, saving an estimated 4 study hours."
      },
      {
        stepNumber: 3,
        title: "Advanced Elective Unlocked",
        description: "Unlocked honors topic 'ADV-201: Reactive Streams & Asynchronous WebSockets Architecture'."
      },
      {
        stepNumber: 4,
        title: "Accelerated Roadmap Pacing",
        description: "Fast-track schedule enabled for Phase 2 and Phase 3."
      }
    ],
    injectedTopic: {
      id: "T201-ADV",
      phaseId: "phase-2",
      topicName: "Honors Elective: Reactive Microservices & WebSockets",
      learningObjective: "Implement high-throughput reactive event streams using backpressure-aware pipelines.",
      explanation: "Advanced enrichment for high-performing learners. Covers reactive stream specifications, reactive drivers, and full-duplex WebSocket channels.",
      resources: [
        { title: "Reactive Systems Manifesto", type: "Reading", url: "#" },
        { title: "Building High-Throughput Event Gateways", type: "Guide", url: "#" }
      ],
      activities: [
        "Construct a real-time reactive telemetry stream handling backpressure."
      ],
      milestone: "Sustain 10,000 WebSocket concurrent connections.",
      co: "CO2",
      po: "PO3",
      status: "Not Started",
      isAdvanced: true,
      estimatedHours: 4
    }
  }
};

// ==========================================
// 7. RECENT ACTIVITY LOG
// ==========================================
export const INITIAL_ACTIVITIES = [
  {
    id: "act-1",
    timestamp: "2026-09-12 11:30 AM",
    title: "Topic Completed",
    description: "Completed 'Asynchronous Concurrency & Event Loops' (T103)",
    type: "topic_completed",
    badge: "Completed",
    co: "CO2"
  },
  {
    id: "act-2",
    timestamp: "2026-09-11 04:15 PM",
    title: "Assessment Attempted",
    description: "Scored 85% on Data Structures diagnostic assessment",
    type: "assessment_attempted",
    badge: "Score: 85%",
    co: "CO1"
  },
  {
    id: "act-3",
    timestamp: "2026-09-10 02:00 PM",
    title: "Roadmap Adapted",
    description: "Phase 1 successfully validated; unlocked Phase 2 microservice modules",
    type: "roadmap_adapted",
    badge: "Accelerated",
    co: "CO1"
  },
  {
    id: "act-4",
    timestamp: "2026-09-08 10:45 AM",
    title: "Assessment Attempted",
    description: "Scored 90% on Algorithmic Complexity assessment",
    type: "assessment_attempted",
    badge: "Score: 90%",
    co: "CO1"
  }
];
