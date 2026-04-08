

## Barra de Avisos Rotativa no Topo do Site

Criar uma barra de avisos fixa no topo da página (acima do header), com mensagens que rotacionam automaticamente, em estilo premium e discreto.

### Mensagens rotativas

1. "Atendimento exclusivamente particular"
2. "Não aceitamos convênios odontológicos"
3. "No momento, não estamos aceitando novos currículos"

### Implementação

**Novo componente `src/components/AnnouncementBar.tsx`**
- Barra fina fixada no topo (acima do header)
- Fundo escuro (`bg-foreground text-background`) para destaque
- Altura compacta (~32px)
- Mensagens rotacionam a cada 4 segundos com animação de fade
- Botão de fechar (X) opcional para dispensar

**Ajustes no layout**
- `src/components/Header.tsx`: adicionar `top` offset para acomodar a barra (ex: `top-8` quando a barra está visível)
- `src/pages/Index.tsx`: incluir o `<AnnouncementBar />` antes do `<Header />`
- `src/components/Hero.tsx`: ajustar `pt` se necessário para compensar a barra extra

### Estilo visual

- Fundo escuro sólido com texto claro, tipografia pequena (`text-xs sm:text-sm`)
- Transição suave entre mensagens (fade in/out)
- Ícone sutil ao lado de cada mensagem (ex: `AlertTriangle` para convênios, `Info` para currículos)
- Tracking espaçado e uppercase para sofisticação

### Detalhes técnicos

- `useState` + `useEffect` com `setInterval` para rotação automática
- Animação CSS de fade entre mensagens
- `z-[60]` para ficar acima do header (`z-50`)
- Componente reutilizável, importado apenas na Index (ou globalmente se desejado)

