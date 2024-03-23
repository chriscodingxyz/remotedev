import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";

type PaginationControlsProps = {
  onClick: (direction: "next" | "previous") => void;
  currentPage: number;
};

type PaginationButtonProps = PaginationControlsProps & {
  direction: "next" | "previous";
};

// choosing to extend the last type of PaginationControlsProps
// type PaginationButtonProps = {
//   direction: "next" | "previous";
//   onClick: (direction: "next" | "previous") => void;
//   currentPage: number;
// };

export default function PaginationControls({
  onClick,
  currentPage,
}: PaginationControlsProps) {
  return (
    <section className="pagination">
      <PaginationButton
        direction={"previous"}
        onClick={onClick}
        currentPage={currentPage}
      />
      {currentPage}
      <PaginationButton
        direction={"next"}
        onClick={onClick}
        currentPage={currentPage}
      />
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
    <button onClick={() => onClick(direction)} className="pagination__button">
      {direction === "previous" && <ArrowLeftIcon />}
      Page {text}
      {direction === "next" && <ArrowRightIcon />}
    </button>
  );
}
