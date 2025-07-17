CREATE DATABASE IF NOT EXISTS Acadly;
USE Acadly;

CREATE TABLE evento (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(250), 
    descricao VARCHAR(250), 
    dataInicio DATE, 
    dataFim DATE, 
    participantes INT, 
    area VARCHAR(250),
    modalidade VARCHAR(250), 
    regiao VARCHAR(100), 
    instituicao VARCHAR(250),
    capa LONGBLOB
);

CREATE TABLE usuario (
    id INT PRIMARY KEY AUTO_INCREMENT, 
    nome VARCHAR(250), 
    idade INT,
    telefone VARCHAR(250),
    cpf VARCHAR(250),
    email VARCHAR(250),
    senha VARCHAR(250),
    instituicao VARCHAR(250),
    cargo INT
);

CREATE TABLE evento_usuario (
    idEvento INT,
    idUsuario INT,
    comparecer BOOLEAN,
    PRIMARY KEY (idEvento, idUsuario),
    FOREIGN KEY (idEvento) REFERENCES evento(id),
    FOREIGN KEY (idUsuario) REFERENCES usuario(id)
);

CREATE TABLE feedback (
    id INT PRIMARY KEY AUTO_INCREMENT,
    idEvento INT,
    idUsuario INT,
    descricao VARCHAR(250),
    nota INT,
    FOREIGN KEY (idEvento) REFERENCES evento(id),
    FOREIGN KEY (idUsuario) REFERENCES usuario(id)
);

CREATE TABLE certificado ( 
    id INT PRIMARY KEY AUTO_INCREMENT,
    idUsuario INT,
    idEvento INT,
    descricao VARCHAR(400),
    dataCriacao DATE,
    FOREIGN KEY (idUsuario) REFERENCES usuario(id),
    FOREIGN KEY (idEvento) REFERENCES evento(id)
);
