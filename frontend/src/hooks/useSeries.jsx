import { useRef, useState, useMemo, useCallback } from 'react';
import { searchSeries } from '../services/series.js';

export function useSeries({ search, sort }) {
  const [series, setSeries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [, setError] = useState(null); // Aunque no se usa, está listo para implementar manejo de errores.
  const previousSearch = useRef(search);

  const getSeries = useCallback(async () => {
    if (search === previousSearch.current) return;

    try {
      setLoading(true);
      setError(null);
      previousSearch.current = search;
      const newSeries = await searchSeries(search); // Asegúrate de que la función searchSeries acepte un string y no un objeto.
      setSeries(newSeries);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, [search]); // Asegúrate de que la dependencia search esté incluida.

  const sortedSeries = useMemo(() => {
    return sort
      ? [...series].sort((a, b) => a.title.localeCompare(b.title))
      : series;
  }, [sort, series]);

  return { series: sortedSeries, getSeries, loading };
}