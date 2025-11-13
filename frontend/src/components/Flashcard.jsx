import React, { useState } from "react";
import { HelpCircle, Lightbulb, RotateCw } from "lucide-react";

const Flashcard = ({ question, answer }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className="group bg-black border border-white/10 hover:border-[#9ECFD4] p-8 cursor-pointer transition-all duration-300 min-h-[280px] flex flex-col"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2 px-4 py-2 bg-[#9ECFD4]/10 border border-[#9ECFD4]/20">
          {isFlipped ? (
            <>
              <Lightbulb className="w-4 h-4 text-[#9ECFD4]" />
              <span className="text-[#9ECFD4] text-xs font-medium tracking-wider uppercase">Answer</span>
            </>
          ) : (
            <>
              <HelpCircle className="w-4 h-4 text-[#9ECFD4]" />
              <span className="text-[#9ECFD4] text-xs font-medium tracking-wider uppercase">Question</span>
            </>
          )}
        </div>
        <div className={`transition-transform duration-500 ${isFlipped ? 'rotate-180' : ''}`}>
          <RotateCw className="w-5 h-5 text-[#9ECFD4]/50 group-hover:text-[#9ECFD4]" />
        </div>
      </div>

      
      <div className="flex-1 flex items-center justify-center">
        <p className="text-lg text-white leading-relaxed text-center group-hover:text-[#9ECFD4] transition-colors duration-300">
          {isFlipped ? answer : question}
        </p>
      </div>

    
      <div className="mt-6 pt-4 border-t border-white/10">
        <p className="text-xs text-gray-500 text-center tracking-wider uppercase">
          Click to {isFlipped ? 'see question' : 'reveal answer'}
        </p>
      </div>
    </div>
  );
};

export default Flashcard;