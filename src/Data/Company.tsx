export interface CompanyInfo {
    Name: string;
    Tagline?: string;
    Overview: string;
    Industry: string;
    Website: string;
    Size: string;
    Headquarters: string;
    Founded?: string;
    KeyPeople?: string;
    Specialties: string[];
    PeerCompanies?: string[];
}

export interface SimilarCompany {
    name: string;
    employees: string | number;
    industry?: string;
}

export const companiesDirectory: Record<string, CompanyInfo> = {
    zomato: {
        Name: "Zomato",
        Tagline: "Better food for more people",
        Overview: "Zomato is an Indian multinational restaurant aggregator and food delivery pioneer founded in 2008 by Deepinder Goyal and Pankaj Chaddah. Operating across more than 1,000 Indian cities, Zomato connects millions of customers with restaurant discovery, table bookings, and lightning-fast food delivery. Its high-growth quick-commerce division, Blinkit, delivers groceries and essentials in 10 minutes, transforming urban retail.",
        Industry: "Food Delivery, Quick-Commerce & Hyperlocal Logistics",
        Website: "https://www.zomato.com",
        Size: "5,000 - 10,000 Employees",
        Headquarters: "Gurugram, Haryana, India",
        Founded: "2008",
        KeyPeople: "Deepinder Goyal (Founder & CEO)",
        Specialties: [
            "Online Food Delivery",
            "Quick Commerce (Blinkit)",
            "Dining Out & Table Reservations",
            "Hyperpure (B2B Farm-to-Kitchen)",
            "Hyperlocal Cold Chain & Logistics",
            "Fintech & Merchant Payments",
            "Restaurant POS & Business Systems"
        ],
        PeerCompanies: ["Swiggy", "Zepto", "Blinkit", "Juspay", "Razorpay"]
    },
    swiggy: {
        Name: "Swiggy",
        Tagline: "Delivering convenience to your doorstep",
        Overview: "Swiggy is one of India's leading on-demand convenience platforms. Founded in 2014, Swiggy revolutionized food delivery with in-house routing intelligence and live delivery tracking. Beyond food, Swiggy powers Instamart for instant groceries, Swiggy Dineout for dining discounts, and Swiggy Genie for hyperlocal parcel delivery.",
        Industry: "On-Demand Delivery & Hyperlocal Commerce",
        Website: "https://www.swiggy.com",
        Size: "10,000+ Employees",
        Headquarters: "Bengaluru, Karnataka, India",
        Founded: "2014",
        KeyPeople: "Sriharsha Majety (Group CEO)",
        Specialties: [
            "On-Demand Food Delivery",
            "Instamart Quick Grocery",
            "Hyperlocal Logistics (Genie)",
            "Swiggy Dineout Discovery",
            "Fleet Management AI",
            "Cloud Kitchen Optimization"
        ],
        PeerCompanies: ["Zomato", "Zepto", "Blinkit", "Flipkart", "Dunzo"]
    },
    zepto: {
        Name: "Zepto",
        Tagline: "Groceries in 10 minutes",
        Overview: "Zepto is India's fastest-growing quick-commerce unicorn delivering fresh produce, groceries, and daily essentials in 10 minutes. Founded by Aadit Palicha and Kaivalya Vohra, Zepto operates hundreds of micro-warehouses (dark stores) engineered with proprietary pick-and-pack robotics and route optimization algorithms.",
        Industry: "Quick Commerce & Hyperlocal Retail",
        Website: "https://www.zeptonow.com",
        Size: "3,000 - 5,000 Employees",
        Headquarters: "Mumbai, Maharashtra, India",
        Founded: "2021",
        KeyPeople: "Aadit Palicha & Kaivalya Vohra (Co-Founders)",
        Specialties: [
            "10-Minute Grocery Delivery",
            "Dark Store Micro-Fulfillment",
            "Inventory Prediction AI",
            "Cold Chain Supply Architecture",
            "Zepto Cafe On-Demand",
            "Last-Mile Electric Delivery"
        ],
        PeerCompanies: ["Blinkit", "Swiggy", "Zomato", "Flipkart", "Dunzo"]
    },
    blinkit: {
        Name: "Blinkit",
        Tagline: "Instant delivery of everything you need",
        Overview: "Blinkit (formerly Grofers, acquired by Zomato) is an Indian quick-commerce service delivering thousands of daily essentials directly to consumers in 10 minutes. By managing localized high-density dark stores and predictive restocking, Blinkit powers modern grocery and electronics delivery across major Indian metropolitan areas.",
        Industry: "Quick-Commerce & Hyperlocal Logistics",
        Website: "https://www.blinkit.com",
        Size: "3,000 - 6,000 Employees",
        Headquarters: "Gurugram, Haryana, India",
        Founded: "2013",
        KeyPeople: "Albinder Dhindsa (CEO & Founder)",
        Specialties: [
            "Instant Grocery Delivery",
            "Micro-Fulfillment Centers",
            "Predictive Demand Forecasting",
            "Rapid Last-Mile Logistics",
            "Direct Brand Partnerships",
            "High-Density Store Engineering"
        ],
        PeerCompanies: ["Zepto", "Swiggy", "Zomato", "Dunzo", "Flipkart"]
    },
    flipkart: {
        Name: "Flipkart",
        Tagline: "Ab Har Wish Hogi Poori",
        Overview: "Flipkart is India's homegrown e-commerce marketplace giant, part of the Walmart group. Founded in 2007 by Sachin Bansal and Binny Bansal, Flipkart serves over 450 million registered customers offering over 150 million products across 80+ categories backed by India's largest logistics network, Ekart.",
        Industry: "E-Commerce, Logistics & Retail Technology",
        Website: "https://www.flipkart.com",
        Size: "35,000+ Employees",
        Headquarters: "Bengaluru, Karnataka, India",
        Founded: "2007",
        KeyPeople: "Kalyan Krishnamurthy (CEO)",
        Specialties: [
            "Online Retail Marketplace",
            "Ekart Supply Chain Network",
            "SuperCoin Loyalty & Fintech",
            "Flipkart Minutes (Quick Commerce)",
            "Cleartrip Travel Ecosystem",
            "Automated Warehousing & Sortation"
        ],
        PeerCompanies: ["Amazon", "Myntra", "Meesho", "Reliance Jio", "Tata Neu"]
    },
    amazon: {
        Name: "Amazon",
        Tagline: "Work hard. Have fun. Make history.",
        Overview: "Amazon is an American multinational technology powerhouse guided by customer obsession rather than competitor focus. Operating global leadership positions across e-commerce, cloud computing with Amazon Web Services (AWS), digital streaming, and artificial intelligence, Amazon drives enterprise solutions and consumer infrastructure worldwide.",
        Industry: "Cloud Computing (AWS), E-Commerce & AI",
        Website: "https://www.amazon.com",
        Size: "1,500,000+ Employees",
        Headquarters: "Seattle, Washington, United States",
        Founded: "1994",
        KeyPeople: "Andy Jassy (President & CEO)",
        Specialties: [
            "Amazon Web Services (AWS)",
            "E-Commerce & Global Marketplace",
            "Amazon Prime & Prime Video",
            "Generative AI (Amazon Bedrock)",
            "Automated Robotics & Logistics",
            "Kindle, Echo & Alexa Devices"
        ],
        PeerCompanies: ["Google", "Microsoft", "Flipkart", "Apple", "Meta"]
    },
    google: {
        Name: "Google",
        Tagline: "Organizing the world's information",
        Overview: "Google is a global technology leader in search, cloud infrastructure, AI, mobile platforms, and software services. Founded in 1998 by Larry Page and Sergey Brin, Google provides ubiquitous platforms including Search, YouTube, Android, Chrome, and Google Cloud, while pioneering frontier research through Google DeepMind and the Gemini foundation models.",
        Industry: "Internet, Software & Artificial Intelligence",
        Website: "https://www.google.com",
        Size: "180,000+ Employees",
        Headquarters: "Mountain View, California, United States",
        Founded: "1998",
        KeyPeople: "Sundar Pichai (CEO, Alphabet & Google)",
        Specialties: [
            "Search Engine & AI Overviews",
            "Google Cloud Platform (GCP)",
            "Gemini Generative AI",
            "Android Mobile OS",
            "YouTube Video Streaming",
            "Hardware & Pixel Devices"
        ],
        PeerCompanies: ["Microsoft", "Amazon", "Apple", "Meta", "OpenAI"]
    },
    microsoft: {
        Name: "Microsoft",
        Tagline: "Empowering every person and organization to achieve more",
        Overview: "Microsoft is a worldwide pioneer in software platforms, cloud infrastructure (Azure), enterprise productivity, and AI innovation. Under Satya Nadella's leadership, Microsoft powers millions of organizations with Microsoft 365, Teams, GitHub, Azure Cloud, and integrated Copilot AI assistants.",
        Industry: "Enterprise Software, Cloud & AI",
        Website: "https://www.microsoft.com",
        Size: "220,000+ Employees",
        Headquarters: "Redmond, Washington, United States",
        Founded: "1975",
        KeyPeople: "Satya Nadella (Chairman & CEO)",
        Specialties: [
            "Microsoft Azure Cloud Infrastructure",
            "Microsoft 365 & Copilot AI",
            "Windows Operating System",
            "GitHub Developer Platform",
            "LinkedIn Professional Network",
            "Xbox & Gaming Ecosystem"
        ],
        PeerCompanies: ["Google", "Amazon", "Apple", "Salesforce", "Oracle"]
    },
    razorpay: {
        Name: "Razorpay",
        Tagline: "Powering the financial architecture of internet companies",
        Overview: "Razorpay is India's leading full-stack fintech platform empowering businesses to accept, process, and disburse digital payments. Founded in 2014 by Harshil Mathur and Shashank Kumar, Razorpay processes over $150 billion in annual total payment volume for millions of online merchants and enterprises.",
        Industry: "FinTech, Digital Payments & Neo-Banking",
        Website: "https://www.razorpay.com",
        Size: "3,500 - 5,000 Employees",
        Headquarters: "Bengaluru, Karnataka, India",
        Founded: "2014",
        KeyPeople: "Harshil Mathur (CEO) & Shashank Kumar (MD)",
        Specialties: [
            "Online Payment Gateway & UPI",
            "RazorpayX Neo-Banking Suite",
            "Opfin Automated Payroll",
            "Cross-Border Money Movement",
            "Fraud & Risk Detection AI",
            "Capital & Working Financing"
        ],
        PeerCompanies: ["PhonePe", "Paytm", "CRED", "Juspay", "Stripe"]
    },
    phonepe: {
        Name: "PhonePe",
        Tagline: "Fast, secure payments for everyone",
        Overview: "PhonePe is India's market-leading digital payments company processing over 45% of India's UPI ecosystem transactions. With over 500 million registered users and 38 million merchants, PhonePe has expanded into mutual funds, insurance distribution, gold savings, and the Indus Appstore alternative ecosystem.",
        Industry: "Digital Payments & WealthTech",
        Website: "https://www.phonepe.com",
        Size: "5,000 - 10,000 Employees",
        Headquarters: "Bengaluru, Karnataka, India",
        Founded: "2015",
        KeyPeople: "Sameer Nigam (Founder & CEO)",
        Specialties: [
            "UPI Transactions & P2P Money Transfer",
            "Merchant Offline QR Ecosystem",
            "Insurance & Health Coverage Distribution",
            "Mutual Funds & Systematic Investment Plans",
            "Indus Appstore Marketplace",
            "Consumer Credit & Bill Payments"
        ],
        PeerCompanies: ["Google Pay", "Paytm", "Razorpay", "CRED", "Juspay"]
    },
    paytm: {
        Name: "Paytm",
        Tagline: "India's pioneer in mobile payments",
        Overview: "Paytm (One97 Communications) pioneered digital QR payments and the merchant audio Soundbox in India. Founded by Vijay Shekhar Sharma, Paytm powers seamless digital commerce, transit cards, bill payments, and merchant POS systems across small vendors and major enterprises.",
        Industry: "FinTech & Digital Payments",
        Website: "https://www.paytm.com",
        Size: "10,000 - 18,000 Employees",
        Headquarters: "Noida, Uttar Pradesh, India",
        Founded: "2010",
        KeyPeople: "Vijay Shekhar Sharma (Founder & CEO)",
        Specialties: [
            "QR Payments & Soundbox IoT Devices",
            "Merchant EDC / Card POS Terminals",
            "UPI Money Transfer & Wallet Services",
            "Transit, Flight & Movie Ticketing",
            "Merchant Working Capital Credit",
            "Micro-Insurance & Bill Automation"
        ],
        PeerCompanies: ["PhonePe", "Razorpay", "Google Pay", "CRED", "Groww"]
    },
    cred: {
        Name: "CRED",
        Tagline: "Rewarding financial discipline and trust",
        Overview: "CRED is a members-only fintech platform created by serial entrepreneur Kunal Shah in 2018. Designed for creditworthy individuals, CRED simplifies credit card bill management while providing exclusive access to luxury e-commerce, peer-to-peer lending via CRED Mint, and vehicle management via CRED Garage.",
        Industry: "FinTech & Premium Lifestyle Commerce",
        Website: "https://www.cred.club",
        Size: "1,000 - 2,500 Employees",
        Headquarters: "Bengaluru, Karnataka, India",
        Founded: "2018",
        KeyPeople: "Kunal Shah (Founder & CEO)",
        Specialties: [
            "Credit Card Management & Bill Settlement",
            "CRED Pay Instant Checkout",
            "CRED Mint High-Yield P2P Lending",
            "CRED Garage Vehicle Telematics",
            "Curated Brand Store & Flash Sales",
            "CRED Escapes Luxury Travel"
        ],
        PeerCompanies: ["Razorpay", "PhonePe", "Zerodha", "Groww", "Paytm"]
    },
    zerodha: {
        Name: "Zerodha",
        Tagline: "The pioneer of discount broking in India",
        Overview: "Zerodha is India's largest retail stockbroker by active market volume, bootstrapped and profitable since inception. Founded in 2010 by Nithin Kamath and Nikhil Kamath, Zerodha revolutionized the Indian capital markets with flat-fee pricing and the ultra-reliable Kite trading engine.",
        Industry: "FinTech, Stockbroking & WealthTech",
        Website: "https://www.zerodha.com",
        Size: "1,200 - 2,000 Employees",
        Headquarters: "Bengaluru, Karnataka, India",
        Founded: "2010",
        KeyPeople: "Nithin Kamath & Nikhil Kamath (Co-Founders)",
        Specialties: [
            "Kite Web & Mobile Trading Engine",
            "Coin Direct Mutual Fund Platform",
            "Console Analytics & Tax Reporting",
            "Varsity Financial Education",
            "Rainmatter Fintech Seed Fund",
            "Ultra-Low Latency Order Routing"
        ],
        PeerCompanies: ["Groww", "CoinDCX", "CRED", "Paytm Money", "Angel One"]
    },
    groww: {
        Name: "Groww",
        Tagline: "Making investing simple and transparent",
        Overview: "Groww is an intuitive Indian investment and wealthtech platform founded by ex-Flipkart executives Lalit Keshre, Harsh Jain, Ishan Bansal, and Neeraj Singh. Groww empowers millions of first-time and experienced investors to trade equities, ETFs, mutual funds, and IPOs with zero friction.",
        Industry: "WealthTech & Financial Technology",
        Website: "https://www.groww.in",
        Size: "2,000 - 4,000 Employees",
        Headquarters: "Bengaluru, Karnataka, India",
        Founded: "2016",
        KeyPeople: "Lalit Keshre (CEO & Co-Founder)",
        Specialties: [
            "Direct Mutual Funds & SIP Investment",
            "Indian Equity & Stock Trading",
            "Derivatives (Futures & Options)",
            "Direct IPO Bidding via UPI",
            "High-Throughput Reactive Financial Microservices",
            "Credit & Personal Lending"
        ],
        PeerCompanies: ["Zerodha", "CRED", "Paytm", "CoinDCX", "Upstox"]
    },
    tcs: {
        Name: "TCS",
        Tagline: "Building on belief",
        Overview: "Tata Consultancy Services is an Indian multinational IT services, consulting, and business solutions leader operating across 55 countries. With over 600,000 global associates, TCS partners with the world's largest enterprises to lead cloud transitions, cybersecurity, AI integration, and core banking software.",
        Industry: "IT Services & Business Consulting",
        Website: "https://www.tcs.com",
        Size: "600,000+ Employees",
        Headquarters: "Mumbai, Maharashtra, India",
        Founded: "1968",
        KeyPeople: "K. Krithivasan (CEO & MD)",
        Specialties: [
            "Enterprise Cloud Migration & Architecture",
            "AI & Data Analytics Implementation",
            "TCS BaNCS Core Banking & Financial Software",
            "Cybersecurity & Governance",
            "Cognitive Business Operations",
            "IoT & Industrial Engineering"
        ],
        PeerCompanies: ["Infosys", "Wipro", "HCLTech", "Accenture", "Cognizant"]
    },
    infosys: {
        Name: "Infosys",
        Tagline: "Navigate your next",
        Overview: "Infosys is a global leader in next-generation digital services and consulting, enabling enterprises across 56 countries to execute digital transformations. From Infosys Topaz generative AI capabilities to Cobalt cloud architectures and Finacle core banking, Infosys powers modern technology modernization.",
        Industry: "Information Technology & Consulting",
        Website: "https://www.infosys.com",
        Size: "320,000+ Employees",
        Headquarters: "Bengaluru, Karnataka, India",
        Founded: "1981",
        KeyPeople: "Salil Parekh (CEO & MD)",
        Specialties: [
            "Infosys Topaz Generative AI Platform",
            "Infosys Cobalt Enterprise Cloud",
            "Finacle Global Banking Platform",
            "Digital Experience & Application Modernization",
            "Data Science & Automated Intelligence",
            "Cybersecurity & Resilience"
        ],
        PeerCompanies: ["TCS", "Wipro", "HCLTech", "Capgemini", "Cognizant"]
    },
    wipro: {
        Name: "Wipro",
        Tagline: "Applying thought to solve enterprise challenges",
        Overview: "Wipro Limited is a premier technology services and consulting company focused on building innovative solutions that address clients' most complex digital transformation needs. Through Wipro ai360 and strategic cloud alliances, Wipro delivers sustainable growth across global enterprises.",
        Industry: "IT Consulting & Digital Solutions",
        Website: "https://www.wipro.com",
        Size: "240,000+ Employees",
        Headquarters: "Bengaluru, Karnataka, India",
        Founded: "1945",
        KeyPeople: "Srini Pallia (CEO & MD)",
        Specialties: [
            "Wipro ai360 Generative AI Ecosystem",
            "Cloud Transformation & Migration",
            "Cybersecurity & Risk Management",
            "Engineering Edge, 5G & Industrial IoT",
            "Enterprise Resource Planning (ERP)",
            "Digital Healthcare & Life Sciences"
        ],
        PeerCompanies: ["TCS", "Infosys", "HCLTech", "Tech Mahindra", "Capgemini"]
    },
    accenture: {
        Name: "Accenture",
        Tagline: "Let there be change",
        Overview: "Accenture is a leading global professional services company that helps the world's leading businesses, governments, and other organizations build their digital core, optimize operations, and accelerate revenue growth. Operating in over 120 countries, Accenture brings deep industry expertise across 40+ sectors.",
        Industry: "Management Consulting & Technology Services",
        Website: "https://www.accenture.com",
        Size: "750,000+ Employees",
        Headquarters: "Dublin, Ireland (Major Global Hub: Bengaluru & Gurugram, India)",
        Founded: "1989",
        KeyPeople: "Julie Sweet (Chair & CEO)",
        Specialties: [
            "Applied Intelligence & Enterprise AI",
            "Accenture Cloud First Platform",
            "Accenture Song Interactive Design",
            "Business Strategy & Management Consulting",
            "Enterprise Security Services",
            "Supply Chain & Operations Optimization"
        ],
        PeerCompanies: ["Deloitte", "TCS", "Infosys", "PwC", "EY"]
    },
    meesho: {
        Name: "Meesho",
        Tagline: "Empowering every Indian entrepreneur",
        Overview: "Meesho is India's premier social commerce and value e-commerce marketplace. Founded in 2015 by Vidit Aatrey and Sanjeev Barnwal, Meesho revolutionized Indian retail by introducing a 0% seller commission model, making everyday fashion, home decor, and electronics accessible to millions in Tier 2, 3, and rural India.",
        Industry: "Social E-Commerce & Retail Marketplace",
        Website: "https://www.meesho.com",
        Size: "2,500 - 4,500 Employees",
        Headquarters: "Bengaluru, Karnataka, India",
        Founded: "2015",
        KeyPeople: "Vidit Aatrey & Sanjeev Barnwal (Co-Founders)",
        Specialties: [
            "0% Seller Commission E-Commerce",
            "High-Throughput Mobile App Architecture",
            "Tier 2/3/4 Consumer Logistics",
            "Vernacular Discovery & Social Sharing",
            "Machine Learning Product Ranking",
            "Micro-Entrepreneur Empowerment"
        ],
        PeerCompanies: ["Flipkart", "Amazon", "Myntra", "Nykaa", "Shopsy"]
    },
    freshworks: {
        Name: "Freshworks",
        Tagline: "Software that works for you",
        Overview: "Freshworks (NASDAQ: FRSH) makes modern business software that is easy to try, buy, and use. Founded in Chennai in 2010 by Girish Mathrubootham and Shan Krishnasamy, Freshworks provides customer service (Freshdesk), IT service management (Freshservice), and CRM tools to over 67,000 businesses worldwide.",
        Industry: "Enterprise SaaS, CRM & IT Service Management",
        Website: "https://www.freshworks.com",
        Size: "5,000 - 7,000 Employees",
        Headquarters: "San Mateo, California, United States (Major R&D: Chennai & Bengaluru, India)",
        Founded: "2010",
        KeyPeople: "Dennis Woodside (CEO) & Girish Mathrubootham (Executive Chairman)",
        Specialties: [
            "Freshdesk Omnichannel Support",
            "Freshservice Enterprise ITSM",
            "Freshsales Revenue & CRM Cloud",
            "Freddy AI Automated Customer Resolution",
            "Cloud Multi-Tenant SaaS Architecture",
            "Developer Marketplace Integrations"
        ],
        PeerCompanies: ["Zoho", "Salesforce", "Postman", "Hubspot", "Zendesk"]
    },
    zoho: {
        Name: "Zoho",
        Tagline: "The operating system for business",
        Overview: "Zoho Corporation is a unique, bootstrapped, and highly profitable multinational technology company offering a suite of over 55 enterprise cloud applications. Founded by Sridhar Vembu and Tony Thomas in 1996, Zoho is trusted by over 100 million users worldwide, maintaining extreme privacy standards without third-party ad tracking.",
        Industry: "Cloud Software & Enterprise Applications",
        Website: "https://www.zoho.com",
        Size: "15,000+ Employees",
        Headquarters: "Chennai, Tamil Nadu, India",
        Founded: "1996",
        KeyPeople: "Sridhar Vembu (Founder & CEO)",
        Specialties: [
            "Zoho CRM & Sales Pipeline Automation",
            "Zoho Books Accounting & Invoicing",
            "Zoho Workplace & Enterprise Mail",
            "Zoho Creator Low-Code Application Builder",
            "Proprietary Private Cloud Infrastructure",
            "R&D Deep Tech & Rural Innovation Hubs"
        ],
        PeerCompanies: ["Freshworks", "Salesforce", "Microsoft", "Google Workspace", "Postman"]
    },
    postman: {
        Name: "Postman",
        Tagline: "The API platform for building the future",
        Overview: "Postman is the world's leading API development and collaboration platform used by more than 30 million developers and 500,000 companies globally, including 98% of the Fortune 500. Founded in 2014 by Abhinav Asthana, Ankit Sobti, and Abhijit Kane, Postman simplifies each step of the API lifecycle.",
        Industry: "Developer Tools & API Infrastructure",
        Website: "https://www.postman.com",
        Size: "1,200 - 2,500 Employees",
        Headquarters: "San Francisco, California, United States (Major Tech Hub: Bengaluru, India)",
        Founded: "2014",
        KeyPeople: "Abhinav Asthana (CEO & Co-Founder)",
        Specialties: [
            "API Design & Interactive Testing",
            "Public & Private API Network",
            "Automated API Performance Monitoring",
            "Mock Servers & Rapid Prototyping",
            "Enterprise API Governance",
            "CI/CD Integration & CLI Tooling"
        ],
        PeerCompanies: ["BrowserStack", "GitHub", "Freshworks", "Atlassian", "GitLab"]
    },
    browserstack: {
        Name: "BrowserStack",
        Tagline: "Test on 3,000+ real devices and browsers",
        Overview: "BrowserStack is the global leader in software testing platforms, powering over two million tests daily across 15 worldwide data centers. Founded in 2011 by Ritesh Arora and Nakul Aggarwal in Mumbai, BrowserStack enables software engineering teams to test web and mobile apps on real devices seamlessly.",
        Industry: "Developer Tools & Cloud Testing Infrastructure",
        Website: "https://www.browserstack.com",
        Size: "1,200 - 2,500 Employees",
        Headquarters: "Mumbai, Maharashtra, India / Dublin, Ireland",
        Founded: "2011",
        KeyPeople: "Ritesh Arora & Nakul Aggarwal (Co-Founders)",
        Specialties: [
            "Live Cross-Browser Interactive Testing",
            "Automate Cloud Selenium & Playwright Grids",
            "App Live Real iOS and Android Testing",
            "Percy Visual Testing & Review",
            "Test Observability & Root Cause Analysis",
            "Enterprise Single Sign-On & Network Security"
        ],
        PeerCompanies: ["Postman", "Datadog", "GitHub", "Atlassian", "GitLab"]
    },
    juspay: {
        Name: "Juspay",
        Tagline: "Building reliable, billion-scale payments infrastructure",
        Overview: "Juspay is India's leading payment infrastructure company processing over 100 million transactions daily with 99.999% uptime. Founded in 2012 by Vimal Kumar and Ramanathan RV, Juspay powers UPI payment flows and checkouts for India's tech giants including Amazon, Swiggy, and Flipkart using pure functional programming (Haskell).",
        Industry: "Payments Infrastructure & High-Concurrency Systems",
        Website: "https://www.juspay.in",
        Size: "1,200 - 2,200 Employees",
        Headquarters: "Bengaluru, Karnataka, India",
        Founded: "2012",
        KeyPeople: "Vimal Kumar (Founder & CEO)",
        Specialties: [
            "Express Checkout SDK",
            "Hyperswitch Global Open Source Payment Switch",
            "UPI Switch & Access Control Server (ACS)",
            "Pure Functional Programming Architecture (Haskell/PureScript)",
            "Sub-Second Payment Latency Optimization",
            "Payment Orchestration & Routing"
        ],
        PeerCompanies: ["Razorpay", "PhonePe", "Paytm", "Stripe", "Cashfree"]
    },
    deloitte: {
        Name: "Deloitte",
        Tagline: "Making an impact that matters",
        Overview: "Deloitte provides industry-leading audit, consulting, tax, and advisory services to nearly 90% of the Fortune Global 500. Operating in over 150 countries, Deloitte combines global insights with deep technological capabilities to transform legacy enterprise architectures into resilient, AI-powered organizations.",
        Industry: "Management Consulting & Professional Services",
        Website: "https://www.deloitte.com",
        Size: "450,000+ Employees",
        Headquarters: "London, United Kingdom (Major Tech Center: Hyderabad & Bengaluru, India)",
        Founded: "1845",
        KeyPeople: "Joe Ucuzoglu (Global CEO)",
        Specialties: [
            "Enterprise Technology Transformation",
            "AI & Data Analytics Implementation",
            "Cyber Risk & Regulatory Compliance",
            "Audit & Financial Assurance",
            "Tax & Legal Advisory",
            "Mergers & Acquisitions Advisory"
        ],
        PeerCompanies: ["PwC", "EY", "Accenture", "McKinsey", "KPMG"]
    },
    uber: {
        Name: "Uber",
        Tagline: "Reimagining the way the world moves for the better",
        Overview: "Uber Technologies is a global mobility and delivery platform connecting riders to drivers and consumers to restaurants across 10,000+ cities. In India, Uber operates massive engineering and product centers in Bengaluru and Hyderabad building core routing algorithms, safety features, and high-concurrency dispatch engines.",
        Industry: "Mobility, Logistics & Distributed Systems",
        Website: "https://www.uber.com",
        Size: "32,000+ Employees",
        Headquarters: "San Francisco, California, United States (Major R&D: Bengaluru & Hyderabad, India)",
        Founded: "2009",
        KeyPeople: "Dara Khosrowshahi (CEO)",
        Specialties: [
            "Rideshare & On-Demand Mobility",
            "Uber Eats Delivery Infrastructure",
            "Dynamic Pricing & Real-Time Marketplace Matching",
            "Microservices Distributed Architecture",
            "Autonomous Vehicles & Drone Delivery Partnerships",
            "Global Financial Disbursal Systems"
        ],
        PeerCompanies: ["Ola", "Zomato", "Swiggy", "Rapido", "Lyft"]
    },
    ola: {
        Name: "Ola",
        Tagline: "Fostering sustainable mobility for billions",
        Overview: "Ola (ANI Technologies) is one of the world's largest ridesharing platforms operating across 250+ cities in India, the UK, Australia, and New Zealand. Through Ola Electric, it manufactures market-leading electric scooters at the Futurefactory in Tamil Nadu and develops indigenous battery cell technologies.",
        Industry: "Mobility, Electric Vehicles & Clean Tech",
        Website: "https://www.olacabs.com",
        Size: "6,000 - 10,000 Employees",
        Headquarters: "Bengaluru, Karnataka, India",
        Founded: "2010",
        KeyPeople: "Bhavish Aggarwal (Founder & Chairman)",
        Specialties: [
            "App-Based Cab & Auto Hailing",
            "Ola Electric Vehicles & Futurefactory",
            "Indigenous Battery Cell Gigafactory",
            "Krutrim AI & Indian LLMs",
            "Fleet Management & Logistics",
            "Financial Services & Vehicle Insurance"
        ],
        PeerCompanies: ["Uber", "Swiggy", "Zomato", "Rapido", "Tata Motors"]
    },
    myntra: {
        Name: "Myntra",
        Tagline: "India's trendsetters in online fashion",
        Overview: "Myntra is India's leading fashion, beauty, and lifestyle destination, part of the Flipkart Group. Offering over 6,000 domestic and international brands to 50+ million shoppers, Myntra pioneers computer vision, personalized recommendation algorithms, and creator studio commerce.",
        Industry: "Fashion E-Commerce & Retail Technology",
        Website: "https://www.myntra.com",
        Size: "4,000 - 6,000 Employees",
        Headquarters: "Bengaluru, Karnataka, India",
        Founded: "2007",
        KeyPeople: "Nandita Sinha (CEO)",
        Specialties: [
            "Fashion & Lifestyle E-Commerce",
            "Virtual Try-On & Visual Search AI",
            "High-Volume End of Reason Sales (EORS)",
            "Myntra Studio & Creator Commerce",
            "Supply Chain & Automated Fulfillment",
            "Personalized Trend Forecasting"
        ],
        PeerCompanies: ["Nykaa", "Flipkart", "Amazon", "Meesho", "Ajio"]
    },
    nykaa: {
        Name: "Nykaa",
        Tagline: "Your beauty, our passion",
        Overview: "Nykaa (FSN E-Commerce Ventures) is India's premier omnichannel beauty, wellness, and fashion retailer founded in 2012 by Falguni Nayar. Nykaa combines an influential content-led mobile app with over 175 offline retail stores, setting the benchmark for premium consumer experience in India.",
        Industry: "Omnichannel Beauty, Wellness & Fashion",
        Website: "https://www.nykaa.com",
        Size: "3,500 - 5,500 Employees",
        Headquarters: "Mumbai, Maharashtra, India",
        Founded: "2012",
        KeyPeople: "Falguni Nayar (Executive Chairperson & CEO)",
        Specialties: [
            "Omnichannel Cosmetics & Skincare Retail",
            "Nykaa Luxe & On-Trend Physical Stores",
            "Nykaa Fashion & Contemporary Apparel",
            "Content & Influencer-Driven Commerce",
            "Private Label Brands (Kay Beauty, Nykaa Cosmetics)",
            "Automated Temperature-Controlled Warehousing"
        ],
        PeerCompanies: ["Myntra", "Purplle", "Flipkart", "Amazon", "Tata CLiQ"]
    },
    darwinbox: {
        Name: "Darwinbox",
        Tagline: "Empowering the workforce of tomorrow",
        Overview: "Darwinbox is an enterprise HR technology unicorn providing a cloud-native Human Capital Management (HCM) suite. Trusted by over 900 global enterprises across 130+ countries, Darwinbox manages the complete hire-to-retire employee lifecycle with AI-driven analytics and an intuitive mobile-first experience.",
        Industry: "Enterprise SaaS & HR Technology",
        Website: "https://www.darwinbox.com",
        Size: "1,500 - 3,000 Employees",
        Headquarters: "Hyderabad, Telangana, India",
        Founded: "2015",
        KeyPeople: "Chaitanya Peddi, Jayant Paleti & Rohit Chennamaneni (Co-Founders)",
        Specialties: [
            "Core HR & Global Workforce Management",
            "Automated Multi-Country Payroll & Compliance",
            "Performance Management & OKR Tracking",
            "Applicant Tracking System (ATS)",
            "Employee Experience & Pulse Surveys",
            "Darwinbox Sense AI Analytics"
        ],
        PeerCompanies: ["Workday", "Freshworks", "Zoho", "SAP SuccessFactors", "BambooHR"]
    },
    practo: {
        Name: "Practo",
        Tagline: "Your home for health",
        Overview: "Practo is India's leading integrated healthcare technology platform connecting patients with verified doctors, clinics, diagnostics, and pharmacies. With over 30 crore patients served, Practo powers appointment scheduling, teleconsultations, hospital management software, and electronic medical records.",
        Industry: "HealthTech & Digital Medicine",
        Website: "https://www.practo.com",
        Size: "1,500 - 3,000 Employees",
        Headquarters: "Bengaluru, Karnataka, India",
        Founded: "2008",
        KeyPeople: "Shashank ND (Co-Founder & CEO)",
        Specialties: [
            "Doctor Appointment Booking & Reviews",
            "24/7 Online Video Consultations",
            "Practo Ray Clinic Practice Management",
            "Insta Hospital Information Management Systems",
            "Diagnostic Lab Test Booking at Home",
            "Digital Prescription & Health Records"
        ],
        PeerCompanies: ["Tata 1mg", "PharmEasy", "Apollo 24|7", "MediBuddy", "Max Healthcare"]
    },
    cars24: {
        Name: "Cars24",
        Tagline: "Better drives, simple buys",
        Overview: "Cars24 is India's leading online platform for buying and selling pre-owned vehicles. Utilizing proprietary AI valuation algorithms, 140-point inspection checklists, and Mega Refurbishment Labs (MRL), Cars24 provides completely transparent automobile transactions with financing and warranty protection.",
        Industry: "AutoTech & E-Commerce",
        Website: "https://www.cars24.com",
        Size: "4,000 - 6,000 Employees",
        Headquarters: "Gurugram, Haryana, India",
        Founded: "2015",
        KeyPeople: "Vikram Chopra (Co-Founder & CEO)",
        Specialties: [
            "AI Vehicle Inspection & Valuation Engine",
            "End-to-End Online Car Purchasing",
            "Mega Refurbishment Labs (MRL)",
            "Cars24 Financial Services & Auto Loans",
            "Paperless Ownership Transfer & RC Transfer",
            "Warranty & Roadside Assistance"
        ],
        PeerCompanies: ["Spinny", "CarDekho", "Ola", "CarTrade", "Uber"]
    },
    coindcx: {
        Name: "CoinDCX",
        Tagline: "Simplifying Web3 and crypto investments",
        Overview: "CoinDCX is India's first cryptocurrency unicorn and most trusted crypto investment app. Operating with strict 7M security compliance, CoinDCX offers retail trading, margin trading, staking, and the Okto self-custody Web3 wallet to over 15 million users across India.",
        Industry: "Web3, Blockchain & Crypto FinTech",
        Website: "https://www.coindcx.com",
        Size: "800 - 1,500 Employees",
        Headquarters: "Mumbai, Maharashtra, India",
        Founded: "2018",
        KeyPeople: "Sumit Gupta & Neeraj Khandelwal (Co-Founders)",
        Specialties: [
            "Cryptocurrency Spot & Futures Trading",
            "Okto Self-Custody Web3 Multi-Chain Wallet",
            "Proof of Reserves & Transparency Systems",
            "Institutional Liquidity Aggregation",
            "Crypto Staking & Passive Yield",
            "Compliance & AML Identity Verification"
        ],
        PeerCompanies: ["WazirX", "CoinSwitch", "Zerodha", "Groww", "Binance"]
    },
    "reliance jio": {
        Name: "Reliance Jio",
        Tagline: "Digital life for every Indian",
        Overview: "Reliance Jio Infocomm Limited is India's largest telecommunications network and digital services provider with over 475 million subscribers. Jio democratized 4G and 5G internet across India and built a complete ecosystem spanning JioFiber, JioCinema, JioCloud, and AI data centers.",
        Industry: "Telecommunications & Digital Services",
        Website: "https://www.jio.com",
        Size: "60,000+ Employees",
        Headquarters: "Mumbai, Maharashtra, India",
        Founded: "2016",
        KeyPeople: "Akash Ambani (Chairman, Reliance Jio)",
        Specialties: [
            "True 5G Standalone Telecom Network",
            "JioFiber & JioAirFiber High-Speed Broadband",
            "JioCinema & Digital Streaming Media",
            "JioCloud Enterprise Services & AI Infrastructure",
            "JioBharat Affordable Digital Phones",
            "Enterprise 5G IoT & Private Networks"
        ],
        PeerCompanies: ["Airtel", "Vodafone Idea", "Tata Communications", "Google", "Microsoft"]
    },
    airtel: {
        Name: "Airtel",
        Tagline: "Connecting India with 5G Plus",
        Overview: "Bharti Airtel is a global telecommunications company with operations across 17 countries in South Asia and Africa. Serving over 500 million customers, Airtel provides high-speed 5G mobile broadband, Airtel Xstream fiber, cloud data center infrastructure via Nxtra, and banking via Airtel Payments Bank.",
        Industry: "Telecommunications & Digital Infrastructure",
        Website: "https://www.airtel.in",
        Size: "25,000+ Employees",
        Headquarters: "New Delhi, Delhi, India",
        Founded: "1995",
        KeyPeople: "Sunil Bharti Mittal (Chairman) & Gopal Vittal (MD & CEO)",
        Specialties: [
            "Airtel 5G Plus Mobile Network",
            "Airtel Xstream Fiber & DTH Services",
            "Airtel Payments Bank",
            "Nxtra Hyperscale Green Data Centers",
            "Airtel Business Enterprise IoT & SD-WAN",
            "Airtel IQ Cloud Communications"
        ],
        PeerCompanies: ["Reliance Jio", "Vodafone Idea", "Tata Communications", "TCS", "Infosys"]
    },
    unacademy: {
        Name: "Unacademy",
        Tagline: "India's largest learning platform",
        Overview: "Unacademy is an Indian educational technology company founded in 2015 by Gaurav Munjal, Roman Saini, and Hemesh Singh. Unacademy delivers live interactive learning across competitive examinations, coding, and K-12, while operating nationwide offline Unacademy Centers.",
        Industry: "EdTech & Online Learning",
        Website: "https://www.unacademy.com",
        Size: "2,500 - 4,500 Employees",
        Headquarters: "Bengaluru, Karnataka, India",
        Founded: "2015",
        KeyPeople: "Gaurav Munjal (Co-Founder & CEO)",
        Specialties: [
            "Live Interactive Streaming Classrooms",
            "UPSC, IIT-JEE & NEET Test Preparation",
            "Unacademy Centers (Hybrid Offline Learning)",
            "Graphy Creator & Educator Monetization Platform",
            "AI-Powered Doubt Solving & Assessment",
            "Real-Time Mock Quizzes & Leaderboards"
        ],
        PeerCompanies: ["Physics Wallah", "Byju's", "upGrad", "Vedantu", "Coursera"]
    },
    "physics wallah": {
        Name: "Physics Wallah",
        Tagline: "Alakh Pandey's revolution for affordable education",
        Overview: "Physics Wallah (PW) is India's leading affordable education powerhouse founded by Alakh Pandey and Prateek Maheshwari. Serving over 35 million students, PW offers top-tier online courses and 130+ hybrid Vidyapeeth centers across JEE, NEET, UPSC, and tech skill-development domains.",
        Industry: "EdTech & Hybrid Learning",
        Website: "https://www.pw.live",
        Size: "12,000+ Employees",
        Headquarters: "Noida, Uttar Pradesh, India",
        Founded: "2020",
        KeyPeople: "Alakh Pandey & Prateek Maheshwari (Co-Founders)",
        Specialties: [
            "Affordable Live & Recorded Test Prep",
            "PW Vidyapeeth Hybrid Offline Centers",
            "IIT-JEE & NEET Comprehensive Coaching",
            "PW Skills Tech & Software Upskilling",
            "AI Guru 24/7 Doubt Resolution Engine",
            "K-12 School Partnerships & Books"
        ],
        PeerCompanies: ["Unacademy", "Byju's", "Allen Career Institute", "Vedantu", "upGrad"]
    },
    dream11: {
        Name: "Dream11",
        Tagline: "Ye game hai dimaag ka",
        Overview: "Dream11 is the world's largest fantasy sports platform with over 200 million sports fans. Founded in 2008 by Harsh Jain and Bhavit Sheth, Dream11 engineers distributed systems that process over 10.5 million concurrent user actions per second during marquee sports events like the IPL.",
        Industry: "SportsTech & Real-Time Gaming",
        Website: "https://www.dream11.com",
        Size: "1,200 - 2,500 Employees",
        Headquarters: "Mumbai, Maharashtra, India",
        Founded: "2008",
        KeyPeople: "Harsh Jain (CEO & Co-Founder)",
        Specialties: [
            "Real-Time Fantasy Sports Contests",
            "Billion-Scale Concurrency Architecture",
            "Sub-Second Dynamic Scoring & Leaderboards",
            "FairPlay Anti-Fraud AI Systems",
            "Dream Sports Venture Ecosystem",
            "High-Throughput Reactive Microservices"
        ],
        PeerCompanies: ["Games24x7", "Mobile Premier League (MPL)", "Nazara", "CoinDCX", "CRED"]
    },
    salesforce: {
        Name: "Salesforce",
        Tagline: "Bringing companies and customers together",
        Overview: "Salesforce is the global CRM leader, empowering companies to digitally transform with a 360-degree view of their customers. Powered by Einstein 1 AI, Salesforce unites marketing, sales, commerce, service, and IT onto a single integrated customer platform.",
        Industry: "Enterprise Cloud Software & CRM",
        Website: "https://www.salesforce.com",
        Size: "72,000+ Employees",
        Headquarters: "San Francisco, California, United States (Major Tech Center: Hyderabad, India)",
        Founded: "1999",
        KeyPeople: "Marc Benioff (Chair & CEO)",
        Specialties: [
            "Sales Cloud Pipeline & Deal Management",
            "Service Cloud Omnichannel Contact Centers",
            "Marketing Cloud Automation",
            "MuleSoft Enterprise API Integration",
            "Slack Enterprise Collaboration",
            "Einstein 1 AI Agent Platform"
        ],
        PeerCompanies: ["Microsoft", "Oracle", "HubSpot", "Freshworks", "Zoho"]
    },
    adobe: {
        Name: "Adobe",
        Tagline: "Creativity for all",
        Overview: "Adobe is the global leader in digital media and digital experience software. From flagship Creative Cloud tools like Photoshop and Illustrator to Adobe Firefly generative AI and the Adobe Experience Platform, Adobe empowers creators and enterprises to bring ideas to life.",
        Industry: "Creative Software & Digital Experience",
        Website: "https://www.adobe.com",
        Size: "30,000+ Employees",
        Headquarters: "San Jose, California, United States (Major R&D: Noida & Bengaluru, India)",
        Founded: "1982",
        KeyPeople: "Shantanu Narayen (Chair & CEO)",
        Specialties: [
            "Creative Cloud (Photoshop, Illustrator, Premiere)",
            "Adobe Firefly Generative AI",
            "Document Cloud & Acrobat PDF Solutions",
            "Adobe Experience Cloud & Customer Journeys",
            "Digital Font & Asset Libraries",
            "Real-Time Collaborative Creativity"
        ],
        PeerCompanies: ["Canva", "Apple", "Microsoft", "Salesforce", "Google"]
    },
    spotify: {
        Name: "Spotify",
        Tagline: "Listening is everything",
        Overview: "Spotify is the world's most popular audio streaming subscription service with over 615 million monthly active users across 180+ markets. Spotify transformed music listening forever with algorithmic recommendations, podcast networks, and artist monetization.",
        Industry: "Audio Streaming, Media & Recommender AI",
        Website: "https://www.spotify.com",
        Size: "8,500+ Employees",
        Headquarters: "Stockholm, Sweden (Offices: Mumbai, India)",
        Founded: "2006",
        KeyPeople: "Daniel Ek (Founder & CEO)",
        Specialties: [
            "Music & Audio Streaming",
            "Discover Weekly AI Personalization",
            "Podcast Publishing & Distribution",
            "Spotify for Artists Analytics",
            "High-Scale Event-Driven Infrastructure",
            "Audiobooks & Spoken Word"
        ],
        PeerCompanies: ["Apple", "Amazon", "YouTube Music", "JioSaavn", "Netflix"]
    },
    netflix: {
        Name: "Netflix",
        Tagline: "See what's next",
        Overview: "Netflix is one of the world's leading entertainment streaming services with over 270 million paid memberships in over 190 countries. Enjoying TV series, documentaries, feature films, and mobile games, Netflix sets the industry standard for adaptive streaming and chaos engineering.",
        Industry: "Entertainment Media & Video Streaming",
        Website: "https://www.netflix.com",
        Size: "13,000+ Employees",
        Headquarters: "Los Gatos, California, United States (Offices: Mumbai, India)",
        Founded: "1997",
        KeyPeople: "Ted Sarandos & Greg Peters (Co-CEOs)",
        Specialties: [
            "On-Demand Ultra HD Video Streaming",
            "Original Film & Television Production",
            "Machine Learning Content Recommendation",
            "Adaptive Bitrate Video Compression",
            "Chaos Engineering (Simian Army)",
            "Cloud-Native Global CDN (Open Connect)"
        ],
        PeerCompanies: ["Amazon Prime", "Disney+ Hotstar", "Apple", "YouTube", "JioCinema"]
    },
    apple: {
        Name: "Apple",
        Tagline: "Think different",
        Overview: "Apple revolutionized personal technology with the introduction of the Macintosh, followed by the iPhone, iPad, Mac, Apple Watch, and Vision Pro. Apple's integrated silicon (M-series, A-series), operating systems, and services deliver seamless hardware-software integration with an unwavering commitment to user privacy.",
        Industry: "Consumer Electronics, Hardware & Software",
        Website: "https://www.apple.com",
        Size: "165,000+ Employees",
        Headquarters: "Cupertino, California, United States (Tech Hubs: Bengaluru & Hyderabad, India)",
        Founded: "1976",
        KeyPeople: "Tim Cook (CEO)",
        Specialties: [
            "iPhone & Custom Silicon (A-series, M-series)",
            "MacBook, Mac Studio & iPad",
            "iOS, macOS, watchOS, visionOS",
            "App Store, Apple Music & iCloud+",
            "Apple Intelligence On-Device AI",
            "Hardware Privacy Architecture"
        ],
        PeerCompanies: ["Microsoft", "Google", "Amazon", "Samsung", "Meta"]
    },
    meta: {
        Name: "Meta",
        Tagline: "Giving people the power to build community",
        Overview: "Meta builds technologies that help people connect, find communities, and grow businesses. From apps like Facebook, Instagram, WhatsApp, and Threads to open-source AI models (Llama) and spatial computing (Meta Quest), Meta is pioneering the future of digital connection.",
        Industry: "Social Technology, AI & Spatial Computing",
        Website: "https://about.meta.com",
        Size: "68,000+ Employees",
        Headquarters: "Menlo Park, California, United States (Major Centers: Gurugram & Bengaluru, India)",
        Founded: "2004",
        KeyPeople: "Mark Zuckerberg (Founder, Chairman & CEO)",
        Specialties: [
            "Facebook, Instagram, Messenger & Threads",
            "WhatsApp & WhatsApp Business Cloud API",
            "Llama Open-Source Foundation Models",
            "Meta Quest Mixed Reality Hardware",
            "Ray-Ban Meta AI Smart Glasses",
            "Billion-Scale Advertising Systems"
        ],
        PeerCompanies: ["Google", "TikTok", "Snapchat", "Apple", "Microsoft"]
    }
};

