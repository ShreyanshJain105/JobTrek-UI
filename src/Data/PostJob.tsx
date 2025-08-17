const fields = [
    {
        label: "Job Title",
        placeholder: "Enter Job Title",
        options: [
            'Software Engineer',
            'Frontend Developer',
            'Backend Developer',
            'Full Stack Developer',
            'DevOps Engineer',
            'Data Scientist',
            'Machine Learning Engineer',
            'Product Manager',
            'UX/UI Designer',
            'Graphic Designer',
            'Marketing Manager',
            'Digital Marketing Specialist',
            'Content Marketing Manager',
            'Sales Manager',
            'Business Development Executive',
            'Data Analyst',
            'Business Analyst',
            'Project Manager',
            'Scrum Master',
            'Quality Assurance Engineer',
            'Technical Writer',
            'Content Writer',
            'Copywriter',
            'Customer Success Manager',
            'Customer Support Specialist',
            'HR Manager',
            'Recruiter',
            'Financial Analyst',
            'Operations Manager',
            'Consultant'
        ]
    },
    {
        label: "Company",
        placeholder: "Enter Company Name",
        options: [
            'Google',
            'Microsoft',
            'Amazon',
            'Apple',
            'Meta',
            'Netflix',
            'Adobe',
            'Salesforce',
            'Tesla',
            'Uber',
            'Airbnb',
            'Spotify',
            'Slack',
            'Zoom',
            'Shopify',
            'Stripe',
            'PayPal',
            'LinkedIn',
            'Twitter',
            'Instagram',
            'TikTok',
            'Snapchat',
            'Oracle',
            'IBM',
            'Intel',
            'NVIDIA',
            'AMD',
            'Cisco',
            'VMware',
            'Dropbox'
        ]
    },
    {
        label: "Experience",
        placeholder: "Enter Experience Level",
        options: [
            'Fresher (0-1 years)',
            'Entry Level (1-2 years)',
            'Junior (2-4 years)',
            'Mid Level (4-6 years)',
            'Senior (6-8 years)',
            'Lead (8-10 years)',
            'Principal (10-12 years)',
            'Architect (12+ years)',
            'Director (15+ years)',
            'VP/C-Level (20+ years)'
        ]
    },
    {
        label: "Job Type",
        placeholder: "Enter Job Type",
        options: [
            'Full Time',
            'Part Time',
            'Contract',
            'Freelance',
            'Internship',
            'Remote',
            'Hybrid',
            'On-site',
            'Temporary',
            'Consultant',
            'Seasonal',
            'Volunteer'
        ]
    },
    {
        label: "Location",
        placeholder: "Enter Job Location",
        options: [
            'Bangalore',
            'Mumbai',
            'Delhi',
            'Hyderabad',
            'Chennai',
            'Pune',
            'Kolkata',
            'Jaipur',
            'Ahmedabad',
            'Gurgaon',
            'Noida',
            'San Francisco',
            'New York',
            'Los Angeles',
            'Chicago',
            'Boston',
            'Seattle',
            'Austin',
            'London',
            'Paris',
            'Berlin',
            'Amsterdam',
            'Dublin',
            'Barcelona',
            'Toronto',
            'Vancouver',
            'Sydney',
            'Melbourne',
            'Tokyo',
            'Singapore',
            'Hong Kong',
            'Dubai',
            'Remote'
        ]
    },
    {
        label: "Salary",
        placeholder: "Enter Salary Range",
        options: [
            '3-5 LPA',
            '5-8 LPA',
            '8-12 LPA',
            '12-15 LPA',
            '15-20 LPA',
            '20-25 LPA',
            '25-30 LPA',
            '30-40 LPA',
            '40-50 LPA',
            '50-60 LPA',
            '60-80 LPA',
            '80+ LPA'
        ]
    }
];
const content = `
  <h4>About the Role</h4>
  <p>Briefly describe the position and its impact on the organization.</p>

  <h4>Responsibilities</h4>
  <ul>
    <li>List key duties and day-to-day tasks.</li>
  </ul>

  <h4>Qualifications & Skills</h4>
  <ul>
    <li>Specify required education, skills, and experience.</li>
  </ul>
`;
export  {fields, content};