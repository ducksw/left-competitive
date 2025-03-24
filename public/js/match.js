document.getElementById("match").addEventListener("click", async function (e) {
  e.preventDefault(); // Evita que el enlace recargue la página

  const code = document.getElementById("code").textContent.trim();

  try {
    const response = await fetch("/match", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code }),
    });

    if (response.redirected) {
      window.location.href = response.url; // Redirigir a match
    } else {
      const data = await response.json();
      console.log("Respuesta del servidor:", data);
    }
  } catch (error) {
    console.error("Error en la solicitud:", error);
  }
});

/*
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
*/