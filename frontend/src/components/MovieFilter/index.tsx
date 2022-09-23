import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Select from 'react-select';
import { Genre } from 'types/Genre';
import { requestBackend } from 'util/requests';
import './styles.css';

export type MovieGenreFilter = {
  name: string;
  genre: Genre | null;
};

type Props = {
    onSubmitFilter : (data: MovieGenreFilter) => void;
}

const MovieFilter = ( { onSubmitFilter } : Props ) => {
  const [selectMovieGenre, setSelectMovieGenre] = useState<Genre[]>([]);

  useEffect(() => {
    requestBackend({ url: '/genres', withCredentials: true }).then(
      (response) => {
        setSelectMovieGenre(response.data);
      }
    );
  }, []);

  const { handleSubmit, setValue, getValues, control } = useForm<MovieGenreFilter>();

  const onSubmit = (formData: MovieGenreFilter) => {
    onSubmitFilter(formData);
  };

  const handleChangeGenre = (value: Genre) => {
    setValue('genre', value);

    const obj : MovieGenreFilter = {
        name: getValues('name'),
        genre: getValues('genre')
    }

    onSubmitFilter(obj);
  }

  return (
    <div className="movies-filter-container">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="base-card movies-filter-content"
      >
        <Controller
          name="genre"
          rules={{ required: true }}
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              options={selectMovieGenre}
              classNamePrefix="movies-filter-select"
              placeholder='Categoria'
              onChange={value => handleChangeGenre(value as Genre)}
              getOptionLabel={(genre: Genre) => genre.name}
              getOptionValue={(genre: Genre) => String(genre.id)}
            />
          )}
        />
      </form>
    </div>
  );
};

export default MovieFilter;
