import apiProfessores from "./api.js";
const formulario = document.querySelector(".formulario");
const idProfessorInput = document.getElementById("idProfessorInput");
const nomeProfessorInput = document.getElementById("nomeProfessor");
const idadeProfessorInput = document.getElementById("idadeProfessor");
const materiaProfessorInput = document.getElementById("materiaProfessor");
const observacaoProfessorInput = document.getElementById(
  "observacoesProfessor"
);
const btnEnviarProfessor = document.getElementById("btnEnviarProfessor");

const listaDeProfessores = document.querySelector(".lista-professores");

/*Informações Professores*/

formulario.addEventListener("submit", async (event) => {
  event.preventDefault();

  const professor = {
    id: idProfessorInput.value,
    nome: nomeProfessorInput.value,
    idade: idadeProfessorInput.value,
    materia: materiaProfessorInput.value,
    observacoes: observacaoProfessorInput.value,
  };

  AdicionarOuEditarProfessor(professor);

  formulario.reset();
});

async function AdicionarOuEditarProfessor(professor) {
  try {
    if (professor.id) {
      const InformacoesDoProfessor = {
        nome: nomeProfessorInput.value,
        idade: Number(idadeProfessorInput.value),
        materia: materiaProfessorInput.value,
        observacoes: observacaoProfessorInput.value,
      };

      const response = await apiProfessores.putProfessor(
        professor.id,
        InformacoesDoProfessor
      );
      alert("Professor editado com sucesso ");
      window.location.href = "./professores.html";
      return response;
    } else {
      console.log("dados do professor: ", professor);
      const response = await apiProfessores.postProfessor(professor);
      alert("Professor adicionado com sucesso");
      CriarCardProfessor(professor);
      return response;
    }
  } catch (error) {
    alert("erro ao Editar ou Adicionar o Professor", error);
    console.error(error);
  }
}

async function CriarCardProfessor(professor) {
  const li = document.createElement("li");
  const div = document.createElement("div");
  div.classList.add("prof-info");
  /*H4 DO NOME*/
  const h4Nome = document.createElement("h4");
  h4Nome.textContent = "Nome do professor: ";
  /*SPAN do NOME*/
  const spanNome = document.createElement("span");
  spanNome.id = "nomeProfessor";
  spanNome.textContent = professor.nome;
  h4Nome.appendChild(spanNome);

  /*H4 DE IDADE*/
  const h4Idade = document.createElement("h4");
  h4Idade.textContent = "Idade: ";
  const spanIdade = document.createElement("span");
  spanIdade.id = "idadeProfessores";
  spanIdade.textContent = professor.idade;

  h4Idade.appendChild(spanIdade);

  /*H4 DA MATERIA*/

  const h4Materia = document.createElement("h4");
  h4Materia.textContent = "Materia: ";

  /*SPAN DA MATERIA*/
  const spanMateria = document.createElement("span");
  spanMateria.id = "materiaProfessor";
  spanMateria.textContent = professor.materia;
  h4Materia.appendChild(spanMateria);

  /* H4 DE OBSERVACOES*/
  const h4Observacoes = document.createElement("h4");
  h4Observacoes.textContent = "Observações: ";

  /*P DE OBSERVACOES*/

  const pObservacoes = document.createElement("p");
  pObservacoes.id = "observacoesProfessor";
  pObservacoes.textContent = professor.observacoes;

  div.appendChild(h4Nome);
  div.appendChild(h4Idade);
  div.appendChild(h4Materia);
  div.appendChild(h4Observacoes);
  div.appendChild(pObservacoes);

  const divIcones = document.createElement("div");
  divIcones.classList.add("professorIcones");

  const btnDelete = document.createElement("button");
  btnDelete.classList.add("btn-icon-professor");
  const imgDelete = document.createElement("img");
  imgDelete.src = "../imgs/icons/trash.svg";
  imgDelete.alt = "icone de deletar";
  imgDelete.id = "btnExcluir";
  btnDelete.appendChild(imgDelete);
  btnDelete.onclick = async () => {
    await apiProfessores.deleteProfessor(professor.id);
    window.location.href = "./professores.html";
  };

  const btnEdit = document.createElement("button");
  btnEdit.classList.add("btn-icon-professor");
  const imgEdit = document.createElement("img");
  imgEdit.src = "../imgs/icons/pencil-fill.svg";
  imgEdit.alt = "icone de editar";
  imgEdit.id = "btnEditar";
  btnEdit.appendChild(imgEdit);
  btnEdit.onclick = async () => {
    idProfessorInput.value = await professor.id;
    nomeProfessorInput.value = await professor.nome;
    idadeProfessorInput.value = await professor.idade;
    materiaProfessorInput.value = await professor.materia;
    observacaoProfessorInput.value = await professor.observacoes;
  };

  divIcones.appendChild(btnDelete);
  divIcones.appendChild(btnEdit);

  li.appendChild(div);
  li.appendChild(divIcones);

  listaDeProfessores.appendChild(li);
}

async function adicionarProfessoresNaLista() {
  const professores = await apiProfessores.getProfessores();
  professores.forEach((professor) => {
    CriarCardProfessor(professor);
  });
  console.log(professores);
}

adicionarProfessoresNaLista();
