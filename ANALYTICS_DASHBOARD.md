# Analytics Dashboard - Guia Completo 📊

## Visão Geral

Dashboard completo de analytics para monitorar performance de imagens, savings de bandwidth, formatos mais usados e Core Web Vitals por dispositivo em tempo real.

**Acesso**: `/admin/analytics` (requer autenticação e role de admin)

---

## Arquitetura do Sistema

### 1. Tabelas do Banco de Dados

#### `image_analytics`
Armazena métricas de performance de cada imagem carregada.

**Campos**:
- `id` (UUID): Identificador único
- `created_at` (timestamp): Data/hora do carregamento
- `image_url` (text): URL da imagem
- `format` (text): Formato carregado (webp, avif, jpeg, png)
- `width` (integer): Largura da imagem
- `height` (integer): Altura da imagem
- `load_time_ms` (integer): Tempo de carregamento em ms
- `file_size_bytes` (integer): Tamanho do arquivo
- `original_size_bytes` (integer): Tamanho original antes da otimização
- `bandwidth_saved_bytes` (integer): Bytes economizados
- `device_type` (text): Tipo de dispositivo (mobile, tablet, desktop)
- `viewport_width` (integer): Largura do viewport
- `viewport_height` (integer): Altura do viewport
- `connection_type` (text): Tipo de conexão (4g, 3g, wifi)
- `page_url` (text): URL da página
- `user_agent` (text): User agent do navegador
- `session_id` (text): ID da sessão do usuário

#### `web_vitals_analytics`
Armazena métricas de Core Web Vitals.

**Campos**:
- `id` (UUID): Identificador único
- `created_at` (timestamp): Data/hora da medição
- `metric_name` (text): Nome da métrica (LCP, INP, CLS, FCP, TTFB)
- `metric_value` (numeric): Valor da métrica
- `metric_rating` (text): Rating (good, needs-improvement, poor)
- `device_type` (text): Tipo de dispositivo
- `viewport_width` (integer): Largura do viewport
- `viewport_height` (integer): Altura do viewport
- `connection_type` (text): Tipo de conexão
- `page_url` (text): URL da página
- `page_type` (text): Tipo de página (home, blog, blog-post, services)
- `user_agent` (text): User agent
- `session_id` (text): ID da sessão

### 2. Views Agregadas

#### `image_analytics_summary`
Agregação diária de métricas de imagens.

```sql
SELECT
  DATE(created_at) as date,
  format,
  device_type,
  COUNT(*) as total_loads,
  AVG(load_time_ms) as avg_load_time_ms,
  SUM(bandwidth_saved_bytes) as total_bandwidth_saved_bytes,
  AVG(bandwidth_saved_bytes) as avg_bandwidth_saved_bytes,
  PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY load_time_ms) as median_load_time_ms,
  PERCENTILE_CONT(0.95) WITHIN GROUP (ORDER BY load_time_ms) as p95_load_time_ms
FROM public.image_analytics
GROUP BY DATE(created_at), format, device_type;
```

#### `web_vitals_summary`
Agregação diária de Core Web Vitals.

```sql
SELECT
  DATE(created_at) as date,
  metric_name,
  device_type,
  page_type,
  COUNT(*) as total_measurements,
  AVG(metric_value) as avg_value,
  PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY metric_value) as median_value,
  PERCENTILE_CONT(0.75) WITHIN GROUP (ORDER BY metric_value) as p75_value,
  PERCENTILE_CONT(0.95) WITHIN GROUP (ORDER BY metric_value) as p95_value,
  COUNT(CASE WHEN metric_rating = 'good' THEN 1 END) as good_count,
  COUNT(CASE WHEN metric_rating = 'needs-improvement' THEN 1 END) as needs_improvement_count,
  COUNT(CASE WHEN metric_rating = 'poor' THEN 1 END) as poor_count
FROM public.web_vitals_analytics
GROUP BY DATE(created_at), metric_name, device_type, page_type;
```

