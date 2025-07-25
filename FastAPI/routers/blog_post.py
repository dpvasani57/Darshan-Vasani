from fastapi import APIRouter, Body, Path, Query
from pydantic import BaseModel
from typing import Optional

router = APIRouter()

# Pydantic model
class BlogPost(BaseModel):
    title: str
    content: str
    author: Optional[str] = "Anonymous"

@router.post(
    "/create",
    summary="Create a new blog post",
    description="This endpoint allows you to create a new blog post with a title, content, and optional author."
)
def create_blog(post: BlogPost = Body(...)):
    return {
        "message": "Blog created successfully!",
        "data": post
    }

@router.post("/new/{id}")
def create_blogs(
    id: int = Path(..., description="The ID of the blog post"),
    version: int = Query(1, description="Version number of the post"),
    blog: BlogPost = Body(...)
):
    return {
        "message": f"Blog with ID {id} created with version {version}.",
        "data": blog
    }
