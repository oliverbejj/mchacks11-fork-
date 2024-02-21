from fastapi import FastAPI, HTTPException, Depends, status
from pydantic import BaseModel, Field
import models
from database import engine, SessionLocal
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import Column, Integer, String


app = FastAPI()

models.Base.metadata.create_all(bind=engine)





app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8000/", "http://127.0.0.1:8000/", "*" ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close





class Product(BaseModel):
    id: int = Field(min_LENGTH=1, autoincrement=True, primary_key=True)
    name: str = Field(min_length=1)
    category: str = Field(min_length=1)
    price: int = Field(gt=-1)




@app.get("/send/")
def read_root(db: Session = Depends(get_db), skip: int = 0, limit: int = 100):
    print("Request received at /send endpoint")
    db_exp_rec = db.query(models.Product).offset(skip).limit(limit).all()
    if db_exp_rec is None:
        HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Expense record not found")
    return db_exp_rec
    


@app.post("/posts/")
def create_product(product: Product, db: Session = Depends(get_db)):
    db_product = models.Product(name=product.name, category=product.category, price=product.price)
    db.add(db_product)
    db.commit()
    db.refresh(db_product)
    print(db_product)
    return db_product



@app.delete("/del/{product_id}/")
def delete_product(product_id: int, db: Session = Depends(get_db)):
    product_model=db.query(models.Product).filter(models.Product.id==product_id).first()

    if product_model is None:
        raise HTTPException(status_code=404, detail="Product not found")
    db.query(models.Product).filter(models.Product.id==product_id).delete()
    db.commit()
    return {"detail": "Product deleted successfully"}





@app.delete("/clear/")
def clear_db(db: Session = Depends(get_db)):
    db.query(models.Product).delete()
    db.commit()
    return {"detail": "Database cleared successfully"}




