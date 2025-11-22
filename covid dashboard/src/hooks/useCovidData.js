// custom hook
import { useState, useEffect } from 'react';
import { API_URL } from '../constants/api';

export const useCovidData = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error('Network error');
        const json = await res.json();
        setData(json);
        setError(null);
      } catch (err) {
        console.warn('API failed', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return { data, loading, error };
};