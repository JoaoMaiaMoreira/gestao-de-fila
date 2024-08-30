import { useState } from "react";
import { salvarPessoa } from "../apis/apiGestaoFila";
import "./Home.css";

function Home() {
  const [pessoa, setPessoa] = useState("");

  async function salvar() {
    const resposta = await salvarPessoa();
    console.log("pessoa :>> ", pessoa);
    setPessoa(resposta);
  }

  return (
    <div className="fundo">
      <h1 className="senha">Senha: A01 </h1>
      <button onClick={() => salvar()}> </button>
    </div>
  );
}

export default Home;
