from fastapi import FastAPI, Request
from routes import router
from prometheus_client import Counter
from config.logging import setup_logging
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Adjust to your frontend domain in production
    allow_credentials=True,
    allow_methods=["*"], # Allows OPTIONS, POST, PUT, GET, etc.
    allow_headers=["*"],
)

app = FastAPI()
setup_logging()

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