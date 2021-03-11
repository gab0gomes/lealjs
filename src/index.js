import 'jquery';

export { default as redirect } from './redirect';
export { default as argument } from './argument';
export { default as Controller } from './Controller';
export { default as controllerRegister, controllerCheck } from './controllerRegister';

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

const clearPath = (path) => {
  const reg = /\w/
  const internalPath = path;

  if (!reg.test(internalPath[1])) {
    internalPath = internalPath.slice(1)
  }
  if (!reg.test(internalPath[internalPath.length - 1])) {
    internalPath = internalPath.slice(-1)
  }

  return internalPath;
}

const initRoutes = (controllersPath, fallbackRoute) => {
  if (!controllersPath) {
    throw new Error('[initRoutes] => Informe o caminho da pasta de controllers.');
  }

  $.leal.controllersPath = clearPath(controllersPath);
  $.leal.fallbackRoute = fallbackRoute;

  $(window).on('hashchange', redirect);
  redirect();
}

export { initRoutes as default }
