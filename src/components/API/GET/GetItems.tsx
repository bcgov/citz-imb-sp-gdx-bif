import { RestCall, isGuid } from '../../../Components'

export const GetItems = (props) => {
	let baseurl = ''
	let listName
	let listGUID
	let expand = ''
	let filter = ''
	let select = ''
	let sort = ''
	let sortDir = 'Asc'
	let endPoint

	if (!props) {
		return Promise.reject('GetListFields requires listGUID or listName')
	} else if (isGuid(props)) {
		listGUID = props
	} else if (typeof props === 'string') {
		listName = props
	} else {
		;({
			baseurl = '',
			listName,
			listGUID,
			expand = '',
			filter = '',
			select = '',
			sort = '',
			sortDir = 'Asc'
		} = props)
	}

	if (!listGUID) {
		if (!listName) {
			return new Promise((resolve, reject) => {
				reject('GetList requires listGUID or listName')
			})
		} else {
			endPoint = `/_api/web/Lists/getByTitle('${listName}')/items`
		}
	} else {
		endPoint = `/_api/web/Lists('${listGUID}')/items`
	}

	let endPointParameters = []
	if (expand) endPointParameters.push(`$expand=${expand}`)
	if (filter) endPointParameters.push(`$filter=${filter}`)
	if (select) endPointParameters.push(`$select=${select}`)
	if (sort) endPointParameters.push(`$sortfield=${sort}&sortdir=${sortDir}`)
	endPointParameters.push('$top=5000')

	if (endPointParameters.length) {
		endPoint += `?${endPointParameters.join('&')}`
	}

	return new Promise((resolve, reject) => {
		RestCall({ url: baseurl, endPoint: endPoint })
			.then((response) => {
				resolve(response.d.results)
			})
			.catch((response) => {
				reject(`GetListItems::${response}`)
			})
	})
}
