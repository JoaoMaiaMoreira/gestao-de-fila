import { useEffect, useState } from "react";
import MeuInput from "../componentes/MeuInput";
import { toast } from "react-toastify";
import "./TelaCadastro.css";
import {
  buscarQrcodeUsuarioCadastrado,
  getTurmas,
  salvarPessoa,
} from "../apis/apiGestaoFila";
import logo from "../img/logofGestaoFila.png";

function TelaCadastro() {
  const [email, setEmail] = useState("");
  const [nome, setNome] = useState("");
  const [turmaSelecionada, setTurmaSelecionada] = useState("");
  const [allTurmas, setAllTurmas] = useState([]);
  const [isFuncionario, setIsFuncionario] = useState(null);
  const [qrCode, setQrcode] = useState(null);

  useEffect(() => {
    buscarTurmas();
  }, []);

  useEffect(() => {
    setTurmaSelecionada("");
  }, [isFuncionario]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setEmail("");
      setNome("");
      setTurmaSelecionada("");
      setIsFuncionario(null);
      setQrcode(null);
    }, 180000);

    return () => clearTimeout(timer);
  }, [qrCode]);

  function salvarEmail(e) {
    setEmail(e.target.value);
  }

  async function buscarTurmas() {
    try {
      const response = await getTurmas();
      setAllTurmas(response);
    } catch (erro) {
      console.log("erro :>> ", erro);
      toast.error("Ocorreu um erro no sistema, tente novamente mais tarde");
    }
  }

  function salvarTurma(e) {
    setTurmaSelecionada(e.target.value);
  }

  async function cadastrarPessoa() {
    if (
      nome === "" ||
      email === "" ||
      (turmaSelecionada === "" && !isFuncionario) ||
      isFuncionario === null
    ) {
      toast.warning("Preencha todos os campos!");
    } else {
      const pessoa = {
        nome: nome,
        email: email,
        idTurma: isFuncionario ? null : turmaSelecionada,
        isFuncionario: isFuncionario,
      };
      try {
        await salvarPessoa(pessoa);
        buscarQrCode();
        toast.success(
          "Cadastro realizado com sucesso! Não esqueça de abaixar o QrCode!"
        );
      } catch (erro) {
        toast.error(erro.response.data.message);
      }
    }
  }

  async function buscarQrCode() {
    try {
      const response = await buscarQrcodeUsuarioCadastrado();
      setQrcode(response);
    } catch (e) {
      console.log("e :>> ", e);
      toast.error("Erro ao buscar QrCode, tente novamente mais tarde");
    }
  }

  useEffect(() => {
    setTimeout(() => {});
  }, [qrCode]);

  async function conferirEmail() {
    if (
      (!isFuncionario && email.includes("@aluno.mg.gov.br")) ||
      (isFuncionario && email.includes("@educacao.mg.gov.br"))
    ) {
      cadastrarPessoa();
    } else if (isFuncionario && email.includes("@aluno.mg.gov.br")) {
      toast.warning(
        "Um funcionário não pode ser cadastrado com email de aluno"
      );
    } else if (!isFuncionario && email.includes("@educacao.mg.gov.br")) {
      toast.warning(
        "Um aluno não pode ser cadastrado com email de funcionário"
      );
    } else if (
      (!isFuncionario && !email.includes("@aluno.mg.gov.br")) ||
      (isFuncionario && !email.includes("@educacao.mg.gov.br"))
    ) {
      toast.warning(
        "Deve ser utilizado o email institucional durante o cadastro!"
      );
    }
  }

  function formatarNome() {
    const nomePartido = nome.toUpperCase().trim().split(/\s+/);

    if (nomePartido.length === 0) {
      return "";
    } else if (nomePartido.length === 1) {
      return nomePartido[0];
    } else {
      return nomePartido[0] + "_" + nomePartido[nomePartido.length - 1];
    }
  }

  return (
    <div className="container">
      <div className="geral">
        <span className="logo">
          <img src={logo} alt="Logo" />
        </span>
        <section className="right-login">
          <div className="card-login">
            <h1>Cadastre!</h1>
            <div className="radio-group">
              <label htmlFor="funcionario">
                <input
                  value="sim"
                  id="funcionario"
                  type="radio"
                  checked={isFuncionario === true}
                  onChange={() => setIsFuncionario(true)}
                />
                Funcionário
              </label>
              <label htmlFor="aluno">
                <input
                  value="nao"
                  id="aluno"
                  type="radio"
                  checked={isFuncionario === false}
                  onChange={() => setIsFuncionario(false)}
                />
                Aluno
              </label>
            </div>
            <div className="textfield">
              <label htmlFor="email">Digite o email:</label>
              <MeuInput
                id="email"
                placeholder="Email"
                handlerOnChange={salvarEmail}
              />
            </div>
            <div className="textfield">
              <label htmlFor="nome">Digite o nome:</label>
              <MeuInput
                id="nome"
                placeholder="Nome"
                handlerOnChange={(e) => setNome(e.target.value)}
              />
            </div>
            <div className="textfield">
              <label htmlFor="turma">Escolha uma turma:</label>
              <select
                id="turma"
                onChange={salvarTurma}
                className="textfield"
                disabled={isFuncionario}
                value={isFuncionario ? "" : turmaSelecionada} // Mantenha o valor do select
              >
                <option value="" disabled>
                  Selecione uma turma
                </option>
                {allTurmas.map((turma) => (
                  <option key={turma.id} value={turma.id}>
                    {turma.nome}
                  </option>
                ))}
              </select>
            </div>
            <button className="btn-login" onClick={conferirEmail}>
              Cadastrar
            </button>
          </div>
        </section>
        {qrCode && (
          <section className="qrcode-section">
            <img src={qrCode} alt="QR Code" />
            <a href={qrCode} download={`${formatarNome()}_QrCodeFila.png`}>
              <button className="btn-login">Download</button>
            </a>
          </section>
        )}
      </div>
    </div>
  );
}

export default TelaCadastro;
