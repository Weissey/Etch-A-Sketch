let colFragment = new DocumentFragment();
const buttons = document.querySelectorAll("button");
const input = document.querySelector("input");

buttons.forEach(button => button.addEventListener("click", checkButtonChoice))

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
}

activateNormalColor();

function activateNormalColor() {
    const divs = document.querySelectorAll(".row");
    divs.forEach(div => div.addEventListener("mouseover", function () {
        this.style.backgroundColor = "black";
    }));
    return;
}

function activateRainbowColor() {
    let randomColor = Math.floor(Math.random()*16777215).toString(16);
    const divs = document.querySelectorAll(".row");
    divs.forEach(div => div.addEventListener("mouseover", function () {
        this.style.backgroundColor = `#${randomColor}`;
        randomColor = Math.floor(Math.random()*16777215).toString(16);
    }));

    return;
}

function changeSize() {
    let answer = document.querySelector(".axis-number").value;
    console.log(answer);
    if (answer == 0 || answer === "") {
        resize(16);
        return;
    }   else if ((isNaN(answer) !== true) && answer <= 100) {
        resize(answer);
        return;
    } else if ((isNaN(answer) !== true) && answer > 100) {
        alert("The number you have entered is above the limit (100).");
        resize(16);
        return;
    }
}

input.addEventListener("keyup", changeSize);

function checkButtonChoice() {
    console.log(this.classList.value)
    if (this.classList.value == "normal-button") {
        activateNormalColor();
        return;
    } else if (this.classList.value === "rainbow-button") {
        activateRainbowColor();
        return;
    } else if (this.classList.value === "darken-button") {
        activateDarkenColor();
        return;
    }
}