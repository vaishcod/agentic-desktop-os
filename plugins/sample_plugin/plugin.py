from app.core.base import BaseTool, ToolResult

class SamplePlugin(BaseTool):
    def __init__(self):
        super().__init__(
            name="SamplePlugin",
            description="A demonstration plugin",
            permissions=["read_files"]
        )

    async def execute(self, **kwargs) -> ToolResult:
        return ToolResult(success=True, data="Hello from Sample Plugin!", message="Execution successful")

    async def validate(self, **kwargs) -> bool:
        return True

    async def rollback(self, **kwargs) -> ToolResult:
        return ToolResult(success=True, data=None, message="No rollback needed")
