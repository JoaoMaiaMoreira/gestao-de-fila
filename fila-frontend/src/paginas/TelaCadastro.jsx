import { useEffect, useState } from "react";
import MeuInput from "../componentes/MeuInput";
import "./TelaCadastro.css";
import {
  buscarQrcodeUsuarioCadastrado,
  getTurmas,
  salvarPessoa,
} from "../apis/apiGestaoFila";

function TelaCadastro() {
  const [email, setEmail] = useState("");
  const [nome, setNome] = useState("");
  const [turmaSelecionada, setTurmaSelecionada] = useState(0);
  const [allTurmas, setAllTurmas] = useState([]);
  const [isFuncionario, setIsFuncionario] = useState(null);
  const [qrCode, setQrcode] = useState(null);
  const [nomeFormatado, setNomeFormatado] = useState("");
  useEffect(() => {
    buscarTurmas();
  }, []);

  function salvarEmail(e) {
    setEmail(e.target.value);
  }

  async function buscarTurmas() {
    try {
      const response = await getTurmas();
      console.log("response :>> ", response);
      setAllTurmas(response);
    } catch (erro) {
      console.log("erro :>> ", erro);
    }
  }

  function salvarTurma(e) {
    console.log("e.target.value :>> ", e.target.value);
    setTurmaSelecionada(e.target.value);
  }

  async function cadastrarPessoa() {
    const pessoa = {
      nome: nome,
      email: email,
      idTurma: turmaSelecionada,
      isFuncionario: isFuncionario,
    };
    try {
      const response = await salvarPessoa(pessoa);
      console.log("Cadastro realizado com sucesso");
      buscarQrCode();
    } catch (erro) {
      console.log("erro :>> ", erro);
    }
  }

  async function buscarQrCode() {
    try {
      const response = await buscarQrcodeUsuarioCadastrado();
      setQrcode(response);
    } catch (e) {
      console.log("e :>> ", e);
    }
  }

  async function cadastrarAluno() {
    if (
      (!isFuncionario && email.includes("@aluno.mg.gov.br")) ||
      (isFuncionario && email.includes("@prof.mg.gov.br"))
    ) {
      cadastrarPessoa();
    } else if (isFuncionario && email.includes("@aluno.mg.gov.br")) {
      console.log("Um funcionario nao pode ser cadastrado com email de aluno");
    } else if (!isFuncionario && !email.includes("@aluno.mg.gov.br")) {
      console.log("Email invalido!");
    }
  }

  function formatarNome() {
    const nomePartido = nome.toUpperCase().trim().split(/\s+/);

    if (nomePartido.length === 0) {
      return ""; // Retorna uma string vazia se o nome estiver vazio
    } else if (nomePartido.length === 1) {
      return nomePartido[0]; // Retorna o único nome se houver apenas um
    } else {
      return nomePartido[0] + "_" + nomePartido[nomePartido.length - 1];
    }
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
          {allTurmas.map((turma, index) => {
            return (
              <option key={turma.id} value={turma.id}>
                {turma.nome}
              </option>
            );
          })}
        </select>
        <label htmlFor="funcionario">
          E funcionario
          <input
            value={"sim"}
            id="funcionario"
            type="radio"
            checked={isFuncionario === true}
            onChange={(e) => setIsFuncionario(true)}
          />
        </label>
        <label htmlFor="aluno">
          E aluno
          <input
            value={"nao"}
            id="aluno"
            type="radio"
            checked={isFuncionario === false}
            onChange={() => setIsFuncionario(false)}
          />
        </label>
        <button onClick={() => cadastrarAluno()}>Cadastrar</button>
      </section>
      {qrCode ? (
        <>
          {" "}
          <img src={qrCode} alt="qrCode" />
          <a href={qrCode} download={`${formatarNome()}_QrCodeFila.png`}>
            <button>Download</button>
          </a>{" "}
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export default TelaCadastro;
