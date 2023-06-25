let menuPane = document.querySelector(".menu-pane");
let overlay = document.querySelector(".overlay");
let body = document.querySelector("body");

function _openMenuPane() {
    if (window.innerWidth > 768) {
        menuPane.style.width = "50%";
    } else {
        menuPane.style.width = "100%";
    }

    // Make sure that the viewport is on the top of the screen and disable scrolling
    window.scroll(0, 0);
    body.style.overflow = "hidden";
}

function _closeMenuPane() {
    menuPane.style.width = "0";
    overlay.style.display = "none";

    body.style.overflow = "auto";
}

function _toggleMenuPane() {
    const menuPaneWidth = parseInt(menuPane.style.width);

    if (menuPaneWidth > 0) {
        _closeMenuPane();
    } else {
        _openMenuPane();
    }
}

function _updateMenuPane() {
    const menuPaneWidth = parseInt(menuPane.style.width);
    if (menuPaneWidth > 0) {
        if (window.innerWidth > 768) {
            menuPane.style.width = "0px";
        } else {
            menuPane.style.width = "100%";
        }
    }
}

function init() {
    if (menuPane && overlay) {
        const toggleButtons = document.querySelectorAll(".menu-pane__toggle");
        toggleButtons.forEach((button) => {
            button.addEventListener("click", _toggleMenuPane);
        });

        _updateMenuPane();
        window.addEventListener("resize", _updateMenuPane);
    }
}

export { init };
