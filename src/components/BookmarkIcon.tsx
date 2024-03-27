import { BookmarkFilledIcon } from "@radix-ui/react-icons";
import { useBookMarksContext } from "../lib/hooks";

export default function BookmarkIcon({ id }: { id: number }) {
  const context = useBookMarksContext();
  const { bookmarkedIds, handleToggleBookmark } = context;
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
