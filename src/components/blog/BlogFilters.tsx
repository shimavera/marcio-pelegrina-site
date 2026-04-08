import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Search, X } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface BlogFiltersProps {
  onFilterChange: (filters: {
    search: string;
    category: string | null;
    location: string | null;
    tag: string | null;
  }) => void;
}

const BlogFilters = ({ onFilterChange }: BlogFiltersProps) => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [categories, setCategories] = useState<any[]>([]);
  const [locations, setLocations] = useState<any[]>([]);
  const [popularTags, setPopularTags] = useState<string[]>([]);

  useEffect(() => {
    fetchFilterOptions();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      onFilterChange({
        search,
        category: selectedCategory,
        location: selectedLocation,
        tag: selectedTag,
      });
    }, 300);

    return () => clearTimeout(timer);
  }, [search, selectedCategory, selectedLocation, selectedTag, onFilterChange]);

  const fetchFilterOptions = async () => {
    // Fetch categories
    const { data: categoriesData } = await (supabase as any)
      .from('categories')
      .select('*')
      .order('name');
    if (categoriesData) setCategories(categoriesData);

    // Fetch locations
    const { data: locationsData } = await (supabase as any)
      .from('locations')
      .select('*')
      .order('name');
    if (locationsData) setLocations(locationsData);

    // Fetch popular tags
    const { data: postsData } = await (supabase as any)
      .from('posts')
      .select('tags')
      .eq('status', 'published');
    
    if (postsData) {
      const allTags = postsData.flatMap((post: any) => post.tags || []);
      const tagCounts = allTags.reduce((acc: any, tag: string) => {
        acc[tag] = (acc[tag] || 0) + 1;
        return acc;
      }, {});
      const topTags = Object.entries(tagCounts)
        .sort((a: any, b: any) => b[1] - a[1])
        .slice(0, 10)
        .map(([tag]) => tag);
      setPopularTags(topTags);
    }
  };

  const hasActiveFilters = search || selectedCategory || selectedLocation || selectedTag;

  const clearFilters = () => {
    setSearch('');
    setSelectedCategory(null);
    setSelectedLocation(null);
    setSelectedTag(null);
  };

  return (
    <Card className="p-6 space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">Filtros</h3>
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="w-4 h-4 mr-1" />
              Limpar
            </Button>
          )}
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Buscar artigos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {categories.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-foreground">Categorias</h4>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Badge
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                className="cursor-pointer hover:bg-primary/10"
                onClick={() => setSelectedCategory(
                  selectedCategory === category.id ? null : category.id
                )}
              >
                {category.name}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {locations.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-foreground">Localizações</h4>
          <div className="flex flex-wrap gap-2">
            {locations.map((location) => (
              <Badge
                key={location.id}
                variant={selectedLocation === location.id ? "default" : "outline"}
                className="cursor-pointer hover:bg-primary/10"
                onClick={() => setSelectedLocation(
                  selectedLocation === location.id ? null : location.id
                )}
              >
                {location.name}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {popularTags.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-foreground">Tags Populares</h4>
          <div className="flex flex-wrap gap-2">
            {popularTags.map((tag) => (
              <Badge
                key={tag}
                variant={selectedTag === tag ? "default" : "outline"}
                className="cursor-pointer hover:bg-primary/10"
                onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
};

export default BlogFilters;
