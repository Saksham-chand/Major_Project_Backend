from pydantic import BaseModel

class AnalyzeRequest(BaseModel):
    district: str
    N: float
    P: float
    K: float
    Zn: float
    Fe: float
    Mn: float
    B: float
    S: float
    ph: float
    temperature: float
    humidity: float
    rainfall: float