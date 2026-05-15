from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes import ai
from app.routes import priority

app = FastAPI(
    title="RescueMind AI",
    description="AI Disaster Rescue Coordination System",
    version="1.0.0"
)

# CORS FIX
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ROUTES
app.include_router(ai.router)
app.include_router(priority.router)

@app.get("/")
def home():
    return {
        "message": "RescueMind AI Backend Running 🚨"
    }