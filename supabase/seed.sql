SET session_replication_role = replica;

--
-- PostgreSQL database dump
--

-- \restrict hUqexjuAeRVyDJB7Qv4voacQJafCluGsuKXiNxRUZSPuqO0OglYgHXTmS4jAhUD

-- Dumped from database version 17.6
-- Dumped by pg_dump version 17.6

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
-- Data for Name: audit_log_entries; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--


--
-- Data for Name: custom_oauth_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: flow_state; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: users; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."users" ("instance_id", "id", "aud", "role", "email", "encrypted_password", "email_confirmed_at", "invited_at", "confirmation_token", "confirmation_sent_at", "recovery_token", "recovery_sent_at", "email_change_token_new", "email_change", "email_change_sent_at", "last_sign_in_at", "raw_app_meta_data", "raw_user_meta_data", "is_super_admin", "created_at", "updated_at", "phone", "phone_confirmed_at", "phone_change", "phone_change_token", "phone_change_sent_at", "email_change_token_current", "email_change_confirm_status", "banned_until", "reauthentication_token", "reauthentication_sent_at", "is_sso_user", "deleted_at", "is_anonymous") VALUES
	('00000000-0000-0000-0000-000000000000', 'c87a1291-bd5c-4183-b3c8-519c1b3ba485', 'authenticated', 'authenticated', 'qwert@example.com', '$2a$10$ZprA7N/fbmMRashIUmzeT.lsulkxbrO9DCaqNntOo/07ISNFKlVqW', '2026-04-02 13:54:08.307189+00', NULL, '', '2026-04-02 13:53:00.522054+00', '', NULL, '', '', NULL, '2026-04-02 13:54:08.314978+00', '{"provider": "email", "providers": ["email"]}', '{"sub": "c87a1291-bd5c-4183-b3c8-519c1b3ba485", "nick": "Qwert", "email": "qwert@example.com", "email_verified": true, "phone_verified": false}', NULL, '2026-04-02 13:53:00.51645+00', '2026-04-02 13:54:08.318939+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', '11dabc72-c7ce-40bc-a7dd-bedbb6e9b027', 'authenticated', 'authenticated', 'admin@example.com', '$2a$10$gFj2ZmkSxSJokLCLISPzouD61W44u0i.trMdoPTGWOmraGN7Kj4AC', '2026-04-02 13:26:59.798254+00', NULL, '', '2026-04-02 13:26:48.453235+00', '', NULL, '', '', NULL, '2026-04-02 13:56:31.386363+00', '{"provider": "email", "providers": ["email"]}', '{"sub": "11dabc72-c7ce-40bc-a7dd-bedbb6e9b027", "nick": "Admin", "email": "admin@example.com", "email_verified": true, "phone_verified": false}', NULL, '2026-04-02 13:26:48.444298+00', '2026-04-02 13:56:31.388551+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', '5a777c5a-ebde-436d-a682-ad1875d54dc3', 'authenticated', 'authenticated', 'asdf@example.com', '$2a$10$tCKFeJvhM4twmQqRwYl9OugGU4cOFZESjgQT2KtduCnHZAE378S4O', '2026-04-02 13:49:03.539739+00', NULL, '', '2026-04-02 13:44:17.601953+00', '', NULL, '', '', NULL, '2026-04-02 13:49:03.54438+00', '{"provider": "email", "providers": ["email"]}', '{"sub": "5a777c5a-ebde-436d-a682-ad1875d54dc3", "nick": "Asdf", "email": "asdf@example.com", "email_verified": true, "phone_verified": false}', NULL, '2026-04-02 13:44:17.596003+00', '2026-04-02 13:49:03.547185+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false);


--
-- Data for Name: identities; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."identities" ("provider_id", "user_id", "identity_data", "provider", "last_sign_in_at", "created_at", "updated_at", "id") VALUES
	('11dabc72-c7ce-40bc-a7dd-bedbb6e9b027', '11dabc72-c7ce-40bc-a7dd-bedbb6e9b027', '{"sub": "11dabc72-c7ce-40bc-a7dd-bedbb6e9b027", "nick": "Admin", "email": "admin@example.com", "email_verified": true, "phone_verified": false}', 'email', '2026-04-02 13:26:48.450544+00', '2026-04-02 13:26:48.450588+00', '2026-04-02 13:26:48.450588+00', '456a9789-db0c-4d4b-9654-444794cea1c0'),
	('5a777c5a-ebde-436d-a682-ad1875d54dc3', '5a777c5a-ebde-436d-a682-ad1875d54dc3', '{"sub": "5a777c5a-ebde-436d-a682-ad1875d54dc3", "nick": "Asdf", "email": "asdf@example.com", "email_verified": true, "phone_verified": false}', 'email', '2026-04-02 13:44:17.599898+00', '2026-04-02 13:44:17.599933+00', '2026-04-02 13:44:17.599933+00', '9c221393-8967-48c2-b72c-64ec753e7098'),
	('c87a1291-bd5c-4183-b3c8-519c1b3ba485', 'c87a1291-bd5c-4183-b3c8-519c1b3ba485', '{"sub": "c87a1291-bd5c-4183-b3c8-519c1b3ba485", "nick": "Qwert", "email": "qwert@example.com", "email_verified": true, "phone_verified": false}', 'email', '2026-04-02 13:53:00.520234+00', '2026-04-02 13:53:00.52026+00', '2026-04-02 13:53:00.52026+00', '29618c1e-9c43-43fe-a3b2-7c6bc30e17cc');


--
-- Data for Name: instances; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: oauth_clients; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sessions; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: mfa_amr_claims; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: mfa_factors; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: mfa_challenges; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: oauth_authorizations; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: oauth_client_states; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: oauth_consents; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: one_time_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: refresh_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sso_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: saml_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: saml_relay_states; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sso_domains; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: webauthn_challenges; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: webauthn_credentials; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: profiles; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."profiles" ("id", "email", "nick", "role", "approval_status", "created_at") VALUES
	('c87a1291-bd5c-4183-b3c8-519c1b3ba485', 'qwert@example.com', 'Qwert', 'user', 'pending', '2026-04-02 13:53:00.516233+00'),
	('11dabc72-c7ce-40bc-a7dd-bedbb6e9b027', 'admin@example.com', 'Admin', 'admin', 'approved', '2026-04-02 13:26:48.443971+00'),
	('5a777c5a-ebde-436d-a682-ad1875d54dc3', 'asdf@example.com', 'Asdf', 'user', 'approved', '2026-04-02 13:44:17.595741+00');


--
-- Data for Name: events; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: event_images; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: buckets; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: buckets_analytics; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: buckets_vectors; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: iceberg_namespaces; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: iceberg_tables; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: objects; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: s3_multipart_uploads; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: s3_multipart_uploads_parts; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: vector_indexes; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: hooks; Type: TABLE DATA; Schema: supabase_functions; Owner: supabase_functions_admin
--



--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE SET; Schema: auth; Owner: supabase_auth_admin
--

SELECT pg_catalog.setval('"auth"."refresh_tokens_id_seq"', 4, true);


--
-- Name: event_images_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."event_images_id_seq"', 1, false);


--
-- Name: hooks_id_seq; Type: SEQUENCE SET; Schema: supabase_functions; Owner: supabase_functions_admin
--

SELECT pg_catalog.setval('"supabase_functions"."hooks_id_seq"', 1, false);


--
-- PostgreSQL database dump complete
--

-- \unrestrict hUqexjuAeRVyDJB7Qv4voacQJafCluGsuKXiNxRUZSPuqO0OglYgHXTmS4jAhUD

RESET ALL;
