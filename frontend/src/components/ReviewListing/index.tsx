import { Review } from 'types/Review';
import { ReactComponent as MainImage } from '../../assets/images/star.svg';
import './styles.css';

type Props = {
  reviews: Review[];
};

const ReviewListing = ({ reviews }: Props) => {
  return (
    <div className="movie-details-review base-card">
      {reviews.map((reviews) => (
        <div key={reviews.id}>
          <div className="review-username">
            <MainImage />
            <h1>{reviews.user.name}</h1>
          </div>
          <div className="review">{reviews.text}</div>
        </div>
      ))}
    </div>
  );
};

export default ReviewListing;