---

## Coleta de Dados

### 1. Rastreamento de Imagens

O componente `OptimizedImage` rastreia automaticamente:

```typescript
// Em OptimizedImage.tsx
const trackImageLoad = async (loadTimeMs: number, actualFormat: string) => {
  await supabase.from('image_analytics').insert({
    image_url: src,
    format: actualFormat,
    width,
    height,
    load_time_ms: loadTimeMs,
    file_size_bytes: estimatedSize,
    original_size_bytes: estimatedOriginalSize,
    bandwidth_saved_bytes: bandwidthSaved,
    device_type: getDeviceType(),
    viewport_width: window.innerWidth,
    viewport_height: window.innerHeight,
    connection_type: getConnectionType(),
    page_url: window.location.href,
    user_agent: navigator.userAgent,
    session_id: getSessionId(),
  });
};
```

**Quando é rastreado**:
- No evento `onLoad` de cada imagem
- Apenas uma vez por imagem (evita duplicatas)
- Detecta automaticamente o formato real carregado (AVIF > WebP > JPEG)
- Calcula tempo de carregamento via `performance.now()`

**Como desabilitar** (se necessário):
```tsx
<OptimizedImage
  src="..."
  alt="..."
  width={1200}
  height={800}
  trackAnalytics={false} // Desabilita rastreamento
/>
```

### 2. Rastreamento de Core Web Vitals

O componente `WebVitals` usa `PerformanceObserver` para capturar métricas:

```typescript
// Em WebVitals.tsx
const reportMetric = async (metric: WebVitalsMetric) => {
  await supabase.from('web_vitals_analytics').insert({
    metric_name: metric.name,
    metric_value: metric.value,
    metric_rating: metric.rating,
    device_type: getDeviceType(),
    viewport_width: window.innerWidth,
    viewport_height: window.innerHeight,
    connection_type: getConnectionType(),
    page_url: window.location.href,
    page_type: getPageType(),
    user_agent: navigator.userAgent,
    session_id: getSessionId(),
  });
};
```

**Métricas rastreadas**:
- **LCP** (Largest Contentful Paint): Capturado via `largest-contentful-paint` observer
- **INP** (Interaction to Next Paint): Capturado via `event` observer
- **CLS** (Cumulative Layout Shift): Capturado via `layout-shift` observer

**Quando é rastreado**:
- LCP: Quando o maior elemento visível é renderizado
- INP: Em cada interação do usuário
- CLS: Continuamente durante a navegação
- Enviado ao banco no evento `visibilitychange` (ao sair da página)

---

## Funcionalidades do Dashboard

### 1. Filtro de Período

Filtros disponíveis:
- **Últimas 24 horas**: Dados da última 1 dia
- **Últimos 7 dias**: Padrão, mostra última semana
- **Últimos 30 dias**: Mostra último mês
- **Últimos 90 dias**: Mostra último trimestre

### 2. Cards de Resumo

#### Imagens Carregadas
- Total de imagens otimizadas no período
- Contador simples de registros

#### Bandwidth Economizado
- Total de bytes economizados via otimização
- Porcentagem de economia (~70% típico)
- Formato humanizado (KB, MB, GB)

#### Tempo Médio de Carga
- Média de todos os tempos de carregamento
- Em milissegundos
- Inclui todas as imagens e dispositivos

#### Core Web Vitals
- Percentual de métricas com score "good"
- Indicador geral de saúde do site
- Meta: > 75% "good"

### 3. Tab: Performance de Imagens

#### Distribuição de Formatos
**Tipo**: Gráfico de Pizza (Pie Chart)

Mostra quantas imagens foram carregadas em cada formato:
- WebP
- AVIF
- JPEG
- PNG

**Insights**:
- WebP e AVIF devem dominar (melhor compressão)
- JPEG indica fallback para navegadores antigos
- Alto uso de PNG pode indicar imagens não otimizadas

#### Distribuição por Dispositivo
**Tipo**: Gráfico de Barras (Bar Chart)