/**
 * Normalizes company names (e.g. "Tata Consultancy Services" -> "tcs")
 */
export const normalizeCompanyName = (name: string): string => {
    if (!name) return "google";
    const cleaned = name.trim().toLowerCase();
    if (cleaned === "tcs" || cleaned.includes("tata consultancy")) return "tcs";
    if (cleaned.includes("reliance") || cleaned.includes("jio")) return "reliance jio";
    if (cleaned.includes("physics") || cleaned.includes("pw")) return "physics wallah";
    if (cleaned.includes("hcl")) return "hcltech";
    return cleaned;
};

/**
 * Returns complete, tailored company details for any requested company.
 * Falls back to an intelligent company-specific synthesizer if not in the pre-defined list.
 */
export const getCompanyDetails = (name: string): CompanyInfo => {
    const key = normalizeCompanyName(name);
    if (companiesDirectory[key]) {
        return companiesDirectory[key];
    }

    // Dynamic generation for newly created or custom companies
    const formattedName = name ? name.trim() : "Enterprise";
    return {
        Name: formattedName,
        Tagline: `Building the future of ${formattedName}`,
        Overview: `${formattedName} is an innovative, high-growth enterprise operating in modern technology and services. Committed to world-class engineering, transparent work culture, and scalable systems, ${formattedName} empowers teams to build next-generation products and serve enterprise clients worldwide.`,
        Industry: "Technology, Software & Digital Transformation",
        Website: `https://www.${formattedName.toLowerCase().replace(/[^a-z0-9]/g, "")}.com`,
        Size: "1,000 - 5,000 Employees",
        Headquarters: "Bengaluru, Karnataka, India",
        Founded: "2018",
        KeyPeople: "Executive Leadership Team",
        Specialties: [
            "Full Stack Software Engineering",
            "Cloud Infrastructure & Distributed Systems",
            "Product Design & User Experience",
            "Enterprise API Integration",
            "Data Analytics & Machine Learning",
            "Agile Delivery & Scale Architecture"
        ],
        PeerCompanies: ["Google", "Microsoft", "Flipkart", "Zomato", "Razorpay"]
    };
};

