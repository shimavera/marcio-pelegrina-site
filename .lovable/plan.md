

# Plano: Rebranding para Dr. Márcio Pelegrina

Substituir toda a identidade do Dr. Luan Maciel pelo Dr. Márcio Pelegrina. Imagens do doutor ficarão como placeholders vazios. Informações desconhecidas (CROSP, endereço, telefone, redes sociais) ficarão com textos-modelo identificáveis como `[CROSP]`, `[ENDEREÇO]`, `[TELEFONE]`, etc.

## Alterações por arquivo

### Componentes principais
- **Header.tsx** — Remover import da logo, usar texto "Dr. Márcio Pelegrina" estilizado; WhatsApp link → `#` com texto `[TELEFONE]`
- **Footer.tsx** — Remover logo, trocar nome, links sociais → `#` com labels `[INSTAGRAM]`, `[TIKTOK]`
- **Hero.tsx** — Remover foto do doutor, colocar div placeholder cinza com ícone User; trocar textos para "Dr. Márcio Pelegrina"
- **AboutLenses.tsx** — Remover foto microscópio, placeholder cinza; trocar nome
- **WhatsAppButton.tsx** — Link → `#`, manter botão visível
- **AnnouncementBar.tsx** — Trocar nome e telefone por `[TELEFONE]`

### Páginas
- **Doctors.tsx** — Remover foto, placeholder cinza; trocar nome, CROSP → `[CROSP]`, descrições genéricas mantendo estrutura
- **LinkBio.tsx** — Remover logo/foto, trocar nome e links sociais por placeholders
- **Auth.tsx / BlogAdmin.tsx** — Remover logo, texto "Dr. Márcio Pelegrina"
- **TreatmentDetail.tsx** — Remover foto, placeholder
- **Unidades.tsx** — Nome → "Dr. Márcio Pelegrina", endereço → `[ENDEREÇO]`, telefone → `[TELEFONE]`, mapa → placeholder
- **PrivacyPolicy.tsx** — Trocar nome e CROSP
- **Index.tsx** — Verificar referências ao nome

### SEO e Metadata
- **index.html** — Title, meta description, OG tags → "Dr. Márcio Pelegrina" com dados genéricos
- **SEOHead.tsx / StructuredData.tsx / LocalBusinessSchema.tsx** — Trocar nome, endereço e dados por placeholders
- **robots.txt / sitemap.xml** — Atualizar domínio se referenciado

### Edge Functions
- **rss/index.ts, generate-post-content/index.ts, analyze-content-gaps/index.ts** — Trocar referências ao nome

### Componentes auxiliares
- **ClinicCarousel.tsx** — Trocar alt texts
- **Contact.tsx** — Trocar telefone/nome se presente

## Padrão de placeholders
| Info faltante | Placeholder |
|---|---|
| CROSP | `[CROSP]` |
| Telefone | `[TELEFONE]` |
| Endereço | `[ENDEREÇO]` |
| Instagram | `[INSTAGRAM]` |
| TikTok | `[TIKTOK]` |
| Email | `[EMAIL]` |
| Especialidade | Manter "Odontologia" genérico |

## Imagens
- Todas as fotos do doutor → div cinza claro com ícone de usuário e texto "Foto do Doutor"
- Logo → texto estilizado com fonte do projeto
- Fotos de clínica/casos → mantidas (são genéricas)