Mostra carregamentos por tipo de dispositivo:
- Mobile (< 768px)
- Tablet (768px - 1024px)
- Desktop (> 1024px)

**Insights**:
- Se mobile dominar, priorize otimização para mobile
- Ajuste qualidades de imagem por dispositivo

#### Bandwidth Economizado ao Longo do Tempo
**Tipo**: Gráfico de Linha (Line Chart)

Mostra economia de bandwidth dia a dia.

**Insights**:
- Tendência crescente = mais imagens otimizadas
- Picos indicam dias com mais tráfego
- Use para calcular savings mensais

#### Tempo de Carregamento por Dispositivo
**Tipo**: Gráfico de Barras (Bar Chart)

Compara tempo médio de carga entre dispositivos.

**Insights**:
- Mobile geralmente mais lento (conexão, processamento)
- Se diferença for grande, considere ajustar qualidades
- Meta: < 500ms para todas as plataformas

### 4. Tab: Core Web Vitals

#### Distribuição de Scores
**Tipo**: Gráfico de Pizza (Pie Chart)

Mostra proporção de métricas:
- Good (verde)
- Needs Improvement (amarelo)
- Poor (vermelho)

**Insights**:
- Meta: > 75% "good"
- "Poor" alto indica problemas críticos
- Foque em melhorar "needs-improvement"

#### LCP por Dispositivo
**Tipo**: Gráfico de Barras (Bar Chart)

Largest Contentful Paint médio por dispositivo.

**Métricas**:
- Good: < 2.5s
- Needs Improvement: 2.5s - 4s
- Poor: > 4s

**Como melhorar**:
- Priorize carregamento de hero images (`priority={true}`)
- Use preload para recursos críticos
- Otimize imagens acima da dobra

#### INP por Dispositivo
**Tipo**: Gráfico de Barras (Bar Chart)

Interaction to Next Paint médio por dispositivo.

**Métricas**:
- Good: < 200ms
- Needs Improvement: 200ms - 500ms
- Poor: > 500ms

**Como melhorar**:
- Reduza JavaScript bloqueante
- Use debounce em inputs (já implementado)
- Code splitting para lazy load

#### CLS por Dispositivo
**Tipo**: Gráfico de Barras (Bar Chart)

Cumulative Layout Shift médio por dispositivo.

**Métricas**:
- Good: < 0.1
- Needs Improvement: 0.1 - 0.25
- Poor: > 0.25

**Como melhorar**:
- Sempre defina width/height em imagens (já implementado)
- Evite inserir conteúdo acima do fold
- Use `font-display: swap` (já implementado)

---

## Privacidade e Segurança

### RLS Policies

#### image_analytics
```sql
-- Qualquer um pode inserir (sem auth)
CREATE POLICY "Anyone can insert image analytics"
ON public.image_analytics FOR INSERT
TO public
WITH CHECK (true);

-- Apenas admins podem visualizar
CREATE POLICY "Admins can view all image analytics"
ON public.image_analytics FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));
```

#### web_vitals_analytics
```sql
-- Qualquer um pode inserir (sem auth)
CREATE POLICY "Anyone can insert web vitals"
ON public.web_vitals_analytics FOR INSERT
TO public
WITH CHECK (true);

-- Apenas admins podem visualizar
CREATE POLICY "Admins can view all web vitals"
ON public.web_vitals_analytics FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));
```

### Dados Coletados

**Informações pessoais**: NÃO são coletadas
- Sem cookies de terceiros
- Sem identificadores de usuários
- Sem IPs armazenados

**Informações técnicas**: SIM são coletadas
- User agent (navegador e sistema)
- Dimensões de viewport
- Tipo de conexão
- URLs visitadas
- Session ID (gerado localmente, não persistente)

### Session ID

```typescript
const getSessionId = () => {
  let sessionId = sessionStorage.getItem('analytics_session_id');
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem('analytics_session_id', sessionId);
  }
  return sessionId;
};
```

