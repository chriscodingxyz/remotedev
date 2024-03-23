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

function App() {
  const [searchText, setSearchText] = useState("");
  const debouncedSearchText = useDebounce(searchText, 300);
  const { jobItems, isLoading } = useJobItems(debouncedSearchText);
  const [currentPage, setCurrentPage] = useState(1);

  const totalNumberOfResults = jobItems?.length || 0;
  const jobItemsSliced =
    jobItems?.slice(7 * currentPage - 7, currentPage * 7) || [];

  const pagesTotal = Math.ceil(totalNumberOfResults / 7);

  function handleChangePage(direction: "next" | "previous") {
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
              <SortingControls />
            </SidebarTop>
            <JobList jobItems={jobItemsSliced} isLoading={isLoading} />
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
