

## Design System Global "Esmeralda + Ouro" — Plano de Implementacao

### Resumo do Conceito
Design system premium "templo moderno + joia" com paleta esmeralda profundo e ouro metalico. Estetica Apple-like: limpa, minimalista, microanimacoes suaves, glassmorphism discreto. Foco em conversao com CTA dominante e hierarquia visual clara.

---

### Fase 1: Criar Design System Global (CSS Tokens + Componentes)

**Arquivo: `src/index.css`** — Reescrever tokens e adicionar componentes globais

Tokens (CSS custom properties como unica fonte de verdade):

| Token | Valor | Uso |
|---|---|---|
| `--emerald-deep` | `#0A1F15` | Background principal (body) |
| `--emerald-base` | `#1F8F5A` | Gradientes radiais, titulos |
| `--emerald-vibrant` | `#2FAE66` | Botoes secundarios, checkmarks, focus |
| `--emerald-soft` | `#7EB47C` | Gradientes suaves, glow |
| `--gold-accent` | `#A18F5A` | Detalhes, bordas, labels |
| `--gold-bright` | `#D4AF37` | CTA principal, destaques |
| `--gold-light` | `#E8D4A0` | Hover do CTA |
| `--ivory` | `#F5F0E8` | Texto principal |
| `--ivory-muted` | `#C5C5C5` | Texto secundario |
| `--surface-glass` | `rgba(255,255,255,0.05)` | Cards glass |
| `--surface-glass-border` | `rgba(255,255,255,0.12)` | Bordas glass |

Tipografia:
- Headings: Playfair Display (serif) — escala 48/36/24/18
- Body: Inter (sans) — escala 18/16/14/12
- Line-height: headings 1.2, body 1.6

Espacamentos: 4, 8, 12, 16, 24, 32, 48, 64px
Radius: 12, 16, 22px
Motion: duracoes 200ms (micro), 300ms (default), 600ms (entrada), ease `cubic-bezier(0.4, 0, 0.2, 1)`

Componentes CSS globais:
- `.btn-gold` — CTA dourado metalico com gradiente + glow + hover
- `.btn-emerald` — Botao verde vibrante
- `.btn-outline` — Outline marfim/dourado sutil
- `.card-glass` — Glass card com borda dourada sutil + sombra profunda
- `.input-dark` — Input com fundo transparente, focus verde
- `.badge-gold` — Badge/selo dourado
- `.divider-gold` — Divisor com gradiente dourado discreto
- `.bg-emerald-aura` — Background animado com auras (CSS puro, 20-40s, baixa opacidade)

Background animado global:
- Base: gradiente esmeralda profundo com vinheta
- 2-3 "auras" (blobs) desfocadas com `radial-gradient` + `@keyframes aura-drift` (30s, opacity 0.06-0.08)
- Sheen dourado sutil em area controlada
- `@media (prefers-reduced-motion: reduce)` — desativa animacoes, mantem fundo estatico

Atualizar `body` em `@layer base` de:
```
background: linear-gradient(to bottom, #0f0c29, #302b63, #24243e);
```
para:
```
background: #0A1F15;
```

---

### Fase 2: Atualizar Tailwind Config

**Arquivo: `tailwind.config.ts`**

- Adicionar cores do design system ao `theme.extend.colors`:
  - `emerald-deep`, `emerald-base`, `emerald-vibrant`, `emerald-soft`
  - Manter `gold-mystic` e `gold-bright` existentes mas atualizar valores
- Adicionar keyframes `aura-drift` para background animado
- Atualizar `cosmic-dark` para `#0A1F15`, `cosmic-mid` para `#1F8F5A`, `cosmic-light` para `#0A1F15`

---

### Fase 3: Atualizar Paginas e Componentes (por arquivo)

#### 3.1 `src/pages/Index.tsx` — Landing Page Principal
Sem mudancas estruturais (wrapper apenas), mas o body CSS ja muda o fundo.

#### 3.2 `src/components/Header.tsx`
- `bg-cosmic-dark/70` — ja funcionara com novo valor de `cosmic-dark`
- `border-white/10` — manter
- Logo glow: `rgba(218,165,32,...)` manter (ouro)
- `gradient-text` utility: atualizar de dourado puro para esmeralda+ouro
- Botao CTA: manter `from-gold-mystic to-gold-bright` (ja funciona)
- Texto "Paula Oraculos" -> "Paulla Oraculos" (2 L)

