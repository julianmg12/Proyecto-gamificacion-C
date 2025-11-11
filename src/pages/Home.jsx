import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import RegistroCard from "../components/RegistroCard";
import AddButton from "../components/AddButton";
import NavBar from "../components/NavBar";

export default function Home({ registros }) {
  const navigate = useNavigate();

  return (
    <>
      <Header />

      <main
        style={{
          margin: "0 auto",
          maxWidth: "370px",
          minHeight: "67vh",
          position: "relative",
        }}
      >
        <h2>Mi Registro</h2>

        {registros.length === 0 ? (
          <RegistroCard registro={null} />
        ) : (
          registros.map((r, i) => <RegistroCard key={i} registro={r} />)
        )}

        <AddButton onClick={() => navigate("/registro")} />
      </main>

      <NavBar />
    </>
  );
}
