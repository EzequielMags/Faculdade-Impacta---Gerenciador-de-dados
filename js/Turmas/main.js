import apiProfessores from "../Professores/api.js";
import apiTurmas from "../Turmas/api.js";

/*CONSTS*/
const formulario = document.querySelector(".formulario");
const idTurma = document.getElementById("IdDaTurmaInput");
/*const nomeTurma = document.getElementById("nomeTurma");*/
const materiaTurma = document.getElementById("materiaTurma");
const descricaoTurma = document.getElementById("descricaoTurma");
const ativoTurma = document.getElementById("ativoTurma");
const professorTurma = document.getElementById("professorTurma");
const ListaDeTurmas = document.querySelector(".lista-Turmas");

document.addEventListener("DOMContentLoaded", async () => {
  optionProfessor();
  adicionarTurmasNaLista();
});

formulario.addEventListener("submit", (event) => {
  event.preventDefault();

  const Turma = {
    id: Number(idTurma.value),
    materia: materiaTurma.value,
    descricao: descricaoTurma.value,
    ativo: ativoTurma.value,
    professor_id: Number(professorTurma.value),
  };

  adicionarOuEditarTurma(Turma);
});

async function adicionarTurmasNaLista() {
  const turmas = await apiTurmas.getTurmas();
  turmas.forEach((turma) => {
    criarCardTurma(turma);
  });
}

async function adicionarOuEditarTurma(turma) {
  try {
    if (turma.id) {
      const response = await apiTurmas.putTurma(turma.id, turma);

      window.location.href = "./turmas.html";
      return response;
    } else {
      console.log("dados da turma", turma);
      const response = await apiTurmas.postTurma(turma);
      alert("Turma adicionada com sucesso");
      criarCardTurma(response);
      return response;
    }
  } catch (error) {
    alert("Erro ao Editar ou Adicionar a Turma: " + error.message);
    console.error("Erro completo:", error);
  }
}

function criarCardTurma(turma) {
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

  if (turma.ativo) {
    spanAtivoDaTurma.textContent = "Ativado";
  } else {
    spanAtivoDaTurma.textContent = "Desativado";
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

  const iconeDeDeletar = document.createElement("img");
  iconeDeDeletar.src = "/imgs/icons/trash.svg";
  iconeDeDeletar.alt = "icone de deletar";

  iconeDeDeletar.onclick = async (turma) => {
    const response = await apiTurmas.deleteTurma(turma.id);
    return response;
  };

  const iconeDeEditar = document.createElement("img");
  iconeDeEditar.src = "/imgs/icons/pencil-fill.svg";
  iconeDeEditar.alt = "icone de Editar";

  iconeDeEditar.onclick = () => {
    alert("oi");
    idTurma.value = turma.id;
    materiaTurma.value = turma.materia;
    descricaoTurma.value = turma.descricao;
    ativoTurma.value = turma.ativo;
    professorTurma.value = turma.professor_id;
  };

  GrupoDeicones.appendChild(iconeDeDeletar);
  GrupoDeicones.appendChild(iconeDeEditar);

  /*card.appendChild(nomeDaTurma);*/
  card.appendChild(materiaDaTurma);
  card.appendChild(descricaoDaTurma);
  card.appendChild(ativoDaTurma);
  card.appendChild(professorDaTurma);
  card.appendChild(GrupoDeicones);

  ListaDeTurmas.appendChild(card);
}

async function optionProfessor() {
  const professores = await apiProfessores.getProfessores();
  const optionNenhum = document.createElement("option");

  optionNenhum.textContent = "nenhum";
  professores.forEach((professor) => {
    const option = document.createElement("option");
    option.value = professor.id;
    option.textContent = professor.nome;
    professorTurma.appendChild(option);
  });
  professorTurma.appendChild(optionNenhum);
}
