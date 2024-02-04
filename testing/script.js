

function onclick_button() {
    create_elements();
    // let a = document.getElementsByTagName("input");
    // for (let i = 0; i < a.length; i++) {
    //     console.log(a[i].checked);
    // }
}

function some_function() {
    let a = document.getElementsByTagName("input");
    let amount_selected = 0;
    for (let i = 0; i < a.length; i++) {
        amount_selected += a[i].checked;
    }

    console.log(amount_selected);
}



function change_state(input_element) {
    let a = document.getElementsByTagName("input");
    for (let i = 0; i < a.length; i++) {
        a[i].checked = false;
    }
    input_element.checked = true;
}


function create_elements() {
    let input = document.createElement("input");
    input.type = "radio";
    input.name = "some name";

    let label = document.createElement("label");
    label.for = "some name";
    label.innerHTML = "some text";

    document.getElementsByClassName("field_answers")[0].appendChild(input);
    document.getElementsByClassName("field_answers")[0].appendChild(label);
}
