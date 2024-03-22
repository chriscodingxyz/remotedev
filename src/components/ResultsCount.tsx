import { useDebounce } from "../lib/hooks";

type ResultsCountProps = {
  totalNumberOfResults: number;
};

export default function ResultsCount({
  totalNumberOfResults,
}: ResultsCountProps) {
  const debouncedTottalNumberOfResults = useDebounce(totalNumberOfResults);
  return (
    <p className="count">
      <span className="u-bold">{debouncedTottalNumberOfResults}</span> results
    </p>
  );
}
