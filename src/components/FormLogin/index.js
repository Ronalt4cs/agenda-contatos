import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom'
import api from '../../services/api'
import { useState, useEffect } from 'react';
import './styles.css'

export default function FormLogin() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      const { data } = await api.post('/login', {
        email: email,
        senha: password,
      })

      localStorage.setItem('token', data.token)
      localStorage.setItem('userName', data.usuario.nome)
      localStorage.setItem('userId', data.usuario.id)

      navigate('/home')

    } catch (error) {
      console.log(error)
      return
    }
  }

  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/home')
      return
    }
  }, [navigate])

  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      noValidate
      className='form-login'
    >
      <div className='content-login'>
        <div>
          <span>Bem vindo</span>
          <h1>Faça login com sua conta</h1>
        </div>
        <TextField
          variant="outlined"
          placeholder='E-mail'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{
            width: '100%',
            marginTop: '16px'
          }}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          variant="outlined"
          placeholder='Senha'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{
            width: '100%',
          }}
          InputLabelProps={{
            shrink: true,
          }}

        />
        <Button
          variant='contained'
          type='submit'
          sx={{
            backgroundColor: '#04C45C',
            width: '100%',
            height: '50px',
            marginTop: '56px',
            '&:hover': {
              backgroundColor: '#07d467'
            }
          }}
        >
          Login
        </Button>

        <p style={{
          alignSelf: 'center',
          marginTop: '96px',
        }}>
          Não tem cadastro?
          <span style={{
            color: '#1972A8',
            cursor: 'pointer'
          }}
            onClick={() => navigate('/cadastrar')}
          >
            Clique aqui
          </span>
        </p>
      </div>
    </form >
  );
}
