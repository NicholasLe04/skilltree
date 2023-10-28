from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import uvicorn

from setup import setup
from database.connection import get_connection
from routes import tree, user, login

conn = get_connection()

# SETUP DATABASE
setup()

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

#app.include_router(login.router) that jawn dont exist yet
app.include_router(tree.router)
app.include_router(user.router)


@app.get("/")
async def root():
    return {"message": "Im packing!"}

if __name__ == "__main__":
    uvicorn.run(app, host='127.0.0.1', port=6969)