import { createContext, useMemo, useState } from "react";
import { useSearchQuery, useSearchTextContext } from "../lib/hooks";
import { RESULTS_PER_PAGE } from "../lib/constants";
import { SortBy, PageDirection, JobItem } from "../lib/types";

type JobItemsContext = {
  jobItems: JobItem[] | undefined;
  isLoading: boolean;
  totalNumberOfResults: number;
  pagesTotal: number;
  jobItemsSortedAndSliced: JobItem[];
  sortBy: SortBy;
  currentPage: number;
  handleChangeSortBy: (newSortBy: SortBy) => void;
  handleChangePage: (direction: PageDirection) => void;
};

export const JobItemsContext = createContext<JobItemsContext | null>(null);

export default function JobItemsContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // dependency on other context
  const { debouncedSearchText } = useSearchTextContext();
  // state
  const { jobItems, isLoading } = useSearchQuery(debouncedSearchText);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<SortBy>("relevant");

  // derived / computed state
  const totalNumberOfResults = jobItems?.length || 0;
  const pagesTotal = Math.ceil(totalNumberOfResults / RESULTS_PER_PAGE);
  const jobItemsSorted = useMemo(
    () =>
      [...(jobItems || [])].sort((a, b) => {
        if (sortBy === "relevant") {
          return b.relevanceScore - a.relevanceScore;
        } else sortBy === "recent";
        return a.daysAgo - b.daysAgo;
      }),
    [sortBy, jobItems]
  );
  const jobItemsSortedAndSliced = useMemo(
    () =>
      jobItemsSorted.slice(
        RESULTS_PER_PAGE * currentPage - RESULTS_PER_PAGE,
        currentPage * RESULTS_PER_PAGE
      ),
    [currentPage, jobItemsSorted]
  );

  // event handlers / actions
  function handleChangeSortBy(newSortBy: SortBy) {
    setCurrentPage(1);
    setSortBy(newSortBy);
  }
  function handleChangePage(direction: PageDirection) {
    if (direction === "next") {
      setCurrentPage((prev) => prev + 1);
    } else {
      setCurrentPage((prev) => prev - 1);
    }
  }

  const contextValue = useMemo(
    () => ({
      jobItems,
      jobItemsSortedAndSliced,
      isLoading,
      totalNumberOfResults,
      pagesTotal,
      currentPage,
      sortBy,
      handleChangeSortBy,
      handleChangePage,
    }),
    [
      jobItems,
      jobItemsSortedAndSliced,
      isLoading,
      totalNumberOfResults,
      pagesTotal,
      currentPage,
      sortBy,
      handleChangeSortBy,
      handleChangePage,
    ]
  );

  return (
    <JobItemsContext.Provider value={contextValue}>
      {children}
    </JobItemsContext.Provider>
  );
}
