import { BookmarkFilledIcon } from "@radix-ui/react-icons";
import { useContext } from "react";
import { BookmarksContext } from "../contexts/BookmarksContextProvider";

export default function BookmarkIcon({ id }: { id: number }) {
  const { bookmarkedIds, handleToggleBookmark } = useContext(BookmarksContext);
  const idIncluded = bookmarkedIds.includes(id);

  return (
    <button
      onClick={(e) => {
        handleToggleBookmark(id);
        e.stopPropagation();
        e.preventDefault();
      }}
      className="bookmark-btn"
    >
      <BookmarkFilledIcon className={idIncluded ? "filled" : ""} />
    </button>
  );
}
