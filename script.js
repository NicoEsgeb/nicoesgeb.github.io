
//------------------------------------ PARALLAX SCROLLING EFFECT --------------------------------------------
window.addEventListener("scroll", () => {
    let scrollPosition = window.scrollY;
    document.getElementById("layer1").style.transform = `translateY(${scrollPosition * 0.2}px)`;
    document.getElementById("layer2").style.transform = `translateY(${scrollPosition * 0.4}px)`;
    document.getElementById("layer3").style.transform = `translateY(${scrollPosition * 0.6}px)`;
});