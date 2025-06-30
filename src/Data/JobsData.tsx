import { IconBriefcase, IconMapPin, IconRecharging, IconSearch } from "@tabler/icons-react";

const dropdownData = [
  {
    title: "Job Title",
    icon: IconSearch,
    options: [
      'Product Designer',
      'Software Engineer', 
      'Frontend Developer',
      'Backend Developer',
      'Full Stack Developer',
      'UI/UX Designer',
      'Product Manager',
      'Marketing Specialist',
      'Data Analyst',
      'Data Scientist',
      'Sales Executive',
      'Content Writer',
      'Customer Support',
      'Business Analyst',
      'DevOps Engineer',
      'Machine Learning Engineer',
      'Graphic Designer',
      'Social Media Manager',
      'Quality Assurance Tester',
      'Digital Marketing Manager',
      'Mobile App Developer',
      'HR Specialist',
      'Project Manager',
      'Cybersecurity Analyst'
    ]
  },
  {
    title: "Location", 
    icon: IconMapPin,
    options: [
      'Delhi',
      'Mumbai',
      'Bangalore',
      'Hyderabad',
      'Chennai',
      'Pune',
      'Kolkata',
      'Ahmedabad',
      'Jaipur',
      'New York',
      'San Francisco', 
      'Los Angeles',
      'Chicago',
      'Austin',
      'Seattle',
      'Boston',
      'London',
      'Manchester',
      'Berlin',
      'Munich',
      'Amsterdam',
      'Paris',
      'Tokyo',
      'Sydney',
      'Melbourne',
      'Toronto',
      'Vancouver',
      'Singapore',
      'Dubai',
      'Remote'
    ]
  },
  {
    title: "Experience",
    icon: IconBriefcase,
    options: [
      'Entry Level (0-2 years)', 
      'Mid Level (2-5 years)', 
      'Senior Level (5-8 years)', 
      'Expert Level (8+ years)'
    ]
  },
  {
    title: "Job Type",
    icon: IconRecharging,
    options: [
      'Full Time', 
      'Part Time', 
      'Contract', 
      'Freelance', 
      'Internship',
      'Remote',
      'Hybrid'
    ]
  }
];

