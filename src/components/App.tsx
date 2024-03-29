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

import { Toaster } from "sonner";
import JobListSearch from "./JobListSearch";

function App() {
  return (
    <>
      <Toaster richColors />
      <Background />
      <Header>
        <HeaderTop>
          <Logo />
          <BookmarksButton />
        </HeaderTop>
        <SearchForm />
      </Header>
      <Container>
        {/* {searchText ? ( */}
        <Sidebar>
          <SidebarTop>
            <ResultsCount />
            <SortingControls />
          </SidebarTop>
          {
            //made a seperate component for JobListSearch and I added the context within there, so it doesnt remain in the App.jsx which
            // would cause much more re-renders, which we wanted to avoid from the start with Context
          }
          <JobListSearch />

          <PaginationControls />
        </Sidebar>
        {/* ) : null} */}
        <JobItemContent />
      </Container>
      <Footer />
    </>
  );
}

export default App;
