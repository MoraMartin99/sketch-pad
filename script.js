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
        const hoverPixel = document.querySelector(".pixels:hover");

        if (canvas.style.cursor !== customCursor) {
            canvas.removeEventListener("mouseover", handleBackgroundColor);
            setCustomCursor(canvas, customCursor);
            canvas.addEventListener("mouseover", resetBackgroundColor);
            hoverPixel.style.backgroundColor = "rgb(255, 255, 255)";
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

let handleMenu = (e) => {
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

    if (!button.classList.contains(optionClass) && !dropDown.classList.contains(dropDownClass)) {
        hideAllMenu();
        addClass(button, optionClass);
        addClass(dropDown, dropDownClass);
        body.addEventListener("click", hideMenuOnClick);
    } else {
        hideAllMenu();
        body.removeEventListener("click", hideMenuOnClick);
    }
};

let isValid = (element) => {
    return element.checkValidity();
};

let modifytextBoxValue = (e) => {
    const button = e.target;
    if (isValid(textBox)) {
        if (button.matches("#plus, #plus *")) {
            if (textBox.value == "") {
                textBox.value = 1;
            } else if (textBox.value !== "100") {
                textBox.value = parseInt(textBox.value) + 1;
            }
            setCanvas();
        } else if (button.matches("#minus, #minus *")) {
            if (textBox.value == "") {
                textBox.value = 100;
            } else if (textBox.value !== "1") {
                textBox.value = parseInt(textBox.value) - 1;
            }
            setCanvas();
        }
    }
};

let showGridBase = () => {
    let text = "";
    let invalidClass = "invalid";
    if (isValid(textBox) && textBox.value !== "") {
        let gridBase = parseInt(textBox.value);
        text = `rejilla de ${gridBase} X ${gridBase}`;
        gridValueMessage.classList.remove(invalidClass);
    } else if (!isValid(textBox)) {
        text = "favor digitar un numero entre 1 y 100";
        gridValueMessage.classList.add(invalidClass);
    }
    gridValueMessage.innerText = text;
};

let disableSubmitOnEnter = (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
    }
};

let handleCanvasArea = (e) => {
    let target = e.target;

    if (target.matches(".canvasButton.clean, .canvasButton.clean *")) {
        resetCanvas();
    } else if (target.matches(".canvasButton.print, .canvasButton.print *")) {
        setPrint();
    }
};

let toggleColorPicker = () => {
    if (customColorRadio.checked) {
        colorPicker.style.display = "initial";
    } else {
        colorPicker.style.display = "none";
    }
};
/* --------------------------------------------------------------------------------------------------- */

/* Uso general */
/* --------------------------------------------------------------------------------------------------- */

let addClass = (element, className) => {
    element.classList.add(className);
};

let removeClass = (element, className) => {
    element.classList.remove(className);
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

/* --------------------------------------------------------------------------------------------------- */

/* Print */
/* --------------------------------------------------------------------------------------------------- */

let addFooterForPrint = () => {
    const printFooter = document.createElement("div");
    addClass(printFooter, "printFooter");
    body.append(printFooter);
    printFooter.innerHTML = `<p class="printP">Oscar Martin Mora </p>
    <img src="./icon/github.svg" alt="github logo" class="printLogo" />`;
};

let removeFooterForPrint = () => {
    const printFooter = document.querySelector(".printFooter");
    printFooter.remove();
};

let setPrint = () => {
    addFooterForPrint();
    const promise = new Promise((resolve, reject) => {
        const imgPrint = document.querySelector(".printLogo");
        imgPrint.addEventListener("load", () => {
            resolve();
        });
    })
        .then(() => {
            print();
        })
        .catch(() => {
            console.log("no se cargo la imagen para print");
        });
};

/* --------------------------------------------------------------------------------------------------- */

let applyInitialState = () => {
    optionArr.forEach((item) => {
        item.addEventListener("click", handleMenu);
    });

    gridForm.addEventListener("click", modifytextBoxValue);

    textBox.addEventListener("input", setCanvas);

    canvas.addEventListener("click", togglePenCursor);

    canvas.addEventListener("mouseenter", addSpacebarListener);

    canvas.addEventListener("mouseleave", removeSpacebarListener);

    textBox.addEventListener("keydown", disableSubmitOnEnter);

    canvasArea.addEventListener("click", handleCanvasArea);

    window.addEventListener("afterprint", removeFooterForPrint);

    customColorRadio.addEventListener("input", toggleColorPicker);

    randomColorRadio.addEventListener("input", toggleColorPicker);

    setCanvas();
};

applyInitialState();
