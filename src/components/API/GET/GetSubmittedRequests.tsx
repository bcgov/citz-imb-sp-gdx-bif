import { GetList } from './GetList'
import { GetItems } from './GetItems'

export const GetSubmittedRequests = async () => {
	const listName = 'Submitted Requests'
	const listInfo = await GetList({
		listName,
		expand: 'DefaultView,DefaultView/ViewFields',
	})

	const newListInfo = {
		...listInfo,
		Columns: listInfo.DefaultView.ViewFields.Items.results,
	}
	const items = await GetItems({ listName })

	return { listInfo: newListInfo, items }
}
