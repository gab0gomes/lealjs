import 'jquery';

window.$.leal = {
  ctrl: {},
  currentPage: '',
  routes: {},
  fallbackRoute: '',
};

$.leal.view = (name, doneCallback, selector = '.app') => {
  const cleanName = name.replace(/#/g, '').replace(/\./g, '/');
  $.ajax({
    url: `views/${cleanName}.html`,
    type: 'GET',
    dataType: 'html',
    success: (data) => {
      $(selector).append(data);
    },
    error: (e) => {
      console.error(name, '[$.leal.view] caminho inválido.', e);
    },
  }).done(doneCallback);
};

export { default as default } from './initRoutes';
export { default as redirect } from './redirect';
export { default as argument } from './argument';
export { default as Controller } from './Controller';
export { default as controllerRegister, controllerCheck } from './controllerRegister';
