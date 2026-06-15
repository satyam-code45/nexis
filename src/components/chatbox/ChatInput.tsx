import { cn } from "@/lib/utils";
import {
  Loader2,
  SendHorizonal,
} from "lucide-react";
import { memo } from "react";


type ChatInputProps = {
  input: string;
  setInput: (value: string) => void;
  sendMessage: (props: {
    markdownImageUrl: string | null | undefined;
    question?: string;
  }) => void;
  loading: boolean;
  userId: string;

  projectId: string;
  questions: string[];
};

export const ChatInput = memo(function ChatInput({
  input,
  setInput,
  sendMessage,
  loading,
  projectId,
  userId,
}: ChatInputProps) {


  return (
    <div className="border-t px-1 py-2">
      <div className="rounded-2xl border border-indigo-400 p-3 shadow-sm">
        

        <div className="mt-3 flex items-center bg-transparent ">
          {/* LEFT SIDE */}
          <div className="flex items-center gap-2">
           
          </div>

          <button
            onClick={()=> {}}
            disabled={!input.trim() || loading}
            className={cn(
              "ml-auto flex h-9 w-9 items-center justify-center rounded-full transition",
              input.trim()
                ? "bg-indigo-500 hover:bg-indigo-600"
                : "cursor-not-allowed bg-indigo-300",
            )}
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin text-white" />
            ) : (
              <SendHorizonal className="h-4 w-4 text-white" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
});
