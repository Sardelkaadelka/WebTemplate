import { send } from "../utilities";

export type WishProduct = {
    Id: number,
    ProductId: number,
    UserId: string,
};
let quiltsDiv = document.querySelector("#quiltsDiv") as HTMLDivElement;
let userId = localStorage.getItem("userId");
let wishproducts = await send("getCart", userId) as WishProduct[];
console.log(wishproducts);

for (let i = 0; i < wishproducts.length; i++) {
    let quiltDiv = document.createElement("div");
    // a.href = "quilt.html?quiltId=" + quilts[i].Id;
    quiltsDiv.appendChild(quiltDiv);

    let Cproduct = document.createElement("div");
    Cproduct.innerText = wishproducts[i].ProductId.toString();
    quiltDiv.appendChild(Cproduct);

    let buttonMinus = document.createElement("button");
    buttonMinus.innerText = "remove";
    buttonMinus.onclick = function () {
            console.log("remove", wishproducts[i].ProductId, userId);
            send("removeFromCart", [wishproducts[i].ProductId, userId]);
        }
    
    quiltDiv.appendChild(buttonMinus);
}

