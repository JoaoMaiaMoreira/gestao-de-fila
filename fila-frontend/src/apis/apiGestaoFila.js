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

export async function buscarQrcodeUsuarioCadastrado() {
  try {
    const response = await api.get("/qrCode/buscarQrcode", {
      responseType: "blob",
    });
    return URL.createObjectURL(response.data);
  } catch (erro) {
    console.error("Erro ao obter ultimo qrCode", erro);
  }
}

export async function buscarSenha() {
  try {
    const response = await api.get("/fila/buscarSenhas");
    return response.data;
  } catch (erro) {
    console.error("Erro ao obter senha", erro);
  }
}

export async function mudarStatus(status, email) {
  try {
    const response = await api.put(`/fila/mudarStatus/${status}/${email}`);
    return response.data;
  } catch (erro) {
    console.error("Erro ao mudarStatus", erro);
  }
}
