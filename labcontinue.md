# Pick your assignment

We have selected a few examples of how you now can continue exploring the Agentic AI.

Every task is expecting a new type of knowledge so you can pick them in any order.

**Find apartments with bathtubs:** this assignment challenges you to combine data extraction and reasoning. You’ll collect housing data from Booli, process the results, and then use AI to visually confirm which listings include bathtubs. It’s a practical example of combining APIs, scraping, and AI interpretation.  
Go to [Find apartments with bathtubs](#find-appartments-with-bathtubs)

**Extend the local mcpServer:** this assignment invites you to customize your own MCP (Model Context Protocol) server and make it do something entirely new. You’ll modify or add endpoints that can process or expose data in interesting ways — for example, integrating Postkodlotteriets data or creating a simple API that the n8n agent can interact with.  
Go to [Extend the local mcpServer](#extend-the-local-mcpserver)

**Use Google ADK to create your own personal knowledge assistant:** this assignment will help you understand the Google ADK Framework. You will make your agent capable of fetching information from the internet and use local tools.  
Go to [Use Google ADK to create your own personal knowledge assistant](#use-google-adk-to-create-your-own-personal-knowledge-assistant)

**Explore existing nodes and community nodes:** this assignment will help you discover built-in and community-created integrations for n8n. You will browse, install, and test new nodes directly from your local instance.  
Go to [Explore existing nodes and community nodes](#explore-existing-nodes-and-community-nodes)

**Explore existing AI workflows:** this assignment teaches you how to browse, inspect, and understand existing workflows in the [n8n AI workflows category](https://n8n.io/workflows/categories/ai/).  
Go to [Explore existing AI workflows](#explore-existing-ai-workflows)



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

## Use Google ADK to create your own personal knowledge assistant 

### Goal
Use Google ADK to design your own personal assistant connecting to internet sources and internal tools.

### Expected Tools
ADK web (see preparations.md) for setup. External open APIs [List of open API's](https://apipheny.io/free-api/).

### Instructions / Hints
Note: All tools need to be added as input to the Agent constructor in the following format:

<pre><code>
root_agent = Agent(
    model='gemini-2.5-flash',
    name='root_agent',
    description='A helpful assistant for user questions.',
    instruction='Answer user questions to the best of your knowledge',
    tools=[tool1,tool2, ...]
)
</code></pre>

Below are examples of tools you can use and modify in your agent. Note how important the descriptions are for each tool. The Agent LLM reads these in order to understand exactly what the tool is for and how it works. Important! The tools needs to be defined *before* the Agent constructor.

---
*Use this tool for calculating exchange rates!* 
<pre><code>
import requests
def get_exchange_rate(
    currency_from: str = "USD",
    currency_to: str = "SEK",
    currency_date: str = "latest", ) -> dict:
        
    """
      Retrieves the exchange rate between two currencies for a specified date.
      Uses the Frankfurter API (https://api.frankfurter.app/) to fetch exchange rate data.
      Args:
      currency_from: Base currency (3-letter currency code). The default is "USD" (US Dollar).
      currency_to: Target currency (3-letter currency code). The default is "KRW" (Korean Won).
      currency_date: Date to query the exchange rate for. Default is "latest" for the most recent rate.
      For historical rates, specify in YYYY-MM-DD format.
      Returns:
      dict: A dictionary containing exchange rate information.
      Example: {"amount": 1.0, "base": "USD", "date": "2023–11–24", "rates": {"EUR": 0.95534}}
    """
        
    response = requests.get(
        f"https://api.frankfurter.app/{currency_date}",
        params={"from": currency_from, "to": currency_to},
     )
    return response.json()
</code></pre>
---


---  
*Get local time from your system!*  
<pre><code>
import datetime
def get_current_time() -> dict:
    """
        Retrieves the local time.
        Returns:
        dict: A dictionary containing time informantion.
        Example: {"status": "success", "time": "2009-01-06 15:08:24.789150"}
    """
    now = datetime.datetime.now()
    return {"status": "success", "time": now}
</code></pre>
---    

---  
*Retrieve University data by country!*   
<pre><code>
import requests    
def get_universities(country: str = "Sweden") -> dict:
    """
      Retrieves all universities for a specific country.
      Uses http://universities.hipolabs.com/ to fetch university data per country.
      Args:
      country: The name of the country. The default is "Sweden"
      Returns:
      dict: A dictionary containing university information.
      Example: {"name": "Blekinge Institute of Technology", "alpha_two_code": "SE", "country": "Sweden", "web_pages": ["http://www.bth.se/"], "state-province": null, "domains": ["bth.se"]}
    """
    response = requests.get("http://universities.hipolabs.com/search?country="+country)
    return response.json()
</code></pre>
---

---   
*Write a report to disc!* 
<pre><code>
def write_report(report: str = "No data") -> dict:
    """
      Writes a report to disk in a file called 'report.html'.
      Args: 
      report: A text report with HTML tags. The default is "No data"
    """    
    with open("report.html", "w", encoding="utf-8") as f:
        f.write(report)
        f.close()
</code></pre>
---

---
*If you created MCP RAG Server in N8N, make it a part of your agents toolset!*
<pre><code>
from google.adk.tools.mcp_tool.mcp_toolset import MCPToolset
from google.adk.tools.mcp_tool.mcp_session_manager import SseConnectionParams

mcp_rag_tool = MCPToolset(connection_params=SseConnectionParams(url=URL_TO_MCP_SERVER_HERE))
</code></pre>
---


## Explore existing AI workflows

### Goal
Learn how AI workflows are structured in n8n, understand how different nodes interact, and identify patterns you can reuse in your own automation projects.

### Expected Tools
- n8n web interface
- Local n8n instance (optional)
- JSON editor (optional)

### Instructions / Hints
1. **Browse AI workflows**  
   - Go to [https://n8n.io/workflows/categories/ai/](https://n8n.io/workflows/categories/ai/) and select a workflow that interests you.

2. **Inspect the workflow**  
   - Open the workflow and examine the nodes.  
   - Check how triggers, transformations, and AI nodes are connected.  
   - Note which services, APIs, or AI models are used.

3. **Test in your instance**  
   - If you have a local n8n, try to recreate or import a similar workflow.  
   - Run it step by step to understand the flow of data.

4. **Analyze patterns**  
   - Identify reusable building blocks like text processing, API calls, or AI model prompts.  
   - Consider how these patterns could be combined to create your own automation.

### Challenge
Pick one workflow and write a short summary (3–5 sentences) describing:  
- What the workflow does  
- How the nodes interact  
- One idea for how you could extend it for your own projects

---