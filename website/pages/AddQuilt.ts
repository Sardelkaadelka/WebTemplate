import { send } from "../utilities";

let titleInput = document.getElementById("titleInput") as HTMLInputElement;
let imageSourceInput = document.getElementById("imageSourceInput") as HTMLInputElement;
let priceInput = document.getElementById("priceInput") as HTMLInputElement;
let groupInput = document.getElementById("groupInput") as HTMLInputElement;
let addB = document.getElementById("addB") as HTMLButtonElement;

addB.onclick = async function () {
    await send(
        "addQuilt",
        [
            titleInput.value,
            imageSourceInput.value,
            parseInt(priceInput.value),
            parseInt(groupInput.value),

        ]
    );

    location.href = "index.html";
}