// Function that updates the dropdown position based on its parent element origin
function _recenterDropdownOnResize() {
    const dropdown = document.querySelector(".dropdown");
    const origin = document.querySelector(".site-header__nav-expandable");

    if (dropdown && origin) {
        dropdown.style.left = -origin.getBoundingClientRect().x + "px";
    }
}

// Just attach the event listner privately and export the init function to avoid complexity
function init() {
    const dropdown = document.querySelector(".dropdown");
    const origin = document.querySelector(".site-header__nav-expandable");

    // This has to run on init as well because we have to center the dropdown initally otherwise it will does be centered until the user resizes the screen
    _recenterDropdownOnResize();
    window.addEventListener("resize", _recenterDropdownOnResize);
}

export { init };
