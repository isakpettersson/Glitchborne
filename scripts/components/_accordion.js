function _closeAllAccordions(accordions, current) {
    accordions.forEach((accordion) => {
        if (accordion !== current) {
            // getting the accordion body (the part that contains the content because that is what we want to close)
            const body = accordion.nextElementSibling;
            body.style.maxHeight = null;
            accordion.parentElement.classList.remove("accordion--open");
        }
    });
}

function toggleAccordion(event) {
    const header = event.currentTarget;
    const body = header.nextElementSibling;

    // Using max height instead of display to make transition smooth, just checking if the max height is set if so it means that the accordion is open and we should close it.
    if (body.style.maxHeight) {
        body.style.maxHeight = null;
        header.parentElement.classList.remove("accordion--open");
        return;
    }

    const accordionHeaders = document.querySelectorAll(".accordion__header");

    // Closing all the other accordions
    _closeAllAccordions(accordionHeaders, header);

    header.parentElement.classList.add("accordion--open");
    body.style.maxHeight = body.scrollHeight + "px";
}

function init() {
    const accordionHeaders = document.querySelectorAll(".accordion__header");

    // Attching event listners on all accordions and setting the callback to toogle accordion
    accordionHeaders.forEach((header) => {
        header.addEventListener("click", toggleAccordion);
    });
}

export { init, toggleAccordion };
