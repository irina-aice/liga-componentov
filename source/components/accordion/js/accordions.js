export class Accordions {
  constructor() {
    this._openHeight = 0;
    this._windowWidth = window.innerWidth;
    this._documentClickHandler = this._documentClickHandler.bind(this);
    this._windowResizeHandler = this._windowResizeHandler.bind(this);
    this._init();
  }

  _init() {
    this.fullUpdate();
    document.addEventListener('click', this._documentClickHandler);
    window.addEventListener('resize', this._windowResizeHandler);
  }

  _documentClickHandler(evt) {
    const target = evt.target;
    if (!target.closest('[data-accordion="button"]')) {
      return;
    }

    evt.preventDefault();
    const element = target.closest('[data-accordion="element"]');
    if (element.classList.contains('is-open')) {
      this.closeAccordion(element);
      return;
    }
    this.openAccordion(element);
  }

  _windowResizeHandler() {
    if (this._windowWidth === window.innerWidth) {
      return;
    }
    this._windowWidth = window.innerWidth;
    this.updateAccordionsHeight();
  }

  _closeAllAccordion(parent) {
    const elements = parent.querySelectorAll('[data-accordion="element"]');
    elements.forEach((element) => {
      const currentParent = element.closest('[data-accordion="parent"]');
      if (currentParent === parent) {
        this.closeAccordion(element);
      }
    });
  }

  updateAccordionsHeight(element = null) {
    if (element) {
      const content = element.querySelector('[data-accordion="content"]');
      content.style.transition = 'none';
      content.style.maxHeight = `${content.scrollHeight}px`;
      setTimeout(() => {
        content.style.transition = null;
      });
      return;
    }
    const openElements = document.querySelectorAll('[data-accordion="element"].is-open');
    openElements.forEach((openElement) => {
      const content = openElement.querySelector('[data-accordion="content"]');
      content.style.transition = 'none';
      content.style.maxHeight = `${content.scrollHeight}px`;
      setTimeout(() => {
        content.style.transition = null;
      });
    });
  }

  fullUpdate(parent = null, transition = false) {
    let openElements;
    if (parent) {
      openElements = parent.querySelectorAll('[data-accordion="element"].is-open');
    } else {
      openElements = document.querySelectorAll('[data-accordion="element"].is-open');
    }
    openElements.forEach((openElement) => {
      const innerParent = openElement.querySelector('[data-accordion="parent"]');
      if (innerParent) {
        return;
      }
      this.openAccordion(openElement, transition);
    });
  }

  openAccordion(element, transition = true) {
    const parentElement = element.closest('[data-accordion="parent"]');
    const contentElement = element.querySelector('[data-accordion="content"]');
    this._openHeight += contentElement.scrollHeight;

    if (parentElement.hasAttribute('data-single')) {
      this._closeAllAccordion(parentElement);
    }

    element.classList.add('is-open');
    if (transition) {
      contentElement.style.maxHeight = `${this._openHeight}px`;
    } else {
      contentElement.style.transition = 'none';
      contentElement.style.maxHeight = `${this._openHeight}px`;
      setTimeout(() => {
        contentElement.style.transition = null;
      });
    }

    if (parentElement.closest('[data-accordion="element"]')) {
      this.openAccordion(parentElement.closest('[data-accordion="element"]'), transition);
      return;
    }

    this._openHeight = 0;
  }

  closeAccordion(element, transition = true) {
    const contentElement = element.querySelector('[data-accordion="content"]');
    element.classList.remove('is-open');
    if (transition) {
      contentElement.style.maxHeight = '0';
    } else {
      contentElement.style.transition = 'none';
      contentElement.style.maxHeight = '0';
      setTimeout(() => {
        contentElement.style.transition = null;
      });
    }
  }
}
