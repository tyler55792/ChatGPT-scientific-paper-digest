# GPT-PaperReader: Navigating Scientific Literature with AI

## Background

With a B.S. in Chemical Engineering, multiple research and development internships, and a desire to stay up-to-date with the latest technologies, I find myself frequently reading research papers. I prefer research papers over random internet articles because I have greater confidence in conclusions drawn from peer-reviewed scientific studies rather than from random online sources. However, the challenge of reading research papers is that comprehending them often requires a specific level of domain knowledge. Attempting to acquire this knowledge through Google searches can be a very tedious process, given the niche nature of scientific articles. Fortunately, ChatGPT is very effective at answering niche questions. The only limitation with ChatGPT is that you cannot currently upload or paste large PDFs into a ChatGPT query, as there's a limited amount of text that can be processed per query. This is precisely where the combination of ChatGPT and my application comes in!

## How it Works

The application allows users to upload and organize a library of scientific articles. The application then feeds these user-uploaded articles to ChatGPT, and users can essentially ask ChatGPT questions related to a specific document. This tool has exponentially accelerated my ability to read scientific papers and study high-level topics. 

The project comprises two front-end interfaces: a dashboard interface for creating, reading, updating, and deleting articles on the app, and separate read-only user interface for viewers to read and chat with scientific articles uploaded from the dashboard. Click below to view the read-only interface hosted on Netlify! Both front-ends communicate with the back-end via REST API endpoints. The back-end, hosted on Render, queries and manipulates data in both a MongoDB database and a ChatPDF database.

👉 [DEMO: Check out the read-only UI](https://64e7f3b35f074e0008f3b694--rococo-choux-cbe33a.netlify.app/) 👈 ❗NOTE THAT THE FREE TIER OF RENDER, THE PAAS WHERE I HAVE HOSTED MY SERVER, CAN TAKE UP TO 15 SECONDS TO RESPOND INITIALLY❗

Watch a demo of the dashboard UI:
![Dashboard-interface demo](https://drive.google.com/uc?export=view&id=11VB55ObJa_2FQtei6QaeKBg_pPBOUSlJ)

## Example Use Cases

When a scientific paper is uploaded to the app, a POST request containing the paper is sent to the back-end. The back-end then stores the paper in ChatPDF's database using its public API. A reference to the paper in ChatPDF's database is then stored in the MongoDB database, along with other important information about the paper.

When a user submits a query regarding one of the uploaded scientific papers, the reference to the paper in ChatPDF's database is fetched from the MongoDB database. This reference, along with a user query, is sent in a GET request to ChatPDF's API. The API returns ChatGPT's response to the query based on the provided paper. 

## ChatPDF

[Check out ChatPDF's API documentation here.](https://www.chatpdf.com/docs/api/backend)

ChatPDF works by breaking down large documents into smaller chunks of text, embedding these chunks (with OpenAI embeddings), and storing them in a database. When a user submits a query related to a document, a semantic search is performed on the document's database to find chunks from the document that are most relevant to the user's query. The query and its relevant chunks are then paired and sent to a generative LLM (ChatGPT) to produce a response for the user.

This process is necessary to ask ChatGPT questions based on large research articles, as ChatGPT has a limited capacity for text intake in a single query. Instead of posing a question to ChatGPT with the entire document as context, the application asks ChatGPT questions with only specific chunks of text as context.

As a result, there are some inherent limitations to this method. Since ChatGPT cannot read the entire document at once, it struggles to provide comprehensive summaries of entire documents and can occasionally produce inaccurate responses. It excels more with specific questions about certain sections or concepts within a document.

## Notes
* Tech stack: MongoDB, Express, React, Node.js

* This implementation is completely free up to 500 messages and 5000 pages a month. So feel free to try it out!

* Uploaded PDFs must be under 2000 pages in length.

* The free tier of Render, the PaaS where I have hosted my server, occasionally experiences slow response times

* The free tier ChatPDF API occasionally produces unexpected responses.
