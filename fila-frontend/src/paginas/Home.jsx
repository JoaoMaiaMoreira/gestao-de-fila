import { useEffect, useState } from "react";
import { QrReader } from "react-qr-reader";
import "./Home.css";
import { buscarSenha, mudarStatus } from "../apis/apiGestaoFila";

function Home() {
  const [senhaAtual, setSenhaAtual] = useState("");
  const [data, setData] = useState({});

  useEffect(() => {
    senha();
  }, []);

  async function senha() {
    const resposta = await buscarSenha();
    setSenhaAtual(resposta);
    console.log("senhaAtual :>> ", senhaAtual);
  }

  function scan(result) {
    if (result && result.text) {
      const json = JSON.parse(result.text);
      console.log("json :>> ", json);
      console.log("data.senha :>> ", data.senha);
      conferirSenha(json);
    }
  }

  async function conferirSenha(json) {
    console.log("data.senha === senhaAtual :>> ", data.senha === senhaAtual);
    console.log("data.senha :>> ", data.senha);
    console.log("senhaAtual :>> ", senhaAtual);
    console.log("json.senha :>> ", json.senha);
    if (json.senha === senhaAtual) {
      console.log("entrou");
      const resposta = await mudarStatus("JA_COMEU", data.email);
      setData({});
      console.log(resposta);
      setSenhaAtual("");
    }
    console.log("fora");
  }

  function error(err) {
    console.error(err);
  }

  return (
    <div className="fundo">
      <h1>{data.email}</h1>
      <h1>{data.senha}</h1>
      <div className="qrCode">
        <QrReader onResult={scan} onError={error} style={{ width: "100%" }} />
      </div>
      <h1 className="senha">Senha: {senhaAtual} </h1>
    </div>
  );
}

export default Home;
