const URLBASE = "https://school-system-spi.onrender.com/api/turmas";

const apiTurmas = {
  async getTurmas() {
    try {
      const api = await fetch(URLBASE);
      const response = await api.json();
      console.log("teste", response);
      return response;
    } catch (error) {
      alert("erro ao encontrar Turmas");
      console.log(error);
    }
  },
  async getTurma(id_turma) {
    try {
      const api = await fetch(`${URLBASE}/${id_turma}`);
      const response = await api.json();
      console.log(response);
      return response;
    } catch (error) {
      alert("erro ao encontrar Turma");
    }
  },
  async postTurma(turma) {
    try {
      console.log("Enviando dados:", turma);
      const api = await fetch(URLBASE, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(turma),
      });

      const response = await api.json();
      console.log("Resposta do servidor:", response);
      return response;
    } catch (error) {
      console.error("Erro detalhado:", error);
      alert(`Erro ao Adicionar Turma: ${error.message}`);
      throw error;
    }
  },
  async putTurma(id_turma, turma) {
    try {
      const api = await fetch(`${URLBASE}/${id_turma}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application.json",
        },
        body: JSON.stringify(turma),
      });
      const response = await api.json();
      console.log(response);
      return response;
    } catch (error) {
      alert("Erro ao editar turma");
      console.log(error);
    }
  },
  async deleteTurma(id_turma) {
    try {
      const api = await fetch(`${URLBASE}/${id_turma}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const response = await api.json();
      console.log(response);
      return response;
    } catch (error) {
      alert("erro ao deletar Turma");
      console.log(error);
    }
  },
};

export default apiTurmas;
