import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Card } from '@/components/ui/card';
import { Upload, Image as ImageIcon, AlertCircle, CheckCircle2 } from 'lucide-react';
import { uploadAndOptimizeImage, estimateCompressedSize, type ImageOptimizationResult } from '@/lib/imageOptimization';
import { useToast } from '@/hooks/use-toast';

interface ImageUploadWithOptimizationProps {
  bucket?: string;
  path?: string;
  onUploadComplete?: (result: ImageOptimizationResult) => void;
  acceptedFormats?: string[];
  maxSizeMB?: number;
}

const ImageUploadWithOptimization = ({
  bucket = 'blog-images',
  path = '',
  onUploadComplete,
  acceptedFormats = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
  maxSizeMB = 10,
}: ImageUploadWithOptimizationProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [preview, setPreview] = useState<string | null>(null);
  const [result, setResult] = useState<ImageOptimizationResult | null>(null);
  const { toast } = useToast();

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!acceptedFormats.includes(file.type)) {
      toast({
        title: 'Formato inválido',
        description: `Use apenas: ${acceptedFormats.map(f => f.split('/')[1].toUpperCase()).join(', ')}`,
        variant: 'destructive',
      });
      return;
    }

    // Validate file size
    const maxBytes = maxSizeMB * 1024 * 1024;
    if (file.size > maxBytes) {
      toast({
        title: 'Arquivo muito grande',
        description: `Tamanho máximo: ${maxSizeMB}MB`,
        variant: 'destructive',
      });
      return;
    }

    setSelectedFile(file);
    setResult(null);

    // Generate preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    try {
      setUploading(true);
      setProgress(0);

      // Simulate progress (edge function doesn't report progress)
      const progressInterval = setInterval(() => {
        setProgress(prev => Math.min(prev + 10, 90));
      }, 200);

      const uploadResult = await uploadAndOptimizeImage(selectedFile, bucket, path);

      clearInterval(progressInterval);
      setProgress(100);

      setResult(uploadResult);
      
      toast({
        title: 'Upload concluído!',
        description: `Imagem otimizada em ${Object.keys(uploadResult.images.webp).length} tamanhos + formatos WebP/AVIF`,
      });

      onUploadComplete?.(uploadResult);

    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: 'Erro no upload',
        description: error instanceof Error ? error.message : 'Erro desconhecido',
        variant: 'destructive',
      });
    } finally {
      setUploading(false);
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setPreview(null);
    setResult(null);
    setProgress(0);
  };

  const estimatedSize = selectedFile 
    ? estimateCompressedSize(selectedFile.size, 'webp')
    : null;

  return (
    <Card className="p-6 space-y-4">
      <div className="space-y-2">
        <Label htmlFor="image-upload" className="text-base font-semibold">
          Upload de Imagem com Otimização Automática
        </Label>
        <p className="text-sm text-muted-foreground">
          Conversão automática para WebP/AVIF + geração de srcset responsivo
        </p>
      </div>

      {!result ? (
        <>
          <div className="flex items-center gap-4">
            <Input
              id="image-upload"
              type="file"
              accept={acceptedFormats.join(',')}
              onChange={handleFileSelect}
              disabled={uploading}
              className="flex-1"
            />
            <Button
              onClick={handleUpload}
              disabled={!selectedFile || uploading}
              className="gap-2"
            >
              {uploading ? (
                <>Otimizando...</>
              ) : (
                <>
                  <Upload className="w-4 h-4" />
                  Upload
                </>
              )}
            </Button>
          </div>

          {uploading && (
            <div className="space-y-2">
              <Progress value={progress} className="w-full" />
              <p className="text-sm text-muted-foreground text-center">
                {progress < 90 ? 'Processando imagem...' : 'Finalizando...'}
              </p>
            </div>
          )}

          {preview && !uploading && (
            <div className="space-y-3">
              <div className="relative aspect-video rounded-lg overflow-hidden bg-muted">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-full object-contain"
                />
              </div>
              
              {selectedFile && (
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="space-y-1">
                    <p className="text-muted-foreground">Arquivo:</p>
                    <p className="font-medium">{selectedFile.name}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-muted-foreground">Tamanho original:</p>
                    <p className="font-medium">
                      {(selectedFile.size / 1024).toFixed(2)} KB
                    </p>
                  </div>
                  {estimatedSize && (
                    <>
                      <div className="space-y-1">
                        <p className="text-muted-foreground">Estimativa WebP:</p>
                        <p className="font-medium text-green-600">
                          ~{estimatedSize.readable} (-70%)
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-muted-foreground">Formato:</p>
                        <p className="font-medium">WebP + AVIF + Responsive</p>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          )}
        </>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-green-600">
            <CheckCircle2 className="w-5 h-5" />
            <span className="font-semibold">Otimização Concluída!</span>
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="space-y-1">
              <p className="text-muted-foreground">Categoria:</p>
              <p className="font-medium capitalize">{result.metadata.sizeCategory}</p>
            </div>
            <div className="space-y-1">
              <p className="text-muted-foreground">Recomendação:</p>
              <p className="font-medium text-xs">{result.metadata.recommendation}</p>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium">URLs Geradas:</p>
            <div className="space-y-1 text-xs">
              <div className="p-2 bg-muted rounded">
                <p className="text-muted-foreground mb-1">Original:</p>
                <code className="break-all">{result.images.original.url}</code>
              </div>
              <div className="p-2 bg-muted rounded">
                <p className="text-muted-foreground mb-1">WebP srcset:</p>
                <code className="break-all">{result.srcset.webp}</code>
              </div>
              <div className="p-2 bg-muted rounded">
                <p className="text-muted-foreground mb-1">AVIF srcset:</p>
                <code className="break-all">{result.srcset.avif}</code>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-2 p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
            <AlertCircle className="w-4 h-4 text-blue-600 mt-0.5" />
            <p className="text-xs text-blue-900 dark:text-blue-100">
              Use a URL original no campo de imagem. O sistema aplicará automaticamente as otimizações WebP/AVIF e responsive srcset.
            </p>
          </div>

          <Button onClick={handleReset} variant="outline" className="w-full gap-2">
            <ImageIcon className="w-4 h-4" />
            Fazer Novo Upload
          </Button>
        </div>
      )}
    </Card>
  );
};

export default ImageUploadWithOptimization;
