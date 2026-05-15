import os

from fastapi import APIRouter
from groq import Groq

router = APIRouter()

client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)

@router.get("/ai-analysis")
def ai_analysis():

    try:

        completion = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {
                    "role": "user",
                    "content":
                                """
                                Flood severity level is 78%.
                                Heavy rainfall detected in Sector 7.
                                One bridge has collapsed.
                                Several roads are blocked.

                                Respond in:
                                - SHORT emergency command style
                                - MAXIMUM 3 lines
                                - concise tactical language
                                - cinematic rescue tone

                                Include:
                                - danger warning
                                - rerouting advice
                                - rescue recommendation
                                """
                }
            ]
        )

        ai_response = (
            completion
            .choices[0]
            .message.content
        )

        return {
            "analysis": ai_response
        }

    except Exception as e:

        return {
            "analysis":
            f"AI emergency analysis unavailable: {str(e)}"
        }