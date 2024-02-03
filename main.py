import uvicorn
from fastapi import Request
from fastapi import FastAPI
from fastapi.responses import FileResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
from database_users_functions import (add_new_user, get_user_by_email,
                                      get_user_by_id, delete_user_by_email,
                                      delete_user_by_id, ger_user_id_by_email,
                                      user_exists)
from database_questions_functions import get_questions, get_correct_answers


app = FastAPI()

app.mount("/static", StaticFiles(directory="static", html=True), name="static")


@app.get("/auth/")
async def get_auth_page() -> FileResponse:
    return FileResponse(r"static/html/auth_page.html")


@app.get("/home/")
async def get_home_page() -> FileResponse:
    return FileResponse("static/html/home_page.html")


@app.get("/quiz/")
async def get_quiz_page() -> FileResponse:
    return FileResponse("static/html/test.html")


@app.get("/registration/")
async def get_registration_page() -> FileResponse:
    return FileResponse("static/html/registration.html")


@app.get("/login/")
async def get_login_page() -> FileResponse:
    return FileResponse("static/html/login.html")


@app.post("/add_user")
async def create_user(requset: Request) -> JSONResponse:
    json = await requset.json()

    name = json["name"]
    email = json["email"]
    password = json["password"]

    print(name, email, password)
    if user_exists(email):
        return JSONResponse(content={}, status_code=403)

    add_new_user(name=name, email=email, password=password)

    return JSONResponse(content={}, status_code=200)


@app.post("/find_user")
async def find_user(requset: Request) -> JSONResponse:
    json = await requset.json()

    email = json["email"]
    password = json["password"]

    if not user_exists(email):
        return JSONResponse(content={}, status_code=404)

    user = get_user_by_email(email=email)
    accepted_response = user.password.password == password
    response_json = {"id": user.id, "accepted": accepted_response}

    return JSONResponse(content=response_json, status_code=200)


@app.post("/submit_answers")
async def check_answers(request: Request) -> JSONResponse:
    json = await request.json()
    answers = get_correct_answers()
    amount_questions = len(answers)
    amount_correct_answers = sum([int(user_answer == correct_answer)
                                  for user_answer, correct_answer in zip(answers, json)])

    response = {"result": amount_correct_answers / amount_questions}

    return JSONResponse(content=response, status_code=200)


@app.get("/get_questions")
async def sent_questions() -> JSONResponse:
    return JSONResponse(get_questions())


@app.get("/show_results")
async def sent_questions() -> JSONResponse:
    return JSONResponse(content={"result": 83})


@app.get("/result")
async def sent_questions() -> JSONResponse:
    return FileResponse("static/html/result.html")


if __name__ == '__main__':
    uvicorn.run('main:app', port=8000, reload=True)
