import Navbar from './components/Navbar'
import AppRoutes from './routes/AppRoutes'

function App() {
  return (
    <div className='flex flex-col min-h-screen'>
      <Navbar/>
      <AppRoutes/>
    </div>
  )
}

export default App;
