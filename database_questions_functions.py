from sqlalchemy.orm import Session
from sqlalchemy import select
from data_base_questions import engine, Question, Answers
from typing import Optional


session = Session(engine)

QUESTION_TYPES = {"radio", "text", "number", "image", "checkbox", "button"}


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
             "correct_answer": question.correct_answer}
            for ind, question in enumerate(questions)]


def add_question(question: str, variants_answers: list[str], correct_answer: str, question_type: str):
    if question_type not in QUESTION_TYPES:
        raise TypeError("Unknown type of question")

    session.add(Question(
        question=question,
        variants_answers=[Answers(answer=answer)
                          for answer in variants_answers],
        correct_answer=correct_answer,
        question_type=question_type)
    )
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
    # add_question("how old are you ?", [
    #              '10 years old', '5', 'more old', 'i dont talk about it'], 'good', "radio")

    # add_question("what is your name?", [], "5", "number")
    # add_question()
    # clear_db()
    show_db()
