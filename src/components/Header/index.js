import './styles.css'
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom'

export default function Header() {
  const navigate = useNavigate()

  function handleLogout() {
    localStorage.removeItem('token')
    localStorage.removeItem('userId')

    navigate('/login')
  }
  return (
    <header>
      <h1>Kontacts</h1>
      <button className='btn-logout' onClick={() => handleLogout()}>
        <LogoutIcon />
      </button>
    </header>
  )
}