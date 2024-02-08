load_10_user();

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
        .then((json) => show_leaders(json.users))
}

function show_leaders(json) {
    // console.log(json);
    const board = document.getElementById("board");
    for (let index = 0; index < json.length; index++) {
        const user = json[index];

        const new_line = document.createElement("tr");

        const name = document.createElement("td");
        name.innerHTML = user.name;

        const email = document.createElement("td");
        email.innerHTML = user.email;

        const score = document.createElement("td");
        score.innerHTML = user.score;

        new_line.appendChild(name);
        new_line.appendChild(email);
        new_line.appendChild(score);
        console.log(new_line);
        board.appendChild(new_line);
    }
    console.log(board);
}


function home() {
    window.location.replace("http://localhost:8000/israel")
}