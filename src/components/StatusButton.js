import React from 'react'
import ToolTipButton from './ToolTipButton'
import styled from 'styled-components'
import Add from 'assets/Add'
import { mixin, theme } from 'styles'
import BookSvg from 'assets/BookSvg'
import CheckedSvg from 'assets/CheckedSvg'
import RemoveSvg from 'assets/RemoveSvg'
import { useListItem } from 'hooks/query-hooks'
import { useUpdateListItem, useCreateListItem, useRemoveListItem } from 'hooks/mutation-hooks'

const StatusButton = ({user, book}) => {
  const colors = theme.colors;
  const listItem = useListItem(book.id, user);

  const { mutateAsync: create } = useCreateListItem(user);

  const { mutateAsync: remove } = useRemoveListItem(user);

  const { mutateAsync: update } = useUpdateListItem(user);
  return (
    <StyledStatusButton>
      {listItem ? (
        Boolean(listItem.finishDate) ? (
          <ToolTipButton
            label="Unmark as read"
            highlight={colors.yellow}
            onClick={() => update({ id: listItem.id, finishDate: null })}
            icon={<BookSvg />}
          />
        ) : (
          <ToolTipButton
            label="Mark as read"
            highlight={colors.green}
            onClick={() => update({ id: listItem.id, finishDate: Date.now() })}
            icon={<CheckedSvg />}
          />
        )
      ) : null}
      {listItem ? (
        <ToolTipButton
          label="Remove from list"
          highlight={colors.danger}
          onClick={() => remove({ id: listItem.id })}
          icon={<RemoveSvg />}
        />
      ) : (
        <ToolTipButton
          label="Add to list"
          highlight={colors.indigo}
          onClick={() => create({ bookId: book.id })}
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
