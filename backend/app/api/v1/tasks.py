from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from ...agents.commander import commander_agent

router = APIRouter()

class TaskRequest(BaseModel):
    goal: str
    context: Optional[dict] = None

class TaskResponse(BaseModel):
    task_id: str
    status: str
    plan: List[dict]
    explanation: str

@router.post("/execute")
async def execute_task(request: TaskRequest):
    try:
        # 1. Planning
        plan = await commander_agent.plan(request.goal, request.context)
        
        # 2. Explanation
        explanation = await commander_agent.explain()
        
        # 3. Execution (In a real app, this would be async/background)
        result = await commander_agent.execute(plan)
        
        return {
            "task_id": "task_123", # Simple ID for student project
            "status": "success" if result.get("status") == "success" else "failed",
            "plan": plan,
            "explanation": explanation,
            "result": result
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
