export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      categories: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
          slug: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
          slug: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          slug?: string
          updated_at?: string
        }
        Relationships: []
      }
      image_analytics: {
        Row: {
          bandwidth_saved_bytes: number | null
          connection_type: string | null
          created_at: string | null
          device_type: string | null
          file_size_bytes: number | null
          format: string
          height: number | null
          id: string
          image_url: string
          load_time_ms: number | null
          original_size_bytes: number | null
          page_url: string | null
          session_id: string | null
          user_agent: string | null
          viewport_height: number | null
          viewport_width: number | null
          width: number | null
        }
        Insert: {
          bandwidth_saved_bytes?: number | null
          connection_type?: string | null
          created_at?: string | null
          device_type?: string | null
          file_size_bytes?: number | null
          format: string
          height?: number | null
          id?: string
          image_url: string
          load_time_ms?: number | null
          original_size_bytes?: number | null
          page_url?: string | null
          session_id?: string | null
          user_agent?: string | null
          viewport_height?: number | null
          viewport_width?: number | null
          width?: number | null
        }
        Update: {
          bandwidth_saved_bytes?: number | null
          connection_type?: string | null
          created_at?: string | null
          device_type?: string | null
          file_size_bytes?: number | null
          format?: string
          height?: number | null
          id?: string
          image_url?: string
          load_time_ms?: number | null
          original_size_bytes?: number | null
          page_url?: string | null
          session_id?: string | null
          user_agent?: string | null
          viewport_height?: number | null
          viewport_width?: number | null
          width?: number | null
        }
        Relationships: []
      }
      locations: {
        Row: {
          address: string | null
          city: string
          created_at: string
          geo_lat: number | null
          geo_lng: number | null
          id: string
          maps_iframe: string | null
          name: string
          slug: string
          state: string
          telephone: string | null
          updated_at: string
          url: string | null
        }
        Insert: {
          address?: string | null
          city: string
          created_at?: string
          geo_lat?: number | null
          geo_lng?: number | null
          id?: string
          maps_iframe?: string | null
          name: string
          slug: string
          state: string
          telephone?: string | null
          updated_at?: string
          url?: string | null
        }
        Update: {
          address?: string | null
          city?: string
          created_at?: string
          geo_lat?: number | null
          geo_lng?: number | null
          id?: string
          maps_iframe?: string | null
          name?: string
          slug?: string
          state?: string
          telephone?: string | null
          updated_at?: string
          url?: string | null
        }
        Relationships: []
      }
      posts: {
        Row: {
          aggregate_rating_count: number | null
          aggregate_rating_value: number | null
          author: string | null
          author_id: string | null
          category_id: string | null
          clinic_location_id: string | null
          content: string
          created_at: string
          cta_text: string | null
          cta_url: string | null
          excerpt: string | null
          faqs: Json | null
          featured: boolean | null
          geo_lat: number | null
          geo_lng: number | null
          id: string
          image_url: string | null
          internal_notes: string | null
          meta_description: string | null
          meta_title: string | null
          published_at: string | null
          read_time: string | null
          reviews: Json | null
          scheduled_at: string | null
          slug: string
          status: string
          tags: string[] | null
          thumbnail_url: string | null
          title: string
          updated_at: string
          views: number | null
        }
        Insert: {
          aggregate_rating_count?: number | null
          aggregate_rating_value?: number | null
          author?: string | null
          author_id?: string | null
          category_id?: string | null
          clinic_location_id?: string | null
          content: string
          created_at?: string
          cta_text?: string | null
          cta_url?: string | null
          excerpt?: string | null
          faqs?: Json | null
          featured?: boolean | null
          geo_lat?: number | null
          geo_lng?: number | null
          id?: string
          image_url?: string | null
          internal_notes?: string | null
          meta_description?: string | null
          meta_title?: string | null
          published_at?: string | null
          read_time?: string | null
          reviews?: Json | null
          scheduled_at?: string | null
          slug: string
          status?: string
          tags?: string[] | null
          thumbnail_url?: string | null
          title: string
          updated_at?: string
          views?: number | null
        }
        Update: {
          aggregate_rating_count?: number | null
          aggregate_rating_value?: number | null
          author?: string | null
          author_id?: string | null
          category_id?: string | null
          clinic_location_id?: string | null
          content?: string
          created_at?: string
          cta_text?: string | null
          cta_url?: string | null
          excerpt?: string | null
          faqs?: Json | null
          featured?: boolean | null
          geo_lat?: number | null
          geo_lng?: number | null
          id?: string
          image_url?: string | null
          internal_notes?: string | null
          meta_description?: string | null
          meta_title?: string | null
          published_at?: string | null
          read_time?: string | null
          reviews?: Json | null
          scheduled_at?: string | null
          slug?: string
          status?: string
          tags?: string[] | null
          thumbnail_url?: string | null
          title?: string
          updated_at?: string
          views?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "posts_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "posts_clinic_location_id_fkey"
            columns: ["clinic_location_id"]
            isOneToOne: false
            referencedRelation: "locations"
            referencedColumns: ["id"]
          },
        ]
      }
      related_posts: {
        Row: {
          created_at: string
          id: string
          post_id: string
          related_post_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          post_id: string
          related_post_id: string
        }
        Update: {
          created_at?: string
          id?: string
          post_id?: string
          related_post_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "related_posts_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "related_posts_related_post_id_fkey"
            columns: ["related_post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
        ]
      }
      treatments: {
        Row: {
          benefits: string[] | null
          created_at: string
          display_order: number | null
          full_description: string
          icon_name: string
          id: string
          image_url: string | null
          short_description: string
          slug: string
          title: string
          updated_at: string
        }
        Insert: {
          benefits?: string[] | null
          created_at?: string
          display_order?: number | null
          full_description: string
          icon_name: string
          id?: string
          image_url?: string | null
          short_description: string
          slug: string
          title: string
          updated_at?: string
        }
        Update: {
          benefits?: string[] | null
          created_at?: string
          display_order?: number | null
          full_description?: string
          icon_name?: string
          id?: string
          image_url?: string | null
          short_description?: string
          slug?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      web_vitals_analytics: {
        Row: {
          connection_type: string | null
          created_at: string | null
          device_type: string | null
          id: string
          metric_name: string
          metric_rating: string
          metric_value: number
          page_type: string | null
          page_url: string
          session_id: string | null
          user_agent: string | null
          viewport_height: number | null
          viewport_width: number | null
        }
        Insert: {
          connection_type?: string | null
          created_at?: string | null
          device_type?: string | null
          id?: string
          metric_name: string
          metric_rating: string
          metric_value: number
          page_type?: string | null
          page_url: string
          session_id?: string | null
          user_agent?: string | null
          viewport_height?: number | null
          viewport_width?: number | null
        }
        Update: {
          connection_type?: string | null
          created_at?: string | null
          device_type?: string | null
          id?: string
          metric_name?: string
          metric_rating?: string
          metric_value?: number
          page_type?: string | null
          page_url?: string
          session_id?: string | null
          user_agent?: string | null
          viewport_height?: number | null
          viewport_width?: number | null
        }
        Relationships: []
      }
    }
    Views: {
      image_analytics_summary: {
        Row: {
          avg_bandwidth_saved_bytes: number | null
          avg_load_time_ms: number | null
          date: string | null
          device_type: string | null
          format: string | null
          median_load_time_ms: number | null
          p95_load_time_ms: number | null
          total_bandwidth_saved_bytes: number | null
          total_loads: number | null
        }
        Relationships: []
      }
      web_vitals_summary: {
        Row: {
          avg_value: number | null
          date: string | null
          device_type: string | null
          good_count: number | null
          median_value: number | null
          metric_name: string | null
          needs_improvement_count: number | null
          p75_value: number | null
          p95_value: number | null
          page_type: string | null
          poor_count: number | null
          total_measurements: number | null
        }
        Relationships: []
      }
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "moderator", "user"],
    },
  },
} as const
