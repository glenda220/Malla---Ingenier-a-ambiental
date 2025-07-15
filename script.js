// Datos de materias
const materias = [
  {
    id: "biologia",
    nombre: "Biología Ambiental",
    semestre: 1,
    prerequisitos: [],
    estado: "disponible"
  },
  {
    id: "calculo",
    nombre: "Cálculo Diferencial",
    semestre: 1,
    prerequisitos: [],
    estado: "disponible"
  },
  // Agrega el resto de las materias siguiendo este formato
];

function crearMalla() {
  const contenedor = document.getElementById("malla");
  const semestres = [...new Set(materias.map(m => m.semestre))];
  semestres.forEach(num => {
    const columna = document.createElement("div");
    columna.classList.add("semestre");
    const titulo = document.createElement("h2");
    titulo.textContent = ${num}° Semestre;
    columna.appendChild(titulo);

    materias.filter(m => m.semestre === num).forEach(materia => {
      const div = document.createElement("div");
      div.classList.add("materia", materia.estado);
      div.id = materia.id;
      div.textContent = materia.nombre;
      div.addEventListener("click", () => toggleMateria(materia.id));
      columna.appendChild(div);
    });

    contenedor.appendChild(columna);
  });
}

function toggleMateria(id) {
  const materia = materias.find(m => m.id === id);
  if (materia.estado === "aprobada") return;

  const div = document.getElementById(id);
  materia.estado = "aprobada";
  div.classList.remove("disponible", "bloqueada");
  div.classList.add("aprobada");
  div.classList.add("tachado");

  materias.forEach(m => {
    if (m.estado === "bloqueada" && m.prerequisitos.includes(id)) {
      if (m.prerequisitos.every(pid => materias.find(mm => mm.id === pid && mm.estado === "aprobada"))) {
        m.estado = "disponible";
        const desbloquear = document.getElementById(m.id);
        desbloquear.classList.remove("bloqueada");
        desbloquear.classList.add("disponible");
      }
    }
  });
}

window.onload = crearMalla;
