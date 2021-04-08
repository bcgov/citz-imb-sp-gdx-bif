export const GetContextWebInformation = async (baseurl = '') => {
	if (baseurl === '') {
		if (typeof _spPageContextInfo === 'undefined') {
			return Promise.reject(
				'GetContextWebInformation:: _spPageContextInfo is not defined'
			)
		} else {
			baseurl = _spPageContextInfo.siteAbsoluteUrl
		}
	}

	const response = await fetch(`${baseurl}/_api/contextinfo`, {
		method: 'post',
		headers: {
			Accept: 'application/json;odata=verbose',
			'content-type': 'application/json;odata=verbose',
		},
	})

	if (response.ok) {
		const jsonResponse = response.json()
	
		return jsonResponse.d.GetContextWebInformation
	} else {
		throw `GetContextWebInformation::${response.status} ${response.statusText}`
	}
}

export const GetFormDigestValue = async () => {
	const response = await GetContextWebInformation('')
	return response.FormDigestValue
}
