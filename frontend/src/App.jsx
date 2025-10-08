import React from 'react'
import Footer from "./components/common/Footer"
import Home from './pages/Home'
import Navbar from './components/common/Navbar'
import { Route,Router,Routes } from 'react-router-dom'  
import Login from './pages/Login'
import Forgetpassword from './pages/Forgetpassword'
import SignupForm from './pages/SignUp'
import VerifyEmail from './pages/VerifyEmail'
import UpdatePassword from './pages/UpdatePassword'
import Contact from './pages/Contact'
import About from './pages/About'
import Catalog from './pages/Catalog'
import CourseDetails from './pages/CourseDetails';

import Dashboard from "./pages/Dashboard";
import MyProfile from "./components/core/Dashboard/MyProfile";
import Settings from "./components/core/Dashboard/Settings/Settings";
import  EnrolledCourses  from './components/core/Dashboard/EnrolledCourses'
import MyCourses from './components/core/Dashboard/MyCourses';
import EditCourse from './components/core/Dashboard/EditCourse/EditCourse';
import Instructor from './components/core/Dashboard/Instructor';



import AddCourse from "./components/core/Dashboard/AddCourse/AddCourse";


import ViewCourse from "./pages/ViewCourse";
// import VideoDetails from './components/core/ViewCourse/VideoDetails';
// import ViewCourse from "./pages/ViewCourse";

import { ACCOUNT_TYPE } from '../utils/constants';
import ErrorPage from './pages/ErrorPage'
import Cart from './components/core/Dashboard/Cart/Cart'
import { useSelector } from 'react-redux'
import VideoDetails from './components/core/ViewCourse/VideoDetails'
function App() {
  const { user } = useSelector((state) => state.profile)
  return (
    <div className=' bg-[#000814] w-full h-full overflow-y-auto '>
    <Navbar/>
    <Routes>

        <Route path="/" element={<>  <Home /></>} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="catalog/:catalogName" element={<Catalog />} />
        <Route path="courses/:courseId" element={<CourseDetails />} />
  
  <Route
          path="signup" element={
           <>
        
              <SignupForm />
           </>
      
          }
        />

        <Route
          path="login" element={
           
             <>
              <Login />
             </>
            
          }
        />

        <Route
          path="forgot-password" element={
           
             <>
              
              <Forgetpassword />
             </>
           
          }
        /> 
       

               <Route
          path="verify-email" element={
       
              <VerifyEmail />
         
          }
        />

        <Route
          path="update-password/:id" element={
            
              <UpdatePassword />
            
          }
        />



          <Route  element={ <Dashboard />  } >
            <Route path="dashboard/my-profile" element={<MyProfile />} />
            <Route path="dashboard/Settings" element={<Settings />} />
       
          
          



            {/* Route only for Admin */}
          {/* create category, all students, all instructors */}
          {/* {user?.accountType === ACCOUNT_TYPE.ADMIN && (
            <>
              <Route path="dashboard/create-category" element={<CreateCategory />} />
              <Route path="dashboard/all-students" element={<AllStudents />} />
              <Route path="dashboard/all-instructors" element={<AllInstructors />} />
            </>
          )} */}


              {/* Route only for Students */}
          {/* cart , EnrolledCourses */}
          {user?.accountType === ACCOUNT_TYPE.STUDENT && (
            <>
              <Route path="dashboard/cart" element={<Cart />} />
              <Route path="dashboard/enrolled-courses" element={<EnrolledCourses />} />
            </>
          )}


          {/* Route only for Instructors */}
          {/* add course , MyCourses, EditCourse*/}
          {user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
            <>
              <Route path="dashboard/instructor" element={<Instructor />} />
              <Route path="dashboard/add-course" element={<AddCourse />} />
              <Route path="dashboard/my-courses" element={<MyCourses />} />
              <Route path="dashboard/edit-course/:courseId" element={<EditCourse />} /> 
            </>
          )}



    </Route>

     

       {/* For the watching course lectures */}
        <Route
          element={
         
              <ViewCourse />
        
          }
        >
          {user?.accountType === ACCOUNT_TYPE.STUDENT && (
            <Route
              path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId"
              element={<VideoDetails />}
            />
          )}
        </Route>

                {/* Page Not Found (404 Page ) */}
        <Route path="*" element={<ErrorPage/>} />  
        
   </Routes>

      
    </div>
  )
}

export default App