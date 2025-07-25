from fastapi import APIRouter, UploadFile, File, HTTPException, Depends
from fastapi.responses import FileResponse
import os
from auth.oauth import get_current_user

router = APIRouter(
    prefix='/file',
    tags=['files']
)

# 1. Upload file as bytes
@router.post("/upload-bytes/")
def upload_bytes(file: bytes = File(...)):
    content = file.decode('utf-8')
    lines = content.split('\n')
    return {"lines": lines}

# 2. Upload file as UploadFile
@router.post("/upload-file/")
async def upload_file(upload_file: UploadFile = File(...)):
    content = await upload_file.read()
    lines = content.decode('utf-8').split('\n')
    return {"filename": upload_file.filename, "lines": lines}

# 3. Save uploaded file to disk
@router.post("/save-file/")
async def save_file(upload_file: UploadFile = File(...)):
    os.makedirs("uploaded", exist_ok=True)
    file_path = f"uploaded/{upload_file.filename}"
    with open(file_path, "wb") as f:
        content = await upload_file.read()
        f.write(content)
    return {"msg": f"Saved {upload_file.filename} successfully"}

# 4. Download file endpoint (protected)
@router.get("/download/{file_name}")
def download_file_protected(file_name: str, current_user: dict = Depends(get_current_user)):
    file_path = f"uploaded/{file_name}"
    if os.path.exists(file_path):
        return FileResponse(path=file_path, filename=file_name, media_type='application/octet-stream')
    raise HTTPException(status_code=404, detail="File not found")
