function Carousel(containerID = '#carousel', slideID = '.slide', interval = 3000) {
  this.container = document.querySelector(containerID);
  this.slides = this.container.querySelectorAll(slideID);
  this.SLIDES_LENGTH = this.slides.length;
  this.CODE_ARROW_LEFT = 'ArrowLeft';
  this.CODE_ARROW_RIGHT = 'ArrowRight';
  this.CODE_SPACE = 'Space';
  this.FA_PAUSE = '<i class="fas fa-pause-circle"></i>';
  this.FA_PLAY = '<i class="fas fa-play-circle"></i>';
  this.FA_PREV = '<i class="fas fa-angle-left"></i>';
  this.FA_NEXT = '<i class="fas fa-angle-right"></i>';

  this.currentSlide = 0;
  this.isPlaying = true;
  this.interval = interval;
}

Carousel.prototype = {
  _initControls() {
    const controls = document.createElement('div');
    const PAUSE = `<div id="pause-btn" class="control control-pause">${this.FA_PAUSE}</div>`;
    const PREV = `<div id="prev-btn" class="control control-prev">${this.FA_PREV}</div>`;
    const NEXT = `<div id="next-btn" class="control control-next">${this.FA_NEXT}</div>`;
    controls.setAttribute('id', 'controls-container');
    controls.setAttribute('class', 'controls');
    controls.innerHTML = PAUSE + PREV + NEXT;

    this.container.append(controls);

    this.pauseBtn = this.container.querySelector('#pause-btn');
    this.nextBtn = this.container.querySelector('#next-btn');
    this.prevBtn = this.container.querySelector('#prev-btn');
  },

  _initIndicators() {
    const indicators = document.createElement('div');
    indicators.setAttribute('id', 'indicators-container');
    indicators.setAttribute('class', 'indicators');

    for (let i = 0; i < this.SLIDES_LENGTH; i++) {
      const indicator = document.createElement('div');

      indicator.setAttribute('class', i === 0 ? 'indicator active' : 'indicator');
      indicator.dataset.slideTo = `${i}`;
      indicators.append(indicator);
    }

    this.container.append(indicators);

    this.indicatorItems = this.container.querySelectorAll('.indicator');
    this.indicatorsContainer = this.container.querySelector('#indicators-container');
  },

  _initListeners() {
    this.pauseBtn.addEventListener('click', this._pausePlayHandler.bind(this));
    this.nextBtn.addEventListener('click', this.nextHandler.bind(this));
    this.prevBtn.addEventListener('click', this.prevHandler.bind(this));
    this.indicatorsContainer.addEventListener('click', this._indicate.bind(this));
    document.addEventListener('keydown', this._pressKey.bind(this));
  },

  _goToNth(n) {
    this.slides[this.currentSlide].classList.toggle('active');
    this.indicatorItems[this.currentSlide].classList.toggle('active');
    this.currentSlide = (n + this.SLIDES_LENGTH) % this.SLIDES_LENGTH;
    this.slides[this.currentSlide].classList.toggle('active');
    this.indicatorItems[this.currentSlide].classList.toggle('active');
  },

  _goToNext() {
    this._goToNth(this.currentSlide + 1);
  },

  _goToPrev() {
    this._goToNth(this.currentSlide - 1);
  },

  _tick() {
    this.timerID = setInterval(() => this._goToNext(), this.interval);
  },

  _pauseHandler() {
    if (this.isPlaying) {
      clearInterval(this.timerID);
      this.pauseBtn.innerHTML = this.FA_PLAY;
      this.isPlaying = false;
    }
  },

  _playHandler() {
    this._tick();
    this.pauseBtn.innerHTML = this.FA_PAUSE;
    this.isPlaying = true;
  },

  _pausePlayHandler() {
    if (this.isPlaying) {
      this._pauseHandler();
    } else {
      this._playHandler();
    }
  },

  _indicate(e) {
    const target = e.target;

    if (target && target.classList.contains('indicator')) {
      this._pauseHandler();
      this._goToNth(+target.dataset.slideTo);
    }
  },

  _pressKey(e) {
    if (e.code === this.CODE_ARROW_LEFT) this.prevHandler();
    if (e.code === this.CODE_ARROW_RIGHT) this.nextHandler();
    if (e.code === this.CODE_SPACE) this._pausePlayHandler();
  },

  nextHandler() {
    this._goToNext();
    this._pauseHandler();
  },

  prevHandler() {
    this._goToPrev();
    this._pauseHandler();
  },

  init() {
    this._initControls();
    this._initIndicators();
    this._initListeners();
    this._tick();
  }
};

Carousel.prototype.constructor = Carousel;