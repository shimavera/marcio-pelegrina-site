import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    console.log("Starting scheduled posts publication check...");

    // Get current time in São Paulo timezone
    const now = new Date();
    console.log(`Current UTC time: ${now.toISOString()}`);

    // Find all draft posts that are scheduled to be published
    const { data: scheduledPosts, error: fetchError } = await supabase
      .from("posts")
      .select("*")
      .in("status", ["draft", "scheduled"])
      .not("scheduled_at", "is", null)
      .lte("scheduled_at", now.toISOString())
      .order("scheduled_at", { ascending: true });

    if (fetchError) {
      console.error("Error fetching scheduled posts:", fetchError);
      throw fetchError;
    }

    console.log(`Found ${scheduledPosts?.length || 0} posts to publish`);

    if (!scheduledPosts || scheduledPosts.length === 0) {
      return new Response(
        JSON.stringify({
          message: "No posts to publish",
          publishedCount: 0,
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 200,
        }
      );
    }

    // Publish each scheduled post
    const publishResults = [];
    for (const post of scheduledPosts) {
      console.log(`Publishing post: ${post.id} - ${post.title}`);
      
      const { error: updateError } = await supabase
        .from("posts")
        .update({
          status: "published",
          published_at: now.toISOString(),
          scheduled_at: null, // Clear the scheduled time after publishing
        })
        .eq("id", post.id);

      if (updateError) {
        console.error(`Error publishing post ${post.id}:`, updateError);
        publishResults.push({
          id: post.id,
          title: post.title,
          success: false,
          error: updateError.message,
        });
      } else {
        console.log(`Successfully published post: ${post.id}`);
        publishResults.push({
          id: post.id,
          title: post.title,
          success: true,
        });
      }
    }

    const successCount = publishResults.filter((r) => r.success).length;
    console.log(`Published ${successCount} out of ${scheduledPosts.length} posts`);

    return new Response(
      JSON.stringify({
        message: `Successfully published ${successCount} posts`,
        publishedCount: successCount,
        results: publishResults,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error: any) {
    console.error("Error in publish-scheduled-posts function:", error);
    return new Response(
      JSON.stringify({
        error: error.message,
        details: error.toString(),
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});