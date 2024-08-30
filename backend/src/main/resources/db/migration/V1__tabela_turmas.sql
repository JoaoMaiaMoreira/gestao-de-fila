CREATE TABLE turmas (
    id_turma SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    serie INTEGER NOT NULL,
    turno VARCHAR(50) NOT NULL,
    apelido VARCHAR(7) NOT NULL
);