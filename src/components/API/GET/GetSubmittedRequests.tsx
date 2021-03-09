import { GetList } from './GetList'
import { GetItems } from './GetItems'

export const GetSubmittedRequests = async () => {
	const listName = 'Submitted Requests'
	const listInfo = await GetList({ listName })
	const items = await GetItems({ listName })

	return { listInfo, items }
}
