import React, { useState, useEffect, useContext } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import StudyPlanCard from "../components/StudyPlanCard";
import AuthContext from "../context/AuthContext";
import axios from "axios";

const StudyPlan = () => {
  const { user } = useContext(AuthContext);
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/plan", {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setPlans(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    if (user) fetchPlans();
  }, [user]);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-8">
        <Navbar />
        <h2 className="text-2xl font-bold mb-4">Study Plan</h2>
        {plans.map((plan) => (
          <StudyPlanCard
            key={plan._id}
            subject={plan.subject}
            topics={plan.topics}
            completed={plan.completed}
            total={plan.total}
          />
        ))}
      </div>
    </div>
  );
};

export default StudyPlan;
