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

export { useBookSearch };
