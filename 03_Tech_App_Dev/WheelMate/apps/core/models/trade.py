from pydantic import BaseModel
class Trade(BaseModel):
    symbol:str
    strike:float
