import { send } from "../utilities";

export type Quilt = {
    Id: number,
    Name: string,
    Image: string,
    Price: number,
    GroupId: number,
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
displayQuilts(); 

let groups = await send("getGroups", []) as Group[];


let allOption = document.createElement("option");
allOption.value = "";
allOption.innerText = "All";
ThemeSelect.appendChild(allOption);


for (let group of groups) {
    let option = document.createElement("option");
    option.value = group.Id.toString();
    option.innerText = group.Name;
    ThemeSelect.appendChild(option);
}


ThemeSelect.addEventListener("change", async () => {
    let selectedGroupId = ThemeSelect.value;

    if (selectedGroupId === "") {
        quilts = await send("getQuilts", []) as Quilt[];
    } else {
        quilts = await send("getQuiltsByGroup", parseInt(selectedGroupId)) as Quilt[];

    }

    displayQuilts();
});


function displayQuilts() {
    quiltsDiv.innerHTML = ""; 

    for (let quilt of quilts) {
        let quiltDiv = document.createElement("div");

        let nameDiv = document.createElement("div");
        nameDiv.innerText = quilt.Name;
        quiltDiv.appendChild(nameDiv);

        let img = document.createElement("img");
        img.src = quilt.Image;
        quiltDiv.appendChild(img);

        let priceDiv = document.createElement("div");
        priceDiv.innerText = quilt.Price.toString();
        quiltDiv.appendChild(priceDiv);

        let buttonAdd = document.createElement("button");
        buttonAdd.innerText = "Add";
        buttonAdd.onclick = function () {
            console.log("add", quilt.Id, UserId);
            send("addtocart", [quilt.Id, UserId]);
        };
        quiltDiv.appendChild(buttonAdd);

        quiltsDiv.appendChild(quiltDiv);
    }
}

