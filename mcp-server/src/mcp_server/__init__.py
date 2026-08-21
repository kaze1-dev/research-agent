from mcp_server.server import mcp


def main():
    mcp.run(transport="streamable-http")