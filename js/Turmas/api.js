export const apiTurmas = {
  async getTurmas() {
    const api = await fetch(
      "https://school-system-spi.onrender.com/api/turmas/"
    );
    const response = await api.json();
    console.log(response);
    return response;
  },
  async getTurma(id_turma) {
    const api = await fetch(
      `https://school-system-spi.onrender.com/api/turmas/${id_turma}`
    );
    const response = await api.json();
    console.log(response);
    return response;
  },
  async postTurma(turma) {
    const api = await fetch(
      "https://school-system-spi.onrender.com/api/turmas/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(turma),
      }
    );
    const response = await api.json();
    console.log(response);
    return response;
  },
  async putTurma(id_turma, turma) {
    const api = await fetch(
      `https://school-system-spi.onrender.com/api/turmas/${id_turma}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application.json",
        },
        body: JSON.stringify(turma),
      }
    );
    const response = await api.json();
    console.log(response);
    return response;
  },
  async deleteTurma(id_turma) {
    const api = await fetch(
      `https://school-system-spi.onrender.com/api/turmas/${id_turma}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const response = await api.json();
    console.log(response);
    return response;
  },
};
