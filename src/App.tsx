import './App.css';
import { createTheme, Divider, MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import '@mantine/tiptap/styles.css';
import HomePage from './Pages/HomePage';
import '@mantine/carousel/styles.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Added Routes import
import FindJobs from './Pages/FindJobs';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import FindTalentPage from './Pages/FindTalentPage';
import TalentProfilePage from './Pages/TalentProfilePage';
import PostJobPage from './Pages/PostJobPage';
import JobsDes from './Pages/JobsDes';
import ApplyJobPage from './Pages/ApplyJobPage';

function App() {
  const theme = createTheme({
    focusRing:"never",
    fontFamily:"poppins,sans-serif",
    primaryColor:"brightSun",
    primaryShade:4,
    colors: {
      'brightSun': [
        '#fffbeb', '#fff3c6', '#ffe588', '#ffd149', '#ffbd20', 
        '#f99b07', '#dd7302', '#b75006', '#943c0c', '#7a330d', '#461902'
      ],
      'mineShaft': [
        '#f6f6f6', '#e7e7e7', '#d1d1d1', '#b0b0b0', '#888888', 
        '#6d6d6d', '#5d5d5d', '#4f4f4f', '#454545', '#3d3d3d', '#2d2d2d'
      ],
    }
  });

  return (
    <MantineProvider defaultColorScheme='dark' theme={theme}>
      <BrowserRouter>
      <div className='relative'>
      <Header/>
       <Divider size="xs" mx="md" />
        <Routes>
          <Route path='/find-jobs' element={<FindJobs/>} />
          <Route path='/find-talent' element={<FindTalentPage/>} />
          <Route path='/jobs' element={<JobsDes/>} />
          <Route path='/apply-job' element={<ApplyJobPage/>} />
          <Route path='/post-job' element={<PostJobPage/>} />
          <Route path='/talent-profile' element={<TalentProfilePage/>} />
          <Route path="*" element={<HomePage />} />
        </Routes>
        <Footer/>
        </div>
      </BrowserRouter>
    </MantineProvider>
  );
}

export default App;