- Gerado localmente no navegador
- Armazenado em `sessionStorage` (limpo ao fechar aba)
- Não rastreia usuários entre sessões
- Usado apenas para agrupar métricas da mesma visita

---

## Performance e Otimização

### Índices do Banco

```sql
-- Image Analytics
CREATE INDEX idx_image_analytics_created_at ON image_analytics(created_at DESC);
CREATE INDEX idx_image_analytics_format ON image_analytics(format);
CREATE INDEX idx_image_analytics_device_type ON image_analytics(device_type);
CREATE INDEX idx_image_analytics_page_url ON image_analytics(page_url);

-- Web Vitals Analytics
CREATE INDEX idx_web_vitals_created_at ON web_vitals_analytics(created_at DESC);
CREATE INDEX idx_web_vitals_metric_name ON web_vitals_analytics(metric_name);
CREATE INDEX idx_web_vitals_device_type ON web_vitals_analytics(device_type);
CREATE INDEX idx_web_vitals_page_url ON web_vitals_analytics(page_url);
```

### Estratégia de Retenção

**Recomendação**: Limpar dados antigos periodicamente

```sql
-- Deletar dados com mais de 90 dias
DELETE FROM image_analytics WHERE created_at < NOW() - INTERVAL '90 days';
DELETE FROM web_vitals_analytics WHERE created_at < NOW() - INTERVAL '90 days';
```

**Criar cron job** (via Supabase):
```sql
-- Executar semanalmente
SELECT cron.schedule(
  'cleanup-old-analytics',
  '0 0 * * 0', -- Todo domingo à meia-noite
  $$
  DELETE FROM image_analytics WHERE created_at < NOW() - INTERVAL '90 days';
  DELETE FROM web_vitals_analytics WHERE created_at < NOW() - INTERVAL '90 days';
  $$
);
```

### Batch Inserts

Para sites com alto tráfego, considere batch inserts:

```typescript
// Acumular métricas no cliente
let metricsQueue: any[] = [];

const queueMetric = (metric: any) => {
  metricsQueue.push(metric);
  
  // Enviar em batch a cada 10 métricas ou 30 segundos
  if (metricsQueue.length >= 10) {
    flushMetrics();
  }
};

const flushMetrics = async () => {
  if (metricsQueue.length === 0) return;
  
  const batch = [...metricsQueue];
  metricsQueue = [];
  
  await supabase.from('image_analytics').insert(batch);
};

// Flush ao sair da página
window.addEventListener('beforeunload', flushMetrics);
```

---

## Interpretação de Dados

### Benchmarks Recomendados

#### Performance de Imagens

| Métrica | Excellent | Good | Needs Work |
|---------|-----------|------|------------|
| **Load Time (Mobile)** | < 300ms | 300-500ms | > 500ms |
| **Load Time (Desktop)** | < 200ms | 200-400ms | > 400ms |
| **Bandwidth Savings** | > 75% | 60-75% | < 60% |
| **WebP Usage** | > 80% | 60-80% | < 60% |

#### Core Web Vitals

| Métrica | Good | Needs Improvement | Poor |
|---------|------|-------------------|------|
| **LCP** | < 2.5s | 2.5s - 4s | > 4s |
| **INP** | < 200ms | 200ms - 500ms | > 500ms |
| **CLS** | < 0.1 | 0.1 - 0.25 | > 0.25 |

### Ações Recomendadas

#### Se Load Time alto:
1. Verificar tamanho das imagens originais
2. Aumentar compressão (reduzir quality)
3. Implementar CDN
4. Verificar conexão de servidor

#### Se Bandwidth Savings baixo:
1. Garantir uso de WebP/AVIF
2. Revisar qualidades de compressão
3. Verificar se imagens não otimizadas

#### Se LCP alto:
1. Priorizar hero images (`priority={true}`)
2. Preload de recursos críticos
3. Reduzir tamanho de imagens above-the-fold

