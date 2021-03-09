import { RestCall } from '../RestCall/RestCall'
interface GetItemsProps {
	baseurl?: string
	listName?: string
	listGUID?: string
	expand?: string
	filter?: string
	select?: string
	sort?: string
	sortDir?: string
}
export const GetItems = async ({
	baseurl = '',
	listName,
	listGUID,
	expand = '',
	filter = '',
	select = '',
	sort = '',
	sortDir = 'Asc',
}: GetItemsProps) => {
	if (!listName && !listGUID) throw 'GetItems requires listGUID or listName'

	let endPoint = ''

	if (listGUID) {
		endPoint = `/_api/web/Lists('${listGUID}')/items`
	} else {
		endPoint = `/_api/web/Lists/getByTitle('${listName}')/items`
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

	const response = await RestCall({ url: baseurl, endPoint: endPoint })

	return response.d.results
}
