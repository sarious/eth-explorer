import { useCallback, useEffect, useState } from "react";

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

export function useAlchemyApi<Q, T>(
  p: (query: Q) => Promise<T>
): {
  data: T | undefined;
  loading: boolean;
  error: Error | undefined;
  fetch: (query: Q) => Promise<void>;
} {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | undefined>(undefined);
  const [data, setData] = useState<T | undefined>(undefined);

  const fetch = useCallback(async (query: Q) => {
    if (loading) return;
    setLoading(true);

    try {
      const result = await p(query);
      setLoading(false);
      setData(result);
    } catch (error) {
      setLoading(false);
      setError(error instanceof Error ? error : new Error(`${error}`));
    }
  }, []);

  return { data, loading, error, fetch };
}
