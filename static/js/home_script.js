let pos_last_light_candle = -1;

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

function open_leaderboard() {
    window.location.replace("http://localhost:8000/leaderboard")
}

function light_candle(candle) {
    let current_pos = parseInt(candle.style.left.replace("px", ""));
    console.log(current_pos, pos_last_light_candle);

    if (pos_last_light_candle == 1388 && current_pos != 1567) {
        return;
    }

    if (pos_last_light_candle == -1 && current_pos == 1388) {
        console.log("some text");
        candle.style.opacity = 100;
        pos_last_light_candle = current_pos;
        return;
    }
    else if (pos_last_light_candle == -1) {
        return;
    }

    if (pos_last_light_candle - current_pos > 65 &&
        !(pos_last_light_candle == 1447 && current_pos == 1327)) {
        return;
    }

    pos_last_light_candle = current_pos;
    candle.style.opacity = 100;
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

function delacc() {
    const url = "http://localhost:8000/delacc";
    fetch(url, {
        "method": "POST",
        "headers": {
            "Content-Type": "application/json",
        },
        "body": JSON.stringify({
            "user_id": sessionStorage.getItem("user_id"),
        }),
    });
    window.location.replace("http://localhost:8000/auth/");
    sessionStorage.removeItem("user_id");
    sessionStorage.removeItem("token");
}
