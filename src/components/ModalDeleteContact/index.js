import './styles.css'
import Button from '@mui/material/Button'
import CloseIcon from '@mui/icons-material/Close'
import api from '../../services/api'

function ModalDeleteContact({ setOpenModalDelete, contactId }) {

  const token = localStorage.getItem('token')
  const userName = localStorage.getItem('userName')

  async function handleDeleteContact() {
    try {
      await api.delete(`/contatos/${contactId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      setOpenModalDelete(false)

    } catch (error) {
      return console.log(error);
    }
  }

  return (
    <div className='blur-container'>
      <div className='modal-delete'>
        <button
          onClick={() => setOpenModalDelete(false)}
          className='btn-close-modal'
        >
          <CloseIcon />
        </button>
        <h1>Confirmar exclusão?</h1>
        <p>Deseja excuir o contato, {userName}?</p>

        <Button
          variant='contained'
          type='button'
          onClick={() => handleDeleteContact()}
          sx={{
            backgroundColor: '#04C45C',
            width: '77%',
            height: '50px',
            '&:hover': {
              backgroundColor: '#07d467'
            }
          }}
        >
          Deletar
        </Button>

        <Button
          variant='contained'
          type='button'
          onClick={() => setOpenModalDelete(false)}
          sx={{
            backgroundColor: 'rgba(251, 6, 21, 0.65)',
            width: '77%',
            height: '50px',
            marginTop: '8px',
            '&:hover': {
              backgroundColor: 'rgba(251, 6, 21, 0.65)'
            }
          }}
        >
          Cancelar
        </Button>
      </div>
    </div>
  )
}

export default ModalDeleteContact