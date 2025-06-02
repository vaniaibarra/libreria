import { Link } from 'react-router-dom';
import { useAuth } from '../context/Context';

function Navbar () {
  const { user } = useAuth();

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

        {user && (
          <Link 
            to="/profile" 
            className="text-white bg-green-600 px-4 py-2 rounded hover:bg-green-700 transition"
          >
            Perfil
          </Link>
        )}
      </div>
    </>
  );
}

export default Navbar;
