import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Home from "./pages/Home";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import { SignIn } from "@clerk/clerk-react";
import Signup from "./pages/auth/Signup";
import Dashboard from "./pages/Dashboard";
import StudyPlan from "./pages/StudyPlan";
import Notes from "./pages/Notes";
import Flashcards from "./pages/Flashcards";
import AIChat from "./pages/AIChat";
import About from "./pages/About";
import Contact from "./pages/Contact";

function App() {
  return (
    <AuthProvider>
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <div className="App">
          <Routes>
            
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/sign-in/*" element={<SignIn routing="path" path="/sign-in" />} />
            <Route path="/sign-up/*" element={<Signup />} />
            <Route path="/signup" element={<Navigate to="/sign-up" />} />

            
            <Route
              path="/dashboard"
              element={
                <>
                  <SignedIn>
                    <Dashboard />
                  </SignedIn>
                  <SignedOut>
                    <Navigate to="/sign-up" />
                  </SignedOut>
                </>
              }
            />
            <Route
              path="/studyplan"
              element={
                <>
                  <SignedIn>
                    <StudyPlan />
                  </SignedIn>
                  <SignedOut>
                    <Navigate to="/sign-up" />
                  </SignedOut>
                </>
              }
            />
            <Route
              path="/notes"
              element={
                <>
                  <SignedIn>
                    <Notes />
                  </SignedIn>
                  <SignedOut>
                    <Navigate to="/sign-up" />
                  </SignedOut>
                </>
              }
            />
            <Route
              path="/flashcards"
              element={
                <>
                  <SignedIn>
                    <Flashcards />
                  </SignedIn>
                  <SignedOut>
                    <Navigate to="/sign-up" />
                  </SignedOut>
                </>
              }
            />
            <Route
              path="/aichat"
              element={
                <>
                  <SignedIn>
                    <AIChat />
                  </SignedIn>
                  <SignedOut>
                    <Navigate to="/sign-up" />
                  </SignedOut>
                </>
              }
            />
          </Routes>
          <ToastContainer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
