document.getElementById('copy').addEventListener('click', function() {
  let code = document.getElementById('code').innerText;
  navigator.clipboard.writeText(code).then(() => {
    alert('Código copiado!');
  }).catch(err => {
    console.error('Error al copiar: ', err);
  });
});

document.addEventListener("click", async (event) => {
  if (event.target.closest(".delete-icon")) {
    const playerElement = event.target.closest(".name-players");
    const playerSteamId = playerElement.dataset.steamid;
    const gameCode = new URLSearchParams(window.location.search).get("code");

    console.log("Código de partida:", gameCode);
    console.log("SteamID del jugador:", playerSteamId);

    if (!gameCode || !playerSteamId) {
      console.error("no se encontro la partida o el codigo del usuario");
      return;
    }

    if (confirm(`Seguro que quieres eliminar a este jugador?`)) {
      try {
        const response = await fetch("/deletePlayer", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code: gameCode, playerSteamId }),
        });

        if (!response.ok) {
          const errorResult = await response.json();
          throw new Error(errorResult.message || "Error al eliminar al jugador.");
        }

        const result = await response.json();
        console.log("Resultado:", result);

        if (result.success) {
          playerElement.remove();
        } else {
          alert("⚠ No se pudo eliminar al jugador.");
        }
      } catch (error) {
        console.error("Error al eliminar jugador:", error);
        alert(error.message || "No se pudo eliminar al jugador.");
      }
    }
  }
});

document.getElementById("match").addEventListener("click", async () => {
  event.preventDefault();
  const code = event.target.dataset.code;

  try {

    if (confirm('Seguro que quieres emparejar a los equipos')) {
      const response = await fetch("/match", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code })
      });

      const data = await response.json();
      console.log("Equipos asignados:", data);

      location.reload();
      //updateTeam(data.teamA, data.TeamB);
    }
  } catch (error) {
    console.log(error);
  }
});

function updateTeam(teamA, teamB) {
  let team_A = document.getElementById("teamA");
  let team_B = document.getElementById("teamB");

  team_A.innerHTML = "";
  team_B.innerHTML = "";
  
  teamA.forEach(player => {
    team_A.innerHTML += `<img src="${player.avatar}" alt="${player.displayName}" width="50"> ${player.displayName}`;
  });

  teamB.forEach(player => {
    team_B.innerHTML += `<img src="${player.avatar}" alt="${player.displayName}" width="50"> ${player.displayName}`;
  });
}
