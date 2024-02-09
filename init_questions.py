from database_questions_functions import add_question, clear_db


def init():
    clear_db()

    add_question(
        question="Какой день у евреев- день отдыха ?",
        variants_answers=["cуббота", "воскресенье", "пятница", "никакой"],
        correct_answer="суббота",
        question_type="radio")

    add_question(
        question="Как называется святая книга у евреев ?",
        variants_answers=["Библия", "Коран", "Тора", "Теилим"],
        correct_answer="Тора",
        question_type="radio")

    add_question(
        question="Во сколько лет человек считается совершеннолетним ?",
        variants_answers=["0", "100"],
        correct_answer="13",
        question_type="number")

    add_question(
        question="как называется еврейский Новый год ?",
        variants_answers=None,
        correct_answer="Рош-а-шана",
        question_type="text")

    add_question(
        question="Как переводится Шалом с иврита ?",
        variants_answers=["мир", "пока", "привет", "все ответы верны"],
        correct_answer="все ответы верны",
        question_type="radio")

    add_question(
        question="Сколько лет евреи ходили по пустыне ?",
        variants_answers=["0", "100"],
        correct_answer="40",
        question_type="number")

    add_question(
        question="В честь чего евреи празднуют Песах ?",
        variants_answers=["в честь выхода из египта", "в честь дня рождения путина",
                          "в честь победы в 6ти днейвной войне", "в честь создания мироздания"],
        correct_answer="в честь выхода из египта",
        question_type="radio")

    add_question(
        question="Какого обычая нету у евреев на праздник пурим ?",
        variants_answers=["устраивать маскарад",
                          "дарить подарки", "давать милостыню", "есть Мацу"],
        correct_answer="есть Мацу",
        question_type="radio")

    add_question(
        question="Считается ли Иисус святым у евреев ? (да/нет)",
        variants_answers=None,
        correct_answer="да",
        question_type="text")

    add_question(
        question="Сколько дней длится праздник Ханука ?",
        variants_answers=["0", "365"],
        correct_answer="8",
        question_type="number")

    add_question(
        question="Что из перечисленного можно делать в шаббат (субботу, день отдыха) ?",
        variants_answers=["пользоваться телефоном", "гулять",
                          "работать", "носить что либо в руках за пределами дома"],
        correct_answer="гулять",
        question_type="radio")

    add_question(
        question="Сколько раз в день евреи молятся ?",
        variants_answers=["0", "100"],
        correct_answer="3",
        question_type="number")

    add_question(
        question="Какое из приведденых блюд кашерное ?",
        variants_answers=["осётр", "пельмени (со метаной, чтоб вкусней)",
                          "кола", "верблюд"],
        correct_answer="кола",
        question_type="radio")

    add_question(
        question="Кто такой раввин ?",
        variants_answers=["священник", "глава народа",
                          "любой еврей", "учитель"],
        correct_answer="учитель",
        question_type="radio")

    add_question(
        question="Сколько заповедей в Торе ?",
        variants_answers=["0", "1000"],
        correct_answer="613",
        question_type="number")

    add_question(
        question="Что такое синагога ?",
        variants_answers=["храм", "дом собрания",
                          "образовательное учредждение", "собор"],
        correct_answer="дом собрания",
        question_type="radio")
