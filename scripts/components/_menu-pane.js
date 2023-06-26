let menuPane = document.querySelector(".menu-pane");
let overlay = document.querySelector(".overlay");
let body = document.querySelector("body");

function _toggleMenuPane() {
    const menuPaneWidth = parseInt(menuPane.style.width);

    if (menuPaneWidth > 0) {
	    menuPane.style.width = "0";
	    overlay.style.display = "none";

	    body.style.overflow = "auto";
    } else {
        menuPane.style.width = "100%";
   
     	// Make sure that the viewport is on the top of the screen and disable scrolling
     	window.scroll(0, 0);
     	body.style.overflow = "hidden";
    }
}

function _updateMenuPane() {
    const menuPaneWidth = parseInt(menuPane.style.width);
    if (menuPaneWidth > 0) {
		menuPane.style.width = "100%";
    }
}

function applyMarginMenuPane() {
	const headerHeight = document.querySelector("header").offsetHeight;
	menuPane.style['top'] = `${headerHeight-1}px`
}

function init() {
    if (menuPane && overlay) {
        const toggleButtons = document.querySelectorAll(".menu-pane__toggle");
        toggleButtons.forEach((button) => {
            button.addEventListener("click", _toggleMenuPane);
        });

		applyMarginMenuPane();
        _updateMenuPane();
        window.addEventListener("resize", _updateMenuPane);
		window.addEventListener("resize", applyMarginMenuPane)
    }
}

export { init };
