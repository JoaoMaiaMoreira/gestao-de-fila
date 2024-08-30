// import MeuInput from "../componentes/MeuInput";
import { useState } from "react";
import MeuInput from "../componentes/MeuInput";
import "./TelaCadastro.css";
import { salvarPessoa } from "../apis/apiGestaoFila";

function TelaCadastro() {
  const [email, setEmail] = useState("");
  const [nome, setNome] = useState("");
  const [idTurma, setIdTurma] = useState(0);

  function salvarEmail(e) {
    setEmail(e.target.value);
  }

  function salvarTurma(e) {
    console.log("e.target.value :>> ", e.target.value);
    setIdTurma(e.target.value);
  }

  return (
    <div className="geral">
      <section className="container">
        <h2>Cadastre o Aluno</h2>
        <MeuInput
          label={"Digite o email:"}
          placeholder={"Email"}
          handlerOnChange={(e) => salvarEmail(e)}
        />
        <MeuInput
          label={"Digite o nome:"}
          placeholder={"Nome"}
          handlerOnChange={(e) => setNome(e.target.value)}
        />
        <label>Escolha uma turma:</label>
        <select onChange={(e) => salvarTurma(e)} className="select">
          <option value={1}>Terceiro Sistema 1</option>
          <option value={2}>Segundo Sistemas</option>
          <option value={3}>Terceiro Propedeltico</option>
        </select>
        <buton className="botao">Cadastrar</buton>
      </section>
    </div>
  );
}

export default TelaCadastro;
