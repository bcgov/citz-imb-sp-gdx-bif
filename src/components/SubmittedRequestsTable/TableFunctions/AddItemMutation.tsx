import { ISubmittedRequestItem } from '../Interfaces';
import { AddItemsToList } from 'components/ApiCalls';
import { useMutation, useQueryClient } from 'react-query';

export const AddItemMutation = () => {
  const listName = 'Submitted Requests';
  const queryClient: any = useQueryClient();
  return useMutation(
    (newItem: ISubmittedRequestItem) =>
      AddItemsToList({
        listName,
        items: newItem,
      }),
    {
      onMutate: async (newItem: ISubmittedRequestItem) => {
        await queryClient.cancelQueries(listName);

        const previousValues = queryClient.getQueryData(listName);

        //!react-query is not typed
        queryClient.setQueryData(listName, (oldValues: any) => {
          const newValues = [...oldValues.items];

          newValues.push(newItem);
          return { listInfo: oldValues.listInfo, items: newValues };
        });

        return { previousValues };
      },
      //!react-query is not typed
      onError: (error, newItem: ISubmittedRequestItem, context) =>
        queryClient.setQueryData(listName, context?.previousValues),
      onSettled: async () => await queryClient.invalidateQueries(listName),
    }
  );
};
