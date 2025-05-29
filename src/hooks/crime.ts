import { useState, useEffect } from "react";

export const useCrime = () => {
  const [data, setData] = useState<CrimeData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/crimes");

      if (response.status == 500) {
        console.error("Error fetching crime data");
      } else {
        const data = await response.json();
        console.log(data);
        setData(data || []);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  return { data, loading };
};
