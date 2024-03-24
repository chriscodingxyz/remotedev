import { useState, createContext, useEffect } from "react";

export const BookmarksContext = createContext(null);

export default function BookmarksContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const bookmarkedIdsFromLocalStorage = JSON.parse(
    localStorage.getItem("bookmarkedIds") || "[]"
  );
  const [bookmarkedIds, setBookmarkIds] = useState<number[]>(
    bookmarkedIdsFromLocalStorage
  );
  function handleToggleBookmark(id: number) {
    if (bookmarkedIds.includes(id)) {
      setBookmarkIds((prev) => prev.filter((item) => item !== id));
    } else {
      setBookmarkIds((prev) => [...prev, id]);
    }
  }

  useEffect(() => {
    localStorage.setItem("bookmarkedIds", JSON.stringify(bookmarkedIds));
  }, [bookmarkedIds]);

  return (
    <BookmarksContext.Provider value={{ bookmarkedIds, handleToggleBookmark }}>
      {children}
    </BookmarksContext.Provider>
  );
}
