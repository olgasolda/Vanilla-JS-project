import Carousel from "./carousel.js";

class SwipeCarousel extends Carousel {
  constructor(...args) {
    super(...args);
    // this.slidesContainer = this.slideItems[0].parentElement;
    // this.slidesContainer = this.container.querySelector('.slides');
  }

  _initListeners() {
    super._initListeners();
    this.container.addEventListener("touchstart", this.swipeStart.bind(this));
    this.container.addEventListener("mousedown", this.swipeStart.bind(this));
    this.container.addEventListener("touchend", this.swipeEnd.bind(this));
    this.container.addEventListener("mouseup", this.swipeEnd.bind(this));
  }

  swipeStart(e) {
    this.startPosX =
      e instanceof MouseEvent
        ? e.pageX //MouseEvent
        : e.changedTouches[0].pageX; //TouchEvent
  }

  swipeEnd(e) {
    this.endPosX =
      e instanceof MouseEvent
        ? e.pageX //MouseEvent
        : e.changedTouches[0].pageX; //TouchEvent

    if (this.endPosX - this.startPosX > 100) this.prevHandler();
    if (this.endPosX - this.startPosX < -100) this.nextHandler();
  };
}

export default SwipeCarousel;