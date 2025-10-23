# Start the local MCP-server

Before you can connect your tools and workflows, you’ll need to start up your local MCP server. This is what will handle requests from your AI agent and connect it to external data sources like IMDB.

In your terminal:
* Navigate to the **mcpServer** folder:  
  `cd mcpServer`
* Install dependencies:  
  `npm install`
* Start the server:  
  `npm run server`

Once the server is running, it will listen for requests from your n8n workflow.



# Set up n8n Workflow
Now let’s get your automation platform up and running.

In your terminal:
* Run `n8n start`  
  It may take 2–3 minutes to boot up without showing any feedback, so this is a great moment to grab a coffee ☕  
* Once started, open **n8n** (see the steps in `preparations.md` if needed)
* Go to [http://localhost:5678/](http://localhost:5678/)
* Click **Create Workflow**
* Add a trigger node **“On Chat Messages”** — no additional configuration is needed at this stage
* Click the plus next to **AI Agent Memory** and add a **“Simple Memory”** node  

This gives your agent short-term memory to keep track of context between messages.




# Create the AI Agent
With your workflow started, it’s time to add the AI brain — the “Agent” that will process instructions and interact with your tools.

* Click the plus (+) next to the chat trigger  
* Add the **“AI Agent”** node — leave it with the default config for now  


## Add the Chat Model
The chat model is the language model that interprets your input and decides what to do next. If you followed the setup instructions, you’ll be using **Google Gemini**.

* Click the plus by **Chat Model**
* Choose **Google Gemini Chat Model**
* Under *Credential to connect with...* create a new credential:
  * **Host:** https://generativelanguage.googleapis.com
  * **API Key:** The key from the preparations
* You can experiment with different models — I’ve used **Gemini 2.5 Flash** for speed and accuracy.



## Add Tools
Now that your AI agent can “think,” it’s time to give it hands and eyes — tools it can use to access data and perform actions. We’ll start by connecting the MCP server and Airtable.

### The MCP Server
The MCP Server will provide external data (like IMDB series information) to your AI agent.

* Click the plus by **Tool**
* Add an **MCP Client Tool**
* Use the following configuration:
  * **Endpoint:** http://127.0.0.1:3000/mcp
  * **Server Transport:** HTTP Streamable
  * **Authentication:** Header Auth
  * **Credential for Header Auth:** Create new
    * **Name:** thisis
    * **Value:** Secure
* Click **Execute Step**
  * Select **FindTVSeries**
  * Choose a genre (e.g. *Drama*)
  * When you execute the step, you should see a JSON response in the **OUTPUT**



### Add Airtable
Airtable will serve as your structured data store for TV series, where the AI can read, add, or remove entries.

#### Add the Credential
* Click the plus sign next to the n8n logo in the top-left corner  
* Select **Add Credential**
* Find **Airtable Personal Access Token**
* Paste the access token from the preparations and save the credential
* Navigate back to your workflow

#### Add the CRUD Nodes
We’ll create nodes that let the AI search, create, update, and delete Airtable records.

* Add a new **Tool**, then find the **Airtable Tool**
* Use the credentials you just created
* Repeat the setup below for each operation:

| Tool Name | Resource | Operation | Base | Table Name | Unique for this step |  
|---|---|---|---|---|---|
| Search TVSeries | Record | Search | TVSeries | TVSeries | Filter By Formula: Click the AIIcon (The sparkles) |
| Delete TVSeries | Record | Delete | TVSeries | TVSeries | Record ID:  Click the AIIcon (The sparkles) |
| Create TVSeries | Record | Create | TVSeries | TVSeries | Mapping Column Mode: Map Each Column Automatically |
| Update TVSeries | Record | Create | TVSeries | TVSeries | Mapping Column Mode: Map Each Column Automatically, Columns to match on "Title" |



# Test the Agent
Now that everything is wired up, let’s test the AI agent to make sure it can interact with Airtable and MCP correctly.

Open both Airtable and n8n side-by-side.  
In the chat window, send this prompt: 

`I want to always have 10 series in my airtable that is either "In queue" or "Watching". If i have less then 10 add one drama series at the time until i have 10 series in does statuses. I dont want you to add series i already have in the airtable`