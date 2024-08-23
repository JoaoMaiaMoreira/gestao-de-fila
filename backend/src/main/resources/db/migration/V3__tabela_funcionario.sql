CREATE TABLE funcionario (
    id_funcionario INTEGER PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    senha_fila VARCHAR(50),
    URL_QRCODE VARCHAR(2048),
    email VARCHAR(250) NOT NULL
);
