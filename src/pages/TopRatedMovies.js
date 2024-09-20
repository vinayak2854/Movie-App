import React, { useEffect, useState } from 'react';
import { fetchMovies } from '../api';
import MovieCard from '../components/MovieCard';
import Pagination from '../components/Pagination';

const TopRatedMovies = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchMovies('top_rated', page).then((response) => {
      setMovies(response.data.results);
      setTotalPages(response.data.total_pages);
    });
  }, [page]);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Top Rated Movies</h2>

      {/* Responsive grid layout for movies */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-6">
          <Pagination page={page} totalPages={totalPages} onPageChange={handlePageChange} />
        </div>
      )}
    </div>
  );
};

export default TopRatedMovies;
