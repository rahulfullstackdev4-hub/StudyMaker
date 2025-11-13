import React from "react";

const ProgressBar = ({ completed, total }) => {
  const percentage = total > 0 ? (completed / total) * 100 : 0;

  return (
    <div className="w-full">
    
      <div className="relative w-full bg-black border border-white/20 h-8 overflow-hidden">
        
        <div
          className="h-full bg-[#9ECFD4] transition-all duration-700 ease-out relative"
          style={{ width: `${percentage}%` }}
        >
        
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
        </div>
        
      
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-white font-bold text-sm mix-blend-difference">
            {Math.round(percentage)}%
          </span>
        </div>
      </div>

      
      <div className="flex items-center justify-between mt-3 text-xs">
        <span className="text-gray-400">
          <span className="text-[#9ECFD4] font-bold">{completed}</span> of {total} completed
        </span>
        <span className="text-gray-500">
          {total - completed} remaining
        </span>
      </div>
    </div>
  );
};

export default ProgressBar;