#### 3.3 `src/components/HeroSection.tsx`
- Radial gradients: `rgba(168,85,247,0.15)` (roxo) -> `rgba(31,143,90,0.15)` (verde)
- `rgba(212,175,55,0.15)` (dourado) -> manter
- Stars: `bg-gold-bright` -> manter
- `glassmorphism` badge -> manter (funciona com novo fundo)
- `gradient-text` -> atualizara via CSS global
- CTA button: manter estilo dourado

#### 3.4 `src/components/TheChoice.tsx`
- `bg-gradient-to-r from-gold-mystic/20 to-purple-500/20` -> `from-gold-mystic/20 to-emerald-base/20`
- Cards: manter glassmorphism, ajustar glow roxo para verde
- "Paula Oraculos" -> verificar se aparece (nao aparece neste componente)

#### 3.5 `src/components/PainVsSolution.tsx`
- `via-purple-900/10` -> `via-emerald-base/10`
- Cards de dor: `border-red-500/30` -> manter (semanticamente correto)
- Card solucao: manter `glow-gold`

#### 3.6 `src/components/TheMethod.tsx`
- Accordion items: `border-gold-mystic/30` -> manter
- Numeros dos modulos: gradiente dourado -> manter
- `hover:glow-gold` -> manter

#### 3.7 `src/components/AboutMentor.tsx`
- `from-purple-900/10` -> `from-emerald-base/10`
- `from-gold-mystic/20 to-purple-500/20` blur -> `from-gold-mystic/20 to-emerald-base/20`
- "Paula Oraculos" -> "Paulla Oraculos" (2 L)
- Cards: manter glassmorphism + gold borders

#### 3.8 `src/components/Testimonials.tsx`
- `from-background via-secondary/20 to-background` -> ajustar para emerald
- ShootingStars: manter (usa CSS vars)
- CTA button: manter dourado

#### 3.9 `src/components/OfferSection.tsx`
- `via-gold-mystic/5` -> manter
- `glassmorphism border-gold-mystic/50 glow-gold` -> manter
- Bonuses: `bg-purple-900/20 border-purple-500/30` -> `bg-emerald-base/20 border-emerald-vibrant/30`
- Texto `text-purple-300`/`text-purple-400` -> `text-emerald-soft`/`text-emerald-vibrant`

#### 3.10 `src/components/FooterSection.tsx`
- Atualizar "Paula Oraculos" -> "Paulla Oraculos" (2 L)
- `border-white/10` -> manter
- Adicionar badge "Paulla Oraculos" com estilo da marca

#### 3.11 `src/components/ExitIntentModal.tsx`
- `glassmorphism border-gold-mystic/50` -> manter (ja funciona)
- `bg-cosmic-dark/50` inputs -> atualizara com novo cosmic-dark
- `border-gold-mystic/30` -> manter
- Branding: "Paula Oraculos" -> "Paulla Oraculos" se existir no texto

#### 3.12 `src/pages/FormWpp.tsx`
- Background: `from-indigo-950 via-purple-950 to-black` -> `from-[#0A1F15] via-[#1F8F5A]/20 to-[#0A1F15]`
- Stars: `bg-white` e `bg-purple-200` -> `bg-white` e `bg-emerald-soft`
- Particles: `bg-purple-300` -> `bg-emerald-vibrant/30`
- Nebula: `rgba(88, 28, 135, 0.5)` -> `rgba(31, 143, 90, 0.3)`
- Card: `bg-white/10 border-purple-400/30` -> `bg-white/5 border-emerald-vibrant/30`
- Title gradient: `from-purple-200 via-pink-200 to-purple-200` -> `from-emerald-soft via-gold-accent to-emerald-soft`
- Icons: `text-purple-300`, `text-pink-300` -> `text-emerald-soft`, `text-gold-accent`
- Inputs: `border-purple-300/50` -> `border-emerald-vibrant/30`
- Focus: `ring-purple-400` -> `ring-emerald-vibrant`
- Dropdown: `bg-purple-900` -> `bg-[#0A1F15]`
- Dots: `bg-purple-400` -> `bg-emerald-vibrant`
- Footer text: `text-purple-200` -> `text-emerald-soft/70`
- CTA button: manter amber/yellow gradiente (ja premium)
- "Paula Oraculos" -> "Paulla Oraculos" (2 L)
- Beneficios: atualizar emojis e texto para match do novo branding

