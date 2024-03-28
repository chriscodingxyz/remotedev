import { useActiveId } from "../lib/hooks";
import { JobItem, JobItemExpanded } from "../lib/types";
import JobListItem from "./JobListItem";
import Spinner from "./Spinner";

type JobListProps = {
  jobItems: JobItem[] | JobItemExpanded[];
  isLoading: boolean;
};

export function JobList({ jobItems, isLoading }: JobListProps) {
  const activeId = useActiveId();

  return (
    <ul className="job-list">
      {isLoading && <Spinner />}

      {!isLoading &&
        jobItems.map((jobItem) => (
          <li className="job-list__item" key={jobItem.id}>
            <JobListItem jobItem={jobItem} isActive={jobItem.id === activeId} />
          </li>
        ))}
    </ul>
  );
}

export default JobList;
