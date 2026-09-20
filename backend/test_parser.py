from app.utils.file_parser import extract_text


file_path = "../uploads/Praveena P resume .pdf"

text = extract_text(file_path)

print("========== EXTRACTED TEXT ==========")
print(text)
print("====================================")