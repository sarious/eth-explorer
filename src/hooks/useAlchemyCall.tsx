import { useCallback, useEffect, useState } from "react";

export function useAlchemyApi<T>(p: (...query: any) => Promise<T>): {
  data: T | undefined;
  loading: boolean;
  error: Error | undefined;
  fetch: (...query: any) => Promise<void>;
} {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | undefined>(undefined);
  const [data, setData] = useState<T | undefined>(undefined);

  const fetch = useCallback(async (query: any) => {
    if (loading) return;
    setLoading(true);

    try {
      const result = await p(...query);
      setLoading(false);
      setData(result);
    } catch (error) {
      setLoading(false);
      setError(error instanceof Error ? error : new Error(`${error}`));
    }
  }, []);

  return { data, loading, error, fetch };
}
