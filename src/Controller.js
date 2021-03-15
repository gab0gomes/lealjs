export default class Controller {
  constructor(
    view,
    initializeCallback = function () {},
    loadViewCallback = function () {},
    showCallback,
    {
      extraCallbacks = {},
      extraProps,
      appendTo,
    },
  ) {
    this.view = view;
    this.appendTo = appendTo;
    this.initializeCallback = initializeCallback.bind(this);
    this.loadViewCallback = loadViewCallback.bind(this);
    this.showCallback = showCallback.bind(this);

    Object.keys(extraCallbacks).forEach((callbackName) => {
      this[callbackName] = extraCallbacks[callbackName].bind(this);
    });
    Object.keys(extraProps).forEach((prop) => {
      this[prop] = extraProps[prop];
    });
    this.initialize();
  }

  async show() {
    try {
      await this.loadView();
      this.showCallback();
      $(this.view).show();
    } catch (e) {
      throw new Error(`Controller: ${e}`);
    }
  }

  async initialize() {
    try {
      this.initializeCallback();
    } catch {
      throw new Error('Controller: initializeCallback não é uma função.');
    }
  }

  async loadView(loadViewCallback = this.loadViewCallback) {
    if (!this.view) {
      throw new Error('Informe a view.');
    }

    let $view = await this.view();
    console.log($view)
    $view = $.parseHTML($view);
    console.log('$view', $view, $view.attr('id'))
    const element = typeof this.appendTo === 'undefined' ? '.app' : this.appendTo;

    $(element).append($view);

    try {
      loadViewCallback.call(this);
    } catch {
      throw new Error('View: loadView exige um callback.');
    }
  }
}
