
const slides = document.querySelectorAll('.slide');
const indicatorItems = document.querySelectorAll('.indicator');
const pauseBtn = document.querySelector('#pause-btn');
const nextBtn = document.querySelector('#next-btn');
const prevBtn = document.querySelector('#prev-btn');



let currentSlide = 0;
let timerID = null;
let isPlaying = true;
const interval = 2000;

function goToNth(n) {
  slides[currentSlide].classList.toggle('active');
  indicatorItems[currentSlide].classList.toggle('active');
  currentSlide = (n + slides.length) % slides.length;
  slides[currentSlide].classList.toggle('active');
  indicatorItems[currentSlide].classList.toggle('active');
}

function goToNext() {
  goToNth(currentSlide + 1);
}

function goToPrev() {
  goToNth(currentSlide - 1);
}

function pauseHandler() {
  if (isPlaying) {
    clearInterval(timerID);
    pauseBtn.innerHTML = 'Play';
    isPlaying = false;
  }
}

function playHandler() {
  timerID = setInterval(goToNext, interval);
  pauseBtn.innerHTML = 'Pause';
  isPlaying = true;
}

function pausePlayHandler() {
  if (isPlaying) {
    pauseHandler();
  } else {
    playHandler();
  }
}

function nextHandler() {
  goToNext();
  pauseHandler();
}

function prevHandler() {
  goToPrev();
  pauseHandler();
}

timerID = setInterval(goToNext, interval);

pauseBtn.addEventListener('click', pausePlayHandler);
nextBtn.addEventListener('click', nextHandler);
prevBtn.addEventListener('click', prevHandler);
