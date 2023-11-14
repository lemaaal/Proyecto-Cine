import React from 'react';

function ListOfSeries({ series }) {
  return (
    <ul className='series'>
      {
        series.map(serie => (
          <li className='serie' key={serie.id}>
            <h3>{serie.title}</h3>
            <p>{serie.year}</p>
            <img src={`https://image.tmdb.org/t/p/original/${serie.image}`} alt={serie.title} />
          </li>
        ))
      }
    </ul>
  )
}

function NoSeriesResults() {
  return (
    <p>No se encontraron series para esta búsqueda</p>
  )
}

export function Series({ series }) {
  const hasSeries = series?.length > 0;

  return (
    hasSeries
      ? <ListOfSeries series={series} />
      : <NoSeriesResults />
  )
}