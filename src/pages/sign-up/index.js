import './styles.css';
import imgSignup from '../../assets/img-sign-up.png'
import FormSignUp from '../../components/FormSignUp';

function SignUp() {
  return (
    <div className='container-signup'>
      <FormSignUp />
      <img src={imgSignup} alt='imagem fundo cadastro' />
    </div>
  );
}

export default SignUp;
