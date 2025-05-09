let URLBASE = "https://school-system-spi.onrender.com/api/alunos/";

const apiAlunos = {
  async getAlunos() {
    try {
      const api = await fetch(URLBASE);

      const response = await api.json();
      console.log(response);
      return response;
    } catch (error) {
      alert("Erro ao buscar alunos", error);
      console.log(error);
    }
  },
  async getAluno(id_aluno) {
    try {
      const api = await fetch(`${URLBASE}${id_aluno}`);
      const response = await api.json();
      console.log(response);
      return response;
    } catch (error) {
      alert("Erro ao buscar aluno", error);
      console.log(error);
    }
  },
  async putAluno(id_aluno, aluno) {
    try {
      const api = await fetch(`${URLBASE}${id_aluno}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(aluno),
      });
      const response = await api.json();
      console.log(response);
      return response;
    } catch (error) {
      alert("erro ao atualizar aluno", error);
      console.log(error);
    }
  },
  async deleteAluno(id_aluno) {
    try {
      const api = await fetch(`${URLBASE}${id_aluno}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const response = await api.json();
      console.log(response);
      return response;
    } catch (error) {
      alert("Erro ao deletar aluno", error);
      console.log(error);
    }
  },

  async postAluno(aluno) {
    try {
      const api = await fetch(
        "https://school-system-spi.onrender.com/api/alunos",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(aluno),
        }
      );
      const response = await api.json();
      return response;
    } catch (error) {
      alert("Erro ao enviar o aluno", error);
      console.log(error);
    }
  },
};

export default apiAlunos;
