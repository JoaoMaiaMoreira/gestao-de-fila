CREATE TABLE pessoa (
    id_pessoa integer PRIMARY KEY,
    isFuncionario Boolean,
    nome varchar(100) NOT NULL,
    email_institucional varchar(250) NOT NULL,
    senha_fila varchar(7),
    turma integer NOT NULL,
    URL_QRCODE VARCHAR(2048),
    status VARCHAR(50) NOT NULL,
    FOREIGN KEY (turma) REFERENCES turmas(id_turma)
);