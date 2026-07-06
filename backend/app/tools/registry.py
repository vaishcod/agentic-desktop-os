from typing import Dict, List, Type
from ..core.base import BaseTool, ToolResult

class ToolRegistry:
    def __init__(self):
        self.tools: Dict[str, BaseTool] = {}

    def register_tool(self, tool: BaseTool):
        self.tools[tool.name] = tool
        print(f"Registry: Registered tool - {tool.name}")

    def get_tool(self, name: str) -> BaseTool:
        return self.tools.get(name)

    def list_tools(self) -> List[str]:
        return list(self.tools.keys())

tool_registry = ToolRegistry()

# Example File Tool
class FileTool(BaseTool):
    def __init__(self):
        super().__init__(
            name="FileTool",
            description="Perform operations on the file system",
            permissions=["read_files", "write_files"]
        )

    async def execute(self, action: str, **kwargs) -> ToolResult:
        if action == "list_files":
            return ToolResult(success=True, data=["file1.txt", "file2.py"], message="Files listed")
        return ToolResult(success=False, data=None, message=f"Unknown action: {action}")

    async def validate(self, **kwargs) -> bool:
        return True

    async def rollback(self, **kwargs) -> ToolResult:
        return ToolResult(success=True, data=None, message="Rollback successful")

# Register the tool
tool_registry.register_tool(FileTool())
