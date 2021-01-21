import { useMutation, useQueryClient } from "react-query";
import { client } from "_helpers/client";

function useUpdateListItem(user) {
  const queryCache = useQueryClient();
  const { mutateAsync } = useMutation(
    (update) =>
      client(`list-items/${update.id}`, {
        method: "PUT",
        data: update,
        token: user.token,
      }),
    { onSettled: () => queryCache.invalidateQueries("list-items") }
  );

  return { mutateAsync };
}

function useCreateListItem(user) {
  const queryCache = useQueryClient();
  const { mutateAsync } = useMutation(
    ({ bookId }) =>
      client(`list-items`, { data: { bookId }, token: user.token }),
    { onSettled: () => queryCache.invalidateQueries("list-items") }
  );

  return { mutateAsync };
}

function useRemoveListItem(user) {
  const queryCache = useQueryClient();
  const { mutateAsync } = useMutation(
    ({ id }) =>
      client(`list-items/${id}`, { method: "DELETE", token: user.token }),
    { onSettled: () => queryCache.invalidateQueries("list-items") }
  );

  return { mutateAsync };
}

export {useUpdateListItem, useCreateListItem, useRemoveListItem};
