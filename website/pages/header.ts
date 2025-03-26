let logB = document.getElementById("logB") as HTMLButtonElement;
let signB = document.getElementById("signB") as HTMLButtonElement;

signB.onclick = function () {
    location.href = "signUp.html";
}
logB.onclick = function () {
    location.href = "logIn.html";
}