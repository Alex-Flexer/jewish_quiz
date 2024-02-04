from database_questions_functions import add_question, clear_db


def init():
    clear_db()

    add_question(
        question="Сколько Саша изучает программирование ?",
        variants_answers=["меньше года", "> 1", "> 3", "> 5","> 10", "> 15"],
        correct_answer="> 5",
        question_type="radio")

    add_question(
        question="Со скольки лет Саша изучает программирование ?",
        variants_answers=["1", "16"],
        correct_answer="10",
        question_type="number")

    add_question(
        question="Какой Сашин любимый цвет ?",
        variants_answers=["Синий", "Зеленый",
                          "Бирюзовый", "Ораньжевый", "Красный"],
        correct_answer="Бирюзовый",
        question_type="radio")

    add_question(
        question="Какая у саши фамиля ?",
        variants_answers=None,
        correct_answer="Флексер",
        question_type="text")
