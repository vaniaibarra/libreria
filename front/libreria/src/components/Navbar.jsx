import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/Context';

function Navbar () {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const logOut = async(e) => {
    e.preventDefault();
    
    try {
      await logout()
      navigate('/login')
    } catch (error) {
      alert(error.messagge || "Error");
    }
  }
  return (
    <>
      <div className='flex bg-[#0c271b] items-center justify-between px-7 py-7'>
        <Link to="/">
          <img
            src="/img/logo3.png"
            className='w-80'
            alt="Logo"
          />
        </Link>
        <div>
          {
            location.pathname === "/profile" ? (
              <div className='flex gap-3'>
              <Link 
              to="/tienda"
              className="bg-green-500  text-white px-4 py-2 rounded">
                Tienda
              </Link>
              <button 
                onClick={logout} 
                className=" bg-white rounded px-4 py-2">
                🔒 Logout
              </button>
              </div>
            ) : location.pathname === "/tienda" ? (
              <div className='flex gap-3'>
              <Link 
              to="/profile"
              className="bg-green-500  text-white px-4 py-2 rounded">
                Perfil
              </Link>
              <button 
                onClick={logOut}
                className="rounded bg-white px-4 py-2">
                🔒 Logout
              </button>
              </div>
            ) : null
          } 
        </div>
      </div>
    </>
  );
}

export default Navbar;
