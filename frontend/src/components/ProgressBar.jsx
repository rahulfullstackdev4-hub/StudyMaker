import React from "react";
import ProgressBar from "./ProgressBar";

const StudyPlanCard = ({ subject, topics, completed, total }) => {
  return (
    <div className="bg-white shadow-md rounded p-4 mb-4">
      <h3 className="text-lg font-bold mb-2">{subject}</h3>
      <p className="mb-2">Topics: {topics.join(", ")}</p>
      <ProgressBar completed={completed} total={total} />
    </div>
  );
};

export default StudyPlanCard;
