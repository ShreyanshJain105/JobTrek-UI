# 💼 JobTrek UI — Modern Career Orchestration Platform

<div align="center">

![React](https://img.shields.io/badge/React-19.x-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-4.9+-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Mantine](https://img.shields.io/badge/Mantine_UI-8.2+-339AF0?style=for-the-badge&logo=mantine&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3.x-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-2.x-764ABC?style=for-the-badge&logo=redux&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

**JobTrek** is a high-performance, next-generation talent acquisition and career orchestration platform. Engineered with **React 19**, **TypeScript**, **Mantine UI**, and **Tailwind CSS**, it connects elite tech candidates with fast-growing companies and leading global tech enterprises.

[Explore Backend Repository](https://github.com/ShreyanshJain105/JobTrek-Backend.git) • [Report Issue](https://github.com/ShreyanshJain105/JobTrek-UI/issues)

</div>

---

## 🌟 Key Highlights & Features

### 🎨 Adaptive Design & Theming
- **Dual Light / Dark Mode**: Full system synchronization across Mantine UI components and Tailwind dark classes via a dedicated `ThemeSwitcher`.
- **Accessible & Contrast-Enhanced**: Custom-styled inputs, modals, cards, and dropdowns designed for zero text/icon collision and high legibility.
- **Glassmorphism & Micro-Interactions**: Ambient gradient glows, smooth transitions, and subtle hover animations powered by Tabler Icons.

### 🔍 Candidate Job Discovery Hub
- **Multi-Facet Search & Filter**: Filter thousands of job listings by role title, experience level, salary range, job type (Full-Time, Part-Time, Contract, Internship), and work mode (Remote, Hybrid, On-site).
- **Interactive Job Details**: Full job specifications including tech stack tags, role responsibilities, company profile highlights, and similar job recommendations.
- **Seamless Application Flow**: Quick apply with customized cover letter, dynamic resume/portfolio attachment, and real-time application feedback notifications.
- **Application Tracker (`/job-history`)**: Detailed status tracker monitoring applications through their entire lifecycle (*Applied*, *Interviewing*, *Offered*, *Rejected*).

### 🏢 Employer & Recruiter Command Center
- **Job Posting Studio (`/post-job`)**: Rich-text job descriptions powered by **Tiptap**, multi-select skills tagger, salary ranges, and qualification requirements.
- **Applicant Pipeline (`/posted-job`)**: Real-time dashboard to review incoming applicants, inspect profiles, download resumes, and update candidate hiring stages.
- **Company Branding Showcase (`/company/:name`)**: Customized employer profiles featuring company overview, tech stack, office locations, employees, open positions, and partner logos.
- **40+ Indian & Global Tech Giants**: Built-in SVG brand identities for companies including Google, Microsoft, Amazon, Flipkart, Swiggy, Zomato, Razorpay, CRED, Zepto, Infosys, TCS, and Wipro.

### 👑 Superadmin Administration Console (`/admin` | `/superadmin`)
- **Centralized Platform Moderation**: Restricted to users with the `SUPERADMIN` role.
- **User Governance**: View all platform users, create administrative accounts, update account credentials and roles, or remove accounts.
- **Job Moderation**: Audit and delete outdated or inappropriate job postings across the entire platform.
- **Platform Metrics**: Instant bird's-eye metrics on registered users, active employers, posted jobs, and candidate applications.

### 💬 Instant Messaging & Notifications
- **In-App Chat Drawer**: Floating conversational interface for immediate communications between recruiters and applicants.
- **Notification Dropdown**: Instant status alerts for job applications, status transitions, and system announcements with one-click read status.

### 📑 Comprehensive Information & Resource Portal
- Fully-rendered content pages for:
  - **Company**: About Us (`/page/about`), Careers (`/page/careers`), Blog (`/page/blog`)
  - **Candidate Tools**: Salary Guide (`/page/salary-guide`), Resume Builder (`/page/resume-builder`), Career Advice (`/page/career-advice`)
  - **Support & Trust**: Help Center (`/page/help`), FAQs (`/page/faq`), Feedback (`/page/feedback`), Community Guidelines (`/page/guidelines`)
  - **Legal & Compliance**: Privacy Policy (`/page/privacy`), Terms of Service (`/page/terms`), Security & Trust (`/page/security`)

---

## 🛠️ Tech Stack & Architecture

| Layer | Technologies |
| :--- | :--- |
| **Frontend Framework** | React 19, TypeScript 4.9+ |
| **State Management** | Redux Toolkit (`@reduxjs/toolkit`), React-Redux |
| **UI Components** | Mantine UI v8 (`@mantine/core`, `@mantine/form`, `@mantine/hooks`, `@mantine/carousel`, `@mantine/dates`, `@mantine/notifications`, `@mantine/tiptap`) |
| **Styling & Design** | Tailwind CSS 3.x, Custom CSS Variables, Dark/Light Mode Theme Provider |
| **Routing** | React Router v7 (`react-router-dom`) with Role-Based Protected Routes |
| **Icons & Media** | Tabler Icons React (`@tabler/icons-react`), Custom SVG Logo Suite |
| **Rich Text Editor** | Tiptap Editor (`@tiptap/react`, `@tiptap/starter-kit`, extensions) |
| **Networking** | Axios with centralized JWT Bearer Interceptor & Error Handlers |
| **Carousels & Animation** | Embla Carousel, React Fast Marquee |

---

## 📂 Project Directory Structure

```text
job-portal/
├── public/
│   ├── Icons/                # 40+ Tech company brand SVGs (Flipkart, Swiggy, Zomato, etc.)
│   ├── index.html            # Main HTML document
│   └── favicon.ico
├── src/
│   ├── ApplyJob/             # Job application modal & multi-step form
│   ├── Chat/                 # Real-time chat drawer & messenger UI
│   ├── CompanyProfile/       # Company details, about, open jobs & employee cards
│   ├── Data/                 # Static data constants, company profiles, job categories
│   ├── FindJobs/             # Search bar, multi-select filters, job card list, sort
│   ├── FindTalent/           # Candidate talent directory, search, talent cards
│   ├── Footer/               # Responsive multi-column footer with dynamic links
│   ├── Header/               # Navigation, auth buttons, theme toggle, profile menu
│   ├── Interceptor/          # Axios HTTP interceptor with JWT token attachment
│   ├── JobDesc/              # Detailed job overview page and recommended jobs
│   ├── JobHistory/           # Applicant's application status tracker
│   ├── Landing Page/         # Hero banner, category showcase, testimonials, CTA
│   ├── Pages/                # Application page route views
│   │   ├── AdminPage.tsx     # Superadmin control panel
│   │   ├── AppRoutes.tsx     # Centralized routing definitions
│   │   ├── ContentPage.tsx   # Dynamic legal, support, and resource pages
│   │   ├── HomePage.tsx      # Landing page
│   │   ├── PostedJob.tsx     # Recruiter job management
│   │   └── ProfilePage.tsx   # User profile management
│   ├── PostJob/              # Job posting form with Tiptap editor
│   ├── PostedJob/            # Recruiter applicant evaluation dashboard
│   ├── Profile/              # Candidate profile editor (About, Skills, Experience, Certs)
│   ├── Services/             # API services (Auth, Job, User, Notification, Themes)
│   ├── SignupLogin/          # Auth forms (Login, Signup, OTP Verify, Password Reset)
│   ├── TalentProfile/        # Public candidate talent profile view
│   ├── Slices/               # Redux slices (User, Profile, etc.)
│   ├── App.tsx               # Root application wrapper with Mantine & Redux Providers
│   ├── index.css             # Tailwind base styles and theme rules
│   └── index.tsx             # Application entry point
├── package.json              # Dependencies and run scripts
├── tailwind.config.js        # Tailwind CSS theme configuration
└── tsconfig.json             # TypeScript configuration
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher (or `yarn` / `pnpm`)
- Running instance of **[JobTrek-Backend](https://github.com/ShreyanshJain105/JobTrek-Backend.git)** (defaults to `http://localhost:8081`)

### 1. Clone the Repository
```bash
git clone https://github.com/ShreyanshJain105/JobTrek-UI.git
cd JobTrek-UI
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure API Endpoint
The frontend communicates with the backend via Axios. By default, API calls point to `http://localhost:8081` (or your deployed server). You can adjust the base URL in `src/Services/` or set up your environment variables.

### 4. Start the Development Server
```bash
npm start
```
The application will launch automatically at **`http://localhost:3000`**.

### 5. Build for Production
```bash
npm run build
```
Creates an optimized production bundle inside the `build/` directory ready for deployment on Vercel, Netlify, AWS S3/CloudFront, or Firebase Hosting.

---

## 🔐 Role-Based Access Control

| Role | Access Permissions |
| :--- | :--- |
| **Guest / Public** | Browse jobs, view company profiles, view talent listings, access info/help pages, register & login. |
| **APPLICANT** | Apply for jobs, track submitted applications in Job History, edit candidate profile, upload certifications. |
| **EMPLOYER** | Create & edit job postings, manage incoming applicants, update applicant hiring status, customize company branding. |
| **SUPERADMIN** | Access `/admin` dashboard, oversee and manage all registered users, edit user roles, delete jobs across the entire platform. |

---

## 🔗 Related Repositories

- **Backend API**: [JobTrek-Backend](https://github.com/ShreyanshJain105/JobTrek-Backend.git) — Spring Boot 3.x, Java 17, MongoDB, JWT Security, Spring Mail.

---

## 🤝 Contributing

Contributions are always welcome!
1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m "Add some AmazingFeature"`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

Distributed under the **MIT License**. See `LICENSE` for more information.

---

## 👨‍💻 Author

**Shreyansh Jain**
- GitHub: [@ShreyanshJain105](https://github.com/ShreyanshJain105)
- Email: [shreyanshjain1206@gmail.com](mailto:shreyanshjain1206@gmail.com)
