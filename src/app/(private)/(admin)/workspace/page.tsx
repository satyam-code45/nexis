"use client";

import ChatBox from "@/components/chatbox/Chatbox";
import LefPanel from "@/components/leftpanel/LeftPanel";
import RightPanel from "@/components/rightpanel/RightPanel";

export default function Page() {

  return (
    <div className="flex h-screen w-full bg-slate-50 dark:bg-gray-900 text-slate-900 dark:text-gray-100 transition-colors duration-200">
      {/* Left sidebar */}
      <LefPanel userId={"satyam"} projectId={"test"} />


      {/* Main area */}
      <main className="flex flex-1 overflow-hidden">
        {/* PDF viewer */}
        <section className="flex flex-1 flex-col border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 transition-colors duration-200">
          {/* <MiddlePanel fileUrl="/mnt/data/file-3.pdf" /> */}
        </section>

        {/* Chat panel (resizable) */}
        <RightPanel children={
          <ChatBox
            userId={"satyam"}
            projectId={"test"} />}
        />



      </main>
    </div>
  );
}
