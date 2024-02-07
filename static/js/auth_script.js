if (sessionStorage.getItem("user_id") != null) {
    window.location.replace("http://localhost:8000/home11/");
}

function registrate_user() {
    const url = "http://localhost:8000/add_user";

    const user_name = document.getElementById("user_name").value;
    const user_password = document.getElementById("user_password").value;
    const user_email = document.getElementById("user_email").value;

    console.log(user_email + ' ' + user_name + ' ' + user_password)

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
            alert("Welcome!");
            sessionStorage.setItem("user_id", json.id);
            sessionStorage.setItem("token", json.token);
            window.location.replace("http://localhost:8000/home/");
        }
        else {
            alert("Uncorrect password");
        }
    }
    else {
        alert("User was not found");
    }
}

function registration_button() {
    window.location.replace("http://localhost:8000/registration");
}

function login_button() {
    window.location.replace("http://localhost:8000/login");
}

