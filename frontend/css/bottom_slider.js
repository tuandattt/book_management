let slide_Index = 1;
show_Slides(slide_Index);

function plusSlides(n) {
  show_Slides(slide_Index += n);
}

function currentSlide(n) {
  show_Slides(slide_Index = n);
}

function show_Slides(n) {
  let i;
  let slides = document.getElementsByClassName("bottom_mySlides");
  let dots = document.getElementsByClassName("bottom_dot");
  console.log(slides.length)
  console.log(dots.length)
  if (n > slides.length) {slide_Index = 1}    
  if (n < 1) {slide_Index = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slide_Index-1].style.display = "block";  
  dots[slide_Index-1].className += " active";
}