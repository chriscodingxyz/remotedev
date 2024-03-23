import { useEffect, useState } from "react";
import { JobItem, JobItemExpanded } from "./types";
import { BASE_API_URL } from "./constants";
import { useQuery } from "@tanstack/react-query";

const fetchJobItem = async (id: number): Promise<JobItemExpanded> => {
  const response = await fetch(`${BASE_API_URL}/${id}`);
  //4xx or 5xx error, browser may still show 200
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.description || "Something went wrong");
  }
  const data = await response.json();
  return data.jobItem;
};

export function useJobItems(searchText: string) {
  const [jobItems, setJobItems] = useState<JobItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const totalNumberOfResults = jobItems.length;

  const jobItemsSliced = jobItems.slice(0, 7);

  useEffect(() => {
    if (!searchText) return;
    async function fetchData() {
      setIsLoading(true);
      const response = await fetch(`${BASE_API_URL}?search=${searchText}`);
      const data = await response.json();
      setIsLoading(false);
      setJobItems(data.jobItems);
    }
    fetchData();
  }, [searchText]);

  return {
    jobItemsSliced,
    isLoading,
    totalNumberOfResults,
  };
}

export function useJobItem(id: number | null) {
  const { data, isInitialLoading } = useQuery(
    ["job-item", id],
    () => fetchJobItem(id as number),
    {
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
      retry: false,
      enabled: Boolean(id),
      onError: (error) => {
        console.error(error);
      },
    }
  );

  const jobItem = data as JobItemExpanded;
  const isLoading = isInitialLoading;
  return { jobItem, isLoading };
}

export function useDebounce<T>(value: T, delay = 1000): T {
  const [debouncedSearchText, setDebouncedSearchText] = useState(value);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearchText(value);
    }, delay);
    return () => clearTimeout(timerId);
  }, [value, delay]);

  return debouncedSearchText;
}

export function useActiveId() {
  const [activeId, setActiveId] = useState<number | null>(null);

  useEffect(() => {
    const handleHashChange = () => {
      const id = +window.location.hash.slice(1);
      console.log(id);
      setActiveId(id);
    };

    handleHashChange();

    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  return activeId;
}

// export function useJobItem(id: number | null) {
//   const [jobItem, setJobItem] = useState<JobItemExpanded | null>(null);
//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     if (!id) return;
//     async function fetchData() {
//       setIsLoading(true);
//       const response = await fetch(`${BASE_API_URL}/${id}`);
//       const data = await response.json();
//       setIsLoading(false);
//       setJobItem(data.jobItem);
//     }
//     fetchData();
//   }, [id]);

//   return { jobItem, isLoading };
// }
