/*FORMULARIO*/
const formulario = document.querySelector(".formulario");
const inputIdAluno = document.getElementById("idAluno");
const inputNomeAluno = document.getElementById("nomeAluno");
const inputNascimentoAluno = document.getElementById("nascimentoAluno");
const inputNotaPrimeiroSemestre = document.getElementById(
  "notaPrimeiroSemestreInput"
);
const inputNotaSegundoSemestre = document.getElementById(
  "notaSegundoSemestreInput"
);
const inputTurma = document.getElementById("turmaSelect");
const listaAlunos = document.querySelector(".lista-alunos");

/*API*/
import apiAlunos from "../Alunos/api.js";
import apiTurmas from "../Turmas/api.js";

document.addEventListener("DOMContentLoaded", () => {
  adicionarAlunosNaLista();
  optionTurma();
});

formulario.addEventListener("submit", async (e) => {
  e.preventDefault();

  const aluno = {
    id: inputIdAluno.value,
    nome: inputNomeAluno.value,
    data_nascimento: String(inputNascimentoAluno.value),
    nota_primeiro_semestre: Number(inputNotaPrimeiroSemestre.value),
    nota_segundo_semestre: Number(inputNotaSegundoSemestre.value),
    turma_id: parseInt(inputTurma.value),
  };

  console.log("Dados do aluno a serem enviados:", aluno);
  await AdicionarOuEditarAluno(aluno);
  formulario.reset();
});

function criarCardAluno(aluno) {
  console.log(aluno);
  console.log("funcionando parte 2.....");
  const li = document.createElement("li");

  /*CRIANDO NOME DO ALUNO*/
  const divInfoAluno = document.createElement("div");
  divInfoAluno.classList.add("lista-alunos-item");
  const h4Nome = document.createElement("h4");
  h4Nome.textContent = "Nome: ";
  const spanNome = document.createElement("span");
  spanNome.id = "nome-aluno";
  spanNome.textContent = `${aluno.nome}`;
  h4Nome.appendChild(spanNome);
  /*CRIANDO A IDADE DO ALUNO*/
  /*calculo para encontrar a idade correta*/
  const dataNascimentoUsuario = new Date(aluno.data_nascimento);
  const dataDeHoje = new Date();
  const diferencaTempo = dataDeHoje.getTime() - dataNascimentoUsuario.getTime();
  const idadeDate = new Date(diferencaTempo);
  let idadeCalculada = Math.abs(idadeDate.getUTCFullYear() - 1970);

  const h4Idade = document.createElement("h4");
  h4Idade.textContent = "Idade: ";
  const spanIdade = document.createElement("span");
  spanIdade.id = "idade-aluno";
  spanIdade.textContent = idadeCalculada;

  h4Idade.appendChild(spanIdade);
  /*CRIANDO NOTAS DO ALUNO*/
  const h4Notas = document.createElement("h4");
  h4Notas.textContent = "Notas: ";
  const spanNotaPrimeiroSemestre = document.createElement("span");
  spanNotaPrimeiroSemestre.id = "aluno-nota-semestre1";
  spanNotaPrimeiroSemestre.textContent = `${aluno.nota_primeiro_semestre} | `;
  const spanNotaSegundoSemestre = document.createElement("span");
  spanNotaSegundoSemestre.id = "aluno-nota-semestre2";
  spanNotaSegundoSemestre.textContent = `${aluno.nota_segundo_semestre}`;
  h4Notas.appendChild(spanNotaPrimeiroSemestre);
  h4Notas.appendChild(spanNotaSegundoSemestre);

  const h4Media = document.createElement("h4");
  h4Media.textContent = "Média: ";
  const spanMedia = document.createElement("span");
  spanMedia.id = "aluno-nota-media";
  let media = (aluno.nota_primeiro_semestre + aluno.nota_segundo_semestre) / 2;

  spanMedia.textContent = media;
  h4Media.appendChild(spanMedia);

  const h4Turma = document.createElement("h4");
  h4Turma.textContent = "ID da Turma: ";
  const spanTurma = document.createElement("span");
  spanTurma.id = "turma-aluno";
  spanTurma.textContent = aluno.turma_id;
  h4Turma.appendChild(spanTurma);
  const divIcons = document.createElement("div");
  divIcons.classList.add("container__icons");
  const btnTrash = document.createElement("button");
  btnTrash.classList.add("btn-icon");
  const imgTrash = document.createElement("img");
  imgTrash.src = "../imgs/icons/trash.svg";
  imgTrash.alt = "icone de deletar";
  btnTrash.onclick = async () => {
    await apiAlunos.deleteAluno(aluno.id);
    window.location.href = "./alunos.html";
  };
  btnTrash.appendChild(imgTrash);

  const btnEdit = document.createElement("button");
  btnEdit.classList.add("btn-icon");
  const imgEdit = document.createElement("img");
  imgEdit.src = "../imgs/icons/pencil-fill.svg";
  imgEdit.alt = "icone de editar";
  imgEdit.classList.add("btnEditar");
  btnEdit.appendChild(imgEdit);
  btnEdit.onclick = async () => {
    inputIdAluno.value = await aluno.id;
    inputNomeAluno.value = await aluno.nome;
    inputNascimentoAluno.value = await aluno.data_nascimento;
    inputNotaPrimeiroSemestre.value = await aluno.nota_primeiro_semestre;
    inputNotaSegundoSemestre.value = await aluno.nota_segundo_semestre;
    inputTurma.value = await aluno.turma_id;
  };

  divIcons.appendChild(btnTrash);
  divIcons.appendChild(btnEdit);

  divInfoAluno.appendChild(h4Nome);
  divInfoAluno.appendChild(h4Idade);
  divInfoAluno.appendChild(h4Notas);
  divInfoAluno.appendChild(h4Media);
  divInfoAluno.appendChild(h4Turma);
  divInfoAluno.appendChild(divIcons);
  li.appendChild(divInfoAluno);

  listaAlunos.appendChild(li);
}

async function adicionarAlunosNaLista() {
  let alunos = await apiAlunos.getAlunos();

  alunos.forEach((aluno) => {
    criarCardAluno(aluno);
  });
}

async function AdicionarOuEditarAluno(aluno) {
  try {
    if (aluno.id) {
      const dadosDoAluno = {
        nome: aluno.nome,
        data_nascimento: aluno.data_nascimento,
        nota_primeiro_semestre: Number(aluno.nota_primeiro_semestre),
        nota_segundo_semestre: Number(aluno.nota_segundo_semestre),
        turma_id: Number(aluno.turma_id),
      };

      console.log("Dados formatados para envio:", dadosDoAluno);
      const response = await apiAlunos.putAluno(aluno.id, dadosDoAluno);
      alert("Aluno editado com sucesso!");
      window.location.href = "./alunos.html";
      return response;
    } else {
      console.log("Dados do aluno para criação:", aluno);
      const response = await apiAlunos.postAluno(aluno);
      console.log("Aluno adicionado com sucesso:", response);
      alert("Aluno adicionado com sucesso!");
      criarCardAluno(aluno);
      return response;
    }
  } catch (error) {
    console.error("Erro ao adicionar ou editar aluno:", error);
    alert(`Erro ao processar aluno: ${error.message}`);
    throw error;
  }
}

async function optionTurma() {
  const turmas = await apiTurmas.getTurmas();
  turmas.forEach((turma) => {
    const option = document.createElement("option");
    option.value = turma.id;
    option.textContent = turma.materia;
    console.log(option);
    inputTurma.appendChild(option);
  });
}
