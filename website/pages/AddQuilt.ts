import { send } from "../utilities";

let titleInput = document.getElementById("titleInput") as HTMLInputElement;
let imageSourceInput = document.getElementById("imageSourceInput") as HTMLInputElement;
let addB = document.getElementById("addButton") as HTMLButtonElement;

addB.onclick = async function () {
    await send(
        "addQuilt",
        [
            titleInput.value,
            imageSourceInput.value,
            localStorage.getItem("userId"),
        ]
    );

    location.href = "index.html";
}