import { useEffect, useState } from "react";

export function useAlchemyCall<T>(apiCall: Promise<T> | undefined) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>();
  const [data, setData] = useState<T | undefined>(undefined);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  async function fetchData(apiCallPromise: Promise<T>) {
    try {
      setLoading(true);
      const result = await apiCallPromise;
      console.log("fetch data");
      setData(result);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  }

  useEffect(() => {
    if (apiCall) fetchData(apiCall);
    console.log("api call", apiCall);
  }, []);

  return { data, loading, error };
}
