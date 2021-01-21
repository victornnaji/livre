import React from 'react';
import { useQuery, useQueryClient} from "react-query";
import PlaceHolder from "assets/PlaceHolder.svg";
import { useClient } from "_context/auth-context";

const loadingBook = {
  title: "Loading...",
  author: "loading...",
  coverImageUrl: PlaceHolder,
  publisher: "Loading Publishing",
  synopsis: "Loading...",
  pageCount: "...loading",
  loadingBook: true,
};

const loadingBooks = Array.from({ length: 10 }, (v, index) => ({
  id: `loading-book-${index}`,
  ...loadingBook,
}));

const getBookSearchConfig = (query, client, queryCache) => ({
  queryKey: ["book-search", { query }],
  queryFn: () =>
      client(`books?query=${encodeURIComponent(query)}`).then((data) => data.books),
    onSuccess(books){
      for(const book of books){
        queryCache.setQueryData(['book', {bookId: book.id}], book)
      }
    }
})

function useBookSearch(query) {
  const queryCache = useQueryClient();
  const client = useClient();
  const result = useQuery(getBookSearchConfig(query, client, queryCache));

  return { ...result, books: result.data ? result.data : loadingBooks };
}

function useBook(bookId){
    const client = useClient();
    const result = useQuery({
        queryKey: ['book', {bookId}],
        queryFn: () => client(`books/${bookId}`).then(data => data.book),
    });

    return {...result, book: result.data ?? loadingBook};
}

function useListItems(){
    const client = useClient();
    const { data: listItems } = useQuery({
        queryKey: "list-items",
        queryFn: () =>
          client(`list-items`).then(
            (data) => data.listItems
          ),
    });

    return listItems;
}

function useListItem(bookId){
    const listItems = useListItems();
    const listItem = listItems?.find(li => li.bookId === bookId) ?? null

    return listItem;
}

const useRefetchBookSearchQuery = () =>{
  const client = useClient();
  return React.useCallback(async function refetchBookSearchQuery(queryCache){
    queryCache.removeQueries('book-search');
    await queryCache.prefetchQuery(getBookSearchConfig('', client, queryCache))
  
  },[client])
}


export { useBookSearch , useBook, useListItems, useListItem, useRefetchBookSearchQuery};
