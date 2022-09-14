import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { requestBackendLogin } from 'util/request';
import './styles.css';

type FormData = {
  username: string;
  password: string;
};

const CardLogin = () => {
  const [hasError, setHasError] = useState(false);
  const { register, handleSubmit } = useForm<FormData>();
  const onSubmit = (formData: FormData) => {
    requestBackendLogin(formData)
      .then((response) => {
        setHasError(false);
        console.log('SUCESSO', response);
      })
      .catch((error) => {
        setHasError(true);
        console.log('ERRO: ', error);
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
          <input
            {...register('username')}
            type="text"
            className="base-input"
            placeholder="Email"
            name="username"
          />
        </div>
        <div className="input-password">
          <input
            {...register('password')}
            type="password"
            className="base-input"
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
