-- Drop the restrictive SELECT policies and create a permissive one for all posts
DROP POLICY IF EXISTS "Authenticated users can view all posts" ON public.posts;
DROP POLICY IF EXISTS "Published posts are viewable by everyone" ON public.posts;

-- Create a single permissive policy that allows everyone to view all posts
-- This is needed for the admin panel to work without authentication
CREATE POLICY "Anyone can view all posts" 
ON public.posts 
FOR SELECT 
USING (true);