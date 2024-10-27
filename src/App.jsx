import { AuthProvider } from './context/AuthContext';
import Home from './Home'
import Home2 from './Home2SPA'
import Home3 from './Home3'
import App3 from './App3'

function App() {
  return (
    <AuthProvider>
      <App3 />
    </AuthProvider>
  );
}

export default App;