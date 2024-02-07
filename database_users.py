from sqlalchemy import ForeignKey, String, Integer, SMALLINT
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship
from typing import Optional

from sqlalchemy import create_engine


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

    score: Mapped["Score"] = relationship(
        back_populates="user", cascade="all, delete-orphan")
    
    token: Mapped["Token"] = relationship(
        back_populates="user", cascade="all, delete-orphan")

    def __str__(self) -> str:
        return f"{self.id} {self.name} {self.email} {self.password.password} {self.score.score}"

    def __repr__(self) -> str:
        return f"{self.id} {self.name} {self.email} {self.password} {self.score}"


class Password(Base):
    __tablename__ = "passwords_table"

    id: Mapped[int] = mapped_column(primary_key=True)

    password: Mapped[str]

    user: Mapped["User"] = relationship(back_populates="password")

    user_id: Mapped[int] = mapped_column(ForeignKey("user_table.id"))

    def __str__(self) -> str:
        return f"{self.id} {self.user.email} {self.password}"

    def __repr__(self) -> str:
        return f"{self.id} {self.user.email} {self.password}"


class Score(Base):
    __tablename__ = "scores_table"

    id: Mapped[int] = mapped_column(primary_key=True)

    score: Mapped[int] = mapped_column(Integer())

    user: Mapped["User"] = relationship(back_populates="score")

    user_id: Mapped[int] = mapped_column(ForeignKey("user_table.id"))

    def __str__(self) -> str:
        return f"{self.id} {self.user.email} {self.score}"

    def __repr__(self) -> str:
        return f"{self.id} {self.user.email} {self.score}"


class Token(Base):
    __tablename__ = "tokens_table"

    id: Mapped[int] = mapped_column(primary_key=True)

    token: Mapped[int] = mapped_column(Integer())

    user: Mapped["User"] = relationship(back_populates="token")

    user_id: Mapped[int] = mapped_column(ForeignKey("user_table.id"))

    def __str__(self) -> str:
        return f"{self.id} {self.user.email} {self.token}"

    def __repr__(self) -> str:
        return f"{self.id} {self.user.email} {self.token}"

Base.metadata.create_all(engine)
