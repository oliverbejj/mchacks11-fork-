from typing import Union, Annotated
from fastapi import FastAPI, HTTPException, Depends, status
from pydantic import BaseModel
import models
from database import engine, SessionLocal
from sqlalchemy.orm import Session

app = FastAPI()
models.Base.metadata.create_all(bind=engine)

class UsersBase(BaseModel):
    username: str
    name: str

class ExpenseRecordBase(BaseModel):
    username: str
    merchant_name: str
    price: float
    category: str

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

db_dependency = Annotated[Session, Depends(get_db)]

@app.get("/")
def read_root():
    return {"McHacks 11! By Cesar, Karman, Oliver, Yoon Sun"}

# Create and add a new user information to the database
@app.post("/users/create", status_code=status.HTTP_201_CREATED)
async def create_user(user: UsersBase, db: db_dependency):
    db_user = models.Users(**user.dict())
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

# Get user information from the database
@app.get("/users/{username}", status_code=status.HTTP_200_OK)
async def get_user(username: str, db: db_dependency):
    db_user = db.query(models.Users).filter(models.Users.username == username).first()
    if db_user is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    return db_user

# Delete user information from the database
@app.delete("/users/delete/{username}", status_code=status.HTTP_200_OK)
async def delete_user(username: str, db: db_dependency):
    db_exp_id = db.query(models.Users).filter(models.Users.username == username).first()
    if db_exp_id is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Expense record not found")
    db.delete(db_exp_id)
    db.commit()
    return {"message": "User deleted"}

# Add expense record to the database
@app.post("/expense-records/", status_code=status.HTTP_201_CREATED)
async def create_expense_record(exprecord: ExpenseRecordBase, db: db_dependency):
    db_exprecord = models.ExpenseRecord(**exprecord.dict())
    db.add(db_exprecord)
    db.commit()
    db.refresh(db_exprecord)
    return db_exprecord

# Get expense record from the database
@app.get("/expense-records/{exp_id}", status_code=status.HTTP_200_OK)
async def get_expense_record(exp_id: int, db: db_dependency):
    db_exp_id = db.query(models.ExpenseRecord).filter(models.ExpenseRecord.id == exp_id).first()
    if db_exp_id is None:
        HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Expense record not found")
    return db_exp_id

# Delete expense record from the database
@app.delete("/expense-records/delete/{exp_id}", status_code=status.HTTP_200_OK)
async def delete_expense_record(exp_id: int, db: db_dependency):
    db_exp_id = db.query(models.ExpenseRecord).filter(models.ExpenseRecord.id == exp_id).first()
    if db_exp_id is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Expense record not found")
    db.delete(db_exp_id)
    db.commit()
    return {"message": "Expense record deleted"}
