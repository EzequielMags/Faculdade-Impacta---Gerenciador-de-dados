import apiProfessores from "../Professores/api.js";
import apiTurmas from "../Turmas/api.js";

/*CONSTS*/
const formulario = document.getElementById("idFormulario");
const idTurma = document.getElementById("idTurma");
const nomeTurma = document.getElementById("nomeTurma");
const materiaTurma = document.getElementById("materiaTurma");
const descricaoTurma = document.getElementById("descricaoTurma");
const ativoTurma = document.getElementById("ativoTurma");
const professorTurma = document.getElementById("professorTurma");
const listaDeTurmas = document.querySelector(".lista-Turmas");

document.addEventListener("DOMContentLoaded", () => {
  console.log("error");
  adicionarTurmaNaLista();
  optionProfessor();
});

formulario.addEventListener("submit", (event) => {
  event.preventDefault();

  const turma = {
    id: Number(idTurma.value),
    materia: materiaTurma.value,
    descricao: descricaoTurma.value,
    ativo: Boolean(ativoTurma.value),
    professor_id: Number(professorTurma.value),
  };

  adicionarOuEditarTurma(turma);
});

async function adicionarOuEditarTurma(turma) {
  try {
    if (turma.id) {
      const infoDaTurma = {
        materia: turma.materia,
        descricao: turma.descricao,
        ativo: Boolean(turma.ativo),
        professor_id: Number(turma.professor_id),
      };

      console.log(turma.ativo);
      const response = await apiTurmas.putTurma(turma.id, infoDaTurma);
      window.location.href = "./turmas.html";
      return response;
    } else {
      const response = await apiTurmas.postTurma(turma);
      criarCard(turma);
      return response;
    }
  } catch (error) {
    alert("erro ao Adicionar ou Editar turma");
    console.log(error);
  }
}

function criarCard(turma) {
  const card = document.createElement("li");
  /*NOME*/
  /*const nomeDaTurma = document.createElement("h3");
  nomeDaTurma.textContent = "Nome da Turma: ";
  const spanNomeDaturma = document.createElement("span");
  spanNomeDaturma.id = "nomeDaTurma";
  console.log(turma.nome);
  spanNomeDaturma.textContent = turma.nome;

  nomeDaTurma.appendChild(spanNomeDaturma);
  */

  /*MATERIA*/
  const materiaDaTurma = document.createElement("h3");
  materiaDaTurma.textContent = "Materia: ";
  const spanMateriaDaTurma = document.createElement("span");
  spanMateriaDaTurma.id = "materiaDaTurma";
  spanMateriaDaTurma.textContent = turma.materia;
  materiaDaTurma.appendChild(spanMateriaDaTurma);
  /*DESCRICAO*/
  const br = document.createElement("br");
  const descricaoDaTurma = document.createElement("h3");
  descricaoDaTurma.textContent = "Descricao: ";
  const spanDescricaoDaTurma = document.createElement("span");
  spanDescricaoDaTurma.textContent = turma.descricao;
  spanDescricaoDaTurma.id = "descricaoDaTurma";
  descricaoDaTurma.appendChild(br);
  descricaoDaTurma.appendChild(spanDescricaoDaTurma);
  /*ATIVO*/
  const ativoDaTurma = document.createElement("h3");

  ativoDaTurma.textContent = "Ativo: ";
  const spanAtivoDaTurma = document.createElement("span");
  spanAtivoDaTurma.id = "ativoDaTurma";

  if (turma.ativo == false) {
    spanAtivoDaTurma.textContent = "Desativado";
  } else {
    spanAtivoDaTurma.textContent = "Ativado";
  }
  ativoDaTurma.appendChild(spanAtivoDaTurma);

  /*PROFESSOR*/
  const professorDaTurma = document.createElement("h3");
  professorDaTurma.textContent = "ID do Professor: ";
  const spanProfessorDaTurma = document.createElement("span");
  spanProfessorDaTurma.textContent = turma.professor_id;

  professorDaTurma.appendChild(spanProfessorDaTurma);

  const GrupoDeicones = document.createElement("div");
  GrupoDeicones.classList.add("icons");

  const btnDelete = document.createElement("button");
  btnDelete.classList.add("btn-icon-turma");
  const iconeDeDeletar = document.createElement("img");
  iconeDeDeletar.src = "../imgs/icons/trash.svg";
  iconeDeDeletar.alt = "icone de deletar";
  btnDelete.appendChild(iconeDeDeletar);
  btnDelete.onclick = async () => {
    console.log(turma.id);
    const response = await apiTurmas.deleteTurma(turma.id);
    window.location.href = "./turmas.html";
    return response;
  };

  const btnEditar = document.createElement("button");
  btnEditar.classList.add("btn-icon-turma");
  const iconeDeEditar = document.createElement("img");
  iconeDeEditar.src = "../imgs/icons/pencil-fill.svg";
  iconeDeEditar.alt = "icone de Editar";
  btnEditar.appendChild(iconeDeEditar);
  btnEditar.onclick = async () => {
    console.log(turma.id);
    idTurma.value = await turma.id;
    materiaTurma.value = await turma.materia;
    descricaoTurma.value = await turma.descricao;
    ativoTurma.value = await turma.ativo;
    professorTurma.value = await turma.professor_id;
  };

  GrupoDeicones.appendChild(btnDelete);
  GrupoDeicones.appendChild(btnEditar);

  /*card.appendChild(nomeDaTurma);*/
  card.appendChild(materiaDaTurma);
  card.appendChild(descricaoDaTurma);
  card.appendChild(ativoDaTurma);
  card.appendChild(professorDaTurma);
  card.appendChild(GrupoDeicones);

  listaDeTurmas.appendChild(card);
}

async function adicionarTurmaNaLista() {
  const turmas = await apiTurmas.getTurmas();
  console.log(turmas);
  turmas.forEach((turma) => {
    criarCard(turma);
  });
}
async function optionProfessor() {
  const professores = await apiProfessores.getProfessores();

  professores.forEach((professor) => {
    const option = document.createElement("option");
    option.value = professor.id;
    option.textContent = professor.nome;
    professorTurma.appendChild(option);
  });
}
