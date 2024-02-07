// import { check_user_loged } from './check_user_loged_script.js';


// check_user_loged();

let questions;
let id_current_question = -1;
let user_answers = [];

get_questions();


function get_questions() {
    const url = "http://localhost:8000/questions/"
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
        .then(() => next_question())
        .catch((error) => console.log(error));
}


function submit_answers() {
    save_user_answer(questions[id_current_question]);

    console.log(sessionStorage.getItem("user_id"));
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
        .then((json) => {
            sessionStorage.setItem("result", json.result);
            sessionStorage.setItem("is_new_record", json.is_new_record)
        })
        .then(() => window.location.replace("http://localhost:8000/result/"))
        .catch((error) => console.log(error));
}

function clear_previous_answer_fields() {
    document.getElementById('answer_field').innerHTML = "";
}

function next_question() {
    // console.log("next_question!")

    // console.log(id_current_question);
    id_current_question++;
    let current_question = questions[id_current_question];

    if (id_current_question > 0) {
        let previous_question = questions[id_current_question - 1];
        save_user_answer(previous_question);
    }


    if (id_current_question == questions.length - 1) {
        let button = document.getElementById("button");
        console.log("last question");
        button.onclick = submit_answers;
        button.innerHTML = "submit my answers";
    }

    clear_previous_answer_fields();

    document.getElementById('question').innerHTML = current_question.question;

    add_answers(current_question);
    // console.log(current_question.variants);
}



function add_answers(question) {
    // console.log("add answers!");

    switch (question.question_type) {
        case "radio": add_selectable_answers(question); break;

        case "checkbox": add_selectable_answers(question); break;

        case "text": add_text_answer(); break;

        case "image": add_image_answer(question); break;

        case "number": add_number_answer(question); break;
    }
}

function add_selectable_answers(question) {
    // console.log("with label!");

    let question_type = question.question_type;
    let answers_field = document.getElementById("answer_field");

    const amount_questions = question.variants.length;

    for (let index_variant_answer = 0; index_variant_answer < amount_questions; index_variant_answer++) {
        let answer_field = document.createElement("div");

        let input_answer_field = document.createElement("input");
        input_answer_field.type = question_type;

        let answer_label = document.createElement("label");
        answer_label.innerHTML = question.variants[index_variant_answer];

        answer_field.appendChild(input_answer_field);
        answer_field.appendChild(answer_label);

        answers_field.appendChild(answer_field);
    }
}

function add_number_answer(question) {
    // console.log("with number!");

    let answers_field = document.getElementById("answer_field");

    let answer_field = document.createElement("div");
    let input_answer_field = document.createElement("input");

    input_answer_field.type = "number";
    input_answer_field.min = toString(question.variants[0]);
    input_answer_field.max = toString(question.variants[1]);

    answers_field.appendChild(answer_field).appendChild(input_answer_field);
}

function add_text_answer() {
    // console.log("with text!");

    let answers_field = document.getElementById("answer_field");

    let answer_field = document.createElement("div");
    let input_answer_field = document.createElement("input");

    input_answer_field.type = "text";

    answers_field.appendChild(answer_field).appendChild(input_answer_field);
}

function add_image_answer(question) {
    // console.log("with image!");
    let answers_field = document.getElementById("answer_field");

    let amount = question.variants.length;

    for (let index_variant_answer = 0; index_variant_answer < amount; index_variant_answer++) {
        let answer_field = document.createElement("div");

        let input_answer_field = document.createElement("input");
        input_answer_field.type = "image";
        input_answer_field.src = question.variants[index_variant_answer];

        answers_field.appendChild(answer_field).appendChild(input_answer_field);
    }
}



function save_user_answer(question) {
    let question_type = question.question_type;
    switch (question_type) {
        case "radio":
            user_answers.push(get_selectable_answer(question));
            break;

        case "checkbox":
            user_answers.push(get_selectable_answer(question));
            break;

        case "text":
            user_answers.push(get_text_answer());
            break;

        case "image":
            user_answers.push(get_image_answer());
            break;

        case "number":
            user_answers.push(get_number_answer());
            break;
    }
    console.log("user answers: ", user_answers);
}

function get_selectable_answer(question) {
    console.log("selectable answers")
    let input_elements = document.getElementsByTagName("input");
    console.log("input elements", input_elements);

    for (let index_input_element = 0; index_input_element < input_elements.length; index_input_element++) {
        const element = input_elements[index_input_element];

        if (element.checked) {
            console.log("jdfjasdfjk");
            return question.variants[index_input_element];
        }
    }
}

function get_number_answer() {
    let input_number_element = document.getElementsByTagName("input")[0];
    console.log(input_number_element);
    return input_number_element.value;
}

function get_text_answer() {
    let input_text_element = document.getElementsByTagName("input")[0];
    return input_text_element.value;
}

function get_image_answer() {
    let input_image_element = document.getElementsByTagName("input")[0];
    return input_image_element.src;
}