#### Se INP alto:
1. Revisar JavaScript pesado
2. Implementar code splitting
3. Otimizar event handlers

#### Se CLS alto:
1. Garantir width/height em todas as imagens
2. Reservar espaço para elementos dinâmicos
3. Evitar ads que empurram conteúdo

---

## Exemplos de Queries

### Total de Bandwidth Economizado por Mês

```sql
SELECT
  TO_CHAR(created_at, 'YYYY-MM') as month,
  SUM(bandwidth_saved_bytes) / 1024 / 1024 / 1024 as gb_saved,
  COUNT(*) as total_images
FROM image_analytics
GROUP BY TO_CHAR(created_at, 'YYYY-MM')
ORDER BY month DESC;
```

### Top 10 Páginas com Pior LCP

```sql
SELECT
  page_url,
  AVG(metric_value) as avg_lcp,
  COUNT(*) as measurements
FROM web_vitals_analytics
WHERE metric_name = 'LCP'
GROUP BY page_url
ORDER BY avg_lcp DESC
LIMIT 10;
```

### Formato Mais Usado por Dispositivo

```sql
SELECT
  device_type,
  format,
  COUNT(*) as usage_count,
  ROUND(COUNT(*) * 100.0 / SUM(COUNT(*)) OVER (PARTITION BY device_type), 2) as percentage
FROM image_analytics
GROUP BY device_type, format
ORDER BY device_type, usage_count DESC;
```

### Evolução de Core Web Vitals

```sql
SELECT
  DATE(created_at) as date,
  metric_name,
  AVG(metric_value) as avg_value,
  PERCENTILE_CONT(0.75) WITHIN GROUP (ORDER BY metric_value) as p75_value
FROM web_vitals_analytics
WHERE created_at >= NOW() - INTERVAL '30 days'
GROUP BY DATE(created_at), metric_name
ORDER BY date DESC, metric_name;
```

---

## Troubleshooting

### Dados não aparecem no dashboard

**Verificar**:
1. Usuário está autenticado como admin?
2. Tabelas `image_analytics` e `web_vitals_analytics` existem?
3. RLS policies estão corretas?
4. Componentes `OptimizedImage` e `WebVitals` estão sendo usados?

**Debug**:
```sql
-- Verificar se há dados
SELECT COUNT(*) FROM image_analytics;
SELECT COUNT(*) FROM web_vitals_analytics;

-- Verificar RLS
SELECT * FROM pg_policies WHERE tablename IN ('image_analytics', 'web_vitals_analytics');
```

### Muitos dados duplicados

**Causa**: Múltiplos componentes rastreando mesma imagem

**Solução**: 
- `OptimizedImage` já tem proteção via `hasTracked.current`
- Se persistir, adicionar debounce

### Performance do banco lenta

**Causas**:
- Falta de índices
- Muitos dados antigos
- Queries não otimizadas

**Soluções**:
1. Verificar índices (já criados)
2. Implementar política de retenção
3. Usar views agregadas para queries pesadas

---

## Roadmap Futuro

### Fase 1 (Atual) ✅
- [x] Tabelas e views
- [x] Rastreamento automático
- [x] Dashboard básico
- [x] Filtros de período

### Fase 2 (Próximo)
- [ ] Alertas automáticos (score < threshold)
- [ ] Exportação de relatórios (CSV, PDF)
- [ ] Comparação de períodos
- [ ] Heatmaps de dispositivos

### Fase 3 (Futuro)
- [ ] Integração com Google Analytics
- [ ] Real User Monitoring (RUM)
- [ ] A/B testing de otimizações
- [ ] Machine learning para predições

---

## Recursos Adicionais

- [Core Web Vitals - Google](https://web.dev/vitals/)
- [Image Optimization Best Practices](https://web.dev/fast/#optimize-your-images)
- [Supabase Analytics Tutorial](https://supabase.com/docs/guides/analytics)
- [Recharts Documentation](https://recharts.org/)
