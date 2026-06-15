import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { connectDB } from "./mongodb";

export function withAuth<T extends (...args: any[]) => Promise<Response>>(fn: T): T {
  return (async (...args: any[]) => {
    try {
     
      // Validate authentication
      const session = await getServerSession(authOptions);

      if (!session?.user) {
        return NextResponse.json(
          { error: "Unauthorized" },
          { status: 401 }
        );
      }

      await connectDB();


      return await fn(...args);
    } catch (error: any) {
      console.error("❌ Server error:", error.message);

      const message = error?.message || "Internal Server Error";
      return NextResponse.json(
        { error: message },
        { status: error?.status || 500 }
      );
    }
  }) as T;
}
