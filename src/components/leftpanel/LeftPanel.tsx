"use client";

import { useState } from "react";
import {
  Plus,
  Search,
  FileText,
  Library,
  ChevronLeft,
  PanelLeftClose,
  PanelLeftOpen,
  BookCopy,
} from "lucide-react";

import { cn } from "@/lib/utils";


type LeftPanelProps = {
  userId: string;
  projectId: string;
};
export default function LeftPanel({ userId, projectId }: LeftPanelProps) {

  const [activeSection, setActiveSection] = useState<
    "documents" | "library" | "Reports"
  >("library");

  const [menuOpen, setMenuOpen] = useState(true);
  const [contentOpen, setContentOpen] = useState(true);

  // ---------------- REOPEN BUTTON ----------------
  const menuHandle = !menuOpen && (
    <button
      onClick={() => setMenuOpen(true)}
      className="fixed left-0 top-4 z-50 rounded-r-md border bg-white p-2 shadow-md hover:bg-slate-100 transition-all duration-300"
      aria-label="Open menu"
    >
      <PanelLeftOpen size={16} />
    </button>
  );

  const contentHandle = !contentOpen && (
    <button
      onClick={() => setContentOpen(true)}
      className={cn(
        "fixed left-56 top-4 z-50 rounded-r-md border p-2 shadow-md transition-colors duration-300",
        " text-foreground hover:bg-muted hover:text-foreground", // adapts to theming like MenuItem
      )}
      aria-label="Open content"
    >
      <ChevronLeft size={16} />
    </button>
  );

  return (
    <div className="relative flex h-full overflow-hidden">
      {menuHandle}
      {contentHandle}

      {/* ================= PANEL 1 : MENU ================= */}
      <aside
        className={cn(
          "flex flex-col border-r border-border bg-background transition-all duration-500 ease-in-out overflow-hidden",
          menuOpen ? "w-60 opacity-100" : "w-0 opacity-0",
        )}
      >
        <div className={cn("flex h-full flex-col", !menuOpen && "hidden")}>
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <span className="text-sm font-semibold text-foreground">
              {"satyam"}
            </span>
            <button
              className="text-foreground"
              onClick={() => setMenuOpen(false)}
            >
              <PanelLeftClose size={16} />
            </button>
          </div>

          <nav className="space-y-1 px-2 py-3 text-sm">
            <MenuItem
              icon={<Plus size={16} />}
              onClick={() => {}}
              label="New"
            />

            <MenuItem
              icon={<Search size={16} />}
              onClick={() => {}}
              label="Search Projects"
            />

            <MenuItem
              icon={<FileText size={16} />}
              label="Documents"
              active={activeSection === "documents"}
              onClick={() => setActiveSection("documents")}
            />
            <MenuItem
              icon={<Library size={16} />}
              label="Library"
              active={activeSection === "library"}
              onClick={() => setActiveSection("library")}
            />
            <MenuItem
              icon={<BookCopy size={16} />}
              label="Reports"
              active={activeSection === "Reports"}
              onClick={() => setActiveSection("Reports")}
            />
          </nav>
        </div>
      </aside>

      {/* ================= PANEL 2 : CONTENT ================= */}
      <aside
        className={cn(
          "flex flex-col border-r border-border bg-background transition-all duration-500 ease-in-out overflow-hidden",
          contentOpen ? "w-96 opacity-100" : "w-0 opacity-0",
        )}
      >
        <div className={cn("flex h-full flex-col", !contentOpen && "hidden")}>
          <div className="flex items-center justify-between border-b px-4 py-3">
            <span className="text-sm font-semibold capitalize">
              {activeSection}
            </span>
            <button
              onClick={() => setContentOpen(false)}
              className={cn(
                " transition-colors duration-300",
                " text-foreground hover:bg-muted hover:text-foreground",
              )}
              aria-label="Close content"
            >
              <ChevronLeft size={16} />
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
}

function MenuItem({
  icon,
  label,
  active,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex w-full items-center gap-2 rounded-md px-3 py-2 transition-colors",
        active
          ? "bg-muted text-foreground font-medium"
          : "text-muted-foreground hover:bg-muted hover:text-foreground",
      )}
    >
      {icon}
      {label}
    </button>
  );
}
