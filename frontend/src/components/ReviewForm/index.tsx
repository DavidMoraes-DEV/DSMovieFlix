import { AxiosRequestConfig } from 'axios';
import { useForm } from 'react-hook-form';
import { Review } from 'types/Review';
import { requestBackend } from 'util/requests';
import { toast } from 'react-toastify';
import './styles.css';

type Props = {
  movieId: string;
  onInsertReview: (review: Review) => void;
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
    setValue,
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

    requestBackend(config).then((response) => {
      toast.info('Avaliação enviada com sucesso!')
      setValue('text', '');
      onInsertReview(response.data);
    }).catch(() => {
      toast.error('Erro ao enviar a avaliação!')
    });
  };

  return (
    <div className="movie-details-form base-card">
      <form onSubmit={handleSubmit(onSubmit)} className="form-itens">
        <div className='movie-details-error'>{errors.text?.message}</div>
        <input
          {...register('text', {
            required: '* Campo Obrigatório',
          })}
          type="text"
          className="form-control base-input"
          placeholder="Deixe sua avaliação aqui"
        />
        <button type="submit">SALVAR AVALIAÇÃO</button>
      </form>
    </div>
  );
};

export default ReviewForm;
