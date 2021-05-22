function disableScroll() {
    window.scrollTo(0, 0);
    document.body.classList.add("stop-scrolling");
    // Get the current page scroll position
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
  
        // if any scroll is attempted, set this to the previous value
        window.onscroll = function() {
            window.scrollTo(0, 0);
        };
}
  
function enableScroll() {
    document.body.classList.remove("stop-scrolling");
    window.onscroll = function() {};
}