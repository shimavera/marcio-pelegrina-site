import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/blog/ScrollProgress";
import SEOHead from "@/components/blog/SEOHead";
import { ArticleStructuredData, BreadcrumbStructuredData } from "@/components/blog/StructuredData";
import LocalBusinessSchema from "@/components/blog/LocalBusinessSchema";
import FAQSchema from "@/components/blog/FAQSchema";
import ReviewSchema from "@/components/blog/ReviewSchema";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, Clock, Share2, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { trackWorkingLead } from "@/lib/utils";

interface Post {
  id: string;
  title: string;
  content: string;
  excerpt: string | null;
  image_url: string | null;
  created_at: string;
  updated_at: string;
  slug: string;
  meta_title: string | null;
  meta_description: string | null;
  author: string | null;
  read_time: string | null;
  tags: string[] | null;
  cta_text: string | null;
  cta_url: string | null;
  published_at: string | null;
  category_id: string | null;
  categories: { name: string; slug: string } | null;
  clinic_location_id: string | null;
  locations: { name: string; slug: string } | null;
}

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [post, setPost] = useState<Post | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) return;

      const { data, error } = await (supabase as any)
        .from("posts")
        .select("*, categories(name, slug), locations(name, slug)")
        .eq("slug", slug)
        .eq("status", "published")
        .maybeSingle();

      if (error) {
        console.error("Error fetching post:", error);
        setLoading(false);
        return;
      }

      if (!data) {
        navigate("/404");
        return;
      }

      setPost(data);
      setLoading(false);

      // Track view after 3 seconds (engaged read)
      const viewTimer = setTimeout(() => {
        trackView(data.id);
      }, 3000);

      // Fetch related posts
      fetchRelatedPosts(data.id, data.category_id);

      return () => clearTimeout(viewTimer);
    };

    fetchPost();
  }, [slug, navigate]);

  const trackView = (postId: string) => {
    const viewedKey = `post_viewed_${postId}`;
    if (sessionStorage.getItem(viewedKey)) return;
    
    sessionStorage.setItem(viewedKey, 'true');
    console.log('View tracked for post:', postId);
  };

  const fetchRelatedPosts = async (currentPostId: string, categoryId: string | null) => {
    let query = (supabase as any)
      .from("posts")
      .select("id, title, slug, excerpt, thumbnail_url, image_url")
      .eq("status", "published")
      .neq("id", currentPostId)
      .limit(3);

    if (categoryId) {
      query = query.eq("category_id", categoryId);
    }

    const { data } = await query;
    if (data) setRelatedPosts(data);
  };

  const handleShare = async () => {
    const shareData = {
      title: post?.title || '',
      text: post?.excerpt || '',
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      // Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(window.location.href);
        toast({
          title: "Link copiado!",
          description: "O link foi copiado para sua área de transferência.",
        });
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-16">
          <div className="flex items-center justify-center">
            <p className="text-lg">Carregando...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!post) {
    return null;
  }

  const postUrl = `${window.location.origin}/blog/${post.slug}`;
  const seoTitle = post.meta_title || post.title;
  const seoDescription = post.meta_description || post.excerpt || '';
  const seoImage = post.image_url || `${window.location.origin}/dr-luan-maciel-logo.webp`;

  // Use FAQs and Reviews from database if available, otherwise use samples
  const postFAQs = (post as any).faqs && (post as any).faqs.length > 0 
    ? (post as any).faqs 
    : [];
  
  const postReviews = (post as any).reviews && (post as any).reviews.length > 0
    ? (post as any).reviews
    : [];

  const aggregateRating = {
    value: (post as any).aggregate_rating_value || 4.9,
    count: (post as any).aggregate_rating_count || 127,
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={seoTitle}
        description={seoDescription}
        image={seoImage}
        url={postUrl}
        type="article"
        author={post.author || 'Dr. Yuri Julio'}
        publishedTime={post.published_at || post.created_at}
        tags={post.tags || []}
      />
      <ArticleStructuredData
        headline={post.title}
        description={seoDescription}
        image={seoImage}
        datePublished={post.published_at || post.created_at}
        author={post.author || 'Dr. Yuri Julio'}
        url={postUrl}
      />
      <BreadcrumbStructuredData
        items={[
          { name: 'Início', url: window.location.origin },
          { name: 'Blog', url: `${window.location.origin}/blog` },
          { name: post.title, url: postUrl },
        ]}
      />
      {post.locations && (
        <LocalBusinessSchema
          location={{
            name: post.locations.name,
            address: 'R. Emília Marengo, 1040 - Jardim Anália Franco',
            city: 'São Paulo',
            state: 'SP',
            postalCode: '03336-000',
            telephone: '(11) 98338-5832',
            geo_lat: -23.5553,
            geo_lng: -46.5606,
            areaServed: ['Jardim Anália Franco', 'Tatuapé', 'Vila Formosa'],
          }}
          rating={{
            value: 4.9,
            count: 127,
          }}
        />
      )}
      <ScrollProgress />
      <Header />
      <main className="container mx-auto px-4 pt-24 md:pt-32 pb-16">
        <div className="max-w-4xl mx-auto">
          <Button
            variant="ghost"
            onClick={() => navigate("/blog")}
            className="mb-6 md:mb-8 gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar para o Blog
          </Button>

          <article>
            {post.image_url && (
              <div className="mb-8 rounded-2xl overflow-hidden shadow-lg">
                <img
                  src={post.image_url}
                  alt={post.title}
                  className="w-full h-auto object-cover"
                  loading="eager"
                />
              </div>
            )}

            <div className="mb-6 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                <time dateTime={post.created_at}>
                  {formatDate(post.created_at)}
                </time>
              </div>
              
              {post.read_time && (
                <>
                  <span>•</span>
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-4 w-4" />
                    <span>{post.read_time}</span>
                  </div>
                </>
              )}

              {post.author && (
                <>
                  <span>•</span>
                  <span>{post.author}</span>
                </>
              )}

              {post.categories && (
                <>
                  <span>•</span>
                  <Badge variant="secondary">{post.categories.name}</Badge>
                </>
              )}

              {post.locations && (
                <>
                  <span>•</span>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {post.locations.name}
                  </Badge>
                </>
              )}

              <Button
                variant="ghost"
                size="sm"
                onClick={handleShare}
                className="ml-auto px-2 sm:px-3"
              >
                <Share2 className="h-4 w-4 sm:mr-2" />
                <span className="hidden sm:inline">Compartilhar</span>
              </Button>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 font-kiona text-foreground">
              {post.title}
            </h1>

            {post.excerpt && (
              <p className="text-lg md:text-xl text-muted-foreground mb-6 md:mb-8 leading-relaxed border-l-4 border-primary pl-4">
                {post.excerpt}
              </p>
            )}

            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8">
                {post.tags.map((tag, idx) => (
                  <Badge key={idx} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}

            <div className="max-w-none text-base leading-7 md:text-lg md:leading-8 space-y-4 text-foreground/90
                         prose prose-lg max-w-none
                         [&_p]:mb-4
                         [&_h1]:mt-8 [&_h1]:mb-4 [&_h1]:text-3xl md:[&_h1]:text-4xl [&_h1]:font-bold [&_h1]:text-foreground
                         [&_h2]:mt-8 [&_h2]:mb-3 [&_h2]:text-2xl md:[&_h2]:text-3xl [&_h2]:font-semibold [&_h2]:text-foreground
                         [&_h3]:mt-6 [&_h3]:mb-2 [&_h3]:text-xl md:[&_h3]:text-2xl [&_h3]:text-foreground
                         [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:my-4
                         [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:my-4
                         [&_li]:my-2
                         [&_img]:rounded-lg [&_img]:my-6 [&_img]:shadow-lg
                         [&_a]:text-primary [&_a]:underline [&_a]:hover:text-primary/80
                         [&_strong]:font-semibold [&_strong]:text-foreground
                         [&_em]:italic
                         [&_blockquote]:border-l-4 [&_blockquote]:border-primary [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:my-4
                         [&_code]:bg-muted [&_code]:px-1 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-sm
                         [&_pre]:bg-muted [&_pre]:p-4 [&_pre]:rounded-lg [&_pre]:overflow-x-auto [&_pre]:my-4
                         [&_table]:border-collapse [&_table]:w-full [&_table]:my-6
                         [&_th]:border [&_th]:border-border [&_th]:px-4 [&_th]:py-2 [&_th]:bg-muted [&_th]:font-semibold
                         [&_td]:border [&_td]:border-border [&_td]:px-4 [&_td]:py-2"
            >
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {post.content}
              </ReactMarkdown>
            </div>

            {post.cta_text && post.cta_url && (
              <Card className="mt-12 p-6 md:p-8 bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
                <div className="text-center space-y-4">
                  <h3 className="text-xl md:text-2xl font-semibold text-foreground">
                    {post.cta_text}
                  </h3>
                  <Button asChild size="lg" className="hover-lift shadow-blue">
                    <a href={post.cta_url} target="_blank" rel="noopener noreferrer" onClick={trackWorkingLead}>
                      Agendar Consulta
                    </a>
                  </Button>
                </div>
              </Card>
            )}

            {postFAQs.length > 0 && <FAQSchema faqs={postFAQs} />}

            {postReviews.length > 0 && (
              <ReviewSchema
                reviews={postReviews}
                aggregateRating={aggregateRating}
                itemName={`Tratamento - ${post.title}`}
              />
            )}

            {relatedPosts.length > 0 && (
              <section className="mt-16 pt-8 border-t border-border">
                <h2 className="text-2xl font-bold mb-6 text-foreground font-kiona">
                  Artigos Relacionados
                </h2>
                <div className="grid md:grid-cols-3 gap-6">
                  {relatedPosts.map((relatedPost) => (
                    <Card
                      key={relatedPost.id}
                      className="hover-lift cursor-pointer group"
                      onClick={() => navigate(`/blog/${relatedPost.slug}`)}
                    >
                      {(relatedPost.thumbnail_url || relatedPost.image_url) && (
                        <div className="h-40 overflow-hidden">
                          <img
                            src={relatedPost.thumbnail_url || relatedPost.image_url}
                            alt={relatedPost.title}
                            className="w-full h-full object-cover transition-transform group-hover:scale-110"
                            loading="lazy"
                          />
                        </div>
                      )}
                      <div className="p-4">
                        <h3 className="font-semibold text-sm line-clamp-2 group-hover:text-primary transition-colors">
                          {relatedPost.title}
                        </h3>
                        {relatedPost.excerpt && (
                          <p className="text-xs text-muted-foreground mt-2 line-clamp-2">
                            {relatedPost.excerpt}
                          </p>
                        )}
                      </div>
                    </Card>
                  ))}
                </div>
              </section>
            )}
          </article>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPost;
