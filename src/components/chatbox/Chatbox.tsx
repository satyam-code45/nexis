"use client";

import { useEffect, useRef, useState } from "react";
import { showError } from "@/lib/utils";

import { MessageBubble } from "./MessageBubble";
import { ChatInput } from "./ChatInput";
import { messages } from "@/lib/chat-history";

export type Message = {
  role: "user" | "ai";
  text: string;
  time?: string;
};

type ChatBoxProps = {
  userId: string;
  projectId: string;
};
export default function ChatBox({ userId, projectId }: ChatBoxProps) {


  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const bottomRef = useRef<HTMLDivElement | null>(null);
  const queueRef = useRef<string[]>([]);
  const typingRef = useRef(false);

  const thinkingQueueRef = useRef<string[]>([]);
  const thinkingTypingRef = useRef(false); 

  const sendMessage = async (props: {
    markdownImageUrl?: string;
    question?: string;
  }) => {
    const { markdownImageUrl, question } = props;
    const suggestedQuestion = question || " ";
    if (!projectId) {
      showError("Select a project");
      return;
    }

    const userMessage = markdownImageUrl
      ? input.trim() + " " + markdownImageUrl + " " + suggestedQuestion
      : input.trim() + " " + suggestedQuestion;

    // const userMessage=input.trim()
    queueRef.current = [];
    setInput("");

    try {
      setLoading(true);
      const res = await fetch("/api/agent/stream", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userMessage, userId, projectId }),
      });

      if (!res.body) return;

      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      let buffer = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });

        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed) continue;

          // Handle data events
          if (trimmed.startsWith("data:")) {
            const payload = trimmed.replace("data:", "").trim();
            if (!payload) continue;

            const data = JSON.parse(payload);

            //  queue valid messages
            if (data.message !== undefined && data.message !== null) {
              // push each character
              for (const char of data.message) {
                queueRef.current.push(char);
              }

              if (!typingRef.current) {
                
              }
            }

            // Thinking
            if (data.thinking !== undefined && data.thinking !== null) {
              // push each character
              for (const char of data.thinking) {
                thinkingQueueRef.current.push(char);
              }

              if (!thinkingTypingRef.current) {
               
              }
            }
          }

          // Handle event types: end / error
          else if (trimmed.startsWith("event:")) {
            const eventType = trimmed.replace("event:", "").trim();

            if (eventType === "end") {
              setLoading(false);
              reader.cancel(); // stop reading
            }

            if (eventType === "error") {
              setLoading(false);
              reader.cancel();
            }
          }
        }
      }
    } catch (err) {
      setLoading(false);
      console.error("Fetch streaming error:", (err as Error).message);
    }
  };


  return (
    <div className="flex h-full flex-col bg-white dark:bg-slate-900 transition-colors duration-200">
      {/* ---------------- HEADER ---------------- */}

      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
        {!projectId ? (
          <div className="flex h-full items-center justify-center text-center">
            <div className="max-w-md text-center space-y-3">
              {/* Icon */}
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-lg bg-gray-200 dark:bg-gray-700">
                📁
              </div>

              {/* Title */}
              <h2 className="text-md text-gray-900 dark:text-gray-100">
                Select a project to start chatting
              </h2>
            </div>
          </div>
        ) : (
          <>
            {messages.map((msg, i) => (
              <MessageBubble loading={loading} key={i} message={msg} />
            ))}

            {/* Spacer for scrolling */}
            <div ref={bottomRef} className="mb-10" />
          </>
        )}
      </div>

      <ChatInput
        input={input}
        setInput={setInput}
        sendMessage={sendMessage}
        projectId={projectId}
        loading={loading}
        userId={userId}
      />
    </div>
  );
}
