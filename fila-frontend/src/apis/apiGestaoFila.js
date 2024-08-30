import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080",
});

export async function salvarPessoa() {
  try {
    const response = await api.post("/pessoa/salvarPessoa");
    return response.data;
  } catch (erro) {
    console.error("Erro ao obter dados:", erro);
    throw erro;
  }
}
