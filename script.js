let colFragment = new DocumentFragment();
const buttons = document.querySelectorAll("button");
const input = document.querySelector("input");

buttons.forEach(button => button.addEventListener("click", checkButtonChoice))

setGrid(16);

//Function to reset and create new grids
function setGrid(e) {
    let toBeDeleted = document.querySelectorAll(".column");
    toBeDeleted.forEach(div => div.remove());
    for (let i = 0; i < e; i++) {
        let div = document.createElement("div");
        for (let i = 0; i < e; i++) {
            let tempDiv = document.createElement("div");
            tempDiv.classList.add("row");
            div.appendChild(tempDiv);
        }
        div.classList.add("column");
        colFragment.appendChild(div);
        document.querySelector("div").appendChild(colFragment);
    }
    activateNormalColor();
}


//Color switch functions activated by buttons below
function activateNormalColor() {
    const divs = document.querySelectorAll(".row");
    document.querySelector(".normal-button").style.cssText = `
        transition: all 0.2s ease-in;
        filter: brightness(70%);
        `;
    divs.forEach(div => div.addEventListener("mouseover", function () {
        this.style.backgroundColor = "rgb(200, 200, 200)";
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

function activateDarkenColor() {
    const divs = document.querySelectorAll(".row");
    divs.forEach(div => div.addEventListener("mouseover", function () {
        console.log(this.style.backgroundColor);
        let rgb = this.style.backgroundColor;
        for(let i = 0; i < 3; i++) {
            let darkenDivision = rgb[i] / 10;
            rgb[i] = rgb[i] - darkenDivision;
        }
        this.style.backgroundColor = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
        console.log(rgb);
    }))
}




/*const divs = document.querySelectorAll(".row");
divs.forEach(div => div.addEventListener("mouseover", function () {
    let rgb = this.style.backgroundColor.match(/\d+/g);
    console.log(rgb);
    for(let i = 0; i < 3; i++) {
        let darkenDivision = rgb[i] / 10;
        rgb[i] = rgb[i] - darkenDivision;
    }
    this.style.backgroundColor = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
    console.log(this.style.backgroundColor);
}))
    return;
}*/



//Function to determine if input for setGrid is correct
function changeSize() {
    let answer = document.querySelector(".axis-number").value;
    console.log(answer);
    if (answer == 0 || answer === "") {
        setGrid(16);
        return;
    }   else if ((isNaN(answer) !== true) && answer <= 100) {
        setGrid(answer);
        return;
    } else if ((isNaN(answer) !== true) && answer > 100) {
        alert("The number you have entered is above the limit (100).");
        setGrid(16);
        return;
    }
}

input.addEventListener("keyup", changeSize);


//Code bloat but currently have no way of optimization May/4/2022
function checkButtonChoice() {
    console.log(this.classList.value)
    if (this.classList.value == "normal-button") {
        this.style.cssText = `
        transition: all 0.2s ease-in;
        filter: brightness(70%);
        `;
        document.querySelector(".rainbow-button").removeAttribute("style", "filter");
        document.querySelector(".darken-button").removeAttribute("style", "filter");
        activateNormalColor();
        return;
    } else if (this.classList.value === "rainbow-button") {
        this.style.cssText = `
        transition: all 0.2s ease-in;
        filter: brightness(70%);
        `;
        document.querySelector(".normal-button").removeAttribute("style", "filter");
        document.querySelector(".darken-button").removeAttribute("style", "filter");
        activateRainbowColor();
        return;
    } else if (this.classList.value === "darken-button") {
        console.log(this);
        this.style.cssText = `
        transition: all 0.2s ease-in;
        filter: brightness(70%);
        `;
        document.querySelector(".normal-button").removeAttribute("style", "filter");
        document.querySelector(".rainbow-button").removeAttribute("style", "filter");
        activateDarkenColor();
        return;
    }
}