import { useEffect, useState } from "react";
import { buscarSenha, mudarStatus } from "../apis/apiGestaoFila";
import { toast } from "react-toastify";
import "../componentes/Modal.css";
import "./Home.css";

function Home() {
  const [digitado, setDigitado] = useState("");
  const [senhaAtual, setSenhaAtual] = useState("");

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (
        event.key !== "Shift" &&
        event.key !== "Enter" &&
        event.key !== "NumLock"
      ) {
        setDigitado((prev) => prev + event.key);
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
        toast.success(`Senha correta! ${objeto?.nome} Bom almoço!`);
        await fetchSenha();
      } catch (error) {
        toast.error("Ocorreu um erro no sistema");
      }
    } else {
      toast.warning("Senha incorreta");
    }
  }

  async function fetchSenha() {
    setSenhaAtual("");
    setDigitado("");
    try {
      const resposta = await buscarSenha();
      console.log("resposta :>> ", resposta);
      setSenhaAtual(resposta);
    } catch (error) {
      toast.error("Ocorreu um erro no sistema, tente novamente mais tarde");
    }
  }

  useEffect(() => {
    fetchSenha();
  }, []);

  return (
    <div className="App">
      <div>
        <h1>{senhaAtual}</h1>
      </div>
    </div>
  );
}

export default Home;
