import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BlogFilters from "@/components/blog/BlogFilters";
import SEOHead from "@/components/blog/SEOHead";
import { BreadcrumbStructuredData } from "@/components/blog/StructuredData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, ArrowRight, Star } from "lucide-react";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

interface Post {
  id: string;
  title: string;
  excerpt: string | null;
  slug: string;
  image_url: string | null;
  thumbnail_url: string | null;
  created_at: string;
  read_time: string | null;
  featured: boolean;
  tags: string[] | null;
  category_id: string | null;
  categories: { name: string } | null;
  clinic_location_id: string | null;
  locations: { name: string } | null;
}

const POSTS_PER_PAGE = 10;

const Blog = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);
  const [filters, setFilters] = useState({
    search: '',
    category: null as string | null,
    location: null as string | null,
    tag: null as string | null,
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchPosts();

    // Subscribe to real-time updates
    const channel = supabase
      .channel('blog-posts-changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'posts',
        filter: 'status=eq.published'
      }, () => {
        fetchPosts();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [currentPage, filters]);

  const fetchPosts = async () => {
    try {
      setLoading(true);

      let query = (supabase as any)
        .from("posts")
        .select('*, categories(name), locations(name)', { count: "exact" })
        .eq("status", "published");

      // Apply filters
      if (filters.search) {
        query = query.or(`title.ilike.%${filters.search}%,excerpt.ilike.%${filters.search}%,content.ilike.%${filters.search}%`);
      }
      if (filters.category) {
        query = query.eq('category_id', filters.category);
      }
      if (filters.location) {
        query = query.eq('clinic_location_id', filters.location);
      }
      if (filters.tag) {
        query = query.contains('tags', [filters.tag]);
      }

      // Get total count first
      const { count } = await query;
      setTotalPosts(count || 0);

      // Get paginated posts with featured first
      const from = (currentPage - 1) * POSTS_PER_PAGE;
      const to = from + POSTS_PER_PAGE - 1;

      const { data, error } = await query
        .order("featured", { ascending: false })
        .order("created_at", { ascending: false })
        .range(from, to);

      if (error) throw error;
      setPosts(data || []);
    } catch (error) {
      console.error("Erro ao carregar posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("pt-BR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Blog - Dr. Luan Maciel | Odontologia Avançada"
        description="Fique por dentro das novidades, dicas e informações sobre estética dental, endodontia e tecnologias odontológicas."
        url={`${window.location.origin}/blog`}
      />
      <BreadcrumbStructuredData
        items={[
          { name: 'Início', url: window.location.origin },
          { name: 'Blog', url: `${window.location.origin}/blog` },
        ]}
      />
      <Header />
      <main className="pt-24 md:pt-32">
        <section className="py-12 md:py-20 px-4">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-12 md:mb-16 animate-fade-in">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 text-foreground font-kiona">
                Blog Dr. Luan Maciel
              </h1>
              <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
                Fique por dentro das novidades, dicas e informações sobre estética dental,
                endodontia e tecnologias odontológicas.
              </p>
            </div>

            <div className="grid lg:grid-cols-4 gap-8 mb-12">
              <aside className="lg:col-span-1">
                <BlogFilters onFilterChange={setFilters} />
              </aside>

              <div className="lg:col-span-3">
                {loading ? (
                  <div className="text-center py-20">
                    <div className="text-muted-foreground">Carregando posts...</div>
                  </div>
                ) : posts.length === 0 ? (
                  <div className="text-center py-20">
                    <div className="text-muted-foreground">Nenhum post encontrado.</div>
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                      {posts.map((post, index) => (
                        <Card 
                          key={post.id} 
                          className="hover-lift animate-fade-in cursor-pointer flex flex-col overflow-hidden group border-2 transition-all duration-300 hover:shadow-xl" 
                          style={{ animationDelay: `${index * 0.1}s` }}
                          onClick={() => navigate(`/blog/${post.slug}`)}
                        >
                          {(post.thumbnail_url || post.image_url) && (
                            <div className="relative h-48 overflow-hidden">
                              <img
                                src={post.thumbnail_url || post.image_url || ''}
                                alt={post.title}
                                width="400"
                                height="300"
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                loading="lazy"
                                decoding="async"
                              />
                              {post.featured && (
                                <Badge className="absolute top-3 right-3 bg-accent text-accent-foreground">
                                  <Star className="w-3 h-3 mr-1" />
                                  Destaque
                                </Badge>
                              )}
                            </div>
                          )}
                          <CardHeader className="pb-3">
                            <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2 flex-wrap">
                              <div className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                <time dateTime={post.created_at}>{formatDate(post.created_at)}</time>
                              </div>
                              {post.read_time && (
                                <div className="flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  <span>{post.read_time}</span>
                                </div>
                              )}
                            </div>
                            <CardTitle className="text-lg leading-tight group-hover:text-primary transition-colors line-clamp-2">
                              {post.title}
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="flex-1 flex flex-col justify-between gap-3">
                            <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                              {post.excerpt || "Leia mais sobre este assunto..."}
                            </p>
                            <div className="space-y-3">
                              {post.tags && post.tags.length > 0 && (
                                <div className="flex flex-wrap gap-1">
                                  {post.tags.slice(0, 3).map((tag, idx) => (
                                    <Badge key={idx} variant="outline" className="text-xs">
                                      {tag}
                                    </Badge>
                                  ))}
                                </div>
                              )}
                              <div className="flex items-center gap-2 text-sm font-medium text-primary group-hover:gap-3 transition-all">
                                <span>Ler artigo</span>
                                <ArrowRight className="w-4 h-4" />
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>

                    {totalPages > 1 && (
                      <div className="flex justify-center">
                        <Pagination>
                          <PaginationContent>
                            <PaginationItem>
                              <PaginationPrevious 
                                onClick={() => handlePageChange(currentPage - 1)}
                                className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                              />
                            </PaginationItem>
                            
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                              <PaginationItem key={page}>
                                <PaginationLink
                                  onClick={() => handlePageChange(page)}
                                  isActive={currentPage === page}
                                  className="cursor-pointer"
                                >
                                  {page}
                                </PaginationLink>
                              </PaginationItem>
                            ))}
                            
                            <PaginationItem>
                              <PaginationNext 
                                onClick={() => handlePageChange(currentPage + 1)}
                                className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                              />
                            </PaginationItem>
                          </PaginationContent>
                        </Pagination>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
