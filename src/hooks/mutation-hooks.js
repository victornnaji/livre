import { useMutation, useQueryClient } from "react-query";
import { client } from "_helpers/client";

function useUpdateListItem(user, options) {
  const queryCache = useQueryClient();
  const result = useMutation(
    (update) =>
      client(`list-items/${update.id}`, {
        method: "PUT",
        data: update,
        token: user.token,
      }),
    { onSettled: () => queryCache.invalidateQueries("list-items"), ...options }
  );

  return result;
}

function useCreateListItem(user, options) {
  const queryCache = useQueryClient();
  const result = useMutation(
    ({ bookId }) =>
      client(`list-items`, { data: { bookId }, token: user.token }),
    { onSettled: () => queryCache.invalidateQueries("list-items") ,...options}
  );

  return result;
}

function useRemoveListItem(user, options) {
  const queryCache = useQueryClient();
  const result = useMutation(
    ({ id }) =>
      client(`list-items/${id}`, { method: "DELETE", token: user.token }),
      { onSettled: () => queryCache.invalidateQueries("list-items") ,...options}
  );

  return result;
}

export {useUpdateListItem, useCreateListItem, useRemoveListItem};
