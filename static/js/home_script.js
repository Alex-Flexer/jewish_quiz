if (!check_user_loged()) {
    window.location.replace("http://localhost:8000/auth/");
}
else {
    load_best_score()
}

function check_user_loged() {
    const url = "http://localhost:8000/check/user";

    const token = sessionStorage.getItem("token");
    const user_id = sessionStorage.getItem("user_id");

    if (user_id == null || token == null) {
        return false;
    }

    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "user_id": user_id,
            "token": token
        }),
    })
        .then((response) => response.text())
        .then((text) => JSON.parse(text))
        .then((json) => {
            if (!json.is_token_correct) {
                return false;
            }
        });
    return true;
}


function load_best_score() {
    const url = "http://localhost:8000/record";
    const user_id = sessionStorage.getItem("user_id");

    fetch(url, {
        "method": "POST",
        "headers": {
            "Content-Type": "application/json",
        },
        "body": JSON.stringify({
            "user_id": user_id,
        }),
    })
        .then((response) => response.text())
        .then((text) => JSON.parse(text))
        .then((json) => json.record)
        .then((record) => {
            document.getElementById("record").innerHTML = `Мой коэффициент еврейства: ${record}`;
        })
        .catch((error) => console.log(error));
}

function start_quiz() {
    window.location.replace("http://localhost:8000/quiz")
}

function logout() {
    console.log("some text");
    const url = "http://localhost:8000/logout";
    fetch(url, {
        "method": "POST",
        "headers": {
            "Content-Type": "application/json",
        },
        "body": JSON.stringify({
            "token": sessionStorage.getItem("token"),
        }),
    });

    sessionStorage.removeItem("user_id");
    sessionStorage.removeItem("token");

    window.location.replace("http://localhost:8000/auth/");
}
