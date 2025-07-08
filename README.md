# ISRO MOSDAC Graph-RAG Chatbot 🚀

An intelligent AI chatbot that enables natural language access to satellite data hosted on ISRO's MOSDAC (Meteorological and Oceanographic Satellite Data Archival Centre) portal. Built using Graph-RAG architecture (Knowledge Graph + Vector Search + LLM), the solution helps users ask complex queries and receive precise, contextual answers.

---

## 🔍 Problem Statement

MOSDAC provides vast meteorological satellite data, but it is difficult to search, filter, or understand without technical expertise. This chatbot allows researchers, students, farmers, and citizens to ask questions like:

> "Which satellite provides rainfall data over Kerala in July 2023?"

and get clear, meaningful answers without digging through PDFs or complex menus.

---

## 💡 Features

- Natural language Q&A for satellite data
- Graph-RAG pipeline: combines knowledge graph and vector search
- Spatial & temporal filtering
- Handles structured (tables) + unstructured (FAQs, PDFs) content
- Scalable, modular architecture for other portals
- Deployed via chatbot interface (Dialogflow / Rasa)

---

## 🧠 Tech Stack

| Layer                  | Tools Used                           |
|------------------------|--------------------------------------|
| Web Scraping           | BeautifulSoup, Selenium, pdfminer    |
| NLP & Entity Parsing   | spaCy, NLTK                          |
| Knowledge Graph        | NetworkX / Neo4j                     |
| Embedding + Search     | SentenceTransformers + FAISS         |
| RAG Orchestration      | LangChain                            |
| Language Model (LLM)   | Mistral-7B / GPT-4 (Azure optional)  |
| Backend API            | Flask                                |
| Chatbot Interface      | Dialogflow / Rasa                    |

---

## 🧩 System Architecture

1. Scrape and preprocess MOSDAC data (HTML, PDFs, tables)
2. Extract entities and relationships → build Knowledge Graph
3. Embed documents and store vectors in FAISS
4. LangChain merges graph + vector output
5. LLM generates natural language answer
6. Flask API connects backend to chatbot
7. Chatbot handles user queries and delivers responses

---

## 📦 Folder Structure

plaintext
├── app.py                 # Flask backend
├── rag_pipeline.py        # Graph + Vector + LangChain logic
├── scrapers/              # Scripts for MOSDAC data scraping
├── graph/                 # Graph construction & utils
├── embeddings/            # FAISS index & vector models
├── chatbot/               # Dialogflow or Rasa integration
├── templates/             # Frontend (optional)
└── README.md              # Project overview


---

## 💻 How to Run

1. Clone the repo & install dependencies:
bash
pip install -r requirements.txt

2. Scrape and process data
3. Build graph and vector index
4. Run Flask API
bash
python app.py

5. Connect Dialogflow/Rasa to the endpoint

---

## ✅ Use Cases
- Ask region-specific data queries
- Filter by date, satellite, or sensor
- Get data availability explanations
- Recommend best datasets for agriculture, hydrology, etc.

---

## 🇮🇳 Nation-Centric Impact
- Democratizes access to ISRO data
- Supports education, research, disaster response, and agriculture
- Scalable across Indian space & environmental data platforms

---

## 👥 Team Roles
- NLP & Graph Design
- RAG Architecture
- Web Scraping & Preprocessing
- Chatbot Integration & Deployment

---

## 📌 Status
✅ Prototype ready for hackathon submission (Bharatiya Antariksh Hackathon 2025)
🔄 Scalable for production deployment on MOSDAC or related portals

---

## 📃 License
Open-source under MIT License (or as per ISRO/organizer guidelines).

---

Made with 🇮🇳 for ISRO Hackathon 2025 ✨
