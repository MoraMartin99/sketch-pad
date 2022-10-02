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