const jobList = [
  {
    jobTitle: "Product Designer",
    company: "Meta",
    applicants: 25,
    experience: "Entry Level (0-2 years)",
    jobType: "Full Time",
    location: "New York",
    package: "32 LPA",
    postedDaysAgo: 12,
    description: "Meta is seeking a Product Designer to join our team in designing user-centric interfaces for our blockchain wallet platform. This is an excellent opportunity for entry-level designers to grow their skills while working on cutting-edge fintech solutions that impact millions of users globally."
  },
  {
    jobTitle: "Senior Software Engineer",
    company: "Google",
    applicants: 45,
    experience: "Senior Level (5-8 years)",
    jobType: "Full Time",
    location: "San Francisco",
    package: "85 LPA",
    postedDaysAgo: 3,
    description: "Join Google's cloud infrastructure team to build scalable distributed systems. You'll work on critical backend services that power Google Cloud Platform, collaborating with world-class engineers to solve complex technical challenges at unprecedented scale."
  },
  {
    jobTitle: "UI/UX Designer",
    company: "Apple",
    applicants: 32,
    experience: "Mid Level (2-5 years)",
    jobType: "Full Time",
    location: "Delhi",
    package: "28 LPA",
    postedDaysAgo: 7,
    description: "Apple is looking for a creative UI/UX Designer to join our India design team. You'll be responsible for creating intuitive and beautiful interfaces for our consumer products, working closely with engineering teams to bring innovative ideas to life."
  },
  {
    jobTitle: "Marketing Specialist",
    company: "Netflix",
    applicants: 18,
    experience: "Entry Level (0-2 years)",
    jobType: "Part Time",
    location: "London",
    package: "18 LPA",
    postedDaysAgo: 5,
    description: "Netflix seeks a dynamic Marketing Specialist to develop and execute marketing campaigns for our original content. You'll analyze market trends, create compelling content strategies, and work with creative teams to drive user engagement and acquisition."
  },
  {
    jobTitle: "Data Analyst",
    company: "Amazon",
    applicants: 38,
    experience: "Mid Level (2-5 years)",
    jobType: "Contract",
    location: "Berlin",
    package: "35 LPA",
    postedDaysAgo: 15,
    description: "Amazon's analytics team is hiring a Data Analyst to extract insights from large datasets and drive business decisions. You'll work with SQL, Python, and visualization tools to identify trends, create reports, and support strategic initiatives across multiple business units."
  },
  {
    jobTitle: "DevOps Engineer",
    company: "Microsoft",
    applicants: 29,
    experience: "Senior Level (5-8 years)",
    jobType: "Full Time",
    location: "Tokyo",
    package: "65 LPA",
    postedDaysAgo: 8,
    description: "Microsoft Azure team seeks a DevOps Engineer to automate deployment pipelines and manage cloud infrastructure. You'll implement CI/CD practices, monitor system performance, and ensure high availability of critical services used by millions of customers worldwide."
  },
  {
    jobTitle: "Content Writer",
    company: "Spotify",
    applicants: 15,
    experience: "Entry Level (0-2 years)",
    jobType: "Freelance",
    location: "Sydney",
    package: "22 LPA",
    postedDaysAgo: 4,
    description: "Spotify is looking for a creative Content Writer to craft engaging copy for our music discovery features and marketing campaigns. You'll collaborate with product teams to create compelling narratives that connect artists with listeners and enhance user experience."
  },
  {
    jobTitle: "Product Manager",
    company: "Tesla",
    applicants: 52,
    experience: "Expert Level (8+ years)",
    jobType: "Full Time",
    location: "Toronto",
    package: "75 LPA",
    postedDaysAgo: 2,
    description: "Tesla seeks an experienced Product Manager to lead the development of next-generation electric vehicle software features. You'll define product roadmaps, coordinate cross-functional teams, and drive innovation in sustainable transportation technology."
  },
  {
    jobTitle: "Sales Executive",
    company: "Salesforce",
    applicants: 23,
    experience: "Mid Level (2-5 years)",
    jobType: "Full Time",
    location: "Mumbai",
    package: "25 LPA",
    postedDaysAgo: 9,
    description: "Salesforce is hiring a Sales Executive to drive CRM solution adoption among enterprise clients. You'll build relationships with key stakeholders, understand business requirements, and present tailored solutions that transform how organizations manage customer relationships."
  },
  {
    jobTitle: "Customer Support",
    company: "Uber",
    applicants: 12,
    experience: "Entry Level (0-2 years)",
    jobType: "Part Time",
    location: "Singapore",
    package: "15 LPA",
    postedDaysAgo: 6,
    description: "Uber's customer support team is expanding in Singapore. You'll help resolve rider and driver issues, provide exceptional service through multiple channels, and contribute to improving our support processes and user satisfaction metrics."
  },
  {
    jobTitle: "Business Analyst",
    company: "IBM",
    applicants: 34,
    experience: "Mid Level (2-5 years)",
    jobType: "Contract",
    location: "Amsterdam",
    package: "40 LPA",
    postedDaysAgo: 11,
    description: "IBM Watson team seeks a Business Analyst to bridge the gap between business requirements and technical solutions. You'll analyze processes, gather stakeholder requirements, and help implement AI-powered solutions for enterprise clients."
  },
  {
    jobTitle: "Frontend Developer",
    company: "Airbnb",
    applicants: 41,
    experience: "Senior Level (5-8 years)",
    jobType: "Full Time",
    location: "Dubai",
    package: "55 LPA",
    postedDaysAgo: 1,
    description: "Airbnb is seeking a Frontend Developer to create exceptional user experiences for our travel platform. You'll work with React, TypeScript, and modern web technologies to build responsive interfaces that help millions of travelers discover unique accommodations worldwide."
  },
  {
    jobTitle: "Graphic Designer",
    company: "Adobe",
    applicants: 27,
    experience: "Mid Level (2-5 years)",
    jobType: "Freelance",
    location: "Bangalore",
    package: "30 LPA",
    postedDaysAgo: 14,
    description: "Adobe Creative Cloud team is looking for a talented Graphic Designer to create visual content for marketing campaigns and product interfaces. You'll work with industry-leading design tools to produce compelling graphics that showcase our creative software solutions."
  },
  {
    jobTitle: "Machine Learning Engineer",
    company: "OpenAI",
    applicants: 67,
    experience: "Expert Level (8+ years)",
    jobType: "Full Time",
    location: "San Francisco",
    package: "120 LPA",
    postedDaysAgo: 3,
    description: "OpenAI seeks a Machine Learning Engineer to advance artificial intelligence research and development. You'll work on cutting-edge AI models, implement novel algorithms, and contribute to breakthrough technologies that shape the future of artificial intelligence."
  },
  {
    jobTitle: "Social Media Manager",
    company: "Twitter",
    applicants: 19,
    experience: "Entry Level (0-2 years)",
    jobType: "Part Time",
    location: "London",
    package: "20 LPA",
    postedDaysAgo: 10,
    description: "Twitter is hiring a Social Media Manager to engage with our global community and manage brand presence across platforms. You'll create content strategies, monitor social trends, and build meaningful connections with users and industry influencers."
  },
  {
    jobTitle: "Backend Developer",
    company: "Stripe",
    applicants: 36,
    experience: "Mid Level (2-5 years)",
    jobType: "Full Time",
    location: "Berlin",
    package: "50 LPA",
    postedDaysAgo: 7,
    description: "Stripe's payments infrastructure team needs a Backend Developer to build robust API services that process billions of transactions. You'll work with microservices architecture, ensure system reliability, and help merchants worldwide accept payments seamlessly."
  },
  {
    jobTitle: "Quality Assurance Tester",
    company: "Zoom",
    applicants: 21,
    experience: "Entry Level (0-2 years)",
    jobType: "Contract",
    location: "Tokyo",
    package: "24 LPA",
    postedDaysAgo: 13,
    description: "Zoom's QA team is expanding to ensure our video conferencing platform delivers flawless user experiences. You'll design test cases, execute automated tests, and collaborate with development teams to identify and resolve issues before product releases."
  },
  {
    jobTitle: "Digital Marketing Manager",
    company: "HubSpot",
    applicants: 28,
    experience: "Senior Level (5-8 years)",
    jobType: "Full Time",
    location: "Sydney",
    package: "45 LPA",
    postedDaysAgo: 4,
    description: "HubSpot seeks a Digital Marketing Manager to lead our inbound marketing strategies and drive customer acquisition. You'll manage multi-channel campaigns, analyze performance metrics, and optimize conversion funnels to grow our customer base."
  },
  {
    jobTitle: "Mobile App Developer",
    company: "Instagram",
    applicants: 44,
    experience: "Mid Level (2-5 years)",
    jobType: "Full Time",
    location: "Toronto",
    package: "48 LPA",
    postedDaysAgo: 6,
    description: "Instagram's mobile team is looking for an App Developer to enhance our iOS and Android applications. You'll implement new features, optimize performance, and ensure our app provides the best possible experience for content creators and users worldwide."
  },
  {
    jobTitle: "HR Specialist",
    company: "LinkedIn",
    applicants: 16,
    experience: "Entry Level (0-2 years)",
    jobType: "Internship",
    location: "Mumbai",
    package: "12 LPA",
    postedDaysAgo: 8,
    description: "LinkedIn's HR team offers an internship opportunity to learn talent acquisition and employee engagement strategies. You'll support recruitment processes, assist with onboarding programs, and gain hands-on experience in professional networking industry practices."
  },
  {
    jobTitle: "Data Scientist",
    company: "Spotify",
    applicants: 39,
    experience: "Senior Level (5-8 years)",
    jobType: "Full Time",
    location: "Remote",
    package: "70 LPA",
    postedDaysAgo: 5,
    description: "Spotify's data science team seeks an expert to build recommendation algorithms and analyze user behavior patterns. You'll work with massive datasets, develop machine learning models, and create insights that help users discover new music they'll love."
  },
  {
    jobTitle: "Cybersecurity Analyst",
    company: "Microsoft",
    applicants: 31,
    experience: "Mid Level (2-5 years)",
    jobType: "Full Time",
    location: "Hyderabad",
    package: "42 LPA",
    postedDaysAgo: 9,
    description: "Microsoft Security team is hiring a Cybersecurity Analyst to protect our cloud infrastructure and customer data. You'll monitor threats, investigate security incidents, and implement defensive measures to safeguard against cyber attacks."
  },
  {
    jobTitle: "Project Manager",
    company: "Amazon",
    applicants: 26,
    experience: "Senior Level (5-8 years)",
    jobType: "Full Time",
    location: "Seattle",
    package: "68 LPA",
    postedDaysAgo: 2,
    description: "Amazon Web Services seeks a Project Manager to lead cloud migration initiatives for enterprise clients. You'll coordinate cross-functional teams, manage project timelines, and ensure successful delivery of complex cloud transformation projects."
  },
  {
    jobTitle: "Full Stack Developer",
    company: "Netflix",
    applicants: 48,
    experience: "Mid Level (2-5 years)",
    jobType: "Hybrid",
    location: "Los Angeles",
    package: "52 LPA",
    postedDaysAgo: 4,
    description: "Netflix engineering team needs a Full Stack Developer to work on our content recommendation and streaming platform. You'll develop both frontend and backend features, optimize user experiences, and help deliver entertainment to millions of subscribers globally."
  }
];

export { dropdownData, jobList };