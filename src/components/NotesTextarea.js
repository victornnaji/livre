import React from 'react'
import debounceFn from 'debounce-fn'
import styled from 'styled-components'
import { theme } from 'styles'
import { useUpdateListItem } from 'hooks/mutation-hooks';
import Spinner from 'assets/Spinner';

const NotesTextarea = ({listItem, user}) => {

  const {mutateAsync: mutate, isLoading, error, isError} = useUpdateListItem(user);
  
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
            display: "flex",
            marginRight: 10,
            marginTop: "0",
            marginBottom: "0.5rem",
            fontWeight: "bold",
            fontSize: '1.5rem',
          }}
        >
          Notes <span style={{marginLeft: "1rem"}}>{isLoading ?<Spinner /> : null}
          {isError ? <div>{error}</div> : null}
          </span>
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
