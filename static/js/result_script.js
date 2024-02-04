show_result()

function show_result() {
    let result = sessionStorage.getItem("result");

    let result_field = document.getElementById("result");
    result_field.innerHTML = "Your result: " + result;

    console.log(result_field);
}
