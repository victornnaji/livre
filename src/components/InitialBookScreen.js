import { useAsync } from 'hooks/use-async';
import React from 'react'
import { client } from '_helpers/client';
import BookRow from './BookRow';
import Loading from './Loading';

const InitialBookScreen = () => {
    const {run, data, isError, isLoading, isIdle, isSuccess} = useAsync();

    React.useEffect(() => {
        run(client('books?query='));
    }, [run])

    return (
        <>
         {isIdle || isLoading ? (<Loading />): null}
            {isSuccess ? (
                data.books.map(book => (
                    <div className={`x ${data.books.length < 3 ? "two-books": null}`} key={book.id}><BookRow book={book} /></div>
                ))
            ) :  null}
            {isError ? (<div>error fetching book</div>) : null}
        </>
    )
}

export default InitialBookScreen
