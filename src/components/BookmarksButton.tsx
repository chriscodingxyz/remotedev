import { TriangleDownIcon } from "@radix-ui/react-icons";
import BookmarksPopover from "./BookmarksPopover";
import { useEffect, useRef, useState } from "react";
import { useBookMarksContext, useOnClickOutside } from "../lib/hooks";

export default function BookmarksButton() {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const { bookmarkedIds } = useBookMarksContext();

  useOnClickOutside([buttonRef, popoverRef], () => {
    setIsOpen(false);
  });

  const handleButtonClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsOpen((prev) => !prev);
  };
  useEffect(() => {
    console.log("isOpen===>", isOpen);
  }, [isOpen]);

  return (
    <section>
      <button
        ref={buttonRef}
        onClick={handleButtonClick}
        className="bookmarks-btn"
      >
        {bookmarkedIds.length ? bookmarkedIds.length : ""} Bookmarks{" "}
        <TriangleDownIcon />
      </button>
      {isOpen && <BookmarksPopover ref={popoverRef} />}
    </section>
  );
}
