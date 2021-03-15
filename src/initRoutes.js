import redirect from './redirect';

export default function initRoutes(routes, fallbackRoute) {
  if (!routes || Object.keys(routes).length === 0) {
    throw new Error('[initRoutes] => Informe as rotas e os routes.');
  }
  if (typeof routes !== 'object') {
    throw new Error('[initRoutes] => Os controller e rotas precisam estar no formato "rota: controller"');
  }

  $.leal.routes = {...routes};
  $.leal.fallbackRoute = fallbackRoute;

  $(window).on('hashchange', redirect);
  redirect();
}