import argument from './argument';
import Controller from './Controller';

export default function controllerRegister(route, controller) {
  if (typeof route === 'undefined') {
    return $.leal.ctrl[argument(0)];
  }

  if (typeof controller === 'undefined') {
    return $.leal.ctrl[route];
  }

  if (controller instanceof Controller) {
    $.leal.ctrl[route] = controller;
    return $.leal.ctrl[route];
  }

  if (typeof controller === 'function') {
    const ctrl = new controller();

    Object.keys(ctrl).forEach((property) => {
      if (typeof ctrl[property] === 'function') {
        ctrl[property] = ctrl[property].bind(ctrl);
      }
    });
    $.leal.ctrl[route] = ctrl;
  } else {
    $.leal.ctrl[route] = controller;
  }

  if (!($.leal.ctrl[route] instanceof Controller)) {
    console.warn(`[deprecated]: Considere migrar o controller "${route}" para uma instância da classe Controller`);
    if (typeof $.leal.ctrl[route].initialize === 'function') {
      $($.leal.ctrl[route].initialize);
      return $.leal.ctrl[route];
    }
  }

  if (!$.leal.ctrl[route]) {
    throw new Error('[controllerRegister] => Controller não encontrado');
  }

  return $.leal.ctrl[route];
}

export const controllerCheck = async function controllerCheck(route) {
  const internalName = route.replace(/#/g, '');

  if (!$.leal.ctrl[internalName]) {
    await $.leal.routes[internalName]() // executa a função que importa dinâmicamente o controller
      .then((module) => {
        controllerRegister(internalName, module.default);
      })
      .catch((e) => {
        console.error(e)
        throw new Error(`[controllerRegister] => ${route} caminho inválido.`);
      });
  }
};
