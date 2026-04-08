import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.75.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ImageSize {
  width: number;
  suffix: string;
  quality: number;
}

const IMAGE_SIZES: ImageSize[] = [
  { width: 480, suffix: "mobile", quality: 80 },
  { width: 768, suffix: "tablet", quality: 85 },
  { width: 1200, suffix: "desktop", quality: 90 },
];

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("Starting image optimization");

    // Get auth header and create Supabase client
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      throw new Error("No authorization header");
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_ANON_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey, {
      global: {
        headers: { Authorization: authHeader },
      },
    });

    // Verify user is authenticated
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      throw new Error("Unauthorized");
    }

    // Parse form data
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const bucketName = formData.get("bucket") as string || "blog-images";
    const path = formData.get("path") as string || "";

    if (!file) {
      throw new Error("No file provided");
    }

    console.log(`Processing file: ${file.name}, size: ${file.size} bytes`);

    // Read file as array buffer
    const arrayBuffer = await file.arrayBuffer();
    const originalBlob = new Blob([arrayBuffer]);

    // Determine file extension and base name
    const fileName = file.name.split(".")[0];
    const timestamp = Date.now();
    const basePath = path ? `${path}/${fileName}-${timestamp}` : `${fileName}-${timestamp}`;

    // Process image for each size and format
    const processedImages: Record<string, any> = {
      original: null,
      webp: {},
      avif: {},
    };

    // Upload original image first
    const originalPath = `${basePath}-original.${file.name.split(".").pop()}`;
    const { data: originalUpload, error: originalError } = await supabase.storage
      .from(bucketName)
      .upload(originalPath, originalBlob, {
        contentType: file.type,
        cacheControl: "31536000", // 1 year
        upsert: false,
      });

    if (originalError) {
      console.error("Error uploading original:", originalError);
      throw originalError;
    }

    console.log("Original uploaded:", originalPath);

    const { data: { publicUrl: originalUrl } } = supabase.storage
      .from(bucketName)
      .getPublicUrl(originalPath);

    processedImages.original = {
      url: originalUrl,
      path: originalPath,
    };

    // For each size, use Supabase's transformation API to generate WebP versions
    // Supabase Storage supports on-the-fly image transformations
    for (const size of IMAGE_SIZES) {
      // WebP transformation URL
      const webpUrl = `${originalUrl}?width=${size.width}&quality=${size.quality}&format=webp`;
      processedImages.webp[size.suffix] = {
        url: webpUrl,
        width: size.width,
        quality: size.quality,
      };

      // AVIF transformation URL (if supported)
      const avifUrl = `${originalUrl}?width=${size.width}&quality=${size.quality - 5}&format=avif`;
      processedImages.avif[size.suffix] = {
        url: avifUrl,
        width: size.width,
        quality: size.quality - 5,
      };

      console.log(`Generated ${size.suffix} URLs for WebP and AVIF`);
    }

    // Calculate recommended compression based on file size
    const sizeCategory = 
      file.size > 1000000 ? "hero" :
      file.size > 100000 ? "content" : "thumbnail";

    const recommendations = {
      hero: "80-100kb compressed",
      content: "40-60kb compressed",
      thumbnail: "15-20kb compressed",
    };

    const response = {
      success: true,
      images: processedImages,
      metadata: {
        originalSize: file.size,
        originalName: file.name,
        sizeCategory,
        recommendation: recommendations[sizeCategory],
        bucket: bucketName,
      },
      srcset: {
        webp: IMAGE_SIZES.map(size => 
          `${processedImages.webp[size.suffix].url} ${size.width}w`
        ).join(", "),
        avif: IMAGE_SIZES.map(size => 
          `${processedImages.avif[size.suffix].url} ${size.width}w`
        ).join(", "),
      },
    };

    console.log("Image optimization completed successfully");

    return new Response(JSON.stringify(response), {
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
      },
      status: 200,
    });

  } catch (error) {
    console.error("Error in optimize-image function:", error);
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    return new Response(
      JSON.stringify({
        success: false,
        error: errorMessage,
      }),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
        status: 500,
      }
    );
  }
});
