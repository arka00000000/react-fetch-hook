import { useState, useEffect } from "react";

function useFetch(url) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function fetchData() {
      try {
        setLoading(true);
        const res = await fetch(url, { signal: controller.signal });

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const result = await res.json();
        setData(result);
        setError(""); // Clear previous errors if any
      } catch (err) {
        if (err.name !== "AbortError") {
          setError("⚠️ Network error: Failed to fetch products. Please check your internet connection.");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchData();

    return () => controller.abort(); // Cleanup
  }, [url]);

  return { data, loading, error };
}

export default useFetch;
