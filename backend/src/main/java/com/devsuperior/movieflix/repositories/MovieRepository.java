package com.devsuperior.movieflix.repositories;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.devsuperior.movieflix.entities.Genre;
import com.devsuperior.movieflix.entities.Movie;

public interface MovieRepository extends JpaRepository<Movie, Long>{
	
	@Query("SELECT DISTINCT obj FROM Movie obj INNER JOIN obj.genre genr "
			+ "WHERE (COALESCE(:genres) IS NULL OR genr IN :genres) AND "
			+ "(LOWER(obj.title) LIKE LOWER(CONCAT('%',:title,'%'))) "
			+ "ORDER BY obj.title ASC")
	Page<Movie> findAllMovieGenre(List<Genre> genres, String title, Pageable pageable);
	
	@Query("SELECT obj FROM Movie obj JOIN FETCH obj.genre WHERE obj IN :movies")
	List<Movie> findMovieWithGenres(List<Movie> movies);
}
