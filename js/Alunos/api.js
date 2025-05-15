let URLBASE = "https://school-system-spi.onrender.com/api/alunos";

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
      const api = await fetch(`${URLBASE}/${id_aluno}`);
      const response = await api.json();
      console.log(response);
      return response;
    } catch (error) {
      alert("Erro ao buscar aluno", error);
      console.log(error);
    }
  },
  async putAluno(id_aluno, aluno) {
    console.log(
      "Tentando fazer requisição PUT para:",
      `${URLBASE}/${id_aluno}`
    );
    console.log("Dados sendo enviados:", aluno);
    try {
      const api = await fetch(`${URLBASE}/${id_aluno}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(aluno),
      });

      const response = await api.json();
      console.log("Resposta do PUT:", response);
      return response;
    } catch (error) {
      console.error("Erro em putAluno:", error);
      if (error.message === "Failed to fetch") {
        console.error(
          "Erro de rede - Por favor, verifique se o servidor da API está funcionando e acessível"
        );
        alert(
          "Não foi possível conectar ao servidor. Verifique sua conexão com a internet e tente novamente."
        );
      } else {
        alert(`Erro ao atualizar aluno: ${error.message}`);
      }
      throw error;
    }
  },
  async deleteAluno(id_aluno) {
    try {
      const api = await fetch(`${URLBASE}/${id_aluno}`, {
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
