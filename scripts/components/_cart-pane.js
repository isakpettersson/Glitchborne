const cartPane = document.querySelector(".cart-pane");
const overlay = document.querySelector(".overlay");
let body = document.querySelector("body");


function _toggleCartPane() {
    const cartPaneWidth = parseInt(cartPane.style.width);

    if (cartPaneWidth > 0) {
	    cartPane.style.width = "0";
	    overlay.style.display = "none";

	    body.style.overflow = "auto";
        return;
    }
	
    overlay.style.display = "block";

    // this disables scrolling while having the cart pane open
    body.style.overflow = "hidden";

    // For bigger screen sizes the pane should not cover the whole screen
    if (window.innerWidth > 768) {
        cartPane.style.width = "50%";
        return;
    }

    cartPane.style.width = "100%";
}

function _updateCartPane() {
    const cartPaneWidth = parseInt(cartPane.style.width);

    if (cartPaneWidth > 0) {
        if (window.innerWidth > 768) {
            cartPane.style.width = "50%";
            return;
        }

        cartPane.style.width = "100%";
    }
}

function init() {
    const toggleButtons = document.querySelectorAll(".cart-pane__toggle");

    // adding event listner to all the elements that have the class cart-pane__toggle
    toggleButtons.forEach((button) => {
        button.addEventListener("click", _toggleCartPane);
    });

    // put a event listen on the overlay to make it easier because the overlay will have a display none anyways
    overlay.addEventListener("click", () => {
	    cartPane.style.width = "0";
	    overlay.style.display = "none";
	    body.style.overflow = "auto";
    });

    _updateCartPane();

    // Update the pane on resize so that the user does not have a pane that covers the whole screen while past the breakpoint
    window.addEventListener("resize", _updateCartPane);
}

export { init };
