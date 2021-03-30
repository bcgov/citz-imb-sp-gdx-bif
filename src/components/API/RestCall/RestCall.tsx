import { GetFormDigestValue } from './GetFormDigestValue/GetFormDigestValue'

interface doFetchOptions {
	method: string
	body?: string
	headers: {
		Accept?: string
		'content-type'?: string
		'Cache-Control'?: string
		Pragma?: string
		'X-RequestDigest'?: string
		'X-HTTP-Method'?: string
		'If-Match'?: string
	}
}

const doFetch = async (
	url: string,
	endPoint: string,
	options: doFetchOptions | undefined
) => {
	const response = await fetch(`${url}${endPoint}`, options)

	if (response.ok) {
		if (response.status === 204) {
			return
		} else if (response.status === 304) {
			return response.json()
		} else {
			return response.json()
		}
	} else {
		throw `${response.status} ${response.statusText}`
	}
}

interface RestCallProps {
	url?: string
	endPoint: string
	method?: string
	body?: string | object
	headers?: {
		Accept?: string
		'content-type'?: string
		'Cache-Control'?: string
		Pragma?: string
		'X-RequestDigest'?: string
	}
	cache?: string
}

export const RestCall = async ({
	url = '',
	endPoint,
	method = 'get',
	body = '',
	headers,
	cache,
}: RestCallProps) => {
	if (url === '') {
		//@ts-ignore
		if (typeof _spPageContextInfo === 'undefined') {
			return Promise.reject(
				'RestCall:: _spPageContextInfo is not defined'
			)
		} else {
			//@ts-ignore
			url = _spPageContextInfo.webAbsoluteUrl
		}
	}

	let options: doFetchOptions = { method: method, headers: {} }

	if (typeof body !== 'string') {
		options.body = JSON.stringify(body)
	} else {
		if (body !== '') options.body = body
	}

	if (headers) {
		options.headers = headers
	} else {
		options.headers = {
			Accept: 'application/json;odata=verbose',
			'content-type': 'application/json;odata=verbose',
		}
	}
	if (method === 'get') {
		options.headers['Cache-Control'] = 'no-cache'
		options.headers['Pragma'] = 'no-cache'
	}
	let DigestValueResponse: string

	switch (options.method.toLowerCase()) {
		case 'post':
			DigestValueResponse = await GetFormDigestValue()
			options.headers['X-RequestDigest'] = DigestValueResponse
			break
		case 'merge':
			DigestValueResponse = await GetFormDigestValue()
			options.headers['X-RequestDigest'] = DigestValueResponse
			options.headers['X-HTTP-Method'] = 'MERGE'
			options.headers['If-Match'] = '*'
			options.method = 'post'
			break
		case 'patch':
			DigestValueResponse = await GetFormDigestValue()
			options.headers['X-RequestDigest'] = DigestValueResponse
			options.headers['X-HTTP-Method'] = 'PATCH'
			options.headers['If-Match'] = '*'
			options.method = 'post'
			break
		default:
	}

	const response = await doFetch(url, endPoint, options)
	return response
}