#### 3.13 `src/pages/EnergiaBlindada.tsx`
- JA ATUALIZADO na fase anterior — verificar apenas branding "Paulla" (2 L) ✓

#### 3.14 `src/pages/EnergiaBlindadaObrigado.tsx`
- `bg-[#050505]` -> `bg-[#0A1F15]`
- Radials: `rgba(201, 163, 82, ...)` -> `rgba(31, 143, 90, ...)`
- Particles: `bg-[#c9a352]` -> `bg-[#2FAE66]`
- Top gradient line: `#c9a352` -> `#A18F5A`
- Success icon: `border-[#c9a352]`, `rgba(201,163,82,...)` -> `border-[#2FAE66]`, `rgba(47,174,102,...)`
- "Atenção:" `text-[#c9a352]` -> `text-[#2FAE66]`
- `text-[#e8d4a0]` em -> `text-[#7EB47C]`
- Instructions box: `rgba(201, 163, 82, ...)` -> `rgba(47, 174, 102, ...)`
- Numbered circles: `bg-[rgba(201,163,82,0.2)] text-[#c9a352]` -> `bg-[rgba(47,174,102,0.2)] text-[#2FAE66]`
- WhatsApp CTA: manter verde WhatsApp `#25D366`
- Trust badge: `text-[#c9a352]` -> `text-[#2FAE66]`
- Title: "Energia Blindada - Paula Oraculos" -> "Grupo Gratuito - Paulla Oraculos"
- Meta description: atualizar para novo posicionamento

#### 3.15 `src/pages/CatalogoProdutos.tsx`
- Substituir cores roxas (`purple-*`) por verde esmeralda
- Gradientes e glows roxos -> verdes
- Manter estrutura e logica intactos
- "Paula Oraculos" -> "Paulla Oraculos" (2 L) em todos os textos

#### 3.16 `src/pages/NotFound.tsx`
- `bg-muted` -> `bg-[#0A1F15]`
- Adicionar estilo minimo da marca (texto branco, link dourado)

#### 3.17 `src/components/ui/button.tsx`
- Sem mudancas (usa CSS vars que serao atualizados)

#### 3.18 `src/components/ui/card.tsx`
- Sem mudancas (usa CSS vars)

---

### Fase 4: Acessibilidade e Performance

Checklist:
- `@media (prefers-reduced-motion: reduce)` desativa auras e particulas
- Contraste: texto `#F5F0E8` sobre `#0A1F15` = ratio 12.5:1 (AAA)
- Focus-visible: anel verde `#2FAE66` com offset 2px em todos os interativos
- Animacoes CSS puras (sem JS loops para background)
- Stars/particles com `useMemo` (ja implementado)

---

### Resumo de Arquivos Modificados

| # | Arquivo | Tipo de Mudanca |
|---|---|---|
| 1 | `src/index.css` | Tokens, body bg, componentes globais, background animado |
| 2 | `tailwind.config.ts` | Cores emerald, keyframes aura |
| 3 | `src/components/Header.tsx` | Branding "Paulla" |
| 4 | `src/components/HeroSection.tsx` | Radials roxo -> verde |
| 5 | `src/components/TheChoice.tsx` | Blur roxo -> verde |
| 6 | `src/components/PainVsSolution.tsx` | Gradient roxo -> verde |
| 7 | `src/components/AboutMentor.tsx` | Blur roxo -> verde, "Paulla" |
| 8 | `src/components/OfferSection.tsx` | Bonus roxo -> verde |
| 9 | `src/components/Testimonials.tsx` | Sem mudancas significativas |
| 10 | `src/components/FooterSection.tsx` | "Paulla" |
| 11 | `src/components/ExitIntentModal.tsx` | Verificar "Paulla" |
| 12 | `src/pages/FormWpp.tsx` | Tema completo roxo -> verde |
| 13 | `src/pages/EnergiaBlindadaObrigado.tsx` | Tema completo dourado -> verde |
| 14 | `src/pages/CatalogoProdutos.tsx` | Cores roxas -> verde |
| 15 | `src/pages/NotFound.tsx` | Background + estilo marca |

Total: ~15 arquivos. A implementacao sera feita em lotes para evitar erros.
