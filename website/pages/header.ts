import { send } from "../utilities";

let logB = document.getElementById("logB") as HTMLButtonElement;
let signB = document.getElementById("signB") as HTMLButtonElement;
let loggedOutDiv = document.getElementById("loggedOutDiv") as HTMLDivElement;
let loggedInDiv = document.getElementById("loggedInDiv") as HTMLDivElement;
let logOutButton = document.getElementById("logOutButton") as HTMLButtonElement;
let AdminInDiv = document.getElementById("AdminInDiv") as HTMLDivElement;
let EditB = document.getElementById("EditB") as HTMLButtonElement;
let HiDiv = document.getElementById("HiDiv") as HTMLDivElement;

signB.onclick = function () {
    location.href = "signUp.html";
}
logB.onclick = function () {
    location.href = "logIn.html";
}
let userId = localStorage.getItem("userId");

logOutButton.onclick = function logOut () {
    localStorage.removeItem("userId");
    top!.location.href = "index.html";

}

EditB.onclick = function () {
    top!.location.href="AddQuilt.html"
}

if (userId != null) {
    let username = await send("getUsername", userId) as string;
    HiDiv.innerText = "Welcome, " + username + "!";
    loggedInDiv.classList.remove("hidden");
} else {
    localStorage.removeItem("userId");
    loggedOutDiv.classList.remove("hidden");
}

if (userId == "00000" && userId != null) {
    AdminInDiv.classList.remove("hidden");
    
}







