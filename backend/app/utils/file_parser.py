import pymupdf
from docx import Document


def extract_text_from_pdf(file_path: str) -> str:
    """
    Extract text from a PDF file.
    """

    text = ""

    pdf = pymupdf.open(file_path)

    for page in pdf:
        text += page.get_text()

    pdf.close()

    return text.strip()


def extract_text_from_docx(file_path: str) -> str:
    """
    Extract text from a DOCX file.
    """

    document = Document(file_path)

    text = []

    for paragraph in document.paragraphs:
        if paragraph.text.strip():
            text.append(paragraph.text)

    return "\n".join(text).strip()


def extract_text(file_path: str) -> str:
    """
    Detect the file type and extract text.
    """

    if file_path.lower().endswith(".pdf"):
        return extract_text_from_pdf(file_path)

    elif file_path.lower().endswith(".docx"):
        return extract_text_from_docx(file_path)

    else:
        raise ValueError(
            "Unsupported file type. Please upload PDF or DOCX."
        )


def extract_resume_text(file_path: str) -> str:
    return extract_text(file_path)