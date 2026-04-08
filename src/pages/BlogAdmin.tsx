import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Pencil, Trash2, Plus, LogOut, Eye, FileText, RefreshCw, CalendarIcon, X, Clock } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
// Logo removed - using text instead
import BlogAdminTabs from "@/components/blog/BlogAdminTabs";
import ContentGapAnalysis from "@/components/blog/ContentGapAnalysis";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Post {
  id: string;
  title: string;
  content: string;
  slug: string;
  status: string;
  image_url: string | null;
  thumbnail_url: string | null;
  excerpt: string | null;
  created_at: string;
  updated_at: string;
  featured: boolean;
  tags: string[] | null;
  category_id: string | null;
  clinic_location_id: string | null;
}

const BlogAdmin = () => {
  // Blog administration panel with GEO optimization
  const [posts, setPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [locations, setLocations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [deletePostId, setDeletePostId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    slug: "",
    excerpt: "",
    image_url: "",
    thumbnail_url: "",
    status: "draft",
    meta_title: "",
    meta_description: "",
    tags: [] as string[],
    category_id: null as string | null,
    clinic_location_id: null as string | null,
    geo_lat: "-23.577643",
    geo_lng: "-46.677572",
    cta_text: "Agende sua avaliação com o Dr. Márcio Pelegrina",
    cta_url: "#",
    read_time: "",
    featured: false,
    internal_notes: "",
    faqs: [] as Array<{ question: string; answer: string }>,
    reviews: [] as Array<{ author: string; rating: number; date: string; text: string }>,
    aggregate_rating_value: "",
    aggregate_rating_count: "",
    scheduled_at: null as Date | null,
  });
  const [uploadingImage, setUploadingImage] = useState(false);
  const [migratingPosts, setMigratingPosts] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedMonth, setSelectedMonth] = useState<string>("all");
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: undefined,
    to: undefined,
  });
  const [tempDateRange, setTempDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: undefined,
    to: undefined,
  });
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [showScheduleDialog, setShowScheduleDialog] = useState(false);
  const [scheduledDate, setScheduledDate] = useState<Date | undefined>(undefined);
  const [scheduledTime, setScheduledTime] = useState<string>("12:00");
  const navigate = useNavigate();
  const { toast } = useToast();

  const POSTS_PER_PAGE = 10;

  useEffect(() => {
    // Check PIN authentication
    const authenticated = sessionStorage.getItem("admin_authenticated");
    if (authenticated !== "true") {
      navigate("/auth");
      return;
    }
    setIsAuthenticated(true);
    fetchPosts();
    fetchCategoriesAndLocations();
  }, [navigate]);

  const fetchCategoriesAndLocations = async () => {
    const { data: categoriesData } = await (supabase as any)
      .from('categories')
      .select('*')
      .order('name');
    if (categoriesData) setCategories(categoriesData);

    const { data: locationsData } = await (supabase as any)
      .from('locations')
      .select('*')
      .order('name');
    if (locationsData) setLocations(locationsData);
  };

  const fetchPosts = async () => {
    try {
      const { data, error } = await (supabase as any)
        .from("posts")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setPosts(data || []);
    } catch (error: any) {
      toast({
        title: "Erro ao carregar posts",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("admin_authenticated");
    navigate("/auth");
  };

  const handleMigratePosts = async () => {
    setMigratingPosts(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('migrate-posts-to-markdown');
      
      if (error) throw error;
      
      toast({
        title: "Migração concluída",
        description: `${data.success} posts convertidos com sucesso. ${data.skipped} posts já estavam em Markdown.`,
      });
      
      // Refresh posts list
      await fetchPosts();
    } catch (error: any) {
      toast({
        title: "Erro na migração",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setMigratingPosts(false);
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const handleCreateFromGap = (postData: {
    title: string;
    category: string;
    content: string;
    excerpt: string;
    meta_title: string;
    meta_description: string;
    tags: string[];
    read_time: string;
    faqs: Array<{ question: string; answer: string }>;
    reviews: Array<{ author: string; rating: number; date: string; text: string }>;
  }) => {
    console.log('🔍 Procurando categoria:', postData.category);
    console.log('📚 Categorias disponíveis:', categories.map(c => c.name));
    
    // Find category by exact name match first, then flexible matching
    let categoryObj = categories.find(c => 
      c.name.toLowerCase().trim() === postData.category.toLowerCase().trim()
    );
    
    // If no exact match, try flexible matching
    if (!categoryObj) {
      categoryObj = categories.find(c => {
        const categoryName = c.name.toLowerCase().trim();
        const searchName = postData.category.toLowerCase().trim();
        return categoryName.includes(searchName) || 
               searchName.includes(categoryName);
      });
    }

    console.log('✅ Categoria encontrada:', categoryObj);

    // Get default location (first location - Clínica Dr. Luan Maciel)
    const defaultLocation = locations.length > 0 ? locations[0] : null;
    console.log('📍 Localização padrão:', defaultLocation);

    // Calculate aggregate rating
    const totalRating = postData.reviews.reduce((sum, r) => sum + r.rating, 0);
    const avgRating = postData.reviews.length > 0 
      ? (totalRating / postData.reviews.length).toFixed(1) 
      : "5.0";

    setFormData({
      ...formData,
      title: postData.title,
      slug: generateSlug(postData.title),
      category_id: categoryObj?.id || null,
      clinic_location_id: defaultLocation?.id || null,
      geo_lat: defaultLocation?.geo_lat?.toString() || "-23.5637",
      geo_lng: defaultLocation?.geo_lng?.toString() || "-46.5547",
      content: postData.content,
      excerpt: postData.excerpt,
      meta_title: postData.meta_title,
      meta_description: postData.meta_description,
      tags: postData.tags,
      read_time: postData.read_time,
      faqs: postData.faqs,
      reviews: postData.reviews,
      aggregate_rating_value: avgRating,
      aggregate_rating_count: postData.reviews.length.toString(),
    });
    
    const messages: string[] = [];
    
    if (categoryObj) {
      messages.push(`Categoria: ${categoryObj.name}`);
    }
    
    if (defaultLocation) {
      messages.push(`Localização: ${defaultLocation.name}`);
    }
    
    if (messages.length > 0) {
      toast({
        title: "Campos preenchidos automaticamente",
        description: messages.join(' • '),
      });
    }
    
    if (!categoryObj) {
      toast({
        title: "Categoria não encontrada",
        description: `Não foi possível encontrar a categoria "${postData.category}". Selecione manualmente.`,
        variant: "destructive",
      });
    }
    
    setShowForm(true);
    setEditingPost(null);
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isAuthenticated) return;

    try {
      const slug = formData.slug || generateSlug(formData.title);
      // Keep content as Markdown - no HTML conversion
      let content = formData.content;
      
      // Auto-calculate read time if not provided
      if (!formData.read_time) {
        const wordCount = content.split(/\s+/).length;
        const readTime = Math.ceil(wordCount / 200); // Average reading speed
        formData.read_time = `${readTime} min de leitura`;
      }
      
      const postData = {
        title: formData.title,
        content: content, // Store as Markdown
        slug,
        excerpt: formData.excerpt || null,
        image_url: formData.image_url || null,
        thumbnail_url: formData.thumbnail_url || null,
        status: formData.status,
        meta_title: formData.meta_title || null,
        meta_description: formData.meta_description || null,
        tags: formData.tags.length > 0 ? formData.tags : null,
        category_id: formData.category_id || null,
        clinic_location_id: formData.clinic_location_id || null,
        geo_lat: formData.geo_lat ? parseFloat(formData.geo_lat) : null,
        geo_lng: formData.geo_lng ? parseFloat(formData.geo_lng) : null,
        cta_text: formData.cta_text || null,
        cta_url: formData.cta_url || null,
        read_time: formData.read_time || null,
        featured: formData.featured,
        internal_notes: formData.internal_notes || null,
        faqs: formData.faqs && formData.faqs.length > 0 ? formData.faqs : null,
        reviews: formData.reviews && formData.reviews.length > 0 ? formData.reviews : null,
        aggregate_rating_value: formData.aggregate_rating_value ? parseFloat(formData.aggregate_rating_value) : null,
        aggregate_rating_count: formData.aggregate_rating_count ? parseInt(formData.aggregate_rating_count) : null,
        published_at: formData.status === 'published' && !editingPost ? new Date().toISOString() : (editingPost?.status === 'draft' && formData.status === 'published' ? new Date().toISOString() : undefined),
        scheduled_at: formData.scheduled_at ? formData.scheduled_at.toISOString() : null,
      };
      
      // Use edge function to bypass RLS
      const { data, error } = await supabase.functions.invoke('manage-post', {
        body: {
          action: editingPost ? 'update' : 'create',
          postId: editingPost?.id,
          postData,
        },
      });

      if (error) throw error;
      if (data.error) throw new Error(data.error);

      toast({
        title: editingPost ? "Post atualizado com sucesso!" : "Post criado com sucesso!",
      });

      setShowForm(false);
      setEditingPost(null);
      resetForm();
      fetchPosts();
    } catch (error: any) {
      toast({
        title: "Erro ao salvar post",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      content: "",
      slug: "",
      excerpt: "",
      image_url: "",
      thumbnail_url: "",
      status: "draft",
      meta_title: "",
      meta_description: "",
      tags: [],
      category_id: null,
      clinic_location_id: null,
      geo_lat: "",
      geo_lng: "",
      cta_text: "Agende sua avaliação com o Dr. Márcio Pelegrina",
      cta_url: "#",
      read_time: "",
      featured: false,
      internal_notes: "",
      faqs: [],
      reviews: [],
      aggregate_rating_value: "",
      aggregate_rating_count: "",
      scheduled_at: null,
    });
  };

  const handleEdit = (post: Post) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      content: post.content, // Keep as is (Markdown)
      slug: post.slug,
      excerpt: post.excerpt || "",
      image_url: post.image_url || "",
      thumbnail_url: post.thumbnail_url || "",
      status: post.status,
      meta_title: (post as any).meta_title || "",
      meta_description: (post as any).meta_description || "",
      tags: post.tags || [],
      category_id: post.category_id || null,
      clinic_location_id: post.clinic_location_id || null,
      geo_lat: (post as any).geo_lat?.toString() || "",
      geo_lng: (post as any).geo_lng?.toString() || "",
      cta_text: (post as any).cta_text || "Agende sua avaliação com o Dr. Márcio Pelegrina",
      cta_url: (post as any).cta_url || "#",
      read_time: (post as any).read_time || "",
      featured: post.featured || false,
      internal_notes: (post as any).internal_notes || "",
      faqs: (post as any).faqs || [],
      reviews: (post as any).reviews || [],
      aggregate_rating_value: (post as any).aggregate_rating_value?.toString() || "",
      aggregate_rating_count: (post as any).aggregate_rating_count?.toString() || "",
      scheduled_at: (post as any).scheduled_at ? new Date((post as any).scheduled_at) : null,
    });
    setShowForm(true);
  };

  const handleDelete = async () => {
    if (!deletePostId) return;

    try {
      // Use edge function to bypass RLS
      const { data, error } = await supabase.functions.invoke('manage-post', {
        body: {
          action: 'delete',
          postId: deletePostId,
        },
      });

      if (error) throw error;
      if (data.error) throw new Error(data.error);

      toast({
        title: "Post deletado com sucesso!",
      });
      fetchPosts();
    } catch (error: any) {
      toast({
        title: "Erro ao deletar post",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setDeletePostId(null);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: 'main' | 'thumbnail') => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast({
        title: "Erro",
        description: "Por favor, selecione uma imagem válida",
        variant: "destructive",
      });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "Erro",
        description: "A imagem deve ter no máximo 5MB",
        variant: "destructive",
      });
      return;
    }

    setUploadingImage(true);

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('blog-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('blog-images')
        .getPublicUrl(filePath);

      if (type === 'main') {
        setFormData({ ...formData, image_url: publicUrl });
      } else {
        setFormData({ ...formData, thumbnail_url: publicUrl });
      }

      toast({
        title: "Imagem enviada com sucesso!",
      });
    } catch (error: any) {
      toast({
        title: "Erro ao enviar imagem",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setUploadingImage(false);
    }
  };

  const toggleStatus = async (post: Post) => {
    try {
      const newStatus = post.status === "published" ? "draft" : "published";
      
      // Use edge function to bypass RLS
      const { data, error } = await supabase.functions.invoke('manage-post', {
        body: {
          action: 'toggle_status',
          postId: post.id,
          postData: { newStatus },
        },
      });

      if (error) throw error;
      if (data.error) throw new Error(data.error);

      toast({
        title: `Post ${newStatus === "published" ? "publicado" : "despublicado"} com sucesso!`,
      });
      fetchPosts();
    } catch (error: any) {
      toast({
        title: "Erro ao atualizar status",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-foreground">Carregando...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  // Generate all months of current year and previous years with posts
  const availableMonths = (() => {
    const now = new Date();
    const currentYear = now.getFullYear();
    
    // Get the oldest year from posts, default to current year if no posts
    const oldestYear = posts.length > 0 
      ? Math.min(...posts.map(post => new Date(post.created_at).getFullYear()))
      : currentYear;
    
    const months: string[] = [];
    
    // Generate all months from oldest year to current year
    for (let year = currentYear; year >= oldestYear; year--) {
      for (let month = 12; month >= 1; month--) {
        // Only add future months of current year that haven't occurred yet
        if (year === currentYear && month > now.getMonth() + 1) {
          continue;
        }
        months.push(`${year}-${String(month).padStart(2, '0')}`);
      }
    }
    
    return months;
  })();

  // Filter posts by selected month and date range
  const filteredPosts = posts.filter((post) => {
    const postDate = new Date(post.created_at);
    
    // Filter by month if selected
    if (selectedMonth !== "all") {
      const postMonth = `${postDate.getFullYear()}-${String(postDate.getMonth() + 1).padStart(2, '0')}`;
      if (postMonth !== selectedMonth) return false;
    }
    
    // Filter by date range if set
    if (dateRange.from) {
      const fromDate = new Date(dateRange.from);
      fromDate.setHours(0, 0, 0, 0);
      if (postDate < fromDate) return false;
    }
    
    if (dateRange.to) {
      const toDate = new Date(dateRange.to);
      toDate.setHours(23, 59, 59, 999);
      if (postDate > toDate) return false;
    }
    
    return true;
  });

  // Pagination calculations
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  const currentPosts = filteredPosts.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const formatMonthYear = (monthStr: string) => {
    const [year, month] = monthStr.split('-');
    const date = new Date(parseInt(year), parseInt(month) - 1, 1);
    const monthName = date.toLocaleDateString('pt-BR', { month: 'long' });
    return `${monthName.charAt(0).toUpperCase() + monthName.slice(1)} de ${year}`;
  };

  // Count posts per month
  const getPostCountForMonth = (monthStr: string) => {
    return posts.filter((post) => {
      const date = new Date(post.created_at);
      const postMonth = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      return postMonth === monthStr;
    }).length;
  };

  const clearDateRange = () => {
    setDateRange({ from: undefined, to: undefined });
    setTempDateRange({ from: undefined, to: undefined });
    setCurrentPage(1);
  };

  const applyDateRange = () => {
    setDateRange(tempDateRange);
    setIsDatePickerOpen(false);
    setCurrentPage(1);
  };

  const cancelDateRange = () => {
    setTempDateRange(dateRange);
    setIsDatePickerOpen(false);
  };

  const handleSchedulePost = async () => {
    if (!isAuthenticated || !scheduledDate) return;

    try {
      // Combine date and time in São Paulo timezone
      const [hours, minutes] = scheduledTime.split(':');
      const scheduledDateTime = new Date(scheduledDate);
      scheduledDateTime.setHours(parseInt(hours), parseInt(minutes), 0, 0);

      // Check if scheduled time is in the past
      const now = new Date();
      if (scheduledDateTime <= now) {
        toast({
          title: "Horário inválido",
          description: "O horário selecionado já passou. Por favor, escolha um horário futuro.",
          variant: "destructive",
        });
        return;
      }

      const slug = formData.slug || generateSlug(formData.title);
      let content = formData.content;
      
      if (!formData.read_time) {
        const wordCount = content.split(/\s+/).length;
        const readTime = Math.ceil(wordCount / 200);
        formData.read_time = `${readTime} min de leitura`;
      }
      
      const postData = {
        title: formData.title,
        content: content,
        slug,
        excerpt: formData.excerpt || null,
        image_url: formData.image_url || null,
        thumbnail_url: formData.thumbnail_url || null,
        status: 'scheduled',
        meta_title: formData.meta_title || null,
        meta_description: formData.meta_description || null,
        tags: formData.tags.length > 0 ? formData.tags : null,
        category_id: formData.category_id || null,
        clinic_location_id: formData.clinic_location_id || null,
        geo_lat: formData.geo_lat ? parseFloat(formData.geo_lat) : null,
        geo_lng: formData.geo_lng ? parseFloat(formData.geo_lng) : null,
        cta_text: formData.cta_text || null,
        cta_url: formData.cta_url || null,
        read_time: formData.read_time || null,
        featured: formData.featured,
        internal_notes: formData.internal_notes || null,
        faqs: formData.faqs && formData.faqs.length > 0 ? formData.faqs : null,
        reviews: formData.reviews && formData.reviews.length > 0 ? formData.reviews : null,
        aggregate_rating_value: formData.aggregate_rating_value ? parseFloat(formData.aggregate_rating_value) : null,
        aggregate_rating_count: formData.aggregate_rating_count ? parseInt(formData.aggregate_rating_count) : null,
        scheduled_at: scheduledDateTime.toISOString(),
      };
      
      // Use edge function to bypass RLS
      const { data, error } = await supabase.functions.invoke('manage-post', {
        body: {
          action: editingPost ? 'update' : 'create',
          postId: editingPost?.id,
          postData,
        },
      });

      if (error) throw error;
      if (data.error) throw new Error(data.error);

      toast({
        title: "Post agendado com sucesso!",
        description: `Será publicado em ${format(scheduledDateTime, "dd/MM/yyyy 'às' HH:mm")}`,
      });

      setShowForm(false);
      setShowScheduleDialog(false);
      setEditingPost(null);
      setScheduledDate(undefined);
      setScheduledTime("12:00");
      resetForm();
      fetchPosts();
    } catch (error: any) {
      toast({
        title: "Erro ao agendar post",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="absolute inset-0 bg-gradient-subtle" />
      
      <div className="relative z-10">
        <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border shadow-sm">
          <div className="container mx-auto px-4 py-3 md:py-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 md:gap-4 min-w-0">
              <span className="font-kiona text-lg font-bold text-foreground flex-shrink-0">Dr. Márcio Pelegrina</span>
              <div>
                <h1 className="font-kiona text-base md:text-xl text-foreground">Painel Administrativo</h1>
                <p className="text-xs text-muted-foreground hidden sm:block">Gerenciamento de Conteúdo</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={handleMigratePosts}
                disabled={migratingPosts}
                className="flex-shrink-0 hover-lift"
                size="sm"
              >
                <RefreshCw className={`w-4 h-4 md:mr-2 ${migratingPosts ? 'animate-spin' : ''}`} />
                <span className="hidden md:inline">
                  {migratingPosts ? 'Migrando...' : 'Migrar Posts'}
                </span>
              </Button>
              <Button 
                variant="outline" 
                onClick={handleLogout} 
                className="flex-shrink-0 hover-lift"
                size="sm"
              >
                <LogOut className="w-4 h-4 md:mr-2" />
                <span className="hidden md:inline">Sair</span>
              </Button>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-3 sm:px-4 py-6 sm:py-8 pt-20 sm:pt-24 md:pt-28 max-w-7xl">
          {!showForm ? (
            <>
              <div className="mb-6 sm:mb-8 animate-fade-in">
                <ContentGapAnalysis onCreatePost={handleCreateFromGap} />
              </div>

              <div className="flex flex-col gap-4 mb-6 sm:mb-8 animate-fade-in">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-kiona text-foreground">Posts do Blog</h2>
                  <Button
                    onClick={() => {
                      setShowForm(true);
                      setEditingPost(null);
                      resetForm();
                    }}
                    className="hover-lift shadow-blue bg-primary hover:bg-primary/90 text-primary-foreground w-full sm:w-auto"
                    size="sm"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Novo Post
                  </Button>
                </div>
                
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <span className="text-sm text-muted-foreground whitespace-nowrap">Filtrar por mês:</span>
                    <Select value={selectedMonth} onValueChange={(value) => {
                      setSelectedMonth(value);
                      setCurrentPage(1);
                    }}>
                      <SelectTrigger className="w-full sm:w-[300px]">
                        <SelectValue placeholder="Todos os meses" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">
                          Todos os meses ({posts.length} {posts.length === 1 ? 'post' : 'posts'})
                        </SelectItem>
                        {availableMonths.map((month) => {
                          const count = getPostCountForMonth(month);
                          return (
                            <SelectItem key={month} value={month}>
                              {formatMonthYear(month)} ({count} {count === 1 ? 'post' : 'posts'})
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <span className="text-sm text-muted-foreground whitespace-nowrap">Período:</span>
                    <Popover open={isDatePickerOpen} onOpenChange={(open) => {
                      setIsDatePickerOpen(open);
                      if (open) {
                        setTempDateRange(dateRange);
                      }
                    }}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full sm:w-[300px] justify-start text-left font-normal",
                            !dateRange.from && !dateRange.to && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {dateRange.from ? (
                            dateRange.to ? (
                              <>
                                {format(dateRange.from, "dd/MM/yyyy")} - {format(dateRange.to, "dd/MM/yyyy")}
                              </>
                            ) : (
                              format(dateRange.from, "dd/MM/yyyy")
                            )
                          ) : (
                            <span>Selecione o período</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <div className="p-3">
                          <Calendar
                            mode="range"
                            selected={{ from: tempDateRange.from, to: tempDateRange.to }}
                            onSelect={(range) => {
                              setTempDateRange({ from: range?.from, to: range?.to });
                            }}
                            numberOfMonths={2}
                            className={cn("pointer-events-auto")}
                          />
                          <div className="flex gap-2 mt-3 pt-3 border-t">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={cancelDateRange}
                              className="flex-1"
                            >
                              Cancelar
                            </Button>
                            <Button
                              size="sm"
                              onClick={applyDateRange}
                              className="flex-1"
                              disabled={!tempDateRange.from && !tempDateRange.to}
                            >
                              Pesquisar
                            </Button>
                          </div>
                        </div>
                      </PopoverContent>
                    </Popover>
                    {(dateRange.from || dateRange.to) && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={clearDateRange}
                        className="h-9 w-9"
                        title="Limpar filtro de período"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>

              <div className="grid gap-3 sm:gap-4 animate-fade-in">
                {currentPosts.map((post) => (
                  <Card key={post.id} className="hover-lift transition-all shadow-elevated border-border/50 bg-card overflow-hidden">
                    <CardContent className="p-4 sm:p-6">
                      <div className="flex flex-col gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start gap-2 sm:gap-3 mb-2 flex-wrap">
                            <h3 className="text-base sm:text-lg md:text-xl font-semibold break-words flex-1 min-w-0">{post.title}</h3>
                            <div className="flex gap-2 flex-wrap flex-shrink-0">
                              <span
                                className={`text-xs px-2 py-1 rounded-full whitespace-nowrap ${
                                  post.status === "published"
                                    ? "bg-green-500/20 text-green-400"
                                    : "bg-yellow-500/20 text-yellow-400"
                                }`}
                              >
                                {post.status === "published" ? "Publicado" : "Rascunho"}
                              </span>
                              {post.featured && (
                                <span className="text-xs px-2 py-1 rounded-full bg-accent/20 text-accent whitespace-nowrap">
                                  Destaque
                                </span>
                              )}
                              {(post as any).scheduled_at && (
                                <span className="text-xs px-2 py-1 rounded-full bg-blue-500/20 text-blue-400 whitespace-nowrap flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  Agendado: {new Date((post as any).scheduled_at).toLocaleString("pt-BR", { 
                                    day: "2-digit", 
                                    month: "2-digit", 
                                    hour: "2-digit", 
                                    minute: "2-digit" 
                                  })}
                                </span>
                              )}
                            </div>
                          </div>
                          {post.excerpt && (
                            <p className="text-sm text-muted-foreground mb-3 line-clamp-2 break-words">
                              {post.excerpt}
                            </p>
                          )}
                          <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                            <span>Criado em: {new Date(post.created_at).toLocaleDateString("pt-BR")}</span>
                            {post.tags && post.tags.length > 0 && (
                              <>
                                <span className="hidden sm:inline">•</span>
                                <span>{post.tags.length} tag{post.tags.length > 1 ? 's' : ''}</span>
                              </>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-2 flex-wrap">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => toggleStatus(post)}
                            title={post.status === "published" ? "Despublicar" : "Publicar"}
                            className="flex-1 sm:flex-initial"
                          >
                            {post.status === "published" ? (
                              <>
                                <FileText className="w-4 h-4 sm:mr-2" />
                                <span className="hidden sm:inline">Despublicar</span>
                              </>
                            ) : (
                              <>
                                <Eye className="w-4 h-4 sm:mr-2" />
                                <span className="hidden sm:inline">Publicar</span>
                              </>
                            )}
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEdit(post)}
                            className="flex-1 sm:flex-initial"
                          >
                            <Pencil className="w-4 h-4 sm:mr-2" />
                            <span className="hidden sm:inline">Editar</span>
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => setDeletePostId(post.id)}
                            className="flex-1 sm:flex-initial"
                          >
                            <Trash2 className="w-4 h-4 sm:mr-2" />
                            <span className="hidden sm:inline">Excluir</span>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {filteredPosts.length === 0 && posts.length > 0 && (
                  <Card className="shadow-elevated border-border/50 bg-card">
                    <CardContent className="p-6 sm:p-8 text-center text-muted-foreground">
                      Nenhum post encontrado para o mês selecionado.
                    </CardContent>
                  </Card>
                )}

                {posts.length === 0 && (
                  <Card className="shadow-elevated border-border/50 bg-card">
                    <CardContent className="p-6 sm:p-8 text-center text-muted-foreground">
                      Nenhum post encontrado. Crie seu primeiro post!
                    </CardContent>
                  </Card>
                )}
              </div>

              {totalPages > 1 && (
                <div className="mt-8 animate-fade-in">
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            if (currentPage > 1) handlePageChange(currentPage - 1);
                          }}
                          className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                        />
                      </PaginationItem>
                      
                      {[...Array(totalPages)].map((_, index) => {
                        const page = index + 1;
                        
                        // Show first page, last page, current page, and pages around current
                        if (
                          page === 1 ||
                          page === totalPages ||
                          (page >= currentPage - 1 && page <= currentPage + 1)
                        ) {
                          return (
                            <PaginationItem key={page}>
                              <PaginationLink
                                href="#"
                                onClick={(e) => {
                                  e.preventDefault();
                                  handlePageChange(page);
                                }}
                                isActive={currentPage === page}
                              >
                                {page}
                              </PaginationLink>
                            </PaginationItem>
                          );
                        }
                        
                        // Show ellipsis
                        if (page === currentPage - 2 || page === currentPage + 2) {
                          return (
                            <PaginationItem key={page}>
                              <PaginationEllipsis />
                            </PaginationItem>
                          );
                        }
                        
                        return null;
                      })}
                      
                      <PaginationItem>
                        <PaginationNext
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            if (currentPage < totalPages) handlePageChange(currentPage + 1);
                          }}
                          className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              )}
            </>
          ) : (
            <Card className="shadow-elevated border-border/50 bg-card max-w-5xl mx-auto animate-fade-in overflow-hidden">
              <CardHeader className="border-b border-border/50 bg-gradient-subtle p-4 sm:p-6">
                <CardTitle className="font-kiona text-foreground text-xl sm:text-2xl break-words">
                  {editingPost ? "Editar Post" : "Novo Post"}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                  <BlogAdminTabs
                    formData={formData}
                    setFormData={setFormData}
                    categories={categories}
                    locations={locations}
                    uploadingImage={uploadingImage}
                    handleImageUpload={handleImageUpload}
                  />

                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4 border-t border-border">
                    <Button type="submit" className="hover-lift shadow-blue bg-primary hover:bg-primary/90 text-primary-foreground w-full sm:w-auto">
                      {editingPost ? "Atualizar" : "Criar"} Post
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowScheduleDialog(true)}
                      className="hover-lift w-full sm:w-auto"
                    >
                      <Clock className="w-4 h-4 mr-2" />
                      Agendar Post
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setShowForm(false);
                        setEditingPost(null);
                      }}
                      className="hover-lift w-full sm:w-auto"
                    >
                      Cancelar
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}
        </main>
      </div>

      <AlertDialog open={showScheduleDialog} onOpenChange={setShowScheduleDialog}>
        <AlertDialogContent className="bg-card border-border/50">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-kiona text-foreground">Agendar Publicação</AlertDialogTitle>
            <AlertDialogDescription>
              Selecione a data e horário para publicação automática do post (horário de São Paulo).
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Data de Publicação</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !scheduledDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {scheduledDate ? format(scheduledDate, "dd/MM/yyyy") : "Selecione a data"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={scheduledDate}
                    onSelect={setScheduledDate}
                    disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                    initialFocus
                    className={cn("p-3 pointer-events-auto")}
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-2">
              <Label>Horário (São Paulo)</Label>
              <Input
                type="time"
                value={scheduledTime}
                onChange={(e) => {
                  const newTime = e.target.value;
                  
                  // Validate if selected date is today
                  if (scheduledDate) {
                    const isToday = new Date().toDateString() === scheduledDate.toDateString();
                    
                    if (isToday && newTime) {
                      const [hours, minutes] = newTime.split(':');
                      const selectedDateTime = new Date();
                      selectedDateTime.setHours(parseInt(hours), parseInt(minutes), 0, 0);
                      
                      if (selectedDateTime <= new Date()) {
                        toast({
                          title: "Horário inválido",
                          description: "O horário já passou. Selecione um horário futuro.",
                          variant: "destructive",
                        });
                        return;
                      }
                    }
                  }
                  
                  setScheduledTime(newTime);
                }}
                className="w-full"
              />
              {scheduledDate && new Date().toDateString() === scheduledDate.toDateString() && (
                <p className="text-xs text-muted-foreground">
                  * Selecione um horário futuro para hoje
                </p>
              )}
            </div>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel className="hover-lift">Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleSchedulePost}
              disabled={!scheduledDate}
              className="bg-primary text-primary-foreground hover:bg-primary/90 hover-lift"
            >
              Confirmar Agendamento
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={!!deletePostId} onOpenChange={() => setDeletePostId(null)}>
        <AlertDialogContent className="bg-card border-border/50">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-kiona text-foreground">Confirmar exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja deletar este post? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="hover-lift">Cancelar</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDelete} 
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90 hover-lift"
            >
              Deletar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default BlogAdmin;
