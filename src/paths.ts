const base = import.meta.env.BASE_URL;
const basePath = base.replace(/\/$/, '');

export const withBase = (path: string) => {
  if (/^(?:[a-z][a-z0-9+.-]*:|#)/i.test(path)) return path;
  if (basePath && path.startsWith(`${basePath}/`)) return path;
  return `${base}${path.replace(/^\/+/, '')}`;
};

export const absoluteWithBase = (path: string, origin: string | URL) =>
  new URL(withBase(path), origin).toString();
