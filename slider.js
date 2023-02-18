var slideIndex = 0;

let start = document.querySelector('.start-btn')
let mainPage = document.querySelector('.main')
let imgPick = document.querySelector('.imgPick')

start.addEventListener('click', () => {
    mainPage.style.display = 'none'
    imgPick.style.display = 'flex'

})


function carousel() {
    var i;
    var x = document.getElementsByClassName("slide");
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > x.length) {
        slideIndex = 1;
    }
    x[slideIndex - 1].style.display = "block";
    setTimeout(carousel, 3000);
}

carousel();