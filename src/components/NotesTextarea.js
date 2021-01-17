import React from 'react'
import debounceFn from 'debounce-fn'
import styled from 'styled-components'
import { theme } from 'styles'
import {useMutation, useQueryClient} from 'react-query';
import { client } from '_helpers/client';

const NotesTextarea = ({listItem, user}) => {
// the mutate function should call the list-items/:listItemId endpoint with a PUT
  //   and the updates as data. The mutate function will be called with the updates
  //   you can pass as data.
  // 💰 if you want to get the list-items cache updated after this query finishes
  // the use the `onSettled` config option to queryCache.invalidateQueries('list-items')
  // 💣 DELETE THIS ESLINT IGNORE!! Don't ignore the exhaustive deps rule please
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const queryCache = useQueryClient();

  const {mutateAsync: mutate} = useMutation(
      updates =>  client(`list-items/${updates.id}`, {
        method: 'PUT',
        data: updates,
        token: user.token,
      }),
    {onSettled: () => queryCache.invalidateQueries('list-items')},
  )
  const debouncedMutate = React.useMemo(() => debounceFn(mutate, {wait: 300}), [
    mutate,
  ])

  function handleNotesChange(e) {
    debouncedMutate({id: listItem.id, notes: e.target.value})
  }
    return (
      <div>
        <label
          htmlFor="notes"
          style={{
            display: "inline-block",
            marginRight: 10,
            marginTop: "0",
            marginBottom: "0.5rem",
            fontWeight: "bold",
            fontSize: '1.5rem',
          }}
        >
          Notes
        </label>
        <StyledTextArea id="notes"
        defaultValue={listItem.notes}
        onChange={handleNotesChange}
        style={{width: '100%', minHeight: 300}} placeholder={`Interesting notes about ${listItem.book.title}...`}/>
      </div>
    );
}

const StyledTextArea = styled.textarea`
    background: ${theme.colors.grey};
    border: 1px solid transparent;
    border-radius: .4rem;
    padding: 8px 12px;
    font-size: 1.5rem;
    font-family: ${theme.fonts.Nunito};
    box-sizing: border-box;
`

export default NotesTextarea
