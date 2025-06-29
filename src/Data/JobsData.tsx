import { IconBriefcase, IconMapPin, IconRecharging, IconSearch } from "@tabler/icons-react";

const dropdownData = [
  {
    title: "Job Title",
    icon: IconSearch,
    options: [
      'Designer',
      'Developer', 
      'Product Manager',
      'Marketing Specialist',
      'Data Analyst',
      'Sales Executive',
      'Content Writer',
      'Customer Support',
      'Software Engineer',
      'UI/UX Designer',
      'Business Analyst',
      'DevOps Engineer'
    ]
  },
  {
    title: "Location", 
    icon: IconMapPin,
    options: [
      'Delhi',
      'New York',
      'San Francisco', 
      'London',
      'Berlin',
      'Tokyo',
      'Sydney',
      'Toronto',
      'Mumbai',
      'Singapore',
      'Amsterdam',
      'Dubai'
    ]
  },
  {
    title: "Experience",
    icon: IconBriefcase,
    options: ['Entry Level', 'Intermediate', 'Expert']
  },
  {
    title: "Job Type",
    icon: IconRecharging,
    options: ['Full Time', 'Part Time', 'Contract', 'Freelance', 'Internship']
  }
];

const jobList = [
  {
    jobTitle: "Product Designer",
    company: "Meta",
    applicants: 25,
    experience: "Entry Level",
    jobType: "Full Time",
    location: "New York",
    salary: "$120k"
  },
  {
    jobTitle: "Senior Software Engineer",
    company: "Google",
    applicants: 45,
    experience: "Expert",
    jobType: "Full Time",
    location: "San Francisco",
    salary: "$180k"
  },
  {
    jobTitle: "UI/UX Designer",
    company: "Apple",
    applicants: 32,
    experience: "Intermediate",
    jobType: "Full Time",
    location: "Delhi",
    salary: "$95k"
  },
  {
    jobTitle: "Marketing Specialist",
    company: "Netflix",
    applicants: 18,
    experience: "Entry Level",
    jobType: "Part Time",
    location: "London",
    salary: "$65k"
  },
  {
    jobTitle: "Data Analyst",
    company: "Amazon",
    applicants: 38,
    experience: "Intermediate",
    jobType: "Contract",
    location: "Berlin",
    salary: "$85k"
  },
  {
    jobTitle: "DevOps Engineer",
    company: "Microsoft",
    applicants: 29,
    experience: "Expert",
    jobType: "Full Time",
    location: "Tokyo",
    salary: "$150k"
  },
  {
    jobTitle: "Content Writer",
    company: "Spotify",
    applicants: 15,
    experience: "Entry Level",
    jobType: "Freelance",
    location: "Sydney",
    salary: "$55k"
  },
  {
    jobTitle: "Product Manager",
    company: "Tesla",
    applicants: 52,
    experience: "Expert",
    jobType: "Full Time",
    location: "Toronto",
    salary: "$160k"
  },
  {
    jobTitle: "Sales Executive",
    company: "Salesforce",
    applicants: 23,
    experience: "Intermediate",
    jobType: "Full Time",
    location: "Mumbai",
    salary: "$75k"
  },
  {
    jobTitle: "Customer Support",
    company: "Uber",
    applicants: 12,
    experience: "Entry Level",
    jobType: "Part Time",
    location: "Singapore",
    salary: "$45k"
  },
  {
    jobTitle: "Business Analyst",
    company: "IBM",
    applicants: 34,
    experience: "Intermediate",
    jobType: "Contract",
    location: "Amsterdam",
    salary: "$90k"
  },
  {
    jobTitle: "Frontend Developer",
    company: "Airbnb",
    applicants: 41,
    experience: "Expert",
    jobType: "Full Time",
    location: "Dubai",
    salary: "$140k"
  },
  {
    jobTitle: "Graphic Designer",
    company: "Adobe",
    applicants: 27,
    experience: "Intermediate",
    jobType: "Freelance",
    location: "New York",
    salary: "$70k"
  },
  {
    jobTitle: "Machine Learning Engineer",
    company: "OpenAI",
    applicants: 67,
    experience: "Expert",
    jobType: "Full Time",
    location: "San Francisco",
    salary: "$200k"
  },
  {
    jobTitle: "Social Media Manager",
    company: "Twitter",
    applicants: 19,
    experience: "Entry Level",
    jobType: "Part Time",
    location: "London",
    salary: "$50k"
  },
  {
    jobTitle: "Backend Developer",
    company: "Stripe",
    applicants: 36,
    experience: "Intermediate",
    jobType: "Full Time",
    location: "Berlin",
    salary: "$130k"
  },
  {
    jobTitle: "Quality Assurance Tester",
    company: "Zoom",
    applicants: 21,
    experience: "Entry Level",
    jobType: "Contract",
    location: "Tokyo",
    salary: "$60k"
  },
  {
    jobTitle: "Digital Marketing Manager",
    company: "HubSpot",
    applicants: 28,
    experience: "Expert",
    jobType: "Full Time",
    location: "Sydney",
    salary: "$110k"
  },
  {
    jobTitle: "Mobile App Developer",
    company: "Instagram",
    applicants: 44,
    experience: "Intermediate",
    jobType: "Full Time",
    location: "Toronto",
    salary: "$125k"
  },
  {
    jobTitle: "HR Specialist",
    company: "LinkedIn",
    applicants: 16,
    experience: "Entry Level",
    jobType: "Internship",
    location: "Mumbai",
    salary: "$40k"
  }
];

export { dropdownData, jobList };