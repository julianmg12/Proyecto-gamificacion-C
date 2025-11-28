import { useEffect, useState } from "react";
import { Bar, Pie, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import NavBar from "../components/NavBar";
import Header from "../components/Header";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Tooltip,
  Legend
);

export default function GraficosPage() {
  const [registros, setRegistros] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("registros")) || [];
    setRegistros(data);
  }, []);

  if (registros.length === 0) {
    return (
      <>
        <Header />
        <p style={{ textAlign: "center", marginTop: "30px" }}>
          No hay datos para mostrar.
        </p>
        <NavBar />
      </>
    );
  }

  // -------------------------------------------------------------------
  // 1. Grupo vs individual
  // -------------------------------------------------------------------
  const grupo = registros.filter((r) => r.trabajoGrupo).length;
  const individual = registros.length - grupo;

  const dataGrupo = {
    labels: ["Trabajo en grupo", "Individual"],
    datasets: [
      {
        label: "Cantidad",
        data: [grupo, individual],
        backgroundColor: ["#6A5ACD", "#B39DDB"],
      },
    ],
  };

  // -------------------------------------------------------------------
  // 2. Horas por día (semana actual)
  // -------------------------------------------------------------------
  const hoy = new Date();
  const inicioSemana = new Date();
  inicioSemana.setDate(hoy.getDate() - hoy.getDay());

  const registrosSemana = registros.filter(
    (r) => new Date(r.fecha) >= inicioSemana
  );

  const horasPorDia = {};
  registrosSemana.forEach((r) => {
    const fecha = new Date(r.fecha).toLocaleDateString();
    horasPorDia[fecha] = (horasPorDia[fecha] || 0) + (r.tiempo || 0);
  });

  const dataHoras = {
    labels: Object.keys(horasPorDia),
    datasets: [
      {
        label: "Horas estudiadas",
        data: Object.values(horasPorDia),
        backgroundColor: "#9575CD",
      },
    ],
  };

  // -------------------------------------------------------------------
  // 3. Actividades por curso
  // -------------------------------------------------------------------
  const actividadesCurso = {};
  registros.forEach((r) => {
    if (!actividadesCurso[r.curso]) actividadesCurso[r.curso] = 0;
    actividadesCurso[r.curso]++;
  });

  const dataCursos = {
    labels: Object.keys(actividadesCurso),
    datasets: [
      {
        label: "Actividades",
        data: Object.values(actividadesCurso),
        backgroundColor: "#7E57C2",
      },
    ],
  };

  // -------------------------------------------------------------------
  // 4. Dificultad por día
  // -------------------------------------------------------------------
  const hace7dias = new Date();
  hace7dias.setDate(hoy.getDate() - 7);

  const registrosUltimaSemana = registros.filter(
    (r) => new Date(r.fecha) >= hace7dias
  );

  const dificultadPorDia = {};
  registrosUltimaSemana.forEach((r) => {
    const fecha = new Date(r.fecha).toLocaleDateString();
    if (!dificultadPorDia[fecha]) dificultadPorDia[fecha] = [];
    dificultadPorDia[fecha].push(r.dificultad);
  });

  const dificultadPromedio = Object.values(dificultadPorDia).map((vals) =>
    vals.reduce((a, b) => a + b, 0) / vals.length
  );

  const dataDificultad = {
    labels: Object.keys(dificultadPorDia),
    datasets: [
      {
        label: "Dificultad promedio (%)",
        data: dificultadPromedio,
        borderColor: "#5E35B1",
        borderWidth: 2,
        tension: 0.3,
        fill: false,
      },
    ],
  };

  return (
    <>
      <Header />

      <main
        style={{
          padding: "24px",
          paddingBottom: "120px",
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >
        <h2
          style={{
            marginBottom: "20px",
            fontSize: "1.6rem",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Mis gráficos
        </h2>

        {/* GRID FIJO EN 2 COLUMNAS */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "30px",
          }}
        >
          <div style={chartCard}>
            <h3 style={titleStyle}>Proyectos: Grupo vs Individual</h3>
            <Pie data={dataGrupo} />
          </div>

          <div style={chartCard}>
            <h3 style={titleStyle}>Horas estudiadas (Semana actual)</h3>
            <Bar data={dataHoras} />
          </div>

          <div style={chartCard}>
            <h3 style={titleStyle}>Actividades por curso</h3>
            <Bar data={dataCursos} />
          </div>

          <div style={chartCard}>
            <h3 style={titleStyle}>Dificultad promedio (Últimos 7 días)</h3>
            <Line data={dataDificultad} />
          </div>
        </div>
      </main>

      <NavBar />
    </>
  );
}

// ESTILOS FIJOS PARA LAPTOP
const chartCard = {
  padding: "16px",
  borderRadius: "12px",
  background: "#fff",
  boxShadow: "0 2px 10px rgba(0,0,0,0.15)",
  minHeight: "350px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
};

const titleStyle = {
  textAlign: "center",
  marginBottom: "12px",
  fontWeight: "600",
};
