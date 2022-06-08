let button = document.getElementById("button");
let field = document.getElementById("form_input");
let myform = document.forms["myform"];
button.onclick = function() {
    field.innerText = myform.elements["pole_tekstowe"].value + " " + myform.elements["pole_liczbowe"].value;
}; 