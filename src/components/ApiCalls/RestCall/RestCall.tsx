import { GetFormDigestValue } from '../GetFormDigestValue/GetFormDigestValue';
import { DoFetch } from './DoFetch/DoFetch';
import { IRestCall } from 'components/ApiCalls/Interfaces';

export const RestCall = async ({
  endPoint,
  method = 'get',
  body,
  headers,
  cache,
  noReturn = false,
}: IRestCall) => {
  const webAbsoluteUrl = _spPageContextInfo.webAbsoluteUrl;

  if (!headers)
    headers = {
      Accept: 'application/json;odata=verbose',
      'content-type': 'application/json;odata=verbose',
    };

  const formDigestValue = await GetFormDigestValue();
  switch (method.toLowerCase()) {
    case 'get':
      headers = {
        ...headers,
        'Cache-Control': 'no-cache',
        Pragma: 'no-cache',
      };
      break;
    case 'post':
      headers = {
        ...headers,
        'X-RequestDigest': formDigestValue,
      };
      break;
    case 'merge':
      headers = {
        ...headers,
        'X-HTTP-Method': 'MERGE',
        'If-Match': '*',
        'X-RequestDigest': formDigestValue,
      };
      method = 'post';
      break;
    case 'patch':
      headers = {
        ...headers,
        'X-HTTP-Method': 'PATCH',
        'If-Match': '*',
        'X-RequestDigest': formDigestValue,
      };
      method = 'post';
      break;
    default:
  }

  const options: RequestInit = { method, headers };
  if (body) {
    if (typeof body === 'string') {
      options.body = body;
    } else {
      options.body = JSON.stringify(body);
    }
  }

  if (cache) options.cache = cache;

  const fetchResponse = await DoFetch(webAbsoluteUrl, endPoint, options, noReturn);

  return fetchResponse;
};
