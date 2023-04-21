function SwipeCarousel() {
  Carousel.apply(this, arguments);
}

SwipeCarousel.prototype = Object.create(Carousel.prototype);
SwipeCarousel.prototype.constructor = SwipeCarousel;

SwipeCarousel.prototype._initListeners = function () {
  Carousel.prototype._initListeners.apply(this);
  this.container.addEventListener("touchstart", this.swipeStart.bind(this));
  this.container.addEventListener("mousedown", this.swipeStart.bind(this));
  this.container.addEventListener("touchend", this.swipeEnd.bind(this));
  this.container.addEventListener("mouseup", this.swipeEnd.bind(this));
};

SwipeCarousel.prototype.swipeStart = function (e) {
  this.startPosX =
    e instanceof MouseEvent
      ? e.pageX //MouseEvent
      : e.changedTouches[0].pageX; //TouchEvent
};

SwipeCarousel.prototype.swipeEnd = function (e) {
  this.endPosX =
    e instanceof MouseEvent
      ? e.pageX //MouseEvent
      : e.changedTouches[0].pageX; //TouchEvent

  if (this.endPosX - this.startPosX > 100) this.prevHandler();
  if (this.endPosX - this.startPosX < -100) this.nextHandler();
};
