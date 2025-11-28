import React, { useEffect, useRef } from "react";
import { useNotification } from "./NotificationProvider";

export default function StatsNotifier({ stats }) {
  const prevRef = useRef(null);
  const { show } = useNotification() || {};

  useEffect(() => {
    const prev = prevRef.current;
    if (!prev) {
      prevRef.current = stats;
      return;
    }

    // Comprobar nuevas insignias desbloqueadas
    const prevBadges = Array.isArray(prev.badges) ? prev.badges : [];
    const curBadges = Array.isArray(stats.badges) ? stats.badges : [];

    curBadges.forEach((b) => {
      const pb = prevBadges.find((x) => x.id === b.id);
      const wasUnlocked = pb ? pb.unlocked : false;
      if (!wasUnlocked && b.unlocked) {
        if (show) {
          show({
            title: `¡Logro desbloqueado! ${b.nombre}`,
            message: b.descripcion,
            icon: "🏆",
            duration: 5000,
          });
        }
      }
    });

    // También podríamos notificar subida de nivel
    if (prev.levelNumber && stats.levelNumber > prev.levelNumber) {
      if (show) {
        show({
          title: `¡Subiste al nivel ${stats.levelNumber}!`,
          message: `Eres ${stats.levelName}`,
          icon: "⭐",
          duration: 5000,
        });
      }
    }

    prevRef.current = stats;
  }, [stats, show]);

  return null;
}
