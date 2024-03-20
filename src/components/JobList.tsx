import JobListItem from "./JobListItem";

export function JobList({ jobItems }) {
  return (
    <ul className="job-list">
      {jobItems.map((jobItem) => (
        <li className="job-list__item" key={jobItem.id}>
          <JobListItem jobItem={jobItem} />
        </li>
      ))}
    </ul>
  );
}

export default JobList;
