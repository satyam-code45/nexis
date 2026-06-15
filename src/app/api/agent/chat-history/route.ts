
import { LLM } from "@/lib/llm/LLM";
import { readChatHistoryTool } from "@/lib/tools/ChatHistoryTools";
import { getSuggestedQuestionsTool } from "@/lib/tools/suggestedQuestionTool";
import { NextResponse } from "next/server";



export async function GET(req:Request) {
  try {

  
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId") as string
  const projectId = searchParams.get("projectId") as string

    // 1. Validate required fields
    if (  !userId || !projectId) {
      return NextResponse.json(
        { ok: false, message: "userId or projectId are required" },
        { status: 400 }
      );
    }
    const llm=LLM.getInstance('cerebras')

    const questions=await getSuggestedQuestionsTool.invoke({userId,projectId,llm:llm})

    const retrievedMessages=await readChatHistoryTool.invoke({userId,projectId})
    const messages=JSON.parse(retrievedMessages)

       
  
    return NextResponse.json({ messages,questions });
  } catch (err: any) {

    return NextResponse.json({ ok: false, error: err.message });
  }
}
