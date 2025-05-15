const apiProfessores = {
  async getProfessores() {
    try {
      const api = await fetch(
        "https://school-system-spi.onrender.com/api/professores/"
      );
      const response = await api.json();
      console.log(response);
      return response;
    } catch (error) {
      alert("erro ao adicionar os professores", error);
    }
  },
  async getProfessor(id_professor) {
    const api = await fetch(
      `https://school-system-spi.onrender.com/api/professores/${id_professor}`
    );
    const response = api.json();
    console.log(response);
    return response;
  },
  async postProfessor(professor) {
    try {
      const api = await fetch(
        "https://school-system-spi.onrender.com/api/professores",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(professor),
        }
      );
      const response = await api.json();
      console.log(response);
      return response;
    } catch (error) {
      alert("Erro ao enviar o Professor", error);
      console.log(error);
    }
  },
  async putProfessor(id_professor, professor) {
    const api = await fetch(
      `https://school-system-spi.onrender.com/api/professores/${id_professor}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(professor),
      }
    );
    const response = await api.json();
    console.log(response);
    return response;
  },
  async deleteProfessor(id_professor) {
    const api = await fetch(
      `https://school-system-spi.onrender.com/api/professores/${id_professor}`,
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

export default apiProfessores;
