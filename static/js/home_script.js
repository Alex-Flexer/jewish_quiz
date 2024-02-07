console.log(sessionStorage.getItem("user_id"));
if (sessionStorage.getItem("user_id") == null) {
    window.location.replace("http://localhost:8000/auth/");
}
else{
    load_best_score()
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
            document.getElementById("record").innerHTML = record;
        })
        .catch((error) => console.log(error));
}

function start_quiz() {
    window.location.replace("http://localhost:8000/quiz")
}

function logout() {
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
