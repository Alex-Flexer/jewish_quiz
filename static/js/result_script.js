function get_result(){
    const url = "http://localhost:8000/submit_answers/"
    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "user_id": sessionStorage.getItem("user_id"),
            "answers": user_answers
        }),
    })
        .then((response) => response.text())
        .then((text) => JSON.parse(text))
        .then((json) => json.result)
        .then((result) => show_result(result))
        .catch((error) => console.log(error));
}

function show_result(result){
    let result_field = document.getElementById("result");
    result_field.innerHTML = "Your result: " + result;
}