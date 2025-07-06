import { IconBriefcase, IconMapPin, IconRecharging, IconSearch } from "@tabler/icons-react";

const searchFields = [
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
    title: "Skills",
    icon: IconRecharging,
    options: ["HTML", "CSS", "JavaScript", "React", "Angular", "Node.js", "Python", "Java", "Ruby", "PHP", "SQL", "MongoDB", "PostgreSQL", "Git", "API Development", "Testing and Debugging", "Agile Methodologies", "DevOps", "AWS", "Azure", "Google Cloud"]
  }
];

const talentData = [
  {
    name: "Bob Smith",
    role: "Backend Developer",
    company: "Amazon",
    topSkills: ["Node.js", "Express", "MySQL"],
    about: "As a Backend Developer at Amazon, I specialize in server-side development and database management. My skills in Node.js and Express allow me to build robust and scalable APIs, while my experience with MySQL ensures efficient data handling and storage. I am passionate about optimizing backend processes to support high-traffic applications and improve system performance.",
    expectedCtc: "₹50 - 65LPA",
    location: "Seattle, United States",
    image: "avatar"
  },
  {
    name: "Sarah Johnson",
    role: "Frontend Developer",
    company: "Google",
    topSkills: ["React", "TypeScript", "CSS"],
    about: "Frontend Developer at Google with 5 years of experience creating responsive and accessible web applications. Expert in React ecosystem and modern JavaScript frameworks. Passionate about user experience and performance optimization.",
    expectedCtc: "₹45 - 60LPA",
    location: "San Francisco, United States",
    image: "avatar2"
  },
  {
    name: "Rahul Sharma",
    role: "Data Analyst",
    company: "Microsoft",
    topSkills: ["Python", "SQL", "Power BI"],
    about: "Data Analyst at Microsoft specializing in business intelligence and data visualization. Experienced in extracting insights from complex datasets and creating actionable reports for stakeholders. Strong background in statistical analysis and machine learning.",
    expectedCtc: "₹35 - 50LPA",
    location: "Delhi, India",
    image: "avatar"
  },
  {
    name: "Emily Chen",
    role: "Product Manager",
    company: "Meta",
    topSkills: ["Product Strategy", "Agile", "Analytics"],
    about: "Product Manager at Meta with expertise in driving product vision and strategy. Experienced in leading cross-functional teams and delivering user-centric solutions. Strong analytical skills with focus on data-driven decision making.",
    expectedCtc: "₹70 - 90LPA",
    location: "New York, United States",
    image: "avatar2"
  },
  {
    name: "David Wilson",
    role: "DevOps Engineer",
    company: "Netflix",
    topSkills: ["AWS", "Docker", "Kubernetes"],
    about: "DevOps Engineer at Netflix focused on cloud infrastructure and automation. Expert in containerization technologies and CI/CD pipelines. Passionate about scalable system design and infrastructure as code.",
    expectedCtc: "₹55 - 75LPA",
    location: "London, United Kingdom",
    image: "avatar"
  },
  {
    name: "Priya Patel",
    role: "UX Designer",
    company: "Adobe",
    topSkills: ["Figma", "User Research", "Prototyping"],
    about: "UX Designer at Adobe with passion for creating intuitive and engaging user experiences. Experienced in conducting user research, creating wireframes, and collaborating with development teams to bring designs to life.",
    expectedCtc: "₹40 - 55LPA",
    location: "Berlin, Germany",
    image: "avatar2"
  },
  {
    name: "Michael Brown",
    role: "Marketing Specialist",
    company: "Tesla",
    topSkills: ["Digital Marketing", "SEO", "Content Strategy"],
    about: "Marketing Specialist at Tesla with expertise in digital marketing campaigns and brand strategy. Experienced in SEO optimization, content creation, and performance analytics. Passionate about innovative marketing approaches.",
    expectedCtc: "₹30 - 45LPA",
    location: "Tokyo, Japan",
    image: "avatar"
  },
  {
    name: "Lisa Wang",
    role: "Full Stack Developer",
    company: "Spotify",
    topSkills: ["JavaScript", "Python", "MongoDB"],
    about: "Full Stack Developer at Spotify with experience in both frontend and backend technologies. Skilled in building scalable web applications and RESTful APIs. Strong advocate for clean code and test-driven development.",
    expectedCtc: "₹48 - 65LPA",
    location: "Sydney, Australia",
    image: "avatar2"
  },
  {
    name: "Ahmed Hassan",
    role: "Cybersecurity Analyst",
    company: "IBM",
    topSkills: ["Penetration Testing", "Security Auditing", "Python"],
    about: "Cybersecurity Analyst at IBM specializing in threat detection and vulnerability assessment. Experienced in conducting security audits and implementing robust security measures. Passionate about protecting digital assets and privacy.",
    expectedCtc: "₹42 - 58LPA",
    location: "Toronto, Canada",
    image: "avatar"
  },
  {
    name: "Jessica Garcia",
    role: "Sales Executive",
    company: "Salesforce",
    topSkills: ["CRM", "Lead Generation", "Client Relations"],
    about: "Sales Executive at Salesforce with proven track record in B2B sales and client relationship management. Expert in CRM systems and sales analytics. Passionate about building long-term partnerships and exceeding targets.",
    expectedCtc: "₹35 - 50LPA",
    location: "Delhi, India",
    image: "avatar2"
  },
  {
    name: "Tom Anderson",
    role: "Cloud Architect",
    company: "Azure",
    topSkills: ["Azure", "Cloud Security", "Microservices"],
    about: "Cloud Architect at Microsoft Azure designing scalable cloud solutions for enterprise clients. Expert in cloud migration strategies and security best practices. Passionate about helping organizations leverage cloud technologies effectively.",
    expectedCtc: "₹65 - 85LPA",
    location: "Seattle, United States",
    image: "avatar"
  },
  {
    name: "Ananya Reddy",
    role: "Content Writer",
    company: "HubSpot",
    topSkills: ["Content Marketing", "SEO Writing", "WordPress"],
    about: "Content Writer at HubSpot specializing in technical writing and content marketing. Experienced in creating engaging blog posts, whitepapers, and marketing materials. Strong background in SEO optimization and audience engagement.",
    expectedCtc: "₹25 - 35LPA",
    location: "Berlin, Germany",
    image: "avatar2"
  },
  {
    name: "Kevin Lee",
    role: "Mobile Developer",
    company: "Uber",
    topSkills: ["React Native", "iOS", "Android"],
    about: "Mobile Developer at Uber with expertise in cross-platform mobile application development. Experienced in React Native, native iOS and Android development. Passionate about creating smooth user experiences on mobile platforms.",
    expectedCtc: "₹50 - 68LPA",
    location: "San Francisco, United States",
    image: "avatar"
  },
  {
    name: "Sophia Martinez",
    role: "Database Administrator",
    company: "Oracle",
    topSkills: ["PostgreSQL", "Database Optimization", "SQL"],
    about: "Database Administrator at Oracle with extensive experience in database design, optimization, and maintenance. Expert in PostgreSQL and MySQL environments. Passionate about ensuring data integrity and system performance.",
    expectedCtc: "₹38 - 52LPA",
    location: "London, United Kingdom",
    image: "avatar2"
  },
  {
    name: "Ryan Thompson",
    role: "Machine Learning Engineer",
    company: "OpenAI",
    topSkills: ["Python", "TensorFlow", "Deep Learning"],
    about: "Machine Learning Engineer at OpenAI working on cutting-edge AI models and applications. Expert in deep learning frameworks and neural network architectures. Passionate about advancing AI research and practical applications.",
    expectedCtc: "₹80 - 120LPA",
    location: "San Francisco, United States",
    image: "avatar"
  },
  {
    name: "Fatima Al-Zahra",
    role: "Quality Assurance Engineer",
    company: "Atlassian",
    topSkills: ["Test Automation", "Selenium", "API Testing"],
    about: "Quality Assurance Engineer at Atlassian with expertise in automated testing and quality processes. Experienced in test framework development and continuous integration. Passionate about ensuring software reliability and user satisfaction.",
    expectedCtc: "₹32 - 45LPA",
    location: "Sydney, Australia",
    image: "avatar2"
  },
  {
    name: "Carlos Rodriguez",
    role: "System Administrator",
    company: "Red Hat",
    topSkills: ["Linux", "System Monitoring", "Bash"],
    about: "System Administrator at Red Hat specializing in Linux environments and server management. Expert in system monitoring, performance tuning, and automation scripts. Passionate about maintaining robust and secure IT infrastructure.",
    expectedCtc: "₹35 - 48LPA",
    location: "Berlin, Germany",
    image: "avatar"
  },
  {
    name: "Nina Petrov",
    role: "Business Analyst",
    company: "McKinsey",
    topSkills: ["Business Intelligence", "Data Analysis", "Excel"],
    about: "Business Analyst at McKinsey with strong analytical skills and business acumen. Experienced in process improvement, stakeholder management, and strategic planning. Passionate about using data to drive business decisions and growth.",
    expectedCtc: "₹45 - 65LPA",
    location: "New York, United States",
    image: "avatar2"
  },
  {
    name: "Hiroshi Tanaka",
    role: "Game Developer",
    company: "Nintendo",
    topSkills: ["Unity", "C#", "Game Design"],
    about: "Game Developer at Nintendo with passion for creating immersive gaming experiences. Expert in Unity engine and game mechanics design. Experienced in both 2D and 3D game development with focus on player engagement and storytelling.",
    expectedCtc: "₹40 - 55LPA",
    location: "Tokyo, Japan",
    image: "avatar2"
  },
  {
    name: "Olivia White",
    role: "Customer Support Specialist",
    company: "Zendesk",
    topSkills: ["Customer Service", "Technical Support", "Communication"],
    about: "Customer Support Specialist at Zendesk with exceptional communication skills and technical knowledge. Experienced in troubleshooting complex issues and providing excellent customer experiences. Passionate about helping customers succeed.",
    expectedCtc: "₹22 - 32LPA",
    location: "Toronto, Canada",
    image: "avatar2"
  }
];

export { searchFields, talentData };