import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";

type PaginationControlsProps = {
  onClick: (direction: "next" | "previous") => void;
  currentPage: number;
  pagesTotal: number;
};

type PaginationButtonProps = {
  onClick: (direction: "next" | "previous") => void;
  currentPage: number;
  direction: "next" | "previous";
};

export default function PaginationControls({
  onClick,
  currentPage,
  pagesTotal,
}: PaginationControlsProps) {
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
