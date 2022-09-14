/* variables globales */
/* --------------------------------------------------------------------------------------------------- */
let canvas = document.querySelector("#canvas");
let gridBase;
/* --------------------------------------------------------------------------------------------------- */

let setGridTemplates = (element, base) => {
    element.style.gridTemplate = `repeat(${base}, 1fr) / repeat(${base}, 1fr)`;
};

