import Nav from './Nav';
import { Toaster } from 'react-hot-toast';
import Provider from './config/Provider';

function App() {
  return (
    <Provider>
      <Nav />
      <Toaster 
        position='top-right'
        toastOptions={{
          duration: 5000,
          style: {
            background: '#363636',
            color: '#fff',
          }
        }}
      />
    </Provider>
  )
}

export default App;
