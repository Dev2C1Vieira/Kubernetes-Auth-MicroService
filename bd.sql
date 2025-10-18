--
-- PostgreSQL database dump
--

\restrict dT0gb7ml1GVhS4uj5EkiVBSLMclNp0HGnjFONEDlTfBMLkAgusvrPOj67tLVOtf

-- Dumped from database version 16.10
-- Dumped by pg_dump version 18.0

-- Started on 2025-10-18 11:34:01

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

DROP DATABASE IF EXISTS "Auth-MicroService";
--
-- TOC entry 4900 (class 1262 OID 16398)
-- Name: Auth-MicroService; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE "Auth-MicroService" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Portuguese_Portugal.1252';


ALTER DATABASE "Auth-MicroService" OWNER TO postgres;

\unrestrict dT0gb7ml1GVhS4uj5EkiVBSLMclNp0HGnjFONEDlTfBMLkAgusvrPOj67tLVOtf
\encoding SQL_ASCII
\connect -reuse-previous=on "dbname='Auth-MicroService'"
\restrict dT0gb7ml1GVhS4uj5EkiVBSLMclNp0HGnjFONEDlTfBMLkAgusvrPOj67tLVOtf

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 6 (class 2615 OID 16399)
-- Name: app; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA app;


ALTER SCHEMA app OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 16422)
-- Name: funcionario_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.funcionario_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.funcionario_id_seq OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 216 (class 1259 OID 16403)
-- Name: funcionario; Type: TABLE; Schema: app; Owner: postgres
--

CREATE TABLE app.funcionario (
    id integer DEFAULT nextval('public.funcionario_id_seq'::regclass) NOT NULL,
    nome character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    "tipoFuncionarioId" integer NOT NULL
);


ALTER TABLE app.funcionario OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 16420)
-- Name: tipofuncionario_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tipofuncionario_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.tipofuncionario_id_seq OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 16408)
-- Name: tipoFuncionario; Type: TABLE; Schema: app; Owner: postgres
--

CREATE TABLE app."tipoFuncionario" (
    id integer DEFAULT nextval('public.tipofuncionario_id_seq'::regclass) NOT NULL,
    "descricaoTipoFuncionario" character varying(255) NOT NULL
);


ALTER TABLE app."tipoFuncionario" OWNER TO postgres;

--
-- TOC entry 4891 (class 0 OID 16403)
-- Dependencies: 216
-- Data for Name: funcionario; Type: TABLE DATA; Schema: app; Owner: postgres
--

INSERT INTO app.funcionario (id, nome, email, password, "tipoFuncionarioId") VALUES (1, 'tiago', 'tiago@test.com', '$2b$10$KRz4PSMjZkRv6dW3AEIrQOBttqyUd8UkdYNl7PJvT1GjgN5C/6f.m', 1);


--
-- TOC entry 4892 (class 0 OID 16408)
-- Dependencies: 217
-- Data for Name: tipoFuncionario; Type: TABLE DATA; Schema: app; Owner: postgres
--

INSERT INTO app."tipoFuncionario" (id, "descricaoTipoFuncionario") VALUES (1, 'Enfermeiro');
INSERT INTO app."tipoFuncionario" (id, "descricaoTipoFuncionario") VALUES (2, 'Médico');
INSERT INTO app."tipoFuncionario" (id, "descricaoTipoFuncionario") VALUES (3, 'Cuidador');
INSERT INTO app."tipoFuncionario" (id, "descricaoTipoFuncionario") VALUES (4, 'Utente');


--
-- TOC entry 4901 (class 0 OID 0)
-- Dependencies: 219
-- Name: funcionario_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.funcionario_id_seq', 1, true);


--
-- TOC entry 4902 (class 0 OID 0)
-- Dependencies: 218
-- Name: tipofuncionario_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tipofuncionario_id_seq', 4, true);


--
-- TOC entry 4744 (class 2606 OID 16407)
-- Name: funcionario funcionario_pkey; Type: CONSTRAINT; Schema: app; Owner: postgres
--

ALTER TABLE ONLY app.funcionario
    ADD CONSTRAINT funcionario_pkey PRIMARY KEY (id);


--
-- TOC entry 4746 (class 2606 OID 16412)
-- Name: tipoFuncionario tipoFuncionario_pkey; Type: CONSTRAINT; Schema: app; Owner: postgres
--

ALTER TABLE ONLY app."tipoFuncionario"
    ADD CONSTRAINT "tipoFuncionario_pkey" PRIMARY KEY (id);


--
-- TOC entry 4747 (class 2606 OID 16415)
-- Name: funcionario tipoFuncionarioId; Type: FK CONSTRAINT; Schema: app; Owner: postgres
--

ALTER TABLE ONLY app.funcionario
    ADD CONSTRAINT "tipoFuncionarioId" FOREIGN KEY ("tipoFuncionarioId") REFERENCES app."tipoFuncionario"(id) NOT VALID;


-- Completed on 2025-10-18 11:34:01

--
-- PostgreSQL database dump complete
--

\unrestrict dT0gb7ml1GVhS4uj5EkiVBSLMclNp0HGnjFONEDlTfBMLkAgusvrPOj67tLVOtf

