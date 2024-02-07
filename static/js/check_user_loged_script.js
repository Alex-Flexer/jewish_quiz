const check_user_loged = () => {
    const url = "http://localhost:8000/check/user";

    const token = sessionStorage.getItem("token");
    const user_id = sessionStorage.getItem("user_id");
    alert(user_id);

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

export { check_user_loged };
