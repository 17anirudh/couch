import logging

from rich.logging import RichHandler


def setup_logging():
    # Define logging level
    log_level = logging.INFO
    
    # Configure the root logger to use RichHandler
    logging.basicConfig(
        level=log_level,
        format="%(message)s",
        datefmt="[%X]",
        handlers=[RichHandler(rich_tracebacks=True, markup=True)]
    )

    # Override and pass through Uvicorn's loggers to the root handlers
    for logger_name in ("uvicorn", "uvicorn.error", "uvicorn.access"):
        uvicorn_logger = logging.getLogger(logger_name)
        uvicorn_logger.handlers = []
        uvicorn_logger.propagate = True
