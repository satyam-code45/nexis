import { memo } from "react";
import { cn } from "@/lib/utils";
import AIThinkIng from "./AIThinking";
import { ChatMessage } from "@/lib/api/chat";
import { DisplayImageMarkdownURL, DisplayMarkDown } from "./DisplayMarkDown";



export const MessageBubble = memo(function MessageBubble({
  message,
  loading,
}: {
  message: ChatMessage;
  loading: boolean;
}) {
  const isUser = message.role === "user";

  return (
    <div
      className={cn(
        "flex group",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={cn(
          "max-w-[75%] rounded-2xl px-4 py-3 text-sm relative transition-colors duration-200",
          isUser
            ? "bg-indigo-500 text-white rounded-br-sm dark:bg-indigo-600"
            : "bg-gray-100 text-gray-900 rounded-bl-sm dark:bg-gray-800 dark:text-gray-100"
        )}
      >
        {!isUser && (
          <p className="mb-1 text-[11px] font-semibold text-gray-500 dark:text-gray-400">
            AI
          </p>
        )}

        {/* AI thinking */}
        <AIThinkIng message={message} loading={loading} isUser={isUser} />

        {/* USER → plain text | ASSISTANT → Markdown */}
        {isUser ? (
          <p className="whitespace-pre-line leading-relaxed">
            <DisplayImageMarkdownURL text={message.content || ""} />
          </p>
        ) : (
          <div className="prose prose-sm max-w-none leading-relaxed dark:prose-invert">
            <DisplayMarkDown text={message.content} />
          </div>
        )}

        {message.time && (
          <div className="mt-2 flex items-center justify-between text-[10px] text-gray-400 dark:text-gray-500">
            <span>{message.time}</span>
          </div>
        )}
      </div>
    </div>
  );
});
