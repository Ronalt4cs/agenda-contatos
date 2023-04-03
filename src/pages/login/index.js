import './styles.css';
import FormLogin from '../../components/FormLogin';
import imgLogin from '../../assets/img-login.png'

function Login() {
  return (
    <div className='container-login'>
      <img src={imgLogin} alt='capa login' />
      <FormLogin />
    </div>
  );
}

export default Login;
