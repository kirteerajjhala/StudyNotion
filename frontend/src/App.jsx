import { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/Forgetpassword";
import UpdatePassword from "./pages/UpdatePassword";
import VerifyEmail from "./pages/VerifyEmail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import PageNotFound from "./pages/ErrorPage";
import CourseDetails from "./pages/CourseDetails";
import Catalog from "./pages/Catalog";

import Navbar from "./components/common/Navbar";

import OpenRoute from "./components/core/Auth/OpenRoute";
import ProtectedRoute from "./components/core/Auth/ProtectedRoute";

import Dashboard from "./pages/Dashboard";
import MyProfile from "./components/core/Dashboard/MyProfile";
import Settings from "./components/core/Dashboard/Settings/Settings";
import MyCourses from "./components/core/Dashboard/MyCourses";
import EditCourse from "./components/core/Dashboard/EditCourse/EditCourse";
import Instructor from "./components/core/Dashboard/Instructor";

import Cart from "./components/core/Dashboard/Cart/Cart";
import EnrolledCourses from "./components/core/Dashboard/EnrolledCourses";
import AddCourse from "./components/core/Dashboard/AddCourse/AddCourse";

import ViewCourse from "./pages/ViewCourse";
import VideoDetails from "./components/core/ViewCourse/VideoDetails";

import { ACCOUNT_TYPE } from "../utils/constants";

import { HiArrowNarrowUp } from "react-icons/hi";
import CreateCategory from "./components/core/Dashboard/CreateCategory";
import AllStudents from "./components/core/Dashboard/AllStudents";
import AllInstructors from "./components/core/Dashboard/AllInstructors";

function App() {
  const { user } = useSelector((state) => state.profile);
  const location = useLocation();

  // Scroll to top when path changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Scroll-to-top button visibility
  const [showArrow, setShowArrow] = useState(false);

  const handleArrow = () => {
    setShowArrow(window.scrollY > 500);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleArrow);
    return () => window.removeEventListener("scroll", handleArrow);
  }, []);

  return (
    <div className=" min-h-screen bg-gray-950 flex flex-col font-sans text-white">
      <Navbar />

      {/* Scroll to top arrow */}
      <button
        onClick={() => window.scrollTo(0, 0)}
        className={`bg-yellow-400 hover:bg-yellow-500 hover:scale-110 p-3 text-lg text-black rounded-2xl fixed right-3 z-10 transition-all duration-500 ease-in-out ${
          showArrow ? "bottom-6" : "-bottom-24"
        }`}
      >
        <HiArrowNarrowUp />
      </button>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="catalog/:catalogName" element={<Catalog />} />
        <Route path="courses/:courseId" element={<CourseDetails />} />

        {/* Open Routes (Only Non-Logged Users) */}
        <Route
          path="signup"
          element={
            <OpenRoute>
              <Signup />
            </OpenRoute>
          }
        />
        <Route
          path="login"
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }
        />
        <Route
          path="forgot-password"
          element={
            <OpenRoute>
              <ForgotPassword />
            </OpenRoute>
          }
        />
        <Route
          path="verify-email"
          element={
            <OpenRoute>
              <VerifyEmail />
            </OpenRoute>
          }
        />
        <Route
          path="update-password/:id"
          element={
            <OpenRoute>
              <UpdatePassword />
            </OpenRoute>
          }
        />

        {/* Protected Routes */}
        <Route
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard/my-profile" element={<MyProfile />} />
          <Route path="dashboard/settings" element={<Settings />} />

          {/* Admin Routes */}
          {user?.accountType === ACCOUNT_TYPE.ADMIN && (
            <>
              <Route path="dashboard/create-category" element={<CreateCategory />} />
              <Route path="dashboard/all-students" element={<AllStudents />} />
              <Route path="dashboard/all-instructors" element={<AllInstructors />} />
            </>
          )}

          {/* Student Routes */}
          {user?.accountType === ACCOUNT_TYPE.STUDENT && (
            <>
              <Route path="dashboard/cart" element={<Cart />} />
              <Route path="dashboard/enrolled-courses" element={<EnrolledCourses />} />
            </>
          )}

          {/* Instructor Routes */}
          {user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
            <>
              <Route path="dashboard/instructor" element={<Instructor />} />
              <Route path="dashboard/add-course" element={<AddCourse />} />
              <Route path="dashboard/my-courses" element={<MyCourses />} />
              <Route path="dashboard/edit-course/:courseId" element={<EditCourse />} />
            </>
          )}
        </Route>

        {/* Course Watching (for students) */}
        <Route
          element={
            <ProtectedRoute>
              <ViewCourse />
            </ProtectedRoute>
          }
        >
          {user?.accountType === ACCOUNT_TYPE.STUDENT && (
            <Route
              path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId"
              element={<VideoDetails />}
            />
          )}
        </Route>

        {/* 404 Page */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
