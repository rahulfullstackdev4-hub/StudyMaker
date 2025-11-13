import React from "react";
import { Trash2, ExternalLink, FileText } from "lucide-react";

const NotesCard = ({ title, summary, fileUrl, onDelete }) => {
  return (
    <div className="group bg-black border border-white/10 hover:border-[#9ECFD4] transition-all duration-300">
      <div className="p-8">
      
        <div className="flex justify-between items-start gap-4 mb-6">
          <div className="flex items-start gap-4 flex-1 min-w-0">
            <div className="w-12 h-12 bg-[#9ECFD4]/10 border border-[#9ECFD4]/20 flex items-center justify-center flex-shrink-0">
              <FileText className="w-6 h-6 text-[#9ECFD4]" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-2xl font-bold text-white group-hover:text-[#9ECFD4] transition-colors duration-300 break-words">
                {title}
              </h3>
            </div>
          </div>
          <button
            onClick={onDelete}
            className="w-10 h-10 bg-transparent border border-white/20 text-gray-400 hover:border-red-500 hover:text-red-500 transition-all duration-300 flex items-center justify-center flex-shrink-0"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>

      
        <p className="text-gray-400 leading-relaxed mb-6 group-hover:text-gray-300 transition-colors duration-300">
          {summary}
        </p>

        
        {fileUrl && (
          <a
            href={fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-transparent border border-[#9ECFD4] text-[#9ECFD4] px-6 py-3 hover:bg-[#9ECFD4] hover:text-black transition-all duration-300 text-sm font-medium tracking-wider uppercase"
          >
            <ExternalLink className="w-4 h-4" />
            View File
          </a>
        )}
      </div>

    
      <div className="h-px bg-gradient-to-r from-transparent via-[#9ECFD4] to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
    </div>
  );
};

export default NotesCard;