import { useJobItemsContext } from "../lib/hooks";
import { SortBy } from "../lib/types";

export default function SortingControls() {
  const { sortBy, handleChangeSortBy } = useJobItemsContext();
  return (
    <section className="sorting">
      <i className="fa-solid fa-arrow-down-short-wide"></i>

      <SortingButton
        isActive={sortBy === "relevant"}
        onClick={() => handleChangeSortBy("relevant")}
      >
        Relevant
      </SortingButton>
      <SortingButton
        isActive={sortBy === "recent"}
        onClick={() => handleChangeSortBy("recent")}
      >
        Recent
      </SortingButton>
    </section>
  );
}

type SortingButtonProps = {
  children: React.ReactNode;
  onClick: (direction: SortBy) => void;
  isActive: boolean;
};

function SortingButton({ children, onClick, isActive }: SortingButtonProps) {
  return (
    <button
      onClick={() => onClick("recent")}
      className={`sorting__button sorting__button--recent ${
        isActive && "sorting__button--active"
      }`}
    >
      {children}
    </button>
  );
}
