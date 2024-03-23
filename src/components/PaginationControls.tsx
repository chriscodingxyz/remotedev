type PaginationControlsProps = {
  onClick: (direction: "next" | "previous") => void;
  currentPage: number;
};

export default function PaginationControls({
  onClick,
  currentPage,
}: PaginationControlsProps) {
  return (
    <section className="pagination">
      <button
        onClick={() => onClick("previous")}
        className="pagination__button"
      >
        Page {currentPage - 1}
      </button>
      <button onClick={() => onClick("next")} className="pagination__button">
        Page {currentPage + 1}
      </button>
    </section>
  );
}
