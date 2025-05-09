/*FORMULARIO*/
const inputIdAluno = document.getElementById("idAluno");
const formulario = document.querySelector(".formulario");
const inputNomeAluno = document.getElementById("nomeAluno");
const inputIdadeAluno = document.getElementById("idadeAluno");
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

let alunos = [];

formulario.addEventListener("submit", async (e) => {
  console.log("Iniciando envio de dados...");
  e.preventDefault();

  // Validação dos dados

  const nota1 = parseFloat(inputNotaPrimeiroSemestre.value);
  const nota2 = parseFloat(inputNotaSegundoSemestre.value);

  const aluno = {
    nome: inputNomeAluno.value,
    data_nascimento: String(inputNascimentoAluno.value),
    nota_primeiro_semestre: nota1,
    nota_segundo_semestre: nota2,
    turma_id: parseInt(inputTurma.value),
  };

  criarCardAluno(aluno);
  await adicionarAlunoNaApi(aluno);
});

function criarCardAluno(aluno) {
  console.log(aluno);
  console.log("funcionando parte 2.....");
  const li = document.createElement("li");
  /*CRIANDO NOME DO ALUNO*/
  const divInfoAluno = document.createElement("div");
  divInfoAluno.classList.add("lista-alunos-item");
  const h4Nome = document.createElement("h4");
  const spanNome = document.createElement("span");
  spanNome.id = "nome-aluno";
  spanNome.textContent = aluno.nome;
  h4Nome.appendChild(spanNome);

  /*CRIANDO IDADE DO ALUNO*/
  const h4Idade = document.createElement("h4");
  const spanIdade = document.createElement("span");
  spanIdade.id = "idade-aluno";
  spanIdade.textContent = aluno.idade;
  h4Idade.appendChild(spanIdade);
  /*CRIANDO NOTAS DO ALUNO*/
  const h4Notas = document.createElement("h4");
  h4Notas.textContent = "Notas: ";
  const spanNotaPrimeiroSemestre = document.createElement("span");
  spanNotaPrimeiroSemestre.id = "aluno-nota-semestre1";
  spanNotaPrimeiroSemestre.textContent = `${aluno.nota_primeiro_semestre} | `;
  const spanNotaSegundoSemestre = document.createElement("span");
  spanNotaSegundoSemestre.id = "aluno-nota-semestre2";
  spanNotaSegundoSemestre.textContent = aluno.nota_segundo_semestre;
  h4Notas.appendChild(spanNotaPrimeiroSemestre);
  h4Notas.appendChild(spanNotaSegundoSemestre);

  const h4Media = document.createElement("h4");
  h4Media.textContent = "Média: ";
  const spanMedia = document.createElement("span");
  spanMedia.id = "aluno-nota-media";
  let media = (aluno.nota_primeiro_semestre + aluno.nota_segundo_semestre) / 2;
  console.log(aluno.nota_primeiro_semestre);
  console.log(aluno.nota_segundo_semestre);
  console.log(media);
  spanMedia.textContent = media;
  h4Media.appendChild(spanMedia);

  const divTurma = document.createElement("div");
  divTurma.classList.add("lista-alunos-item-turma");
  const h4Turma = document.createElement("h4");
  const spanTurma = document.createElement("span");
  spanTurma.id = "turma-aluno";
  spanTurma.textContent = aluno.turma;
  h4Turma.appendChild(spanTurma);
  divTurma.appendChild(h4Turma);
  const divIcons = document.createElement("div");
  const imgTrash = document.createElement("img");
  imgTrash.src = "../imgs/icons/trash.svg";
  imgTrash.alt = "icone de deletar";

  const imgEdit = document.createElement("img");
  imgEdit.src = "../imgs/icons/pencil-fill.svg";
  imgEdit.alt = "icone de editar";
  divIcons.appendChild(imgTrash);
  divIcons.appendChild(imgEdit);

  divTurma.appendChild(divIcons);

  divInfoAluno.appendChild(h4Nome);
  divInfoAluno.appendChild(h4Idade);
  divInfoAluno.appendChild(h4Notas);
  divInfoAluno.appendChild(h4Media);
  divInfoAluno.appendChild(divTurma);

  li.appendChild(divInfoAluno);
  li.appendChild(divTurma);

  listaAlunos.appendChild(li);
}

async function adicionarAlunosNaLista() {
  let alunos = await apiAlunos.getAlunos();

  alunos.forEach((aluno) => {
    criarCardAluno(aluno);
  });
}

async function adicionarAlunoNaApi(aluno) {
  try {
    const response = await apiAlunos.postAluno(aluno);
    console.log("Aluno adicionado com sucesso:", response);
    // Pequeno delay para garantir que a API processou a requisição
    await new Promise((resolve) => setTimeout(resolve, 500));
    return response;
  } catch (error) {
    console.error("Erro ao adicionar aluno:", error);
    throw error;
  }
}

adicionarAlunosNaLista();
