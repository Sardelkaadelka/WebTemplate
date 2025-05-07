import { send } from "../utilities";

export type Quilt = {
    Id: number,
    Name: string,
    Image: string,
};

let quiltsDiv = document.querySelector("#quiltsDiv") as HTMLDivElement;

let quilts = await send("getQuilts", []) as Quilt[];

console.log(quilts);

for (let i = 0; i < quilts.length; i++) {
    let a = document.createElement("a");
    a.href = "quilt.html?quiltId=" + quilts[i].Id;
    quiltsDiv.appendChild(a);

    let img = document.createElement("img");
    img.src = quilts[i].Image;
    a.appendChild(img);

    let div = document.createElement("div");
    div.innerText = quilts[i].Name;
    a.appendChild(div);
}