import React from "react";
import { SignUp } from "@clerk/clerk-react";

const Signup = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <SignUp routing="path" path="/signup" />
    </div>
  );
};

export default Signup;
