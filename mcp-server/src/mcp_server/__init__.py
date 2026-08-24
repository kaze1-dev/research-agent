import argparse
from mcp_server.server import mcp


def main():
    
    parser = argparse.ArgumentParser()
    parser.add_argument("--port", type=int, default=8000)
    
    args = parser.parse_args()
    
    mcp.run(
        transport="streamable-http",
        port=args.port
        )
    