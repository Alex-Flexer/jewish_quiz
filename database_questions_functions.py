from sqlalchemy.orm import Session
from sqlalchemy import select
from database_questions import engine, Question, Answers
from typing import Optional, Union


session = Session(engine)

QUESTION_TYPES = {"radio", "text", "number", "image", "checkbox", "button"}


def check_question_correctness(question_type: str, question_variants: Optional[list[str]]):

    if question_type not in QUESTION_TYPES:
        raise TypeError(f"Question type {question_type} does not exists")

    if question_type == "text" and question_variants:
        return TypeError("Questions type text must not have any variants for answers: "
                         f"you have {question_variants}")

    if question_type in {"radio", "checkbox"} and not isinstance(question_variants, list):
        return TypeError(f"Questions type {question_type} must be list: "
                         f"you gave {type(question_variants)}")

    if question_type in {"radio", "checkbox"} and not isinstance(question_variants, list):
        return TypeError(f"Questions type {question_type} must be list: "
                         f"you gave {type(question_variants)}")
    


def show_db():
    questions = session.query(Question).all()
    for question in questions:
        print(question)


def clear_db():
    questions = session.query(Question).all()
    list_id = [user.id for user in questions]

    for question_id in list_id:
        session.query(Question).filter_by(id=question_id).delete()
        session.query(Answers).filter_by(question_id=question_id).delete()

    session.commit()


def get_questions() -> list[dict[str | list[str]]]:
    questions = session.query(Question).all()
    variants_answers = [[answer.answer for answer in question.variants_answers]
                        for question in questions]

    return [{"question": question.question,
             "variants": variants_answers[ind],
             "correct_answer": question.correct_answer,
             "question_type": question.question_type}
            for ind, question in enumerate(questions)]


def add_question(question: str, variants_answers: Optional[list[str]], correct_answer: str, question_type: str):
    check_question_correctness(question_type=question_type, question_variants=variants_answers)

    response_variants_answers = [Answers(answer=answer)
                                 for answer in variants_answers] if variants_answers else None

    new_question = Question(
        question=question,
        variants_answers=response_variants_answers,
        correct_answer=correct_answer,
        question_type=question_type)

    session.add(new_question)
    session.commit()


def get_correct_answers() -> list[str]:
    questions = get_questions()
    return [question["correct_answer"] for question in questions]


if __name__ == "__main__":
    ...
