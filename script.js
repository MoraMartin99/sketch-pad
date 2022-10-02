/* variables globales */
/* --------------------------------------------------------------------------------------------------- */
const canvas = document.querySelector("#canvas");
let gridBase;
const optionArr = Array.from(document.querySelectorAll(".option"));
const dropDownArr = Array.from(document.querySelectorAll(".dropdownBox"));
const dropDownInfo = document.querySelector(".dropdownBox.info");
const dropDownConf = document.querySelector(".dropdownBox.conf");
const body = document.querySelector("body");
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
    let childrenArr = Array.from(parent.querySelectorAll("*"));
    childrenArr.forEach((child) => {
        child.remove();
    });
};

let addClass = (element, className) => {
    element.classList.add(className);
};

let removeClass = (element, className) => {
    element.classList.remove(className);
};

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
    console.log("hideMenuOnClick se ejecuto");
    const eventElement = e.currentTarget;
    const clickedElement = e.target;

    if (!clickedElement.matches(".dropdownBox, .dropdownBox *")) {
        hideAllMenu();
        eventElement.removeEventListener("click", hideMenuOnClick);
    }
};

let showMenu = (e) => {
    console.log("showMenu se ejecuto");
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

optionArr.forEach((item) => {
    item.addEventListener("click", showMenu);
});
