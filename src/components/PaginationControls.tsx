import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import { useJobItemsContext } from "../lib/hooks";
import { PageDirection } from "../lib/types";

export default function PaginationControls() {
  const {
    currentPage,
    pagesTotal,
    handleChangePage: onClick,
  } = useJobItemsContext();
  return (
    <section className="pagination">
      {currentPage > 1 && (
        <PaginationButton
          direction={"previous"}
          onClick={onClick}
          currentPage={currentPage}
        />
      )}
      {currentPage < pagesTotal && (
        <PaginationButton
          direction={"next"}
          onClick={onClick}
          currentPage={currentPage}
        />
      )}
    </section>
  );
}

type PaginationButtonProps = {
  onClick: (direction: PageDirection) => void;
  currentPage: number;
  direction: PageDirection;
};

function PaginationButton({
  direction,
  onClick,
  currentPage,
}: PaginationButtonProps) {
  const text = direction === "previous" ? currentPage - 1 : currentPage + 1;

  return (
    <button
      onClick={() => onClick(direction)}
      className={`pagination__button pagination_button--${direction}`}
    >
      {direction === "previous" && <ArrowLeftIcon />}
      Page {text}
      {direction === "next" && <ArrowRightIcon />}
    </button>
  );
}
