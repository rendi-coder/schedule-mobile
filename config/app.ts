interface IOrigin {
  local: string;
  development: string;
}

export const MODE: keyof IOrigin = (process.env.NODE_ENV || 'local') as keyof IOrigin;

const API_ORIGIN: IOrigin = {
  local: 'http://192.168.0.102:5000/api',
  development: 'http://192.168.0.102:5000/api',
};

export const global = {
  apiOrigin: API_ORIGIN[MODE],
};

export default global;
