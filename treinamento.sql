-- Criando Base de Dados
CREATE DATABASE treino;

-- Comando para referenciar os dados: \c treino
-- \c treino;

-- Criando Tabelas
CREATE TABLE IF NOT EXISTS aluno
(
    matricula bigint NOT NULL,
    nome character varying(200) COLLATE pg_catalog."default" NOT NULL,
    dataNascimento character varying(11) COLLATE pg_catalog."default" NOT NULL,
    sexo character(1) COLLATE pg_catalog."default",
    cpf bigint NOT NULL,
    CONSTRAINT aluno_pkey PRIMARY KEY (matricula)
);

CREATE TABLE IF NOT EXISTS disciplina
(
    codigoDisciplina integer NOT NULL,
    nome character varying(100) COLLATE pg_catalog."default",
    cargaHoraria integer,
    periodo character(1) COLLATE pg_catalog."default",
    CONSTRAINT disciplina_pkey PRIMARY KEY (codigoDisciplina)
);

CREATE TABLE IF NOT EXISTS professor
(
    idProfessor integer NOT NULL,
    nome character varying(200) COLLATE pg_catalog."default" NOT NULL,
    tipoProfessor character varying(1) COLLATE pg_catalog."default" NOT NULL DEFAULT 'S'::character varying,
    remuneracao double precision,
    CONSTRAINT professor_pkey PRIMARY KEY (idProfessor)
);

CREATE TABLE IF NOT EXISTS aluno_disciplina
(
    matricula_aluno bigint NOT NULL,
    codigo_disciplina integer,
    CONSTRAINT codigo_disciplina FOREIGN KEY (codigo_disciplina)
        REFERENCES disciplina (codigoDisciplina)
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID,
    CONSTRAINT matricula_aluno FOREIGN KEY (matricula_aluno)
        REFERENCES aluno (matricula)
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
);

CREATE TABLE IF NOT EXISTS leciona
(
    codigoDisciplina integer,
    idProfessor integer,
    CONSTRAINT codigoDisciplina FOREIGN KEY (codigoDisciplina)
        REFERENCES disciplina (codigoDisciplina)
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT idProfessor FOREIGN KEY (idProfessor)
        REFERENCES professor (idProfessor)
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
);

-- SCRIPT POPULA -> INSERT TABELAS

-- ALUNO
INSERT INTO public.aluno(
	matricula, nome, dataNascimento, sexo, cpf)
	VALUES (1701, 'Bruno Duarte', '2021-12-12', 'M', 125777999);

-- DISCIPLINA
INSERT INTO public.disciplina(
	codigoDisciplina, nome, cargaHoraria, periodo)
	VALUES (10, 'MDS', 60, 'V');

INSERT INTO public.disciplina(
	codigoDisciplina, nome, cargaHoraria, periodo)
	VALUES (20, 'EPS', 60, 'V');

-- PROFESSOR
INSERT INTO public.professor(
	idProfessor, nome, tipoProfessor, remuneracao)
	VALUES (100, 'Eugenio Nogueira', 'A', 8514.89);

INSERT INTO public.professor(
	idProfessor, nome, remuneracao)
	VALUES (200, 'Hilmer Nogueira' , 18514.89);

INSERT INTO public.aluno_disciplina(
	matricula_aluno, codigo_disciplina)
	VALUES (1701, 10);

INSERT INTO public.leciona(
	codigoDisciplina, idProfessor)
	VALUES (10, 100);

-- CONSULTAS
-- TODAS AS MATERIAS VINCULADAS AO ALUNO
SELECT * FROM public.aluno_disciplina where matricula_aluno = 1701

-- TODAS AS MATERIAS VINCULADAS AO ALUNO -> Pelo nome do Aluno e também da DISCIPLINA
SELECT aluno.nome, disciplina.nome FROM aluno
	INNER JOIN aluno_disciplina
		ON matricula_aluno = matricula
	INNER JOIN disciplina 
		ON codigo_disciplina = codigoDisciplina;