import io
import re
from typing import Optional

def extract_text_from_pdf(file_bytes: bytes) -> str:
    text = ""
    try:
        import PyPDF2
        pdf_reader = PyPDF2.PdfReader(io.BytesIO(file_bytes))
        for page in pdf_reader.pages:
            extracted = page.extract_text()
            if extracted:
                text += extracted + "\n"
    except Exception as e:
        # Fallback to UTF-8 decoded text stripping null bytes
        text = file_bytes.decode("utf-8", errors="ignore")
    return text.strip()

def extract_text_from_docx(file_bytes: bytes) -> str:
    text = ""
    try:
        import docx
        doc = docx.Document(io.BytesIO(file_bytes))
        for p in doc.paragraphs:
            text += p.text + "\n"
    except Exception as e:
        text = file_bytes.decode("utf-8", errors="ignore")
    return text.strip()

def extract_resume_text(file_bytes: bytes, filename: str) -> str:
    ext = filename.split(".")[-1].lower() if "." in filename else ""
    if ext == "pdf":
        return extract_text_from_pdf(file_bytes)
    elif ext in ["docx", "doc"]:
        return extract_text_from_docx(file_bytes)
    else:
        return file_bytes.decode("utf-8", errors="ignore").strip()
