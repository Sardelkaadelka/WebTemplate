import { send } from "../utilities";

export type Quilt = {
    Id: number,
    Name: string,
    Image: string,
    Price:string,
};

export type User = {
    Id: string,
    Username: string,
    Password: string,
};

let UserId = localStorage.getItem("UserId");

let quiltsDiv = document.querySelector("#quiltsDiv") as HTMLDivElement;

let quilts = await send("getQuilts", []) as Quilt[];

console.log(quilts);

let addToCartButtons = document.querySelectorAll(".add-to-cart") as NodeListOf<HTMLButtonElement>;

for (let i = 0; i < quilts.length; i++) {
    let quiltDiv = document.createElement("div");
    // a.href = "quilt.html?quiltId=" + quilts[i].Id;
    quiltsDiv.appendChild(quiltDiv);

    let img = document.createElement("img");
    img.src = quilts[i].Image;
    quiltDiv.appendChild(img);

    let div = document.createElement("div");
    div.innerText = quilts[i].Name;
    quiltDiv.appendChild(div);

    let pric = document.createElement("div");
    div.innerText = quilts[i].Price;
    quiltDiv.appendChild(pric);

    let buttonAdd = document.createElement("button");
    buttonAdd.innerText = "Add";
    quiltDiv.appendChild(buttonAdd);
}

    
    
    for (let i = 0; i < 3; i++) {
        addToCartButtons[i].onclick = function () {
            if (addToCartButtons)
                send("addtocart", [i, UserId])
        }
    

}


