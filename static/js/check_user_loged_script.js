function check_user_loged() {
    const url = "http://localhost:8000/check/user";

    const token = sessionStorage.getItem("token");
    const user_id = sessionStorage.getItem("user_id");

    if (user_id == null || token == null) {
        window.location.replace("http://localhost:8000/auth/");
    }

    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "user_id": user_id,
            "token" : token
        }),
    })
    .then((response) => response.text())
    .then((text) => JSON.parse(text))
    .then((json) => {
        if (!json.is_token_correct) {
            window.location.replace("http://localhost:8000/auth/");
        }
    });
}
