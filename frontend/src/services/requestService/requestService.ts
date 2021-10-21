import axios, { AxiosResponse } from 'axios';

function checkStatus(response: AxiosResponse) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error: any = new Error(response.statusText);
  error.response = response;
  throw error;
}

function parseJSON(response: AxiosResponse) {
  return response.data;
}

export function getQueryString(params: any) {
  if (!params) { return ''; }
  const esc = encodeURIComponent;
  return `/search?${Object.keys(params)
    .filter((param) => params[param] !== null && params[param] !== undefined)
    .map((param) => `${esc(param)}=${esc(params[param])}`).join('&')}`;
}

/**
 * Fetch data from base API
 * @param url
 * @param options
 * @returns {Promise<any>}
 */
function fetch(url: string, options: any = {}) {
  const newOptions = options;
  newOptions.headers = {
    Accept: 'application/json'
  };

  if (options && options.xApiKey) {
    newOptions.headers['X-API-Key'] = options.xApiKey;
  }

  const requestURL = `${url}${getQueryString(options.qs)}`;
  return axios.get(requestURL, newOptions)
    .then(checkStatus)
    .then(parseJSON)
    .catch((err) => {
      console.error(requestURL, err);
      throw err;
    });
}

const requestService = {
  fetch
};

export default requestService;
