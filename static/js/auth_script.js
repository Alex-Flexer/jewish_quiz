if (sessionStorage.getItem("user_id") != null) {
    window.location.replace("http://localhost:8000/israel/");
}

function registrate_user() {
    const url = "http://localhost:8000/add_user";

    const user_name_field = document.getElementById("user_name");
    const user_email_field = document.getElementById("user_email");
    const user_password_field = document.getElementById("user_password");

    const user_name = user_email_field.value;
    const user_email = user_email_field.value;
    const user_password = user_password_field.value;

    let is_form_full = true;

    if (user_name == "") {
        user_name_field.style.boxShadow = "0 0 10px 5px #5e2538";
        is_form_full = false;
    }

    if (user_email == "") {
        user_email_field.style.boxShadow = "0 0 10px 5px #5e2538";
        is_form_full = false;

    }
    if (user_password == "") {
        user_password_field.style.boxShadow = "0 0 10px 5px #5e2538";

        is_form_full = false;
    }

    if (!is_form_full) {
        return
    }

    fetch(url, {
        "method": "POST",
        "headers": {
            "Content-Type": "application/json",
        },
        "body": JSON.stringify({
            "name": user_name,
            "email": user_email,
            "password": user_password
        }),
    })
        .then((response) => response.status)
        .then((status) => check_user_exist(status))
        .catch((error) => console.log(error));
}

function check_user_exist(status) {
    if (status == 200) {
        alert("Аккаунт был успешно создан! Пожалуйста авторизуйтесь.")
        window.location.replace("http://localhost:8000/login/");
    }
    else if (status == 403) {
        alert("Пользователь с такой почтой уже существует.");
    }
    else {
        alert("Неизвестная ошибка.");
    }
}

function login_user() {
    const url = "http://localhost:8000/login_user";
    const user_email = document.getElementById("user_email").value;
    const user_password = document.getElementById("user_password").value;

    console.log(typeof user_email);
    let status;

    fetch(url, {
        "method": "POST",
        "headers": {
            "Content-Type": "application/json",
        },
        "body": JSON.stringify({
            "email": user_email,
            "password": user_password
        }),
    })
        .then((response) => {
            status = response.status;
            return response.text();
        })
        .then((text) => JSON.parse(text))
        .then((json) => check_user(json, status))
        .catch((error) => console.log(error));
}

function check_user(json, status) {
    if (status == 200) {
        let accepted = json.accepted;
        if (accepted) {
            sessionStorage.setItem("user_id", json.id);
            sessionStorage.setItem("token", json.token);
            window.location.replace("http://localhost:8000/israel/");
        }
        else {
            alert("Неверный пароль");
        }
    }
    else {
        alert("Пользовател не был найден.");
    }
}

function registration_button() {
    window.location.replace("http://localhost:8000/registration");
}

function login_button() {
    window.location.replace("http://localhost:8000/login");
}

function home() {
    window.location.replace("http://localhost:8000/israel");
}
