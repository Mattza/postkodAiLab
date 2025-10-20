# Preparations for the Lab
These are the steps you need to get your computer ready for the lab. Following them carefully will save you a lot of headaches later.  

---

## Prerequisites
Before we begin, make sure your computer has the following installed:

* **Node.js** – download and install from [https://nodejs.org/en](https://nodejs.org/en)  
  This is required to run n8n and the MCP server.  

You can confirm installation by running:

```bash
node -v
npm -v
```

* **Qdrant Vector store** – Install docker image qdrant/qdrant.
  This is required for building a RAG Server in n8n.

```bash
  docker pull qdrant/qdrant
```
  In the following command, revise $(pwd)/path/to/data for your Docker configuration. Then use the updated command to run the container:
```bash
docker run -p 6333:6333 \
    -e QDRANT__SERVICE__API_KEY=postkodlotteriet \
    -v $(pwd)/path/to/data:/qdrant/storage \
    qdrant/qdrant
```
If you are using Docker.desktop, remember to set ports (TCP, UDP) explicitly to 6333 and add env variable QDRANT__SERVICE__API_KEY=postkodlotteriet.

You can open qdrant dashboard via:
```bash
http://localhost:6333/dashboard
```

---

## Install n8n
n8n is the automation platform we’ll use to build workflows for your AI agent.

1. Install n8n globally using npm:

```bash
npm install -g n8n
```

2. Confirm that n8n is installed correctly by running:

```bash
n8n start
```

> This may take 2–3 minutes the first time, and you might not see much feedback — perfect moment to grab a coffee ☕  

Once it’s running, n8n is ready to build workflows.

---

## Create an API Key for Gemini
We’ll use **Google Gemini** as our chat model. To connect it, you’ll need to generate an API key.

1. Go to [https://aistudio.google.com/app/api-keys](https://aistudio.google.com/app/api-keys) and sign in with your Google account.  
2. Click **Create API Key**.  
3. Name your project and key however you like 😀  
4. Copy the generated API key. It should look something like:  

```
AIzaSyD...
```

⚠️ **Keep this key secret** — treat it like a password.

---


## Create an Airtable Account and Access Token
We’ll store our TV series data in **Airtable**, so let’s create an account and a personal access token.

1. Create a free Airtable account: [https://airtable.com/signup](https://airtable.com/signup)
2. Go to [https://airtable.com/create/tokens](https://airtable.com/create/tokens)
3. Click **Create Token**
4. Give your token a name and select the following permissions:  
   * `data.records:read`
   * `data.records:write`
   * `schema.bases:read`
5. Give it access to all resources (or at least the bases your agent will use)
6. Copy the token — it will look something like:  

```
patABC123xyz456
```

⚠️ **Keep your token safe** — treat it like a password.

---

### Set Up the Data in Airtable
Now we’ll create the table structure your AI agent will work with.

1. Go to [https://airtable.com/](https://airtable.com/)
2. Click **“Build an app on your own”**
3. Rename the base to **TVApp** (click on *Untitled Base*)
4. Rename the grid view to **TVSeries** (click the **…** next to Grid View → *Rename View*)
5. Rename the “Name” column to **Title**, then delete all other columns
6. Add the following columns:
   * **Genres** – type: *Single line text*
   * **Status** – type: *Single select*, with options:
     * Queue  
     * Watching  
     * Done

Your Airtable base should now have three fields: **Title**, **Genres**, and **Status**.

---

# Starting the Environment
Now that everything’s set up, let’s start the tools you’ll use in the lab.

1. Start n8n:

```bash
n8n start
```

> It might take 2–3 minutes to start, so fetch another coffee 😄  

2. Once n8n is up, it will be available at [http://localhost:5678](http://localhost:5678)

---

# Start the MCP Server
The MCP server powers your AI agent’s external data tools — such as fetching TV shows from IMDB.

1. Navigate to the **mcpServer** folder in your terminal:

```bash
cd mcpServer
```

2. Install dependencies:

```bash
npm install
```

3. Start the server:

```bash
npm run server
```

Once it’s running, the server will be available for n8n to connect to. 🎉

---
## Google ADK
Google ADK is a solid open source framework for building agents on a more finegrained level than n8n. If you want to go beyond n8n (not mandatory) this is a good place to start.
The framework is available in both java- and python versions, but after testing the java version for a couple of hours I would strongly advice to use python instead. 
Python is in all respects the official language for AI and machine learning and it is easier to use, less error prone, more updated and faster to run. To set up Google Python ADK on your machine, do the following:

* **Python runtime** – download and install from [https://www.python.org/downloads/](https://www.python.org/downloads/)  
  This is required to run Google Python ADK

  Find a suitable directory for you code and do the following from the terminal:

```bash
# Create new virtual environment
python -m venv .adk_env
```

```bash
# Activate environment (depending on os)
# macOS/Linux:
source .adk_env/bin/activate
# Windows CMD:
.adk_env\Scripts\activate.bat
# Windows PowerShell:
.adk_env\Scripts\Activate.ps1
```

```bash
# Install Google ADK:
pip install google-adk
```

```bash
#Create first agent
adk create my_agent
```

The command above will prompt you as below, set 1 on both and paste API key:

Choose a model for the root agent:
1. gemini-2.5-flash
2. Other models (fill later)
Choose model (1, 2): 1
1. Google AI
2. Vertex AI
Choose a backend (1, 2): 1

Don't have API Key? Create one in AI Studio: https://aistudio.google.com/apikey

Enter Google API key:********************

```bash
# Run adk web with your new agent - my_agent/agent.py
adk web

```
You now have an active agent running! 
Open your browser: [http://localhost:8000](http://localhost:8000) 

---

If you anyway would like to check Google ADK for Java out:

Prereq: 
* **Java 17 or later**
* **Maven 3.9 or later**

Set env variable: GOOGLE_API_KEY="YOUR_API_KEY"

For those who would like to try out to run a simple agent beforehand, instructions can be found here:

https://google.github.io/adk-docs/#java

---
