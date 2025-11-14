export function getXPForRegistro(registro) {
  let xp = 10; 

  const tiempo = registro.tiempo || 0;         
  const comprension = registro.comprension || 0;
  const dificultad = registro.dificultad ?? 50;

  xp += tiempo * 2;                             
  xp += Math.round(comprension / 10);           
  if (registro.usoRecurso) xp += 3;             
  if (registro.trabajoGrupo) xp += 5;          

  // bonus por dificultad
  if (dificultad >= 60 && dificultad < 80) xp += 3;
  if (dificultad >= 80) xp += 6;

  return xp;
}

// Devuelve yyyy-mm-dd a partir de un string de fecha
function getDayKey(dateLike) {
  const d = new Date(dateLike);
  // normalizamos a fecha sin hora
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

// Calcula la racha actual (días seguidos con al menos un registro)
function calculateCurrentStreak(datesSet, todayKey) {
  let streak = 0;
  let current = new Date(todayKey);

  // normalizar
  current.setHours(0, 0, 0, 0);

  while (true) {
    const key = getDayKey(current);
    if (datesSet.has(key)) {
      streak++;
      current.setDate(current.getDate() - 1);
    } else {
      break;
    }
  }
  return streak;
}

// Niveles basados en el XP total
function getLevelInfo(totalXP) {
  let levelNumber = 1;
  let levelName = "Novato";
  let xpToNextLevel = 100 - totalXP;

  if (totalXP >= 100 && totalXP < 250) {
    levelNumber = 2;
    levelName = "Aprendiz";
    xpToNextLevel = 250 - totalXP;
  } else if (totalXP >= 250 && totalXP < 500) {
    levelNumber = 3;
    levelName = "Avanzado";
    xpToNextLevel = 500 - totalXP;
  } else if (totalXP >= 500) {
    levelNumber = 4;
    levelName = "Maestro";
    xpToNextLevel = 0;
  }

  if (xpToNextLevel < 0) xpToNextLevel = 0;

  return { levelNumber, levelName, xpToNextLevel };
}

// Insignias según estadísticas
function getBadges({ totalRegistros, totalXP, streakDays, totalHoras, registros }) {
  const registrosConRecurso = registros.filter((r) => r.usoRecurso).length;
  const registrosEnGrupo = registros.filter((r) => r.trabajoGrupo).length;

  return [
    {
      id: "primer-paso",
      nombre: "Primer paso",
      descripcion: "Registraste tu primer avance.",
      unlocked: totalRegistros >= 1,
    },
    {
      id: "constante-3",
      nombre: "Constante x3",
      descripcion: "Mantienes una racha de 3 días seguidos.",
      unlocked: streakDays >= 3,
    },
    {
      id: "maraton-7",
      nombre: "Maratón x7",
      descripcion: "Estudiaste 7 días seguidos.",
      unlocked: streakDays >= 7,
    },
    {
      id: "explorador",
      nombre: "Explorador de recursos",
      descripcion: "Has usado recursos externos en al menos 3 avances.",
      unlocked: registrosConRecurso >= 3,
    },
    {
      id: "equipo",
      nombre: "Trabajo en equipo",
      descripcion: "Has trabajado en grupo en al menos 3 registros.",
      unlocked: registrosEnGrupo >= 3,
    },
    {
      id: "xp-100",
      nombre: "Logro 100 XP",
      descripcion: "Alcanzaste 100 puntos de experiencia.",
      unlocked: totalXP >= 100,
    },
    {
      id: "xp-300",
      nombre: "Logro 300 XP",
      descripcion: "Alcanzaste 300 puntos de experiencia.",
      unlocked: totalXP >= 300,
    },
    {
      id: "xp-500",
      nombre: "Logro 500 XP",
      descripcion: "Alcanzaste 500 puntos de experiencia.",
      unlocked: totalXP >= 500,
    },
    {
      id: "horas-10",
      nombre: "Pomodoro Pro",
      descripcion: "Has registrado más de 10 horas de estudio.",
      unlocked: totalHoras >= 10,
    },
  ];
}

// Función principal: calcula todas las estadísticas de gamificación
export function calculateStats(registros = []) {
  if (!Array.isArray(registros)) registros = [];

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let totalXP = 0;
  let totalHoras = 0;
  const totalRegistros = registros.length;
  let weeklyXP = 0;

  const sevenDaysAgo = new Date(today);
  sevenDaysAgo.setDate(today.getDate() - 6);
  sevenDaysAgo.setHours(0, 0, 0, 0);

  const datesWithRegistro = new Set();

  registros.forEach((r) => {
    const xp = getXPForRegistro(r);
    totalXP += xp;
    totalHoras += r.tiempo || 0;

    const fecha = r.fecha ? new Date(r.fecha) : today;
    fecha.setHours(0, 0, 0, 0);

    const key = getDayKey(fecha);
    datesWithRegistro.add(key);

    if (fecha >= sevenDaysAgo && fecha <= today) {
      weeklyXP += xp;
    }
  });

  const todayKey = getDayKey(today);
  const streakDays = calculateCurrentStreak(datesWithRegistro, todayKey);
  const { levelNumber, levelName, xpToNextLevel } = getLevelInfo(totalXP);

  const badges = getBadges({
    totalRegistros,
    totalXP,
    streakDays,
    totalHoras,
    registros,
  });

  // Meta semanal arbitraria para la barra de progreso
  const targetWeeklyXP = 200;

  return {
    totalXP,
    weeklyXP,
    targetWeeklyXP,
    totalHoras,
    totalRegistros,
    streakDays,
    levelNumber,
    levelName,
    xpToNextLevel,
    badges,
  };
}
