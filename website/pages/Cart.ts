import { send } from "../utilities";


type Quilt = {
    Image: string
    Name: string
    Price: number
};

type WishProduct = {
    Id: number,
    ProductId: number,
    UserId: string,
    Quilt: Quilt,
};

let quiltsDiv = document.querySelector("#quiltsDiv") as HTMLDivElement;
let userId = localStorage.getItem("userId");
let wishproducts = await send("getCart", userId) as WishProduct[];
console.log(wishproducts);

let cartCountDiv = document.querySelector("#cartCount") as HTMLDivElement;
cartCountDiv.innerText = `Items in cart: ${wishproducts.length}`;

for (let i = 0; i < wishproducts.length; i++) {
    let quiltDiv = document.createElement("div");
    // a.href = "quilt.html?quiltId=" + quilts[i].Id;
    quiltsDiv.appendChild(quiltDiv);

    let Cproduct = document.createElement("div");
    Cproduct.innerText = wishproducts[i].Quilt.Name.toString();
    quiltDiv.appendChild(Cproduct);

    let image = document.createElement("img");
    image.classList.add("productImage");
    image.src = wishproducts[i].Quilt.Image;
    quiltDiv.appendChild(image);

    let buttonMinus = document.createElement("button");
    buttonMinus.innerText = "remove";
    buttonMinus.onclick = function () {
        console.log("remove", wishproducts[i].ProductId, userId);
        send("removeFromCart", [wishproducts[i].ProductId, userId]);

        quiltDiv.remove();
        wishproducts.splice(i, 1);
        cartCountDiv.innerText = `Items in cart: ${wishproducts.length}`;

    }

    quiltDiv.appendChild(buttonMinus);
}

