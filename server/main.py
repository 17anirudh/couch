from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from prometheus_client import Counter

from config.const import CORS_ORIGINS
from config.log import setup_logging
from routes import router

setup_logging()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

EXCEPTIONS = Counter(
    name='app_exceptions_total',
    documentation="Total number of unhandled exceptions",
    labelnames=['endpint', 'exception_type']
)
REQUESTS = Counter(
    name='app_requests_total',
    documentation="Total number of requests",
    labelnames=['endpoint', 'method']
)

@app.exception_handler(Exception)
async def catch_all(request: Request, exc: Exception):
    EXCEPTIONS.labels(endpoint=request.path_params, expection_type=type(exc).__name__).inc()

@app.middleware("http")
async def pre_request(request: Request, call_next):
    REQUESTS.labels(endpoint=request.url.path, method=request.method).inc()
    return await call_next(request)

@app.get("/")
def index():
    return {"message": "Hello from server"}

app.include_router(router)
