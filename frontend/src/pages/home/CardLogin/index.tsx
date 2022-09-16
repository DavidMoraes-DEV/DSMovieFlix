import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { requestBackendLogin } from 'util/requests';
import { getAuthData, saveAuthData } from 'util/storage';
import './styles.css';

type FormData = {
  username: string;
  password: string;
};

const CardLogin = () => {

  const history = useHistory();

  const [hasError, setHasError] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (formData: FormData) => {
    requestBackendLogin(formData)
      .then((response) => {
        saveAuthData(response.data);
        setHasError(false);
        history.push('/movies')
      })
      .catch((error) => {
        setHasError(true);
      });
  };

  return (
    <div className="login-container base-card">
      <h1>LOGIN</h1>
      {hasError && (
        <div className="alert alert-danger">
          Erro ao tentar efetuar o login!
        </div>
      )}
      <form onSubmit={handleSubmit(onSubmit)} className="form-container">
        <div className="input-email">
          <div className="invalid-feedback d-block mb-1">
            {errors.username?.message}
          </div>
          <input
            {...register('username', {
              required: '* Campo Obrigatório',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Email inválido',
              },
            })}
            type="text"
            className={`form-control base-input ${
              errors.username ? 'is-invalid' : ''
            }`}
            placeholder="Email"
            name="username"
          />
        </div>
        <div className="input-password">
          <div className="invalid-feedback d-block mb-1">
            {errors.password?.message}
          </div>
          <input
            {...register('password', {
              required: '* Campo Obrigatório',
            })}
            type="password"
            className={`form-control base-input ${
              errors.password ? 'is-invalid' : ''
            }`}
            placeholder="Password"
            name="password"
          />
        </div>
        <button>FAZER LOGIN</button>
      </form>
    </div>
  );
};

export default CardLogin;
