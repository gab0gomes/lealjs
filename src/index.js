import 'jquery';

window.$.leal = {
  ctrl: {},
  currentPage: '',
};

$.leal.view = (name, done, local) => {
  const cleanName = name.replace(/#/g, '').replace(/\./g, '/');
  const path = typeof local === 'undefined' ? '.app' : local;
  $.ajax({
    url: `views/${cleanName}.html`,
    type: 'GET',
    dataType: 'html',
    success: (data) => {
      $(path).append(data);
    },
    error: (e) => {
      console.error(name, '[$.leal.view] caminho inválido.', e);
    },
  }).done(done);
};

export { default as redirect } from './redirect';
export { default as argument } from './argument';
export { default as Controller } from './Controller';
export { default as initRoutes } from './initRoutes';
export { default as controllerRegister, controllerCheck } from './controllerRegister';
