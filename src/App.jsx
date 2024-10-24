import { AuthProvider } from './context/AuthContext';
// import Home from './Home'
import Home2 from './Home2SPA'

function App() {
  return (
    <AuthProvider>
      <Home2 />
    </AuthProvider>
  );
}

export default App;