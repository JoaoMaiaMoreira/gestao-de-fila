import { useEffect, useState } from "react";
import { buscarSenha, mudarStatus } from "../apis/apiGestaoFila";
import { toast } from "react-toastify";
import ReactModal from "react-modal";
import "../componentes/Modal.css";
import bomAlmoco from "../img/bomAlmoco.png";

function Home() {
  const [digitado, setDigitado] = useState("");
  const [senhaAtual, setSenhaAtual] = useState("");
  const [abrirModal, setAbrirModal] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (
        event.key !== "Shift" &&
        event.key !== "Enter" &&
        event.key !== "NumLock"
      ) {
        setDigitado((prev) => {
          const novoDigitado = prev + event.key;
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
    if (digitado.includes("{") && digitado.includes("}")) {
      const objeto = JSON.parse(digitado);
      comparar(objeto);
    }
  }, [digitado]);

  async function comparar(objeto) {
    if (objeto?.senha === senhaAtual) {
      try {
        await mudarStatus("JA_COMEU", objeto?.email);
        setSenhaAtual("");
        setAbrirModal(true);
      } catch (error) {
        toast.error("Ocorreu um erro no sistema");
      }
    } else {
      toast.warning("Senha incorreta");
    }
  }

  useEffect(() => {
    async function fetchSenha() {
      try {
        const resposta = await buscarSenha();
        setSenhaAtual(resposta);
      } catch (error) {
        toast.error("Ocorreu um erro no sistema, tente novamente mais tarde");
      }
    }
    fetchSenha();
  }, []);

  return (
    <div className="App">
      <h1>{senhaAtual}</h1>
      <ReactModal
        isOpen={abrirModal}
        onRequestClose={() => setAbrirModal(false)}
        contentLabel="Modal img"
        className="Modal"
        overlayClassName="Overlay"
      >
        <img src={bomAlmoco} alt="Logo" className="logo" />
      </ReactModal>
    </div>
  );
}

export default Home;
