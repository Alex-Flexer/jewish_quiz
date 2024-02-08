import uvicorn
from fastapi import Request
from fastapi import FastAPI
from fastapi.responses import FileResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
from database_users_functions import (add_new_user, get_user_by_email,
                                      get_user_record_by_id, set_user_score_by_id, get_all_users,
                                      user_exists, delete_token, get_token_by_id, create_token)
from database_questions_functions import get_questions, get_correct_answers
from init_questions import init


app = FastAPI()

app.mount("/static", StaticFiles(directory="static", html=True), name="static")

init()


@app.get("/auth/")
async def send_auth_page() -> FileResponse:
    return FileResponse(r"static/html/auth_page.html")


@app.get("/israel/")
async def send_home_page() -> FileResponse:
    return FileResponse("static/html/home_page.html")


@app.get("/quiz/")
async def send_quiz_page() -> FileResponse:
    return FileResponse("static/html/test.html")


@app.get("/registration/")
async def send_registration_page() -> FileResponse:
    return FileResponse("static/html/registration.html")


@app.get("/login/")
async def send_login_page() -> FileResponse:
    return FileResponse("static/html/login.html")


@app.get("/questions")
async def send_questions() -> JSONResponse:
    return JSONResponse(get_questions())


@app.get("/result")
async def get_result_page() -> FileResponse:
    return FileResponse("static/html/result_page.html")


@app.get("/users/get/10")
async def get_result_page() -> FileResponse:
    users = get_all_users()
    users = sorted(users, key=lambda user: user.score)

    # response = {"users": users}
    # return FileResponse("static/html/result_page.html")


@app.post("/add_user")
async def add_user(requset: Request) -> JSONResponse:
    
    json = await requset.json()

    name = json["name"]
    email = json["email"]
    password = json["password"]

    print(name, email, password) 
    if user_exists(email):
        return JSONResponse(content={}, status_code=403)

    add_new_user(name=name, email=email, password=password)

    return JSONResponse(content={}, status_code=200)


@app.post("/login_user")
async def login_user(requset: Request) -> JSONResponse:
    json = await requset.json()

    email = json["email"]
    password = json["password"]

    if not user_exists(email):
        return JSONResponse(content={}, status_code=404)

    user = get_user_by_email(email=email)
    user_id = user.id

    accepted_response = user.password.password == password
    
    current_token = create_token(user_id=user_id) if accepted_response else None
        
    response_json = {"id": user.id, "token": current_token, "accepted": accepted_response}

    return JSONResponse(content=response_json, status_code=200)


@app.post("/logout")
async def logout_user(requset: Request):
    json = await requset.json()

    token = json["token"]
    delete_token(token=token)


@app.post("/submit_answers")
async def check_answers(request: Request) -> JSONResponse:
    json = await request.json()

    user_id = json["user_id"]

    user_answers = json["answers"]
    correct_answers = get_correct_answers()

    amount_questions = len(correct_answers)

    amount_correct_answers = sum([(user_answer == correct_answer)
                                  for user_answer, correct_answer in zip(correct_answers, user_answers)])

    new_score = round((amount_correct_answers / amount_questions) * 100)
    response = {"result": new_score}

    is_new_record = new_score > get_user_record_by_id(user_id=user_id).score

    if is_new_record:
        set_user_score_by_id(user_id=user_id, new_score=new_score)

    response = {"result": new_score, "is_new_record": is_new_record}

    return JSONResponse(content=response, status_code=200)


@app.post("/check/user")
async def check_user(request: Request) -> JSONResponse:
    json = await request.json()

    user_id = json["user_id"]
    token = json["token"]

    is_token_correct = get_token_by_id(user_id=user_id) == token

    return JSONResponse(content={"is_token_correct": is_token_correct})


@app.post("/record")
async def send_record(request: Request) -> JSONResponse:
    json = await request.json()

    user_id = json["user_id"]
    record = get_user_record_by_id(user_id=user_id).score

    return JSONResponse(content={"record": record})


if __name__ == '__main__':
    uvicorn.run('main:app', port=8000, reload=True)
