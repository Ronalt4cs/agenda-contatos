import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react';
import api from '../../services/api'
import './styles.css'

export default function FormSignUp() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    if (localStorage.getItem('token')) {
      return navigate('/home')
    }
  }, [navigate])

  async function handleSubmit(e) {
    e.preventDefault();

    try {

      await api.post('/usuarios', {
        nome: name,
        email: email,
        senha: password,
      })

      navigate('/login')

    } catch (error) {
      console.log(error)
      return
    }
  }

  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      noValidate
      className='form-signup'
    >
      <div className='content-signup'>
        <div>
          <span>Bem vindo</span>
          <h1>Cadastre-se</h1>
        </div>
        <TextField
          variant="outlined"
          placeholder='Nome'
          value={name}
          onChange={(e) => setName(e.target.value)}
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
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{
            width: '100%',
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
        <button className='btn-login'>
          <Button
            variant='contained'
            type='submit'
            sx={{
              backgroundColor: '#04C45C',
              width: '100%',
              height: '50px',
              '&:hover': {
                backgroundColor: '#07d467'
              }
            }}
          >
            Login
          </Button>
        </button>

        <Button
          variant='contained'
          type='submit'
          sx={{
            backgroundColor: 'rgba(251, 6, 21, 0.65)',
            width: '100%',
            height: '50px',
            '&:hover': {
              backgroundColor: 'rgba(251, 6, 21, 0.65)'
            }
          }}
        >
          Cancelar
        </Button>

        <p className='bottom-text' >
          Já tem cadastro?
          <span style={{
            color: '#1972A8',
            cursor: 'pointer'
          }}
            onClick={() => navigate('/login')}
          >
            Clique aqui
          </span>
        </p>
      </div>
    </form >
  );
}
