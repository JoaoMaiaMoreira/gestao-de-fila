CREATE TABLE pessoa (
    id_aluno integer primary key,
    nome varchar(100) not null,
    senha_fila varchar(5),
    email_institucional varchar(250) not null,
    id_sala integer not null,
    is_professor not null
)

chat estou achando meu projeto chato pois meu projeto vai funcionar assim me de alguma ideia pfv: Os alunos da escola vai receber uma senha todos os dias no email (senha - e um qrcode) esse qrcode e fixo entao cada aluno tem o seu, em uma tela durante a fila da merenda vai exibir a senha por exemplo Senha a01, para o aluno ir la pegar a merenda porem, antes e entrar no refeirprio ela tem que mostrar o qrcode para um sistema (front end) que vai pegar os ddaos do aluno entao fazer uma busca no banco e pegar a senha do aluno entao vai validar se a senha do aluno for = a senha da tela entao passe, oq vc acha tem ideia para melhorar
