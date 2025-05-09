const formulario = document.querySelector(".formulario");
const idTurma = document.getElementById("idTurma");
const numeroTurma = document.getElementById("numeroTurma");
const listaTurmas = document.querySelector(".lista-Turmas");
formulario.addEventListener("submit", (event) => {
  event.preventDefault();
  alert("oi");
  const turma = {
    id: idTurma.value,
    numero: numeroTurma.value
  };

  criarCardTurma(turma);
});

function criarCardTurma(alunos) {}
