from sqlalchemy import ForeignKey, String
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship
from typing import Any, List, Optional, Union

from sqlalchemy import create_engine


class Base(DeclarativeBase):
    pass


class Question(Base):
    __tablename__ = "questions_table"

    id: Mapped[int] = mapped_column(primary_key=True)

    question: Mapped[str] = mapped_column(String(20))

    correct_answer: Mapped[Optional[str]] = mapped_column(String(20))

    question_type: Mapped[str] = mapped_column(String(20))

    variants_answers: Mapped[Union[None, List["Answers"]]] = relationship(
        back_populates="question", cascade="all, delete-orphan"
    )

    def __str__(self) -> str:
        return f"{self.id} {self.question} {self.correct_answer} {self.variants_answers} {self.question_type}"

    def __repr__(self) -> str:
        return f"{self.id} {self.question} {self.correct_answer} {self.variants_answers} {self.question_type}"

    def __init__(self, **kwargs: Any):
        if kwargs["variants_answers"] == None:
            kwargs.pop("variants_answers")

        super().__init__(**kwargs)


class Answers(Base):
    __tablename__ = "answers_table"

    id: Mapped[int] = mapped_column(primary_key=True)

    answer: Mapped[Optional[str]] = mapped_column(String(20))

    question: Mapped["Question"] = relationship(
        back_populates="variants_answers")

    question_id: Mapped[int] = mapped_column(ForeignKey("questions_table.id"))

    def __str__(self) -> str:
        return f"{self.id} {self.answer}"

    def __repr__(self) -> str:
        return f"{self.id} {self.answer}"


engine = create_engine("sqlite:///database_questions.db")

# if __name__ == "__main__":
Base.metadata.create_all(engine)
