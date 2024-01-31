from sqlalchemy import ForeignKey, String, Integer
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship
from typing import Optional

from sqlalchemy import create_engine


class Base(DeclarativeBase):
    pass


engine = create_engine("sqlite:///database_users.db")


class Base(DeclarativeBase):
    pass


class User(Base):
    __tablename__ = "user_table"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(20))

    email: Mapped[Optional[str]]

    password: Mapped["Password"] = relationship(
        back_populates="user", cascade="all, delete-orphan")

    def __str__(self) -> str:
        return f"{self.id} {self.name} {self.email}"

    def __repr__(self) -> str:
        return f"{self.id} {self.name} {self.email}"


class Password(Base):
    __tablename__ = "passwords_table"

    id: Mapped[int] = mapped_column(primary_key=True)

    password: Mapped[str]

    user: Mapped["User"] = relationship(back_populates="password")

    user_id: Mapped[int] = mapped_column(ForeignKey("user_table.id"))

    def __str__(self) -> str:
        return f"{self.id} {self.password} {self.user_id}"

    def __repr__(self) -> str:
        return f"{self.id} {self.password} {self.user_id}"


Base.metadata.create_all(engine)
