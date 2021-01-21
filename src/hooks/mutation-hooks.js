import { useMutation, useQueryClient } from "react-query";
import { useClient } from "_context/auth-context";

function useUpdateListItem(options) {
  const queryCache = useQueryClient();
  const client = useClient();
  const result = useMutation(
    (update) =>
      client(`list-items/${update.id}`, {
        method: "PUT",
        data: update,
      }),
    { onSettled: () => queryCache.invalidateQueries("list-items"), ...options }
  );

  return result;
}

function useCreateListItem(options) {
  const queryCache = useQueryClient();
  const client = useClient();
  const result = useMutation(
    ({ bookId }) =>
      client(`list-items`, { data: { bookId } }),
    { onSettled: () => queryCache.invalidateQueries("list-items") ,...options}
  );

  return result;
}

function useRemoveListItem(options) {
  const queryCache = useQueryClient();
  const client = useClient();
  const result = useMutation(
    ({ id }) =>
      client(`list-items/${id}`, { method: "DELETE"}),
      { onSettled: () => queryCache.invalidateQueries("list-items") ,...options}
  );

  return result;
}

export {useUpdateListItem, useCreateListItem, useRemoveListItem};
