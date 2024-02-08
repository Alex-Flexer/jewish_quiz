function load_10_user() {
    const url = "http://localhost:8000/get/users/10"
    fetch(url, {
        method: "Get",
        headers: {
            "Content-Type": "application/json",
        }
    })
        .then((response) => response.text())
        .then((text) => JSON.parse(text))
        .then((json) => show_leaders(json))
}

function show_leaders(json) {
    const board = document.getElementById("board");
    for (let index = 0; index < json.lenght; index++) {
        const user = json[index];

        const new_line = document.createElement("tr");

        const name = document.createElement("td");
        name.innerHTML = user.name;

        const email = document.createElement("td");
        email.innerHTML = user.email;

        const score = document.createElement("td");
        score.innerHTML = user.score;

        new_line.appendChild(name).appendChild(email).appendChild(score);
        board.appendChild(new_line);
    }
}