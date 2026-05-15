from fastapi import APIRouter

router = APIRouter()

@router.get("/priority")
def get_priority():

    return {
        "highest_priority": "School Bus",
        "reason": "14 civilians trapped near severe flooding",
        "eta": "4 minutes",
        "risk_level": "EXTREME"
    }