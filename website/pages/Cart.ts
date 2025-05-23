import { send } from "../utilities";

export type WishProduct = {
    Id: number,
    ProductId: number,
    UserId: string,
};
let quiltsDiv = document.querySelector("#quiltsDiv") as HTMLDivElement;

let wishproducts = await send("getCart", []) as WishProduct[];

for (let i = 0; i < wishproducts.length; i++) {
    let quiltDiv = document.createElement("div");
    // a.href = "quilt.html?quiltId=" + quilts[i].Id;
    quiltsDiv.appendChild(quiltDiv);

    let Cproduct = document.createElement("div");
    Cproduct.innerText = wishproducts[i].ProductId;
    quiltDiv.appendChild(Cproduct);

    let buttonMinus = document.createElement("button");
    buttonMinus.innerText = "remove";
    quiltDiv.appendChild(buttonMinus);
}

