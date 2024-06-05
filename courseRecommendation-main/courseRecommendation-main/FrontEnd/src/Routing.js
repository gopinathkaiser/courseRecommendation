import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FeedPage from './Pages/Feed Page/FeedPage';
import LoginPage from './Pages/Login Page/LoginPage';
import ScholarshipPage from './Pages/Scholarship Page/ScholarshipPage';
import CoursesPage from './Pages/Courses Page/CoursesPage';
import CollegePage from './Pages/Colleges Page/CollegePage';
import FindInterest from './Pages/Find Interest Page/FindInterest';
import ExamsPage from './Pages/Exams Page/ExamsPage';
import AdminDashboard from './Pages/Admin Dashboard/AdminDashboard';
import ChatPage from './Pages/chat page/ChatPage';
import ForgotPassword from './Pages/Login Page/ForgotPassword';
import EnterCode from './Pages/Login Page/PasswordCode';
import ResetPassword from './Pages/Login Page/ResetPassword';

const Routing = () => {
  return (
    <Router>
        <Routes>
            <Route path='/' element={<LoginPage/>} />
            <Route path='/home' element={<FeedPage/>} />
            <Route path='/courses' element={<CoursesPage/>} />
            <Route path='/courses/:course' element={<CollegePage/>}/>
            <Route path='/exams' element={<ExamsPage/>}/>
            <Route path='/scholarship'element={<ScholarshipPage/>}/>
            <Route path='/interest'element={<FindInterest/>}/>
            <Route path='/chat' element={<ChatPage/>}/>
            <Route path='/admin/dashboard' element={<AdminDashboard/>} />
            <Route path='/forgot-password' element={<ForgotPassword/>} />
            <Route path='/Enter-Code' element={<EnterCode/>}/>
            <Route path='/Reset' element={<ResetPassword/>}/>
        </Routes>
    </Router>
  )
}

export default Routing
