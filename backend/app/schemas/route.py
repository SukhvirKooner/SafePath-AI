from typing import Optional
from datetime import datetime
from pydantic import BaseModel

class RouteBase(BaseModel):
    start_location: str
    end_location: str
    start_lat: Optional[float] = None
    start_lng: Optional[float] = None
    end_lat: Optional[float] = None
    end_lng: Optional[float] = None

class RouteCreate(RouteBase):
    pass

class RouteUpdate(RouteBase):
    pass

class RouteInDBBase(RouteBase):
    id: int
    user_id: int
    created_at: datetime

    class Config:
        from_attributes = True

class Route(RouteInDBBase):
    pass

class RouteInDB(RouteInDBBase):
    pass 