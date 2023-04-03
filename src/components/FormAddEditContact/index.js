import './styles.css'
import CloseIcon from '@mui/icons-material/Close'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { useEffect, useState } from 'react'
import api from '../../services/api'

function FormAddEditContact({
  type, setOpenModal, setRows, contactId }
) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const token = localStorage.getItem('token')

  function handleClearForm() {
    setName('')
    setPhone('')
    setEmail('')
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (type === 'add') {
      try {
        const { data } = await api.post('/contatos',
          {
            nome: name,
            telefone: phone,
            email: email
          },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          },
        );
        const contact = {
          id: data[0].id,
          name: data[0].nome,
          email: data[0].email,
          phone: data[0].telefone
        }

        setRows((prevState) => {
          return [...prevState, contact]
        })

        setOpenModal(false)
        handleClearForm()
        return

      } catch (error) {
        return console.log(error.message)
      }
    }

    if (type === 'edit') {
      try {
        await api.put(`/contatos/${contactId}`,
          {
            nome: name,
            telefone: phone,
            email: email
          },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          },
        );

        setOpenModal(false)
        handleClearForm();

      } catch (error) {
        return console.log(error.message)
      }
    }
  }

  async function getContactInfos() {
    try {

      const { data } = await api.get(`/contatos/${contactId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      setName(data.nome)
      setEmail(data.email)
      setPhone(data.telefone)
      return

    } catch (error) {
      return console.log(error)
    }
  }

  useEffect(() => {
    if (type === 'edit') {
      getContactInfos();
      return
    }
    // eslint-disable-next-line
  }, [])

  return (
    <div className='blur-container'>
      <form
        className='form-add-edit-contact'
        onSubmit={(e) => handleSubmit(e)}
      >
        <button
          type='button'
          className='btn-close-modal'
          onClick={() => setOpenModal(false)}
        >
          <CloseIcon />
        </button>

        {
          type === 'add' ?
            <h1>Adicionar Contato</h1>
            :
            <h1>Atualizar Contato</h1>
        }

        <TextField
          variant="outlined"
          placeholder='Nome'
          value={name}
          onChange={(e) => setName(e.target.value)}
          sx={{
            width: '77%',
            height: '50px',
            marginBottom: '16px',
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
            width: '77%',
            height: '50px',
            marginBottom: '16px',
          }}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          variant="outlined"
          placeholder='Telefone'
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          sx={{
            width: '77%',
            height: '50px',
            marginBottom: '16px',
          }}
          InputLabelProps={{
            shrink: true,
          }}

        />

        <div className='container-btns'>
          <Button
            variant='contained'
            type='submit'
            sx={{
              backgroundColor: '#04C45C',
              width: '77%',
              height: '50px',
              '&:hover': {
                backgroundColor: '#07d467'
              }
            }}
          >
            {
              type === 'add' ?
                'Adicionar'
                :
                'Atualizar'
            }
          </Button>

          <Button
            variant='contained'
            type='button'
            sx={{
              backgroundColor: 'rgba(251, 6, 21, 0.65)',
              width: '77%',
              height: '50px',
              '&:hover': {
                backgroundColor: 'rgba(251, 6, 21, 0.65)'
              }
            }}
            onClick={() => handleClearForm()}
          >
            Limpar
          </Button>
        </div>
      </form>
    </div>
  )

}
export default FormAddEditContact