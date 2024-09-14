import { useEffect, useState } from "react";
import { buscarSenha, mudarStatus } from "../apis/apiGestaoFila";
import { toast } from "react-toastify";
import ReactModal from "react-modal";
import "../componentes/Modal.css";

function Home() {
  const [digitado, setDigitado] = useState("");
  const [senhaAtual, setSenhaAtual] = useState("");
  const [abrirModal, setAbrirModal] = useState(false);
  const [fecharModal, setFecharModal] = useState(true);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (
        event.key !== "Shift" &&
        event.key !== "Enter" &&
        event.key !== "NumLock"
      ) {
        setDigitado((prev) => {
          const novoDigitado = prev + event.key;
          console.log("Digitado atualizado: ", novoDigitado); // Log para verificar o valor atualizado
          return novoDigitado;
        });
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    console.log("entro");
    if (digitado.includes("{") && digitado.includes("}")) {
      const objeto = JSON.parse(digitado);
      console.log(" objeto:>> ", objeto);
    }
    if (digitado.includes("{") && digitado.includes("}")) {
      const objeto = JSON.parse(digitado);
      console.log("objeto :>> ", objeto);
      comparar(objeto);
    }
  }, [digitado]);

  async function comparar(objeto) {
    console.log("compara");
    console.log("objeto.email :>> ", objeto.email);
    console.log("senha :>> ", objeto.senha);
    console.log("senhaAtual :>> ", senhaAtual);
    if (objeto?.senha === senhaAtual) {
      console.log("Entrei na condição de senha incorreta");
      try {
        await mudarStatus("JA_COMEU", objeto?.email);
        setSenhaAtual("");
        setAbrirModal(true);
      } catch (error) {
        toast.error("Ocorreu um erro no sistema");
        console.log("error :>> ", error);
      }
    } else {
      toast.warning("Senha incorreta");
      window.alert("senha incorreta");
    }
    setTimeout(() => {
      setDigitado("");
      setFecharModal(true);
      setAbrirModal(false);
    }, 1000);
  }

  useEffect(() => {
    async function fetchSenha() {
      try {
        const resposta = await buscarSenha();
        console.log("Resposta buscarSenha :>> ", resposta); // Log para verificar a resposta da API
        setSenhaAtual(resposta);
      } catch (error) {
        console.error("Erro ao buscar senha:", error);
      }
    }
    fetchSenha();
  }, []);

  return (
    <div className="App">
      <span>{digitado}</span>
      <h1>{senhaAtual}</h1>
      <ReactModal
        isOpen={true}
        onRequestClose={() => setAbrirModal(false)}
        contentLabel="Modal img"
        className="Modal"
        overlayClassName="Overlay"
      >
        <img
          src="https://logosmarcas.net/wp-content/uploads/2021/09/Hot-Wheels-Logo.png"
          alt="Logo"
          className="logo"
        />
      </ReactModal>
    </div>
  );
}

export default Home;
