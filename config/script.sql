use Acadly;

create table evento(id int,
            nome varchar(250), 
            descricao varchar(250), 
            dataInicio date, 
            dataFim date, 
            participantes int, 
            area varchar(250),
            modalidade varchar(250), 
            regiao varchar(100), 
            instituicao varchar(250)) ;

create table participante(id int, 
            nome varchar(250), 
            idade int,
            telefone varchar(250),
            cpf varchar(250),
            email varchar(250),
            senha varchar(250),
            compareceu boolean,
            institucao varchar(250));

create table participanteEvento()


