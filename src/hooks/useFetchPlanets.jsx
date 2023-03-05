import { useEffect, useState } from 'react';

export default function useFetchPlanets() {
  const [planets, setPlanets] = useState([]);

  const fetchPlanets = () => {
    const URL = 'https://swapi.dev/api/planets';

    fetch(URL)
      .then((response) => response.json())
      .then((data) => {
        data.results.map((planet) => delete planet.residents);
        setPlanets(data.results);
      });
  };

  useEffect(() => {
    fetchPlanets();
  }, []);

  return { planets };
}
