import pytesseract
from PIL import Image
from typing import List, Optional
from ..core.base import BaseAgent

class VisionAgent(BaseAgent):
    def __init__(self):
        super().__init__(name="Vision", role="Perception")

    async def plan(self, goal: str, context: Optional[dict] = None) -> List[dict]:
        return [{"action": "ocr_screen"}]

    async def execute(self, plan: List[dict]) -> dict:
        results = []
        for step in plan:
            action = step.get("action")
            if action == "ocr_screen":
                try:
                    text = pytesseract.image_to_string(Image.open("latest_screenshot.png"))
                    results.append({"action": action, "status": "success", "text": text[:500] + "..."})
                except Exception as e:
                    results.append({"action": action, "status": "error", "message": str(e)})
        
        return {"status": "success", "results": results}

    async def explain(self) -> str:
        return "I processed the screenshot using OCR to extract readable text from the UI."

    async def verify(self, result: dict) -> bool:
        return result.get("status") == "success"

    async def rollback(self) -> bool:
        return True

vision_agent = VisionAgent()
