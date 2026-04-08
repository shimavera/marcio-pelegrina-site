import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';

interface PostNavigationProps {
  currentPostId: string;
  currentPostDate: string;
}

const PostNavigation = ({ currentPostId, currentPostDate }: PostNavigationProps) => {
  const [prevPost, setPrevPost] = useState<any>(null);
  const [nextPost, setNextPost] = useState<any>(null);

  useEffect(() => {
    fetchNavigationPosts();
  }, [currentPostId, currentPostDate]);

  const fetchNavigationPosts = async () => {
    // Fetch previous post
    const { data: prevData } = await (supabase as any)
      .from('posts')
      .select('id, title, slug')
      .eq('status', 'published')
      .lt('created_at', currentPostDate)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();
    
    if (prevData) setPrevPost(prevData);

    // Fetch next post
    const { data: nextData } = await (supabase as any)
      .from('posts')
      .select('id, title, slug')
      .eq('status', 'published')
      .gt('created_at', currentPostDate)
      .order('created_at', { ascending: true })
      .limit(1)
      .single();
    
    if (nextData) setNextPost(nextData);
  };

  if (!prevPost && !nextPost) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-12 pt-8 border-t border-border">
      {prevPost ? (
        <Button
          variant="outline"
          asChild
          className="h-auto py-4 px-6 justify-start"
        >
          <Link to={`/blog/${prevPost.slug}`}>
            <ChevronLeft className="w-5 h-5 mr-2 flex-shrink-0" />
            <div className="text-left">
              <div className="text-xs text-muted-foreground mb-1">Anterior</div>
              <div className="font-medium line-clamp-2">{prevPost.title}</div>
            </div>
          </Link>
        </Button>
      ) : (
        <div />
      )}

      {nextPost && (
        <Button
          variant="outline"
          asChild
          className="h-auto py-4 px-6 justify-end"
        >
          <Link to={`/blog/${nextPost.slug}`}>
            <div className="text-right">
              <div className="text-xs text-muted-foreground mb-1">Próximo</div>
              <div className="font-medium line-clamp-2">{nextPost.title}</div>
            </div>
            <ChevronRight className="w-5 h-5 ml-2 flex-shrink-0" />
          </Link>
        </Button>
      )}
    </div>
  );
};

export default PostNavigation;
