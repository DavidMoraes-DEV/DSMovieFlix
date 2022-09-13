package com.devsuperior.movieflix.services;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.devsuperior.movieflix.dto.ReviewDTO;
import com.devsuperior.movieflix.entities.Movie;
import com.devsuperior.movieflix.entities.Review;
import com.devsuperior.movieflix.entities.User;
import com.devsuperior.movieflix.repositories.MovieRepository;
import com.devsuperior.movieflix.repositories.ReviewRepository;
import com.devsuperior.movieflix.services.exceptions.ResourceNotFoundException;

@Service
public class ReviewService {
	
	@Autowired
	private ReviewRepository repository;
	
	@Autowired
	private AuthService authService;
	
	@Autowired 
	private MovieRepository movieRepository;
	
	@Transactional(readOnly = true)
	public List<ReviewDTO> findByMovie(Long movieId) {
	
		Optional<Movie> obj = movieRepository.findById(movieId);
		Movie movie = obj.orElseThrow(() -> new ResourceNotFoundException("Entity not found"));
		List<Review> reviews = movie.getReviews();
		List<ReviewDTO> reviewsUserDTO = reviews.stream().map(x -> new ReviewDTO(x)).collect(Collectors.toList());
		
		return reviewsUserDTO;
	}
	
	@Transactional
	public ReviewDTO insert(ReviewDTO reviewUserDTO) {
		
		User user = authService.authenticated();
		
		Review review = new Review();
		review.setId(reviewUserDTO.getId());
		review.setMovie(new Movie(reviewUserDTO.getMovieId(), null, null, null, null, null, null));
		review.setUser(new User(user.getId(), user.getName(), user.getEmail(), user.getPassword()));
		review.setText(reviewUserDTO.getText());
		
		review = repository.save(review);
		
		return new ReviewDTO(review);
	}
}
