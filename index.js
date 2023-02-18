var Image = {
    url: ""
};

// export {Image}

function Puzzle() {
    const btn = document.querySelector(".continue");
    let giraf = document.querySelector('.giraf')
    let dron = document.querySelector('.dron')
    let book = document.querySelector('.book')
    let imgPick = document.querySelector('.imgPick')
    let fig = document.querySelector('figcaption')
    let shufflebtn = document.querySelector('.shuffleBtn')
    btn.addEventListener("click", () => {
        if (Image.url == "giraffe") {
            imgPick.style.display = 'none'
            giraf.style.display = 'block'
            fig.style.display = 'flex'
            shufflebtn.style.display = 'flex'
                // window.location.replace("./giraffe.html");
        }
        if (Image.url == "books") {
            imgPick.style.display = 'none'
            book.style.display = 'block'
            fig.style.display = 'flex'
            shufflebtn.style.display = 'flex'
                // window.location.replace("./book.html");
        }
        if (Image.url == "tourist") {
            imgPick.style.display = 'none'
            dron.style.display = 'block'
            fig.style.display = 'flex'
            shufflebtn.style.display = 'flex'
                // window.location.replace("./drone.html");
        }
    });

    const giraffe = document.querySelector(".giraffe");
    const tourist = document.querySelector(".tourist");
    const books = document.querySelector(".books");

    let bool = false;

    giraffe.addEventListener("click", () => {
        Image.url = "giraffe";
        tourist.classList.remove("chosen");
        books.classList.remove("chosen");
        giraffe.classList.toggle("chosen");
        btn.classList.toggle("active");

    });
    tourist.addEventListener("click", () => {
        Image.url = "tourist";

        giraffe.classList.remove("chosen");
        books.classList.remove("chosen");
        tourist.classList.toggle("chosen");
        btn.classList.toggle("active");
    });
    books.addEventListener("click", () => {
        Image.url = "books";

        giraffe.classList.remove("chosen");
        tourist.classList.remove("chosen");
        books.classList.toggle("chosen");
        btn.classList.toggle("active");
    });
}

Puzzle();