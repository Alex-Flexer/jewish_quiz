show_result()

function show_result() {
    let result = sessionStorage.getItem("result");

    let result_field = document.getElementById("result");
    result_field.innerHTML = result + "%";
}

function home() {
    document.location.replace("http://localhost:8000/israel")
}
