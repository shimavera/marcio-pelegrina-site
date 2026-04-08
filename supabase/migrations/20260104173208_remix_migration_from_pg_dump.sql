CREATE EXTENSION IF NOT EXISTS "pg_cron";
CREATE EXTENSION IF NOT EXISTS "pg_graphql";
CREATE EXTENSION IF NOT EXISTS "pg_net";
CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";
CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";
CREATE EXTENSION IF NOT EXISTS "plpgsql";
CREATE EXTENSION IF NOT EXISTS "supabase_vault";
CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";
BEGIN;

--
-- PostgreSQL database dump
--


-- Dumped from database version 17.6
-- Dumped by pg_dump version 18.1

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
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--



--
-- Name: app_role; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.app_role AS ENUM (
    'admin',
    'moderator',
    'user'
);


--
-- Name: has_role(uuid, public.app_role); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.has_role(_user_id uuid, _role public.app_role) RETURNS boolean
    LANGUAGE sql STABLE SECURITY DEFINER
    SET search_path TO 'public'
    AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;


--
-- Name: update_updated_at_column(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.update_updated_at_column() RETURNS trigger
    LANGUAGE plpgsql
    SET search_path TO 'public'
    AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;


SET default_table_access_method = heap;

--
-- Name: categories; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.categories (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name text NOT NULL,
    slug text NOT NULL,
    description text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: image_analytics; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.image_analytics (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    image_url text NOT NULL,
    format text NOT NULL,
    width integer,
    height integer,
    load_time_ms integer,
    file_size_bytes integer,
    original_size_bytes integer,
    bandwidth_saved_bytes integer,
    device_type text,
    viewport_width integer,
    viewport_height integer,
    connection_type text,
    page_url text,
    user_agent text,
    session_id text
);


--
-- Name: image_analytics_summary; Type: VIEW; Schema: public; Owner: -
--

CREATE VIEW public.image_analytics_summary AS
 SELECT date(created_at) AS date,
    format,
    device_type,
    count(*) AS total_loads,
    avg(load_time_ms) AS avg_load_time_ms,
    sum(bandwidth_saved_bytes) AS total_bandwidth_saved_bytes,
    avg(bandwidth_saved_bytes) AS avg_bandwidth_saved_bytes,
    percentile_cont((0.5)::double precision) WITHIN GROUP (ORDER BY ((load_time_ms)::double precision)) AS median_load_time_ms,
    percentile_cont((0.95)::double precision) WITHIN GROUP (ORDER BY ((load_time_ms)::double precision)) AS p95_load_time_ms
   FROM public.image_analytics
  GROUP BY (date(created_at)), format, device_type;


--
-- Name: locations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.locations (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name text NOT NULL,
    city text NOT NULL,
    state text NOT NULL,
    slug text NOT NULL,
    address text,
    telephone text,
    url text,
    geo_lat numeric,
    geo_lng numeric,
    maps_iframe text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: posts; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.posts (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    title text NOT NULL,
    content text NOT NULL,
    slug text NOT NULL,
    status text DEFAULT 'draft'::text NOT NULL,
    image_url text,
    excerpt text,
    author_id uuid,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    thumbnail_url text,
    meta_title text,
    meta_description text,
    author text DEFAULT 'Dr. Yuri Julio'::text,
    read_time text,
    featured boolean DEFAULT false,
    tags text[],
    category_id uuid,
    clinic_location_id uuid,
    geo_lat numeric,
    geo_lng numeric,
    cta_text text DEFAULT 'Agende sua avaliação com o Dr. Yuri Julio'::text,
    cta_url text DEFAULT 'https://wa.me/5511911852982'::text,
    internal_notes text,
    published_at timestamp with time zone,
    views integer DEFAULT 0,
    faqs jsonb,
    reviews jsonb,
    aggregate_rating_value numeric(2,1),
    aggregate_rating_count integer,
    scheduled_at timestamp with time zone,
    CONSTRAINT posts_status_check CHECK ((status = ANY (ARRAY['draft'::text, 'published'::text])))
);

ALTER TABLE ONLY public.posts REPLICA IDENTITY FULL;


--
-- Name: related_posts; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.related_posts (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    post_id uuid NOT NULL,
    related_post_id uuid NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: treatments; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.treatments (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    slug text NOT NULL,
    title text NOT NULL,
    short_description text NOT NULL,
    full_description text NOT NULL,
    icon_name text NOT NULL,
    image_url text,
    benefits text[],
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    display_order integer
);


--
-- Name: user_roles; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.user_roles (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid NOT NULL,
    role public.app_role NOT NULL,
    created_at timestamp with time zone DEFAULT now()
);


--
-- Name: web_vitals_analytics; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.web_vitals_analytics (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    metric_name text NOT NULL,
    metric_value numeric NOT NULL,
    metric_rating text NOT NULL,
    device_type text,
    viewport_width integer,
    viewport_height integer,
    connection_type text,
    page_url text NOT NULL,
    page_type text,
    user_agent text,
    session_id text
);


--
-- Name: web_vitals_summary; Type: VIEW; Schema: public; Owner: -
--

CREATE VIEW public.web_vitals_summary AS
 SELECT date(created_at) AS date,
    metric_name,
    device_type,
    page_type,
    count(*) AS total_measurements,
    avg(metric_value) AS avg_value,
    percentile_cont((0.5)::double precision) WITHIN GROUP (ORDER BY ((metric_value)::double precision)) AS median_value,
    percentile_cont((0.75)::double precision) WITHIN GROUP (ORDER BY ((metric_value)::double precision)) AS p75_value,
    percentile_cont((0.95)::double precision) WITHIN GROUP (ORDER BY ((metric_value)::double precision)) AS p95_value,
    count(
        CASE
            WHEN (metric_rating = 'good'::text) THEN 1
            ELSE NULL::integer
        END) AS good_count,
    count(
        CASE
            WHEN (metric_rating = 'needs-improvement'::text) THEN 1
            ELSE NULL::integer
        END) AS needs_improvement_count,
    count(
        CASE
            WHEN (metric_rating = 'poor'::text) THEN 1
            ELSE NULL::integer
        END) AS poor_count
   FROM public.web_vitals_analytics
  GROUP BY (date(created_at)), metric_name, device_type, page_type;


--
-- Name: categories categories_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id);


--
-- Name: categories categories_slug_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_slug_key UNIQUE (slug);


--
-- Name: image_analytics image_analytics_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.image_analytics
    ADD CONSTRAINT image_analytics_pkey PRIMARY KEY (id);


--
-- Name: locations locations_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.locations
    ADD CONSTRAINT locations_pkey PRIMARY KEY (id);


--
-- Name: locations locations_slug_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.locations
    ADD CONSTRAINT locations_slug_key UNIQUE (slug);


--
-- Name: posts posts_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_pkey PRIMARY KEY (id);


--
-- Name: posts posts_slug_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_slug_key UNIQUE (slug);


--
-- Name: related_posts related_posts_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.related_posts
    ADD CONSTRAINT related_posts_pkey PRIMARY KEY (id);


--
-- Name: related_posts related_posts_post_id_related_post_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.related_posts
    ADD CONSTRAINT related_posts_post_id_related_post_id_key UNIQUE (post_id, related_post_id);


--
-- Name: treatments treatments_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.treatments
    ADD CONSTRAINT treatments_pkey PRIMARY KEY (id);


--
-- Name: treatments treatments_slug_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.treatments
    ADD CONSTRAINT treatments_slug_key UNIQUE (slug);


--
-- Name: user_roles user_roles_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT user_roles_pkey PRIMARY KEY (id);


--
-- Name: user_roles user_roles_user_id_role_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT user_roles_user_id_role_key UNIQUE (user_id, role);


--
-- Name: web_vitals_analytics web_vitals_analytics_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.web_vitals_analytics
    ADD CONSTRAINT web_vitals_analytics_pkey PRIMARY KEY (id);


--
-- Name: idx_image_analytics_created_at; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_image_analytics_created_at ON public.image_analytics USING btree (created_at DESC);


--
-- Name: idx_image_analytics_device_type; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_image_analytics_device_type ON public.image_analytics USING btree (device_type);


--
-- Name: idx_image_analytics_format; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_image_analytics_format ON public.image_analytics USING btree (format);


--
-- Name: idx_image_analytics_page_url; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_image_analytics_page_url ON public.image_analytics USING btree (page_url);


--
-- Name: idx_posts_scheduled_at; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_posts_scheduled_at ON public.posts USING btree (scheduled_at) WHERE ((scheduled_at IS NOT NULL) AND (status = 'draft'::text));


--
-- Name: idx_web_vitals_created_at; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_web_vitals_created_at ON public.web_vitals_analytics USING btree (created_at DESC);


--
-- Name: idx_web_vitals_device_type; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_web_vitals_device_type ON public.web_vitals_analytics USING btree (device_type);


--
-- Name: idx_web_vitals_metric_name; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_web_vitals_metric_name ON public.web_vitals_analytics USING btree (metric_name);


--
-- Name: idx_web_vitals_page_url; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_web_vitals_page_url ON public.web_vitals_analytics USING btree (page_url);


--
-- Name: categories update_categories_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON public.categories FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: locations update_locations_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER update_locations_updated_at BEFORE UPDATE ON public.locations FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: posts update_posts_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER update_posts_updated_at BEFORE UPDATE ON public.posts FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: treatments update_treatments_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER update_treatments_updated_at BEFORE UPDATE ON public.treatments FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: posts posts_author_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_author_id_fkey FOREIGN KEY (author_id) REFERENCES auth.users(id) ON DELETE SET NULL;


--
-- Name: posts posts_category_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.categories(id);


--
-- Name: posts posts_clinic_location_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_clinic_location_id_fkey FOREIGN KEY (clinic_location_id) REFERENCES public.locations(id);


--
-- Name: related_posts related_posts_post_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.related_posts
    ADD CONSTRAINT related_posts_post_id_fkey FOREIGN KEY (post_id) REFERENCES public.posts(id) ON DELETE CASCADE;


--
-- Name: related_posts related_posts_related_post_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.related_posts
    ADD CONSTRAINT related_posts_related_post_id_fkey FOREIGN KEY (related_post_id) REFERENCES public.posts(id) ON DELETE CASCADE;


--
-- Name: user_roles user_roles_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT user_roles_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: posts Admins can create posts; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Admins can create posts" ON public.posts FOR INSERT WITH CHECK (public.has_role(auth.uid(), 'admin'::public.app_role));


--
-- Name: categories Admins can delete categories; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Admins can delete categories" ON public.categories FOR DELETE USING (public.has_role(auth.uid(), 'admin'::public.app_role));


--
-- Name: locations Admins can delete locations; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Admins can delete locations" ON public.locations FOR DELETE USING (public.has_role(auth.uid(), 'admin'::public.app_role));


--
-- Name: posts Admins can delete posts; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Admins can delete posts" ON public.posts FOR DELETE USING (public.has_role(auth.uid(), 'admin'::public.app_role));


--
-- Name: related_posts Admins can delete related posts; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Admins can delete related posts" ON public.related_posts FOR DELETE USING (public.has_role(auth.uid(), 'admin'::public.app_role));


--
-- Name: user_roles Admins can delete roles; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Admins can delete roles" ON public.user_roles FOR DELETE USING (public.has_role(auth.uid(), 'admin'::public.app_role));


--
-- Name: categories Admins can insert categories; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Admins can insert categories" ON public.categories FOR INSERT WITH CHECK (public.has_role(auth.uid(), 'admin'::public.app_role));


--
-- Name: locations Admins can insert locations; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Admins can insert locations" ON public.locations FOR INSERT WITH CHECK (public.has_role(auth.uid(), 'admin'::public.app_role));


--
-- Name: related_posts Admins can insert related posts; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Admins can insert related posts" ON public.related_posts FOR INSERT WITH CHECK (public.has_role(auth.uid(), 'admin'::public.app_role));


--
-- Name: user_roles Admins can insert roles; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Admins can insert roles" ON public.user_roles FOR INSERT WITH CHECK (public.has_role(auth.uid(), 'admin'::public.app_role));


--
-- Name: categories Admins can update categories; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Admins can update categories" ON public.categories FOR UPDATE USING (public.has_role(auth.uid(), 'admin'::public.app_role));


--
-- Name: locations Admins can update locations; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Admins can update locations" ON public.locations FOR UPDATE USING (public.has_role(auth.uid(), 'admin'::public.app_role));


--
-- Name: posts Admins can update posts; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Admins can update posts" ON public.posts FOR UPDATE USING (public.has_role(auth.uid(), 'admin'::public.app_role));


--
-- Name: image_analytics Admins can view all image analytics; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Admins can view all image analytics" ON public.image_analytics FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'::public.app_role));


--
-- Name: user_roles Admins can view all roles; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Admins can view all roles" ON public.user_roles FOR SELECT USING (public.has_role(auth.uid(), 'admin'::public.app_role));


--
-- Name: web_vitals_analytics Admins can view all web vitals; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Admins can view all web vitals" ON public.web_vitals_analytics FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'::public.app_role));


--
-- Name: image_analytics Anyone can insert image analytics; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Anyone can insert image analytics" ON public.image_analytics FOR INSERT WITH CHECK (true);


--
-- Name: web_vitals_analytics Anyone can insert web vitals; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Anyone can insert web vitals" ON public.web_vitals_analytics FOR INSERT WITH CHECK (true);


--
-- Name: posts Authenticated users can view all posts; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Authenticated users can view all posts" ON public.posts FOR SELECT TO authenticated USING (true);


--
-- Name: categories Categories are viewable by everyone; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Categories are viewable by everyone" ON public.categories FOR SELECT USING (true);


--
-- Name: locations Locations are viewable by everyone; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Locations are viewable by everyone" ON public.locations FOR SELECT USING (true);


--
-- Name: posts Published posts are viewable by everyone; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Published posts are viewable by everyone" ON public.posts FOR SELECT USING ((status = 'published'::text));


--
-- Name: related_posts Related posts are viewable by everyone; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Related posts are viewable by everyone" ON public.related_posts FOR SELECT USING (true);


--
-- Name: treatments Treatments are viewable by everyone; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Treatments are viewable by everyone" ON public.treatments FOR SELECT USING (true);


--
-- Name: user_roles Users can view their own roles; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can view their own roles" ON public.user_roles FOR SELECT USING ((auth.uid() = user_id));


--
-- Name: categories; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;

--
-- Name: image_analytics; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.image_analytics ENABLE ROW LEVEL SECURITY;

--
-- Name: locations; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.locations ENABLE ROW LEVEL SECURITY;

--
-- Name: posts; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;

--
-- Name: related_posts; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.related_posts ENABLE ROW LEVEL SECURITY;

--
-- Name: treatments; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.treatments ENABLE ROW LEVEL SECURITY;

--
-- Name: user_roles; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

--
-- Name: web_vitals_analytics; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.web_vitals_analytics ENABLE ROW LEVEL SECURITY;

--
-- PostgreSQL database dump complete
--




COMMIT;