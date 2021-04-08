import { GetFormDigestValue } from '../GetFormDigestValue/GetFormDigestValue';
import { DoFetch } from './DoFetch/DoFetch';

export interface IRestCallProps {
	endPoint: string;
	method?: string;
	body?: string | unknown;
	headers?: unknown;
	cache?: string;
}

export const RestCall = async ({
	endPoint,
	method = 'get',
	body = '',
	headers,
	cache,
}: IRestCallProps) => {
	//!_spPageContextInfo is defined on SharePoint page, outside of project
	const webAbsoluteUrl = _spPageContextInfo.webAbsoluteUrl;

	const options: RequestInit = { method: method };

	if (typeof body !== 'string') {
		options.body = JSON.stringify(body);
	} else {
		if (body !== '') options.body = body;
	}

	if (headers) {
		options.headers = headers;
	} else {
		options.headers = {
			Accept: 'application/json;odata=verbose',
			'content-type': 'application/json;odata=verbose',
		};
	}
	if (cache) {
		options.cache = cache;
	} else {
		if (method === 'get') {
			//options.cache = 'reload'
			//options.headers['If-Match'] = "*"
			options.headers['Cache-Control'] = 'no-cache';
			options.headers['Pragma'] = 'no-cache';
		}
	}

	let formDigestValue;

	switch (options.method.toLowerCase()) {
		case 'post':
			formDigestValue = await GetFormDigestValue(webAbsoluteUrl);
			options.headers['X-RequestDigest'] = formDigestValue;
			break;
		case 'merge':
			formDigestValue = await GetFormDigestValue(webAbsoluteUrl);
			options.headers['X-RequestDigest'] = formDigestValue;
			options.headers['X-HTTP-Method'] = 'MERGE';
			options.headers['If-Match'] = '*';
			options.method = 'post';
			break;
		case 'patch':
			formDigestValue = await GetFormDigestValue(webAbsoluteUrl);
			options.headers['X-RequestDigest'] = formDigestValue;
			options.headers['X-HTTP-Method'] = 'PATCH';
			options.headers['If-Match'] = '*';
			options.method = 'post';
			break;
		default:
	}

	const fetchResponse = await DoFetch(webAbsoluteUrl, endPoint, options);

	return fetchResponse;
};
