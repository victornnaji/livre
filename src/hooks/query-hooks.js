import { useQuery } from "react-query";
import { client } from "_helpers/client";
import PlaceHolder from "assets/PlaceHolder.svg";

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

function useBookSearch(query, user) {
  const result = useQuery({
    queryKey: ["book-search", { query }],
    queryFn: () =>
      client(`books?query=${encodeURIComponent(query)}`, {
        token: user.token,
      }).then((data) => data.books),
  });

  return { ...result, books: result.data ?? loadingBooks };
}

function useBook(bookId, user){
    const result = useQuery({
        queryKey: ['book', {bookId}],
        queryFn: () => client(`books/${bookId}`, {token: user.token}).then(data => data.book),
    });

    return {...result, book: result.data ?? loadingBook};
}

function useListItems(user){
    const { data: listItems } = useQuery({
        queryKey: "list-items",
        queryFn: () =>
          client(`list-items`, { token: user.token }).then(
            (data) => data.listItems
          ),
    });

    return listItems;
}

function useListItem(bookId, user){
    const listItems = useListItems(user);
    const listItem = listItems?.find(li => li.bookId === bookId) ?? null

    return listItem;
}
export { useBookSearch , useBook, useListItems, useListItem};
