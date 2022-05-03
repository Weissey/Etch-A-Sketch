let colFragment = new DocumentFragment();

resize(16);

function resize(e) {
    let toBeDeleted = document.querySelectorAll(".col");
    toBeDeleted.forEach(div => div.remove());
    for (let i = 0; i < e; i++) {
        let div = document.createElement("div");
        for (let i = 0; i < e; i++) {
            let tempDiv = document.createElement("div");
            tempDiv.classList.add("row");
            div.appendChild(tempDiv);
        }
        div.classList.add("col");
        colFragment.appendChild(div);
        document.querySelector("div").appendChild(colFragment);
    }
    constantHover();
}

const buttons = document.querySelector("button");

function constantHover() {
    let divs = document.querySelectorAll(".row");
    divs.forEach(div => div.addEventListener("mouseover", hoverColor));
}

buttons.addEventListener("click", changeSize);


function hoverColor(e) {
    e.stopPropagation();
    this.classList.add("hover");
}

function changeSize() {
    let answer = prompt("How many squares per side?");
    if (isNaN(answer) !== true) {
        resize(answer);
        return;
    } else if (isNaN(answer)) {
        alert("The result you entered was not a number.");
        resize(16);
        return;
    }
}