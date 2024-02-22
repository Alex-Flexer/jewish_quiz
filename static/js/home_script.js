if (!check_user_loged()) {
    window.location.replace("http://localhost:8000/auth/");
}
else {
    load_best_score()
}

let pos_last_light_candle = -1;


// init sound variales

let sounds_money = [
    new Howl({
        src: ['../static/music/деньги/0-29.mp3'],
        volume: 0.5,
    }),

    new Howl({
        src: ['../static/music/деньги/30-54.mp3'],
        volume: 0.5,
    }),

    new Howl({
        src: ['../static/music/деньги/55-69.mp3'],
        volume: 0.5,
    }),

    new Howl({
        src: ['../static/music/деньги/70-99.mp3'],
        volume: 0.5,
    }),

    new Howl({
        src: ['../static/music/деньги/100.mp3'],
        volume: 0.5,
    })
]

let sound_candle = new Howl({
    src: ['../static/music/зажигание свечи.mp3'],
    volume: 1,
});

let sound_fail_light_candle = new Howl({
    src: ['../static/music/звук не получается зажечь.mp3'],
    volume: 1,
});


function check_user_loged() {
    const url = "http://localhost:8000/check/user";

    const token = sessionStorage.getItem("token");
    const user_id = sessionStorage.getItem("user_id");

    console.log(user_id, token);
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

    if (pos_last_light_candle == 1388 && current_pos != 1567) {
        sound_fail_light_candle.play();
        return;
    }

    if (pos_last_light_candle == -1 && current_pos == 1388) {
        candle.style.opacity = 100;
        pos_last_light_candle = current_pos;
        sound_candle.play();
        return;
    }
    else if (pos_last_light_candle == -1) {
        sound_fail_light_candle.play();
        return;
    }

    if (pos_last_light_candle - current_pos > 65 &&
        !(pos_last_light_candle == 1447 && current_pos == 1327)) {

        if (candle.style.opacity != 100) {
            sound_fail_light_candle.play();
        }
        return;
    }

    if (candle.style.opacity != 100) {
        pos_last_light_candle = current_pos;
        candle.style.opacity = 100;
        sound_candle.play();
    }
}

function on_click_money_bag() {
    let score = sessionStorage.getItem("record");

    if (score <= 29) {
        sounds_money[0].play();
    }

    else if (score <= 54) {
        sounds_money[1].play();
    }

    else if (score <= 69) {
        sounds_money[2].play();
    }

    else if (score <= 99) {
        sounds_money[3].play();
    }

    else {
        sounds_money[4].play();
    }
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
            sessionStorage.setItem("record", record);
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
