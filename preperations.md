# Preperations for lab
This is the steps you need to do to prepare you computer for this lab

## Prerequirement

* node installed on you computer - download from https://nodejs.org/en


## Install n8n
Run `npm install -g n8n` this is installing n8n in your global npm modules

Confirm that is works by testing to run `n8n start` (this might take a few minutes)


## Create a api key for gemini
Navigate to https://aistudio.google.com/app/api-keys and login in with your google account

* Click "Create API key"

* Call the key and project whatever 😀

* Get the API key

⚠️ Keep it secret — treat it like a password.


## Create a airtable account and accesstoken

* Create a free on airtable https://airtable.com/signup

* Go to https://airtable.com/create/tokens

* Click `Create token`.

* Give it a name and permissions `(data.records:read, data.records:write, schema.bases:read)`, access to all resource (or the once the agent can use)

* Copy the token — it will look something like: `patABC123xyz456`


⚠️ Keep it secret — treat it like a password.

# Starting the environment
 
Run `n8n start` 

This might take 2-3 minutes to start without any feedback, so fetch a coffee 😄


# Connect to local MCP

* Navigate to the mcpServer folder in your termimal `cd mcpServer`
* Run `npm install`
* Run `npm run server`

localhost not same as 127.0.0.1