import { ChatMessage } from "@/lib/api/chat";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { useState } from "react";



export const AIThinkIng = ({
  message,
  loading,
  isUser
}: {
  message: ChatMessage ,
   loading:boolean
   isUser:boolean
}) => {
    const [showThinking, setShowThinking] = useState(false);

  return ( <>
     {!isUser && message.thinking && (
          loading ?(<div className="mt-3 mb-2">
            <button
              onClick={() => setShowThinking((v) => !v)}
              className="
                flex items-center gap-1
                text-[11px] font-medium   
                text-slate-500
                hover:text-slate-700
                transition
      "
            >
              <ChevronDown
                className={cn(
                  "h-3 w-3 transition-transform duration-200",
                  showThinking && "rotate-180"
                )}
              />

              <span className="shimmer  text-foreground/60">
                {showThinking ? "Hide thinking" : "Show thinking"}
              </span>
            </button>

            {showThinking && (
              <div className="
        mt-2
        rounded-lg
        border border-slate-200
        bg-slate-50
        p-3
        text-[12px]
        text-slate-600
        whitespace-pre-wrap
        leading-relaxed
      ">
                {message.thinking}
              </div>
            )}
          </div>):''
          
        )}
  </>  );
}
 
export default AIThinkIng;