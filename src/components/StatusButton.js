import React from 'react'
import ToolTipButton from './ToolTipButton'
import styled from 'styled-components'
import Add from 'assets/Add'
import { mixin, theme } from 'styles'
import BookSvg from 'assets/BookSvg'
import CheckedSvg from 'assets/CheckedSvg'
import RemoveSvg from 'assets/RemoveSvg'
import {useQuery, useMutation,useQueryClient} from 'react-query';
import { client } from '_helpers/client'

const StatusButton = ({user, book}) => {
  const queryCache = useQueryClient();
  const colors = theme.colors;

  const {data: listItems} = useQuery({
    queryKey: 'list-items',
    queryFn: () =>
      client(`list-items`, {token: user.token}).then(data => data.listItems),
  })
  const listItem = listItems?.find(li => li.bookId === book.id) ?? null

    const {mutateAsync: create} = useMutation(
      ({bookId}) => client(`list-items`, {data: {bookId}, token: user.token}),
      {onSettled: () => queryCache.invalidateQueries('list-items')},
    )

    const {mutateAsync: remove} = useMutation(
      ({id}) => client(`list-items/${id}`, {method: 'DELETE', token: user.token}),
      {onSettled: () => queryCache.invalidateQueries('list-items')},
    )
    const {mutateAsync: update} = useMutation(
      (update) => client(`list-items/${update.id}`, {method: 'PUT',  data: update,token: user.token}),
      {onSettled: () => queryCache.invalidateQueries('list-items')},
    )

    return (
      <StyledStatusButton>
        {listItem ? (
          Boolean(listItem.finishDate) ? (
            <ToolTipButton
              label="Unmark as read"
              highlight={colors.yellow}
              onClick={() => update({id: listItem.id, finishDate: null})}
              icon={<BookSvg />}
            />
          ) : (
            <ToolTipButton
              label="Mark as read"
              highlight={colors.green}
              onClick={() => update({id: listItem.id, finishDate: Date.now()})}
              icon={<CheckedSvg />}
            />
          )
        ) : null}
        {listItem ? (
          <ToolTipButton
            label="Remove from list"
            highlight={colors.danger}
            onClick = {() => remove({id: listItem.id})}
            icon={<RemoveSvg />}
          />
        ) : (
          <ToolTipButton
            label="Add to list"
            highlight={colors.indigo}
            onClick={() => create({bookId: book.id})}
            icon={<Add />}
          />
        )}
      </StyledStatusButton>
    );
}

const StyledStatusButton = styled.div`
    ${mixin.flexBetween};
    justify-content: center;

    button{
        &:nth-child(2){
            margin-left: 1rem;
        }
    }
`;

export default StatusButton
