import { AxiosRequestConfig } from 'axios';
import { useForm } from 'react-hook-form';
import { Review } from 'types/Review';
import { requestBackend } from 'util/requests';
import './styles.css';

type Props = {
  movieId: string;
  onInsertReview: (review: Review) => void
};

type FormData = {
  movieId: number;
  text: string;
};

const ReviewForm = ({ movieId, onInsertReview }: Props) => {
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm<FormData>();

  const onSubmit = (formData: FormData) => {

    formData.movieId = parseInt(movieId);

    console.log(formData);

    const config: AxiosRequestConfig = {
      method: 'POST',
      url: '/reviews',
      data: formData,
      withCredentials: true,
    };

    requestBackend(config)
    .then(response => {
      setValue('text', '');
      onInsertReview(response.data);
      console.log("Sucesso ao Salvar", response);
    }).catch(error => {
      console.log("Erro ao salvar", error);
    })
  };

  return (
    <div className="movie-details-form base-card">
      <form onSubmit={handleSubmit(onSubmit)} className="form-itens">
        <input
        {...register('text', {
          required: 'Campo Obrigatório'
        })}
          type="text"
          className="base-input"
          placeholder="Deixe sua avaliação aqui"
        />
        <div>
          {errors.text?.message}
        </div>
        <button type='submit'>SALVAR AVALIAÇÃO</button>
      </form>
    </div>
  );
};

export default ReviewForm;
