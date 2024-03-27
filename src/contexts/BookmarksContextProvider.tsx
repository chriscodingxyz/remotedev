import { useState, createContext, useEffect } from "react";
import { useLocalStorage } from "../lib/hooks";

export const BookmarksContext = createContext(null);

export default function BookmarksContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  //now the function to get the bookmarked ids from local storage will run once, optimizing performance
  const [bookmarkedIds, setBookmarkIds] = useLocalStorage("bookmarkedIds", []);
  function handleToggleBookmark(id: number) {
    if (bookmarkedIds.includes(id)) {
      setBookmarkIds((prev) => prev.filter((item) => item !== id));
    } else {
      setBookmarkIds((prev) => [...prev, id]);
    }
  }

  // useEffect(() => {
  //   localStorage.setItem("bookmarkedIds", JSON.stringify(bookmarkedIds));
  // }, [bookmarkedIds]);

  return (
    <BookmarksContext.Provider value={{ bookmarkedIds, handleToggleBookmark }}>
      {children}
    </BookmarksContext.Provider>
  );
}
