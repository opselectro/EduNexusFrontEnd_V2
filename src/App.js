import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./Component/common/NavBar";
import Footer from "./Component/common/Footer";
import { AuthContext } from "./context/AuthProvider";

import Home from "./Component/static/Home";
import About from "./Component/static/About";
import Contact from "./Component/static/Contact";


import Login from "./pages/Login";
import RegisterForm from "./pages/Register";
import Course from "./pages/Course";
import Cart from "./pages/Cart";
import UserDashboard from "./pages/UserDashboard";
import MyCourse from "./Component/user/MyCourse";
import UserTest from "./Component/user/UserTest";


import AdminRoute from "./routes/AdminRoute";
import AdminDashboard from "./pages/AdminDashboard";
import Enrollments from "./Component/admin/Enrollments";
import ManageCourse from "./Component/admin/ManageCourses";
import TestEditor from "./Component/admin/TestEditor";
import TestList from "./Component/admin/TestList";
import TestResults from "./Component/admin/TestResult";
import AdminContactList from "./Component/admin/AdminContactList";
import UserDashboardResults from "./Component/user/UserTestResult";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />

      <main className="flex-grow-1 mt-4">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/course" element={<Course />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegisterForm />} />

          {/* User Protected Routes */}
          <Route
            path="/user/dashboard"
            element={user ? <UserDashboard /> : <Navigate to="/login" replace />}
          />
          <Route path="/user/cart" element={<Cart />} />
          <Route path="/user/mycourse" element={<MyCourse />} />
          <Route path="/user/test" element={<UserTest />} />
          <Route path="user/result" element={<UserDashboardResults></UserDashboardResults>} />
          

          {/* Admin Protected Routes */}
          <Route path="/admin" element={<AdminRoute />}>
            <Route index element={<AdminDashboard />} />
            <Route path="enrollments" element={<Enrollments />} />
            <Route path="update" element={<ManageCourse />} />
            <Route path="add/update" element={<TestEditor />} />
            <Route path="alltest" element={<TestList />} />
            <Route path="result" element={<TestResults />} />
            <Route path="message" element={<AdminContactList />} />
          </Route>

          {/* Fallback Route */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
