from database import Base
from sqlalchemy import Column, Integer, String

class Product(Base):
    __tablename__ = "products"
    id = Column(Integer, primary_key=True, nullable=False, index=True)
    name = Column(String, nullable=False,  default="Unknown")
    category = Column(String, nullable=False,  default="Unknown")
    price = Column(Integer, nullable=False, default=0)
