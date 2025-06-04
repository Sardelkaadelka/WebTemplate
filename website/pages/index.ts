import { send } from "../utilities";

export type Quilt = {
    Id: number,
    Name: string,
    Image: string,
    Price: number,
    GroupId:number,
};

export type User = {
    Id: string,
    Username: string,
    Password: string,
};

export type Group = {
    Id: number,
    Name: string,
};


let UserId = localStorage.getItem("userId");

let quiltsDiv = document.querySelector("#quiltsDiv") as HTMLDivElement;

let ThemeSelect = document.querySelector("#ThemeSelect") as HTMLSelectElement;

let quilts = await send("getQuilts", []) as Quilt[];

console.log(quilts);


for (let i = 0; i < quilts.length; i++) {
    let quiltDiv = document.createElement("div");
    
    quiltsDiv.appendChild(quiltDiv);
    
    let div = document.createElement("div");
    div.innerText = quilts[i].Name;
    quiltDiv.appendChild(div);

    let img = document.createElement("img");
    img.src = quilts[i].Image;
    quiltDiv.appendChild(img);

    let pric = document.createElement("div");
    pric.innerText = quilts[i].Price.toString();
    quiltDiv.appendChild(pric);

    let buttonAdd = document.createElement("button");
    buttonAdd.innerText = "Add";
    buttonAdd.onclick = function () {
        console.log("add", quilts[i].Id, UserId);
        send("addtocart", [quilts[i].Id, UserId]);
    }
    quiltDiv.appendChild(buttonAdd);
}

let groups = await send("getGroups", []) as Group[];

for (let group of groups) {
    let option = document.createElement("option");
    option.value = group.Id.toString();
    option.innerText = group.Name;
    ThemeSelect.appendChild(option);
}


