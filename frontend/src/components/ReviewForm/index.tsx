import './styles.css';

const ReviewForm = () => {
  return (
    <div className="movie-details-form base-card">
      <form action="submit" className="form-itens">
        <input
          type="text"
          className="base-input"
          placeholder="Deixe sua avaliação aqui"
          name="username"
        />
        <button>SALVAR AVALIAÇÃO</button>
      </form>
    </div>
  );
};

export default ReviewForm;
