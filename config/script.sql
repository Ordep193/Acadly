use Acadly;

create table evento(
    id int primary key AUTO_INCREMENT,
    nome varchar(250), 
    descricao varchar(250), 
    dataInicio date, 
    dataFim date, 
    participantes int, 
    area varchar(250),
    modalidade varchar(250), 
    regiao varchar(100), 
    instituicao varchar(250),
    capa image
);

create table usuario(
    id int primary key AUTO_INCREMENT, 
    nome varchar(250), 
    idade int,
    telefone varchar(250),
    cpf varchar(250),
    email varchar(250),
    senha varchar(250),
    institucao varchar(250),
    cargo int
);

create table evento_usuario(
    idEvento int REFERENCES evento,
    idUsuario int REFERENCES usuaruio,
    comparecer boolean
);

create table feedback(
    id int primary key AUTO_INCREMENT,
    idEvento int REFERENCES evento,
    idUsuario int REFERENCES usuaruio,
    descricao varchar(250),
    nota int
);

create table certifiado( 
    id int primary key AUTO_INCREMENT,
    idUsuario int REFERENCES usuario,
    idEvento int REFERENCES evento,
    descricao varchar(400),
    dataCriacao date
);
