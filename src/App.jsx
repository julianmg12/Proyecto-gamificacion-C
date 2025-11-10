import { useState } from 'react';
import Header from './components/Header';
import RegistroCard from './components/RegistroCard';
import AddButton from './components/AddButton';
import NavBar from './components/NavBar';

function App() {
  const [registro, setRegistro] = useState(null);

  const agregarRegistro = () => {
    setRegistro({
      titulo: "Muck Ups",
      puntos: 150,
      descripcion: "Revisé historias de usuario - Agrupé por funcionalidad - Identifiqué flujo de navegación adecuado - Solicité primeros bocetos a la IA - Iteré para mejorar"
    });
  };

  return (
    <>
      <Header />
      <main style={{ margin: '0 auto', maxWidth: '370px', minHeight: '67vh', position: 'relative' }}>
        <h2>Mi Registro</h2>
        <RegistroCard registro={registro} />
        <AddButton onClick={agregarRegistro} />
      </main>
      <NavBar />
    </>
  );
}

export default App;
