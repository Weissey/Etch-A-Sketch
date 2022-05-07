const container = document.getElementById("container");
const leftContainer = document.getElementById("leftContainer");
const sketchGrid = document.getElementById("sketchGrid");
const title = document.getElementById("title");
const footer = document.getElementById("footer");
const colorSquare = document.getElementById("colorSquare");
const axisNumber = document.getElementById("axisNumber");
const normalButton = document.getElementById("normalButton");
const rainbowButton = document.getElementById("rainbowButton");
const clearButton = document.getElementById("clearButton");
const sizeSlider = document.getElementById("sizeSlider");
const displaySize = document.getElementById("displaySize");

const DEFAULT_BRUSH_COLOR = "#1c1c1c"
const DEFAULT_GRID_SIZE = 16
const DEFAULT_MODE = "color"

let currentColor = DEFAULT_BRUSH_COLOR;
let currentMode = DEFAULT_MODE;
let currentSize = DEFAULT_GRID_SIZE;

let mousePress = false;
document.body.onmousedown = () => (mousePress = true);
document.body.onmouseup = () => (mousePress = false);

normalButton.onclick = () => setCurrentMode("color");
rainbowButton.onclick = () => setCurrentMode("rainbow");
clearButton.onclick = () => reconstructGrid();
colorSquare.onchange = (e) => setCurrentColor(e.target.value);
sizeSlider.onmousemove = (e) => updateSizeDisplay(e.target.value);

function constructGrid(size) {
    sketchGrid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    sketchGrid.style.gridTemplateRows = `repeat(${size}, 1fr)`;

    for (let i = 0; i < size * size; i++) {
        const tempGridElement = document.createElement("div");
        tempGridElement.classList.add("grid-block");
        tempGridElement.addEventListener('mouseover', changeColor);
        tempGridElement.addEventListener('mousedown', changeColor);
        sketchGrid.appendChild(tempGridElement);
    }
}

sizeSlider.onchange = (e) => changeGrid(e.target.value);

function changeGrid(value) {
    setCurrentSize(value);
    updateSizeDisplay(value);
    reconstructGrid();
}

function setCurrentSize(newSizeValue) {
    currentSize = newSizeValue;
}

function setCurrentMode(newMode) {
    currentMode = newMode;
}

function setCurrentColor(newColor) {
    currentColor = newColor;
}

function updateSizeDisplay(value) {
    displaySize.innerHTML = `${value} X ${value}`;
}

function reconstructGrid() {
    clearGrid();
    constructGrid(currentSize);
}

function clearGrid() {
    sketchGrid.innerHTML = " ";
}

function changeColor(e) {
    console.log(e.type);
    if (e.type === "mouseover" && !mousePress) return;
    if (currentMode === "color") {
        e.target.style.backgroundColor = currentColor;
    } else if (currentMode === "rainbow") {
        e.target.style.backgroundColor = generateHex();
    }
}

function generateHex() {
    let hex = "#";
    const hexValues = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "a", "b", "c", "d", "e", "f"];
        for (i = 0; i < 6; i++) {
            const index = Math.floor(Math.random() * hexValues.length);
            hex += hexValues[index];
        }
    return hex;
}



window.onload = () => {
    constructGrid(DEFAULT_GRID_SIZE);
    //activateButton(DEFAULT_MODE)
  }