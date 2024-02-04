from sqlalchemy.orm import Session
from sqlalchemy import select
from database_questions import engine, Question, Answers
from typing import Optional, Union


session = Session(engine)

QUESTION_TYPES = {"radio", "text", "number", "image", "checkbox", "button"}


def check_answer_compatibility_type_with_content(question: Question) -> Union[bool, Exception]:
    question_type = question.question_type
    question_variants = question.variants_answers

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
    if question_type not in QUESTION_TYPES:
        raise TypeError("Unknown type of question")

    response_variants_answers = [Answers(answer=answer)
                                 for answer in variants_answers] if variants_answers else None

    new_question = Question(
        question=question,
        variants_answers=response_variants_answers,
        correct_answer=correct_answer,
        question_type=question_type)

    response_checking_question: Union[bool, Exception] =\
        check_answer_compatibility_type_with_content(new_question)

    if isinstance(response_checking_question, Exception):
        raise response_checking_question

    session.add(new_question)
    session.commit()


def get_correct_answers() -> list[str]:
    questions = get_questions()
    return [question["correct_answer"] for question in questions]


if __name__ == "__main__":
    # print(get_user_by_id(12))
    # print(get_user_by_email("sasha.flexsdfger@gmail.com"))
    # add_new_user("alex", "sasha.flexer@gmail.com", "alex2008")
    # add_new_user("daniel", "daniel.suh@email.ru", "danyaSuh!2009")
    # delete_user_by_id(2)
    # delete_user_by_email("sasha.flexer@gmail.com")
    # clear_db()

    # add_question("what is your favourite color?", None, "5", "number")
    # add_question()
    # clear_db()
    ...
    # show_db()
