check_is_user_authorized();

function check_is_user_authorized() {
    console.log(sessionStorage.getItem("user_id"));
    if (sessionStorage.getItem("user_id") == null) {
        window.location.replace("http://localhost:8000/auth/");
    }
}

function onTakeQuizButtonClick() {
    const user_id = document.getElementById("user_id").value;

    const url = 'http://localhost:8000/quiz';
    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "user_id": user_id
        }),
    })
        .then((response) => response.text())
        .then((text) => JSON.parse(text))
        .then((json) => json_response = json)
        .catch((error) => console.log(error));
}

function onStartQuizButtonClick() {
    const url = 'http://localhost:8000/quiz';
    fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "user_id": user_email
        }),
    })
        .then((response) => response.text())
        .then((text) => JSON.parse(text))
        .then((json) => json_response = json)
        .catch((error) => console.log(error));
}