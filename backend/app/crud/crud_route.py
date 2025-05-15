from typing import List, Optional
from sqlalchemy.orm import Session

from app.crud.base import CRUDBase
from app.models.route import Route
from app.schemas.route import RouteCreate, RouteUpdate

class CRUDRoute(CRUDBase[Route, RouteCreate, RouteUpdate]):
    def create_with_user(
        self, db: Session, *, obj_in: RouteCreate, user_id: int
    ) -> Route:
        obj_in_data = obj_in.dict()
        db_obj = self.model(**obj_in_data, user_id=user_id)
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def get_multi_by_user(
        self, db: Session, *, user_id: int, skip: int = 0, limit: int = 100
    ) -> List[Route]:
        return (
            db.query(self.model)
            .filter(Route.user_id == user_id)
            .offset(skip)
            .limit(limit)
            .all()
        )

route = CRUDRoute(Route) 