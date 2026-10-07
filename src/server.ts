import { McpServer } from "@modelcontextprotocol/server";
import { StdioServerTransport } from "@modelcontextprotocol/server/stdio";
import { z } from "zod";

const server = new McpServer({
  name: "mcp-troll",
  title: "MCP Server Troll",
  description: "A simple server that trolls you",
  version: "1.0.0",
});

const roasts = [
  (name: string) =>
    `Hey ${name}, did you write this code with your eyes closed, or is this just abstract art?`,
  (name: string) =>
    `Yo ${name}, legacy code from 1995 called—it says it's jealous of your performance!`,
  (name: string) =>
    `${name}, you are the reason linters cry themselves to sleep at night.`,
  (name: string) =>
    `${name}, you are a piece of 💩!`,
];

server.registerTool(
  "troll",
  {
    description: "Troll someone by name",
    inputSchema: z.object({
      name: z.string().trim().min(1),
    }),
  },
  async ({ name }) => {
    const safeName = name.trim();
    const randomRoast = roasts[Math.floor(Math.random() * roasts.length)](safeName);
    return {
      content: [{ type: "text", text: randomRoast }],
    };
  },
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);

  console.error("troll greetings from mcp-troll");
}

main().catch((error) => {
  console.error("Error at the troll server:", error);
  process.exit(1);
});
