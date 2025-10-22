-- Dump compatível com cloud PostgreSQL

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

-- Conecta na base já criada no dashboard da cloud
\connect auth_microservice

-- SCHEMA
CREATE SCHEMA IF NOT EXISTS app;
ALTER SCHEMA app OWNER TO postgres;

-- SEQUENCES
CREATE SEQUENCE IF NOT EXISTS public.funcionario_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.funcionario_id_seq OWNER TO postgres;

CREATE SEQUENCE IF NOT EXISTS public.tipofuncionario_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.tipofuncionario_id_seq OWNER TO postgres;

-- TABLES
CREATE TABLE IF NOT EXISTS app.funcionario (
    id integer DEFAULT nextval('public.funcionario_id_seq'::regclass) NOT NULL,
    nome character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    "tipoFuncionarioId" integer NOT NULL,
    PRIMARY KEY (id)
);
ALTER TABLE app.funcionario OWNER TO postgres;

CREATE TABLE IF NOT EXISTS app."tipoFuncionario" (
    id integer DEFAULT nextval('public.tipofuncionario_id_seq'::regclass) NOT NULL,
    "descricaoTipoFuncionario" character varying(255) NOT NULL,
    PRIMARY KEY (id)
);
ALTER TABLE app."tipoFuncionario" OWNER TO postgres;

-- FOREIGN KEYS
ALTER TABLE ONLY app.funcionario
    ADD CONSTRAINT "tipoFuncionarioId" FOREIGN KEY ("tipoFuncionarioId") REFERENCES app."tipoFuncionario"(id) NOT VALID;

-- DATA
INSERT INTO app."tipoFuncionario" (id, "descricaoTipoFuncionario") VALUES (1, 'Enfermeiro');
INSERT INTO app."tipoFuncionario" (id, "descricaoTipoFuncionario") VALUES (2, 'Médico');
INSERT INTO app."tipoFuncionario" (id, "descricaoTipoFuncionario") VALUES (3, 'Cuidador');
INSERT INTO app."tipoFuncionario" (id, "descricaoTipoFuncionario") VALUES (4, 'Utente');

INSERT INTO app.funcionario (id, nome, email, password, "tipoFuncionarioId") 
VALUES (1, 'tiago', 'tiago@test.com', '$2b$10$KRz4PSMjZkRv6dW3AEIrQOBttqyUd8UkdYNl7PJvT1GjgN5C/6f.m', 1);

-- Ajusta sequences para não dar conflito
SELECT pg_catalog.setval('public.funcionario_id_seq', 1, true);
SELECT pg_catalog.setval('public.tipofuncionario_id_seq', 4, true);
