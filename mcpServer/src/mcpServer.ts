import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import http from "node:http";
import { z } from "zod";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";

// --- Schemas ---
const timereportShape = {
  day: z.string(),
  hours: z.number(),
  name: z.string(),
  project: z.string(),
};
const timereportSchema = z.object(timereportShape);
type Timereport = z.infer<typeof timereportSchema>;

// --- MCP Server ---
const server = new McpServer({
  name: "IMDBMCP",
  version: "1.0.0",
  capabilities: {
    resources: {
      list: true,
      read: true,
    },
    tools: {},
    prompts: {},
  },
});

// Example tool
server.tool(
  "FindTVSeries",
  "Find TV series that matches your preference",
  {
    genres: z
      .enum([
        "Action",
        "Adventure",
        "Animation",
        "Biography",
        "Comedy",
        "Crime",
        "Documentary",
        "Drama",
        "Family",
        "Fantasy",
        "Film-Noir",
        "History",
        "Horror",
        "Music",
        "Musical",
        "Mystery",
        "Romance",
        "Sci-Fi",
        "Sport",
        "Thriller",
        "War",
        "Western",
      ])
      .describe("Which genres you would like to see")
      .optional(),
  },
  {
    description: "Find TV series that matches your preference",
    title: "Find TV series",
    mimeType: "application/json",
  },
  async ({ genres }) => {
    try {
      const url = new URL("https://api.imdbapi.dev/titles");
      const search = new URLSearchParams({
        sortBy: "SORT_BY_USER_RATING",
        types: "TV_SERIES",
        sortOrder: "DESC",
        minVoteCount: "10000",
      });
      if (genres) search.set("genres", genres);
      url.search = search.toString();

      const response = await fetch(url);
      const data = await response.json();

      return {
        content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: typeof error === "string" ? error : JSON.stringify(error),
          },
        ],
      };
    }
  }
);

// --- Main function ---
async function main() {
  const transport = new StreamableHTTPServerTransport({
    sessionIdGenerator: undefined,
  });

  await server.connect(transport);

  const httpServer = http.createServer(async (req, res) => {
    const url = req.url || "/";
    const authHeader = req.headers["thisis"];

    // ✅ Check Authorization header
    if (url.startsWith("/mcp")) {
      if (authHeader !== `Secure`) {
        res.statusCode = 401;
        res.setHeader("content-type", "application/json");
        res.end(JSON.stringify({ error: "Unauthorized" }));
        return;
      }

      // Forward to MCP handler
      await transport.handleRequest(req as any, res as any);
      return;
    }

    res.statusCode = 404;
    res.setHeader("content-type", "text/plain; charset=utf-8");
    res.end("Not Found");
  });

  httpServer.listen(3000, "127.0.0.1", () => {
    console.log("✅ MCP HTTP server running at: http://127.0.0.1:3000/mcp");
  });
}

main().catch((error) => {
  console.error("Error starting MCP server:", error);
  process.exit(1);
});
