import './styles.css'
import EditIcon from '@mui/icons-material/ModeEditOutlined';
import DeleteIcon from '@mui/icons-material/DeleteOutlineOutlined';
import {
  Button,
  Paper,
  TableHead,
  TableContainer,
  TableCell,
  TableRow,
  TableBody,
  Table
} from '@mui/material';
import ModalDeleteContact from '../ModalDeleteContact';
import { useEffect, useState } from 'react';
import FormAddEditContact from '../FormAddEditContact';
import api from '../../services/api'

export default function ContactsTable() {
  const [openModal, setOpenModal] = useState(false)
  const [openModalDelete, setOpenModalDelete] = useState(false)
  const [formType, setFormType] = useState('')
  const [rows, setRows] = useState([])
  const [currentContactId, setCurrentContactId] = useState('')
  const token = localStorage.getItem('token')

  function handleAddContact() {
    setFormType('add')
    setOpenModal(true)
  }

  function handleDeleteContact(row) {
    setCurrentContactId(row.id)
    setOpenModalDelete(true)
  }
  function handleUpdateContact(row) {
    setCurrentContactId(row.id)
    setFormType('edit')
    setOpenModal(true)
  }

  async function fillContactsTable() {
    try {

      const { data } = await api.get('/contatos', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      const contacts = data.map(contact => {
        return {
          id: contact.id,
          name: contact.nome,
          email: contact.email,
          phone: contact.telefone
        }
      })

      setRows(...rows, contacts)

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fillContactsTable()
    // eslint-disable-next-line
  }, [])

  return (
    <div className='container-table'>
      <div className='container-btn-add'>
        <Button
          variant='contained'
          sx={{
            backgroundColor: '#04C45C',
            width: '100%',
            height: '50px',
            '&:hover': {
              backgroundColor: '#07d467'
            }
          }}
          onClick={() => handleAddContact()}
        >
          Adicionar
        </Button>
      </div>

      <TableContainer
        component={Paper}
        sx={{
          backgroundColor: '#F4F0F0',
        }}
      >

        <Table aria-label="simple table" >
          <TableHead>
            <TableRow>
              <TableCell align="center">
                <strong>Nome</strong>
              </TableCell>
              <TableCell align="center">
                <strong>Email</strong>
              </TableCell>
              <TableCell align="center">
                <strong>Telefone</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody
            sx={{ backgroundColor: '#fff' }}
          >
            {
              rows.length > 0 &&
              rows.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell align="center">
                    {row.name}
                  </TableCell>
                  <TableCell align="center">{row.email}</TableCell>
                  <TableCell
                    align="center"
                    sx={{ minWidth: 120 }}
                  >{row.phone}
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{ minWidth: 120 }}
                  >
                    <button
                      onClick={() => handleUpdateContact(row)}
                      className='btn-edit-contact'
                    >
                      <EditIcon
                        sx={{
                          cursor: 'pointer'
                        }}
                      />
                    </button>
                    <button
                      onClick={() => handleDeleteContact(row)}
                      className='btn-delete-contact'
                    >
                      <DeleteIcon />
                    </button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      {
        openModalDelete &&
        <ModalDeleteContact
          setOpenModalDelete={setOpenModalDelete}
          contactId={currentContactId}
        />
      }

      {
        openModal &&
        <FormAddEditContact
          type={formType}
          setOpenModal={setOpenModal}
          setRows={setRows}
          contactId={currentContactId}
        />
      }
    </div >
  )
}