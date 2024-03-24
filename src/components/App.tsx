import { useState } from "react";
import Background from "./Background";
import Container from "./Container";
import Footer from "./Footer";
import Header, { HeaderTop } from "./Header";
import BookmarksButton from "./BookmarksButton";
import Logo from "./Logo";
import SearchForm from "./SearchForm";
import JobItemContent from "./JobItemContent";
import Sidebar, { SidebarTop } from "./Sidebar";
import JobList from "./JobList";
import PaginationControls from "./PaginationControls";
import ResultsCount from "./ResultsCount";
import SortingControls from "./SortingControls";
import { useDebounce, useJobItems } from "../lib/hooks";
import { Toaster } from "sonner";
import { RESULTS_PER_PAGE } from "../lib/constants";
import { PageDirection, SortBy } from "../lib/types";

function App() {
  const [searchText, setSearchText] = useState("");
  const debouncedSearchText = useDebounce(searchText, 300);
  const { jobItems, isLoading } = useJobItems(debouncedSearchText);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<SortBy>("relevant");

  function handleChangeSortBy(newSortBy: SortBy) {
    setCurrentPage(1);
    setSortBy(newSortBy);
  }

  const totalNumberOfResults = jobItems?.length || 0;

  const jobItemsSorted = [...(jobItems || [])].sort((a, b) => {
    if (sortBy === "relevant") {
      return b.relevanceScore - a.relevanceScore;
    } else sortBy === "recent";
    return a.daysAgo - b.daysAgo;
  });

  const jobItemsSortedAndSliced = jobItemsSorted.slice(
    RESULTS_PER_PAGE * currentPage - RESULTS_PER_PAGE,
    currentPage * RESULTS_PER_PAGE
  );

  const pagesTotal = Math.ceil(totalNumberOfResults / RESULTS_PER_PAGE);

  function handleChangePage(direction: PageDirection) {
    if (direction === "next") {
      setCurrentPage((prev) => prev + 1);
    } else {
      setCurrentPage((prev) => prev - 1);
    }
  }

  return (
    <>
      <Toaster richColors />
      <Background />
      <Header>
        <HeaderTop>
          <Logo />
          <BookmarksButton />
        </HeaderTop>
        <SearchForm searchText={searchText} setSearchText={setSearchText} />
      </Header>
      <Container>
        {searchText ? (
          <Sidebar>
            <SidebarTop>
              <ResultsCount totalNumberOfResults={totalNumberOfResults} />
              <SortingControls sortBy={sortBy} onClick={handleChangeSortBy} />
            </SidebarTop>
            <JobList jobItems={jobItemsSortedAndSliced} isLoading={isLoading} />
            <PaginationControls
              currentPage={currentPage}
              onClick={handleChangePage}
              pagesTotal={pagesTotal}
            />
          </Sidebar>
        ) : null}
        <JobItemContent />
      </Container>
      <Footer />
    </>
  );
}

export default App;
