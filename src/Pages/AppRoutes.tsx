import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import FindJobs from "./FindJobs"
import JobsDes from "./JobsDes"
import ApplyJobPage from "./ApplyJobPage"
import FindTalentPage from "./FindTalentPage"
import CompanyPage from "./CompanyPage"
import JobHistoryPage from "./JobHistoryPage"
import TalentProfilePage from "./TalentProfilePage"
import PostJobPage from "./PostJobPage"
import SignupPage from "./SignupPage"
import ProfilePage from "./ProfilePage"
import HomePage from "./HomePage"
import { Divider } from "@mantine/core" // Make sure to import Divider if using Mantine
import Header from "../Header/Header"
import Footer from "../Footer/Footer"
import { useSelector } from "react-redux"
import PostedJob from "./PostedJob"
import ProtectedRoute from "../Services/ProtectedRoute"
import PublicRoute from "../Services/PublicRoute"



const AppRoutes = () => {
    const user = useSelector((state: any) => state.user);
    return (
        <BrowserRouter>
            <div className='relative'>
                <Header />
                <Divider size="xs" mx="md" />
                <Routes>
                    <Route path='/find-jobs' element={<FindJobs />} />
                    <Route path='/jobs/:id' element={<JobsDes />} />
                    <Route path='/apply-job/:id' element={<ApplyJobPage />} />
                    <Route path='/find-talent' element={<FindTalentPage />} />
                    <Route path='/company/:name' element={<CompanyPage />} />
                    <Route path='/posted-job' element={<PostedJob/>} />
                     <Route path='/posted-jobs/:id' element={<ProtectedRoute allowedRoles={["EMPLOYER"]}><PostedJob/></ProtectedRoute>} /> 
                    <Route path='/job-history' element={<JobHistoryPage/>} />
                    <Route path='/talent-profile/:id' element={<TalentProfilePage/>} />
                    <Route path='/post-job/:id' element={<ProtectedRoute allowedRoles={["EMPLOYER"]}><PostJobPage/></ProtectedRoute>} />
                    <Route path='/signup' element={ <PublicRoute><SignupPage/></PublicRoute>} />
                    <Route path='/login' element={ <SignupPage />} />
                    <Route path='/profile' element={<ProfilePage />} />
                    <Route path="*" element={<HomePage />} />
                </Routes>
                <Footer />
            </div>
        </BrowserRouter>
    )
}

export default AppRoutes;