var chosenImg = "";

var Image={
  url: 'giraffe'
}

// var arr=['giraffe']

export {Image}
// define(function (require, exports, module) {
  
  //   module.exports = {
    //     Image
    //   };
    
    // });
    
    // module.exports={Image}
    
    // export default Image
    
    function Puzzle() {
      const btn = document.querySelector(".continue");

      btn.addEventListener('click', ()=>{
        if(Image.url=='giraffe'){
          window.location.replace('./puzzle.html')
        }
        if(Image.url=='books'){
          window.location.replace('./puzzle2.html')
        }
        if(Image.url=='tourist'){
          window.location.replace('./puzzle3.html')
        }

      })

  const giraffe = document.querySelector(".giraffe");
  const tourist = document.querySelector(".tourist");
  const books = document.querySelector(".books");


  let bool = false;

  giraffe.addEventListener("click", () => {
    Image.url = "giraffe";
    console.log(Image.url);
    tourist.classList.remove("chosen");
    books.classList.remove("chosen");
    giraffe.classList.toggle("chosen");
    // bool !== bool;
    // console.log(bool);
  });
  tourist.addEventListener("click", () => {
    Image.url = "tourist";
    console.log(Image.url);
    giraffe.classList.remove("chosen");
    books.classList.remove("chosen");
    tourist.classList.toggle("chosen");
  });
  books.addEventListener("click", () => {
    Image.url = "books";
    console.log(Image.url);
    giraffe.classList.remove("chosen");
    tourist.classList.remove("chosen");
    books.classList.toggle("chosen");
  });
}

Puzzle();


