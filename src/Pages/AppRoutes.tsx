import { BrowserRouter, Routes, Route } from "react-router-dom";
import FindJobs from "./FindJobs";
import JobsDes from "./JobsDes";
import ApplyJobPage from "./ApplyJobPage";
import FindTalentPage from "./FindTalentPage";
import CompanyPage from "./CompanyPage";
import JobHistoryPage from "./JobHistoryPage";
import TalentProfilePage from "./TalentProfilePage";
import PostJobPage from "./PostJobPage";
import SignupPage from "./SignupPage";
import ProfilePage from "./ProfilePage";
import HomePage from "./HomePage";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import PostedJob from "./PostedJob";
import ContentPage from "./ContentPage";
import AdminPage from "./AdminPage";
import ProtectedRoute from "../Services/ProtectedRoute";

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <div className='relative min-h-screen bg-slate-50 dark:bg-mine-shaft-950 text-slate-900 dark:text-mine-shaft-100 flex flex-col justify-between selection:bg-amber-500/20 selection:text-amber-300 transition-colors'>
                <Header />
                <main className="flex-1">
                    <Routes>
                        {/* Superadmin Root Console */}
                        <Route path='/admin' element={<ProtectedRoute allowedRoles={["SUPERADMIN"]}><AdminPage /></ProtectedRoute>} />
                        <Route path='/superadmin' element={<ProtectedRoute allowedRoles={["SUPERADMIN"]}><AdminPage /></ProtectedRoute>} />

                        <Route path='/find-jobs' element={<FindJobs />} />
                        <Route path='/jobs/:id' element={<JobsDes />} />
                        <Route path='/apply-job/:id' element={<ApplyJobPage />} />
                        <Route path='/find-talent' element={<FindTalentPage />} />
                        <Route path='/company' element={<CompanyPage />} />
                        <Route path='/company/:name' element={<CompanyPage />} />
                        
                        {/* Employer Only Routes */}
                        <Route path='/posted-job' element={<ProtectedRoute allowedRoles={["EMPLOYER"]}><PostedJob /></ProtectedRoute>} />
                        <Route path='/posted-jobs' element={<ProtectedRoute allowedRoles={["EMPLOYER"]}><PostedJob /></ProtectedRoute>} />
                        <Route path='/posted-jobs/:id' element={<ProtectedRoute allowedRoles={["EMPLOYER"]}><PostedJob /></ProtectedRoute>} /> 
                        <Route path='/post-job' element={<ProtectedRoute allowedRoles={["EMPLOYER"]}><PostJobPage /></ProtectedRoute>} />
                        <Route path='/post-job/:id' element={<ProtectedRoute allowedRoles={["EMPLOYER"]}><PostJobPage /></ProtectedRoute>} />

                        {/* General Protected / Public Routes */}
                        <Route path='/job-history' element={<JobHistoryPage />} />
                        <Route path='/talent-profile/:id' element={<TalentProfilePage />} />
                        <Route path='/signup' element={<SignupPage />} />
                        <Route path='/login' element={<SignupPage />} />
                        <Route path='/profile' element={<ProfilePage />} />

                        {/* Dynamic Footer & Information Content Pages */}
                        <Route path='/page/:type' element={<ContentPage />} />
                        <Route path='/about' element={<ContentPage type="about" />} />
                        <Route path='/contact' element={<ContentPage type="contact" />} />
                        <Route path='/privacy' element={<ContentPage type="privacy" />} />
                        <Route path='/terms' element={<ContentPage type="terms" />} />
                        <Route path='/faq' element={<ContentPage type="faq" />} />
                        <Route path='/support' element={<ContentPage type="help" />} />
                        <Route path='/careers' element={<ContentPage type="careers" />} />
                        <Route path='/blog' element={<ContentPage type="blog" />} />
                        <Route path='/salary-guide' element={<ContentPage type="salary-guide" />} />
                        <Route path='/resume-builder' element={<ContentPage type="resume-builder" />} />
                        <Route path='/feedback' element={<ContentPage type="feedback" />} />
                        <Route path='/guidelines' element={<ContentPage type="guidelines" />} />
                        <Route path='/security' element={<ContentPage type="security" />} />
                        <Route path='/resources' element={<ContentPage type="resources" />} />

                        {/* Fallback Home */}
                        <Route path="*" element={<HomePage />} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </BrowserRouter>
    );
};

export default AppRoutes;