from abc import ABC, abstractmethod
from typing import Any, List, Optional
from pydantic import BaseModel

class ToolResult(BaseModel):
    success: bool
    data: Any
    message: str
    error: Optional[str] = None

class BaseTool(ABC):
    def __init__(self, name: str, description: str, permissions: List[str]):
        self.name = name
        self.description = description
        self.permissions = permissions

    @abstractmethod
    async def execute(self, **kwargs) -> ToolResult:
        """Execute the tool logic"""
        pass

    @abstractmethod
    async def validate(self, **kwargs) -> bool:
        """Validate the input arguments"""
        pass

    @abstractmethod
    async def rollback(self, **kwargs) -> ToolResult:
        """Rollback the tool execution if supported"""
        pass

class BaseAgent(ABC):
    def __init__(self, name: str, role: str):
        self.name = name
        self.role = role

    @abstractmethod
    async def plan(self, goal: str, context: Optional[dict] = None) -> List[dict]:
        """Create an execution plan for the goal"""
        pass

    @abstractmethod
    async def execute(self, plan: List[dict]) -> dict:
        """Execute the plan"""
        pass

    @abstractmethod
    async def explain(self) -> str:
        """Explain the reasoning behind the actions"""
        pass

    @abstractmethod
    async def verify(self, result: dict) -> bool:
        """Verify the completion of the task"""
        pass

    @abstractmethod
    async def rollback(self) -> bool:
        """Rollback actions if possible"""
        pass
