import redirect from './redirect';

const clearPath = (path) => {
  const reg = /\w/
  let internalPath = path;

  if (!reg.test(internalPath[1])) {
    internalPath = internalPath.slice(1)
  }
  if (!reg.test(internalPath[internalPath.length - 1])) {
    internalPath = internalPath.slice(-1)
  }

  return internalPath;
}

export default function initRoutes(controllersPath, fallbackRoute) {
  if (!controllersPath) {
    throw new Error('[initRoutes] => Informe o caminho da pasta de controllers.');
  }

  $.leal.controllersPath = clearPath(controllersPath);
  $.leal.fallbackRoute = fallbackRoute;

  $(window).on('hashchange', redirect);
  redirect();
}