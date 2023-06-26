import * as dropdown from "./components/_dropdown.js";
import * as menuPane from "./components/_menu-pane.js";
import * as accordion from "./components/_accordion.js";
import * as cartPane from "./components/_cart-pane.js";

function applyMarginMain() {
	const headerHeight = document.querySelector("header").offsetHeight;
	document.querySelector("main").style['margin-top'] = `${headerHeight}px`
}

window.addEventListener("resize", applyMarginMain)

window.addEventListener("DOMContentLoaded", async (event) => {
	applyMarginMain();
    dropdown.init();
    menuPane.init();
    accordion.init();
    cartPane.init();
});

// Because the products take time to load the other scripts will have loaded beforehand, therefore component specific code will not apply, so we have to emit a product loaded and run all the necessarry code here (only accordion component, this is why we exported the toggle function)
window.addEventListener("productsLoaded", () => {
    const accordionHeaders = document.querySelectorAll(".accordion__header");

    accordionHeaders.forEach((header) => {
        header.addEventListener("click", accordion.toggleAccordion);
    });

    const accordionOpen = document.querySelector(".accordion--open");

    accordionOpen.children[1].style.maxHeight =
        accordionOpen.children[1].scrollHeight + "px";
});
