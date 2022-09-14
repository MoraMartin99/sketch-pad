/* variables globales */
/* --------------------------------------------------------------------------------------------------- */
let canvas = document.querySelector("#canvas");
let gridBase;
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