/**
 * Returns dynamic, sector-relevant peer companies for a given enterprise.
 */
export const getSimilarCompanies = (name: string): SimilarCompany[] => {
    const details = getCompanyDetails(name);
    const peers = details.PeerCompanies || ["Google", "Microsoft", "Amazon", "Flipkart", "Zomato"];
    
    const employeeLookup: Record<string, string> = {
        Zomato: "7,500+",
        Swiggy: "10,000+",
        Zepto: "4,000+",
        Blinkit: "5,000+",
        Flipkart: "35,000+",
        Amazon: "1,500,000+",
        Google: "180,000+",
        Microsoft: "220,000+",
        Razorpay: "4,200+",
        PhonePe: "7,000+",
        Paytm: "15,000+",
        CRED: "1,800+",
        Zerodha: "1,500+",
        Groww: "3,000+",
        TCS: "600,000+",
        Infosys: "320,000+",
        Wipro: "240,000+",
        Accenture: "750,000+",
        Meesho: "3,500+",
        Freshworks: "6,000+",
        Zoho: "15,000+",
        Postman: "1,800+",
        BrowserStack: "1,800+",
        Juspay: "1,500+",
        Uber: "32,000+",
        Ola: "8,000+",
        Myntra: "5,000+",
        Nykaa: "4,500+",
        Darwinbox: "2,200+",
        Practo: "2,000+",
        Cars24: "5,000+",
        CoinDCX: "1,200+",
        "Reliance Jio": "60,000+",
        Airtel: "25,000+",
        Unacademy: "3,500+",
        "Physics Wallah": "12,000+",
        Dream11: "1,800+",
        Salesforce: "72,000+",
        Adobe: "30,000+",
        Spotify: "8,500+",
        Netflix: "13,000+",
        Apple: "165,000+",
        Meta: "68,000+"
    };

    return peers.map((peerName) => {
        const peerDetails = getCompanyDetails(peerName);
        return {
            name: peerDetails.Name,
            employees: employeeLookup[peerDetails.Name] || "2,000+",
            industry: peerDetails.Industry
        };
    });
};

// Backwards compatibility export
export const companyData = companiesDirectory["google"];
export const similar = getSimilarCompanies("google");
