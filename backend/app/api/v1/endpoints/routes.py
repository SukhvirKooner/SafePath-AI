from typing import Any, List
from fastapi import APIRouter, Body, Depends, HTTPException
from fastapi.encoders import jsonable_encoder
from sqlalchemy.orm import Session

from app import crud, models, schemas
from app.api import deps
from app.utils.map_utils import generate_map_url

router = APIRouter()

@router.post("/submit", response_model=schemas.Route)
def create_route(
    *,
    db: Session = Depends(deps.get_db),
    route_in: schemas.RouteCreate,
    current_user: models.User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Create new route.
    """
    route = crud.route.create_with_user(
        db=db, obj_in=route_in, user_id=current_user.id
    )
    return route

@router.get("/history", response_model=List[schemas.Route])
def read_routes(
    db: Session = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100,
    current_user: models.User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Retrieve routes for current user.
    """
    routes = crud.route.get_multi_by_user(
        db=db, user_id=current_user.id, skip=skip, limit=limit
    )
    return routes

@router.get("/{route_id}", response_model=schemas.Route)
def read_route(
    *,
    db: Session = Depends(deps.get_db),
    route_id: int,
    current_user: models.User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Get route by ID.
    """
    route = crud.route.get(db=db, id=route_id)
    if not route:
        raise HTTPException(status_code=404, detail="Route not found")
    if route.user_id != current_user.id:
        raise HTTPException(status_code=400, detail="Not enough permissions")
    return route

@router.get("/{route_id}/map-url")
def get_map_url(
    *,
    db: Session = Depends(deps.get_db),
    route_id: int,
    current_user: models.User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Get map URL for a route.
    """
    route = crud.route.get(db=db, id=route_id)
    if not route:
        raise HTTPException(status_code=404, detail="Route not found")
    if route.user_id != current_user.id:
        raise HTTPException(status_code=400, detail="Not enough permissions")
    
    map_url = generate_map_url(
        start_location=route.start_location,
        end_location=route.end_location,
        start_lat=route.start_lat,
        start_lng=route.start_lng,
        end_lat=route.end_lat,
        end_lng=route.end_lng
    )
    return {"map_url": map_url} 