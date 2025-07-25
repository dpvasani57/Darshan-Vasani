from fastapi import APIRouter, Query
from typing import Optional

router = APIRouter()

@router.get(
    "/all",
    summary="Get all blog posts",
    description="Returns a list of all blog posts. You can filter by author using the optional query parameter."
)
def get_all_blogs(author: Optional[str] = Query(None, description="Filter blogs by author")):
    # This is just mock data for demonstration
    blogs = [
        {"id": 1, "title": "Intro to FastAPI", "author": "Alice"},
        {"id": 2, "title": "Building APIs with FastAPI", "author": "Bob"},
    ]

    if author:
        blogs = [blog for blog in blogs if blog["author"] == author]

    return {"blogs": blogs}

@router.get(
    "/{blog_id}",
    summary="Get a blog post by ID",
    description="Fetch a single blog post using its unique ID."
)
def get_blog(blog_id: int):
    # Mock blog
    return {
        "id": blog_id,
        "title": f"Sample Blog {blog_id}",
        "content": "This is a sample blog post."
    }
