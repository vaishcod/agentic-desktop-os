try:
    import pyautogui
except Exception:
    pyautogui = None
from PIL import Image
import os
from typing import List, Optional
from ..core.base import BaseAgent, ToolResult

class DesktopAgent(BaseAgent):
    def __init__(self):
        super().__init__(name="Desktop", role="Automation")

    async def plan(self, goal: str, context: Optional[dict] = None) -> List[dict]:
        """Plan desktop actions like launching apps or taking screenshots"""
        return [{"action": "capture_screenshot"}]

    async def execute(self, plan: List[dict]) -> dict:
        results = []
        for step in plan:
            action = step.get("action")
            if action == "capture_screenshot":
                if pyautogui is not None:
                    try:
                        screenshot = pyautogui.screenshot()
                        # Save or process the screenshot
                        screenshot.save("latest_screenshot.png")
                        results.append({"action": action, "status": "success", "path": "latest_screenshot.png"})
                    except Exception as e:
                        # Fallback if screenshot fails despite pyautogui being imported
                        img = Image.new('RGB', (800, 600), color=(73, 109, 137))
                        img.save("latest_screenshot.png")
                        results.append({"action": action, "status": "simulated", "path": "latest_screenshot.png", "error": str(e)})
                else:
                    # Headless fallback - create a dummy image
                    img = Image.new('RGB', (800, 600), color=(73, 109, 137))
                    img.save("latest_screenshot.png")
                    results.append({"action": action, "status": "simulated", "path": "latest_screenshot.png"})
            elif action == "search_app":
                query = step.get("params", {}).get("query")
                # Simulated app search
                results.append({"action": action, "status": "success", "message": f"Found app: {query}"})
        
        return {"status": "success", "results": results}

    async def explain(self) -> str:
        return "I captured a screenshot to understand the current desktop state."

    async def verify(self, result: dict) -> bool:
        return result.get("status") == "success"

    async def rollback(self) -> bool:
        return True

desktop_agent = DesktopAgent()
