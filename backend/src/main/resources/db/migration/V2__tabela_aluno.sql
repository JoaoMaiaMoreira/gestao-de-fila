CREATE TABLE aluno (
    id_aluno integer PRIMARY KEY,
    nome varchar(100) NOT NULL,
    senha_fila varchar(7),
    email_institucional varchar(250) NOT NULL,
    turma integer NOT NULL,
    URL_QRCODE VARCHAR(2048),
    FOREIGN KEY (turma) REFERENCES turmas(id_turma)
);