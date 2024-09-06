import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080",
});

export async function salvarPessoa(pessoa) {
  try {
    const response = await api.post("/pessoa/salvarPessoa", pessoa);
    return response.data;
  } catch (erro) {
    console.error("Erro ao obter dados:", erro);
    throw erro;
  }
}

export async function getTurmas() {
  try {
    const response = await api.get("/turma/getTurmas");
    return response.data;
  } catch (erro) {
    console.error("Erro ao obter turmas:", erro);
    throw erro;
  }
}
