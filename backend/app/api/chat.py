from fastapi import APIRouter
from datetime import datetime
from app.schemas.progress import ChatMessageRequest, ChatMessageResponse
from app.ai.llm import llm_client
from app.ai.prompts import AI_MENTOR_SYSTEM_PROMPT

router = APIRouter(tags=["AI Mentor Chat"])


@router.post("/chat/message", response_model=ChatMessageResponse)
@router.post("/api/chat/message", response_model=ChatMessageResponse)
def send_chat_message(request: ChatMessageRequest):
    reply_text = llm_client.generate_response(
        system_prompt=AI_MENTOR_SYSTEM_PROMPT,
        user_prompt=request.message
    )
    return {
        "reply": reply_text,
        "timestamp": datetime.now().strftime("%I:%M %p")
    }
