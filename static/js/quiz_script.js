let questions;
let id_question = -1;
let current_answer;
let user_answers = [];


get_questions();


function submit_answers() {
    // const url = "http://localhost:8000/submit/"
    // fetch(url, {
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //         "user_id": sessionStorage.getItem("user_id"),
    //         "answers": user_answers
    //     }),
    // })
    //     .then((response) => response.text())
    //     .then((text) => JSON.parse(text))
    //     .then((json) => json.result)
    //     .then((result) => sessionStorage.setItem("last result", result))
    //     .then(() => window.location.replace("http://localhost:8000/show_results/"))
    //     .catch((error) => console.log(error));
    window.location.replace("http://localhost:8000/results/")
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

function clear_previous_answer_fields(){
    document.getElementById('answer_field').innerHTML = "";
}

function next_question() {
    console.log("next_question!")

    id_question++;
    // console.log(id_question);
    // console.log(questions.length - 1);
    if (id_question == questions.length - 1){
        let button = document.getElementById("button");
        console.log("last question");
        button.onclick = submit_answers;
        button.innerHTML = "submit my answers";
    }

    clear_previous_answer_fields();

    let current_question = questions[id_question];

    document.getElementById('question').innerHTML = current_question.question;    

    add_answers(current_question)

}

function add_answers(question) {
    console.log("add answers!")
    clear_previous_answer_fields();

    switch(question.question_type){
        case "radio": add_answers_with_label(question); break;

        case "checkbox": add_answers_with_label(question); break;

        case "text": add_text_answer(question); break;

        case "image": add_image_answer(question); break;

        case "button": add_button_answer(question); break;
    }
    user_answers.push(current_answer);
}

function add_answers_with_label(question){
    console.log("with label!");
    let question_type = question.question_type;
    let answers_field = document.getElementById("answer_field");

    let amount = question.variants.length;

    for(let index_variant_answer = 0; index_variant_answer < amount; index_variant_answer++)
    {
        let answer = document.createElement("div");

        let new_answer_field = document.createElement("input");
        new_answer_field.type = question_type;
        
        let new_answer_label = document.createElement("label");
        new_answer_label.innerHTML = question.variants[index_variant_answer];
        
        answer.appendChild(new_answer_field);
        answer.appendChild(new_answer_label);

        answers_field.appendChild(answer);
    }
}

function add_number_answer(question){
    console.log("with number!");
    let question_type = question.question_type;

    let answers_field = document.getElementById("answer_field");

    let answer = document.createElement("div");
    let new_answer_field = document.createElement("input");

    new_answer_field.type = question_type;
    new_answer_field.min = toString(question.variants[0]);
    new_answer_field.max = toString(question.variants[1]);

    answers_field.appendChild(answer).appendChild(new_answer_field);
}

function add_text_answer(question){
    console.log("with text!");
    let question_type = question.question_type;

    let answers_field = document.getElementById("answer_field");

    let answer = document.createElement("div");
    let new_answer_field = document.createElement("input");

    new_answer_field.type = question_type;

    answers_field.appendChild(answer).appendChild(new_answer_field);
}

function add_image_answer(question){
    console.log("with image!");
    let question_type = question.question_type;
    let answers_field = document.getElementById("answer_field");

    let amount = question.variants.length;

    for(let index_variant_answer = 0; index_variant_answer < amount; index_variant_answer++)
    {
        let answer = document.createElement("div");

        let new_answer_field = document.createElement("input");
        new_answer_field.type = question_type;
        new_answer_field.id = "image" + index_variant_answer;
        new_answer_field.src = question.variants[index_variant_answer];
        
        answer.appendChild(new_answer_field);
        answer.appendChild(new_answer_label);

        answers_field.appendChild(answer);
    }
}
