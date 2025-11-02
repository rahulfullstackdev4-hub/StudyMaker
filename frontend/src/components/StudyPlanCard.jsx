import React from "react";
import ProgressBar from "./ProgressBar";
import { Trash2, Target, BookOpen } from "lucide-react";

const StudyPlanCard = ({ subject, topics, completed, total, onDelete }) => {
  return (
    <div className="group bg-black border border-white/10 hover:border-[#9ECFD4] transition-all duration-300">
      <div className="p-8">
        {/* Header */}
        <div className="flex justify-between items-start gap-4 mb-8">
          <div className="flex items-start gap-4 flex-1 min-w-0">
            <div className="w-12 h-12 bg-[#9ECFD4]/10 border border-[#9ECFD4]/20 flex items-center justify-center flex-shrink-0">
              <BookOpen className="w-6 h-6 text-[#9ECFD4]" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-2xl font-bold text-white group-hover:text-[#9ECFD4] transition-colors duration-300 break-words">
                {subject}
              </h3>
              <p className="text-gray-500 text-sm mt-1">
                {completed} of {total} topics completed
              </p>
            </div>
          </div>
          <button
            onClick={onDelete}
            className="w-10 h-10 bg-transparent border border-white/20 text-gray-400 hover:border-red-500 hover:text-red-500 transition-all duration-300 flex items-center justify-center flex-shrink-0"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>

        {/* Topics Section */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Target className="w-5 h-5 text-[#9ECFD4]" />
            <h4 className="text-sm font-medium text-gray-400 tracking-wider uppercase">Topics</h4>
          </div>
          <div className="flex flex-wrap gap-3">
            {topics.map((topic, index) => (
              <span
                key={index}
                className="bg-[#9ECFD4]/10 border border-[#9ECFD4]/20 text-[#9ECFD4] text-sm px-4 py-2 font-medium"
              >
                {topic}
              </span>
            ))}
          </div>
        </div>

        {/* Progress Bar */}
        <div>
          <ProgressBar completed={completed} total={total} />
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#9ECFD4] to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
    </div>
  );
};

export default StudyPlanCard;