let questions;
var id_question = -1;
let user_answers = [];

get_questions();
// alert(questions);
// next_question();

function submit_answers() {
    const url = "http://localhost:8000/submit/"
    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "user_id": sessionStorage.getItem("user_id")
        }),
    })
        .then((response) => response.text())
        .then((text) => JSON.parse(text))
        .catch((error) => console.log(error));
}


function get_questions() {
    const url = "http://localhost:8000/get_questions/"
    fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((response) => response.text())
        .then((text) => JSON.parse(text))
        .then((json) => questions = json)
        // .then((_) => console.log(questions[0]))
        .then((_) => next_question())
        .catch((error) => console.log(error));
}


function next_question() {
    id_question++;
    if (id_question >= questions.length){
        return;
    }
    console.log("start next_question function");
    let current_question = questions[id_question];
    document.getElementById('question').innerHTML = current_question.question;
    document.getElementById('answer_field').type = current_question.question_type;

    add_answers(current_question)

}

function add_answers(question) {
    let question_type = question.question_type;
    let answers_field = document.getElementById("answer_field");
    let amount = questions[id_question].variants.length;

    console.log(amount);
    console.log(answers_field);
    for(let i = 0; i < amount; i++)
    {
        let answer = document.createElement("div");

        let new_answer_field = document.createElement("input");
        new_answer_field.type = question_type;

        answers_field.appendChild(answer).appendChild(new_answer_field);
    }
}
