from typing import List, Dict, Any
from app.ai.embeddings import get_text_vector, cosine_similarity

class KnowledgeBaseRAG:
    def __init__(self):
        self.documents = []

    def load_documents(self, docs: List[Dict[str, str]]):
        self.documents = []
        for d in docs:
            vec = get_text_vector(d.get("text", "") + " " + d.get("title", ""))
            self.documents.append({
                "doc": d,
                "vector": vec
            })

    def retrieve(self, query: str, top_k: int = 3) -> List[Dict[str, Any]]:
        if not self.documents:
            return []
        q_vec = get_text_vector(query)
        scored = []
        for item in self.documents:
            sim = cosine_similarity(q_vec, item["vector"])
            scored.append((sim, item["doc"]))
        scored.sort(key=lambda x: x[0], reverse=True)
        return [doc for score, doc in scored[:top_k]]

rag_engine = KnowledgeBaseRAG()
