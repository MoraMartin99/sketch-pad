/* variables globales */
/* --------------------------------------------------------------------------------------------------- */
const canvas = document.querySelector("#canvas");
const optionArr = Array.from(document.querySelectorAll(".option"));
const dropDownArr = Array.from(document.querySelectorAll(".dropdownBox"));
const dropDownInfo = document.querySelector(".dropdownBox.info");
const dropDownConf = document.querySelector(".dropdownBox.conf");
const body = document.querySelector("body");
const textBox = document.querySelector(".textBox");
const gridForm = document.querySelector(".gridForm");
const colorPicker = document.querySelector(".colorPicker");
const randomColorRadio = document.querySelector(".radioOption#random");
const customColorRadio = document.querySelector(".radioOption#custom");
const canvasArea = document.querySelector(".canvasArea");
const gridValueMessage = document.querySelector("#gridValueMessage");
/* --------------------------------------------------------------------------------------------------- */

/* Canvas */
/* --------------------------------------------------------------------------------------------------- */

let setGridTemplates = (element, base) => {
    element.style.gridTemplate = `repeat(${base}, 1fr) / repeat(${base}, 1fr)`;
};

let addDivChildren = (parent, nChild, classList) => {
    for (i = 1; i <= nChild; i++) {
        let child = document.createElement("div");
        child.classList.add(classList);
        parent.append(child);
    }
};

let removeAllChildren = (parent) => {
    parent.innerHTML = "";
};

let setCanvas = () => {
    if (isValid(textBox) && textBox.value !== "") {
        let gridBase = parseInt(textBox.value);
        removeAllChildren(canvas);
        setGridTemplates(canvas, gridBase);
        addDivChildren(canvas, Math.pow(gridBase, 2), "pixels");
    }
    showGridBase();
};

let resetCanvas = () => {
    let gridBase = calculateGridBase();
    removeAllChildren(canvas);
    setGridTemplates(canvas, gridBase);
    addDivChildren(canvas, Math.pow(gridBase, 2), "pixels");
};

let getRandomRGB = () => {
    return `rgb(${Math.round(Math.random() * 255)}, ${Math.round(Math.random() * 255)}, ${Math.round(
        Math.random() * 255
    )})`;
};

let setRandomBGColor = (element) => {
    element.style.backgroundColor = getRandomRGB();
};

let handleBackgroundColor = (e) => {
    const target = e.target;
    if (target.matches("#canvas .pixels")) {
        if (randomColorRadio.checked) {
            setRandomBGColor(target);
        } else if (customColorRadio.checked) {
            setColorHEXFromPicker(target);
        }
    }
};

let resetBackgroundColor = (e) => {
    const target = e.target;
    if (target.matches("#canvas .pixels")) {
        target.style.backgroundColor = "rgb(255, 255, 255)";
    }
};

let getColorHEXFromPicker = (pickerElement) => {
    return pickerElement.value;
};

let setColorHEXFromPicker = (element) => {
    element.style.backgroundColor = getColorHEXFromPicker(colorPicker);
};

let calculateGridBase = () => {
    const pixelArr = Array.from(document.querySelectorAll("#canvas > *"));
    return Math.sqrt(pixelArr.length);
};

let setCustomCursor = (element, cursor) => {
    element.style.cursor = cursor;
};

let togglePenCursor = (e) => {
    const target = e.target;
    const defaultCursor = "auto";
    const customCursor = 'url("./icon/pen.svg") 0 20, auto';

    if (target.matches("#canvas, #canvas *")) {
        if (canvas.style.cursor !== customCursor) {
            handleBackgroundColor(e);
            canvas.removeEventListener("mouseover", resetBackgroundColor);
            setCustomCursor(canvas, customCursor);
            canvas.addEventListener("mouseover", handleBackgroundColor);
        } else if (canvas.style.cursor === customCursor) {
            canvas.removeEventListener("mouseover", handleBackgroundColor);
            setCustomCursor(canvas, defaultCursor);
        }
    }
};

let toggleEraserCursor = (e) => {
    if (e.key === " " || e.key === "Spacebar") {
        const defaultCursor = "auto";
        const customCursor = 'url("./icon/eraser2.svg") 10 10, auto';

        if (canvas.style.cursor !== customCursor) {
            canvas.removeEventListener("mouseover", handleBackgroundColor);
            setCustomCursor(canvas, customCursor);
            canvas.addEventListener("mouseover", resetBackgroundColor);
        } else if (canvas.style.cursor === customCursor) {
            setCustomCursor(canvas, defaultCursor);
            canvas.removeEventListener("mouseover", resetBackgroundColor);
        }
    }
};

let addSpacebarListener = () => {
    document.addEventListener("keyup", toggleEraserCursor);
};

let removeSpacebarListener = () => {
    document.removeEventListener("keyup", toggleEraserCursor);
};
/* --------------------------------------------------------------------------------------------------- */

/* Menu */
/* --------------------------------------------------------------------------------------------------- */

let hideAllMenu = () => {
    const optionClass = "clicked";
    const dropDownClass = "show";

    optionArr.forEach((option) => {
        removeClass(option, optionClass);
    });
    dropDownArr.forEach((dropDown) => {
        removeClass(dropDown, dropDownClass);
    });
};

let hideMenuOnClick = (e) => {
    const eventElement = e.currentTarget;
    const clickedElement = e.target;

    if (!clickedElement.matches(".dropdownBox, .dropdownBox *")) {
        hideAllMenu();
        eventElement.removeEventListener("click", hideMenuOnClick);
    }
};

let showMenu = (e) => {
    const optionClass = "clicked";
    const dropDownClass = "show";
    const button = e.currentTarget;
    let dropDown;

    if (button.id === "info") {
        dropDown = dropDownInfo;
    } else if (button.id === "conf") {
        dropDown = dropDownConf;
    }
    e.stopImmediatePropagation();
    hideAllMenu();
    addClass(button, optionClass);
    addClass(dropDown, dropDownClass);
    body.addEventListener("click", hideMenuOnClick);
};

let printAllEventListener = () => {
    let elementArr = Array.from(document.querySelectorAll("body, body *"));
    elementArr.forEach((element) => {
        if (Object.keys(getEventListeners(element)).length > 0) {
            console.log(getEventListeners(element));
            console.log(element);
        }
    });
};

optionArr.forEach((item) => {
    item.addEventListener("click", showMenu);
});
