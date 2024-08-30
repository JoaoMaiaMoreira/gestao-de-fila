CREATE TABLE pessoa (
    id_pessoa integer PRIMARY KEY,
    nome varchar(100) NOT NULL,
    senha_fila varchar(7),
    email_institucional varchar(250) NOT NULL,
    turma integer NOT NULL,
    isFuncionario Boolean,
    URL_QRCODE VARCHAR(2048),
    FOREIGN KEY (turma) REFERENCES turmas(id_turma)
);