from .main import Bank_main

# Import controller modules to register their routes with the blueprint.
from . import customers, employees, savings, checkings  # noqa: F401

__all__ = ["Bank_main"]
