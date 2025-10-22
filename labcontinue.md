# Pick your assignment

We have selected a few examples of how you now can continue exploring the Agentic AI.

Every task is expecting a new type of knowledge so you can pick them in any order.

**Find apartments with bathtubs:** this assignment challenges you to combine data extraction and reasoning. You’ll collect housing data from Booli, process the results, and then use AI to visually confirm which listings include bathtubs. It’s a practical example of combining APIs, scraping, and AI interpretation.  
Go to [Find apartments with bathtubs](#find-appartments-with-bathtubs)

**Extend the local mcpServer:** this assignment invites you to customize your own MCP (Model Context Protocol) server and make it do something entirely new. You’ll modify or add endpoints that can process or expose data in interesting ways — for example, integrating Postkodlotteriets data or creating a simple API that the n8n agent can interact with.  
Go to [Extend the local mcpServer](#extend-the-local-mcpserver)

**Explore existing nodes and community nodes:** this assignment will help you discover built-in and community-created integrations for n8n. You will browse, install, and test new nodes directly from your local instance.  
Go to [Explore existing nodes and community nodes](#explore-existing-nodes-and-community-nodes)


---

## Find appartments with bathtubs

### Goal
Your goal is to use booli.se to extract every two-room apartment in Vasastan that costs at most 4 000 000 SEK and has a bathtub.  
Note: a bathtub (“badkar”) is not a standard filter.

### Expected Tools
Either install `n8n-nodes-playwright-mcp` from [Community nodes](http://localhost:5678/settings/community-nodes) to run a browser, or use HTTP Requests.

### Instructions / Hints
You need to do multiple requests:

* Fetch matching apartments with the provided filters:  
  `https://www.booli.se/sok/till-salu?areaIds=115349&maxListPrice=4000000&minRooms=2`

* Extract the `apartmentIds`.

* Fetch each individual listing:  
  `https://www.booli.se/_next/data/ZkR8Hg784T7G7v1NGR8cH/sv/[annons || bostad]/[id].json`

* Extract the image IDs. The JSON returned in the last step contains an array of images — the key `primaryLabel` can be `"bathroom/laundry"`.

* Download the image and send it to the AI for classification (to check if there’s a bathtub).

---

## Extend the local mcpServer

In the first assignment you used a custom MCP server.  
That code is in `mcpServer/src/mcpServer`.  
Now it’s time to make it your own — extend or modify this MCP so it can perform new actions or provide new data sources that your n8n agent can use.

### Goal
Create an extended MCP that the n8n agent can call to perform interesting tasks — for example:
- Query a custom dataset
- Transform or filter data in real-time
- Integrate Postkodlotteriets data to create insights or automations

### Ideas / Inspiration
- Add an endpoint that summarizes or categorizes text using the OpenAI API.
- Create an endpoint that fetches or transforms data from a public API.
- Build a simple caching mechanism that stores previous AI responses.
- Or connect your MCP to any external service that you find useful.

Your imagination sets the limit — the goal is to make something your agents can call as a **new tool** inside n8n.

---

## Explore existing nodes and community nodes

### Goal
Get familiar with what n8n already offers out of the box — and how you can expand it with powerful community-built nodes. By the end of this section, you should be able to find, install, and test new nodes that extend n8n’s capabilities.

### Background
n8n comes with a large set of built-in nodes that let you connect to APIs, transform data, and automate actions across services. In addition, the **Community Nodes** feature allows you to install third-party packages directly from npm, giving you access to hundreds of additional integrations — including AI tools, browser automation, and developer utilities.

You can explore and install community nodes directly inside your local n8n instance by going to:  
👉 **[http://localhost:5678/settings/community-nodes](http://localhost:5678/settings/community-nodes)**

### Instructions / Hints

1. **Browse built-in nodes**
   - Open n8n and click the *Nodes* tab in the left sidebar.  
   - Search for built-in nodes such as **HTTP Request**, **Webhook**, or **OpenAI**.  
   - Drag one into a workflow and open its configuration panel to explore what it can do.

2. **Explore community nodes**
   - Go to **[http://localhost:5678/settings/community-nodes](http://localhost:5678/settings/community-nodes)**.  
   - Click **Install a community node**.  
   - Try searching for one of the following examples:
     - `n8n-nodes-playwright-mcp` — run a browser via Playwright  
     - `n8n-nodes-html-extract` — extract structured data from HTML  
     - `n8n-nodes-pdf` — parse and generate PDFs  
   - Each community node is an npm package that can be installed directly from the n8n UI.

3. **Test your installation**
   - After installation, reload n8n.  
   - Create a new workflow and search for the installed node (e.g. “Playwright MCP”).  
   - Run a simple example — for instance, open a webpage and extract text from it.

4. **Inspect node code**
   - Community nodes are open and inspectable — you’ll find them under `.n8n/nodes`.  
   - Explore their source code to understand how they define inputs, outputs, and parameters.  
   - This is a great first step if you later want to **build your own custom node**.

### Challenge
Install one community node that looks useful for your future projects.  
In one sentence, describe:
- What it does  
- How it could be combined with an AI agent or HTTP Request node  

---

## RAG
