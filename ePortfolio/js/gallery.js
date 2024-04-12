// const container = document.querySelector('#g-container');
// // console.log(container);



// // Function to place the selected image into g-container.
// function loadImage(prevImage){
//     // container.innerHTML = prevImage.alt;
//     container.innerHTML = '';
//     container.style.backgroundImage = 'url(' + prevImage.src + ')';
// }


// // Function to remove the image from g-container.
// function unloadImage(){
//     container.innerHTML = 'Hover on a preview image below to view it here.';
//     container.style.backgroundImage = 'url("")';
// }

let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("demo");
  let captionText = document.getElementById("caption");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
  captionText.innerHTML = dots[slideIndex-1].alt;
}
