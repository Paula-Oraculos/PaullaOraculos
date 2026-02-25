

## Background Animado Espiritual Premium para `/wp-gratuito`

### Problema Atual
O fundo da pagina e um verde chapado (`#0A1F15`) com apenas radial-gradients estaticos de baixa opacidade e 15 particulas pequenas. O resultado e visualmente monotono e sem vida.

### Solucao: Background Animado com Camadas Espirituais

Criar um background com multiplas camadas CSS animadas que evoquem espiritualidade e luxo, sem distrair do formulario.

---

### Camadas do Background (da mais profunda para a mais visivel)

**Camada 1 — Nebulosas Auricas (CSS puro)**
3 blobs grandes e desfocados que se movem lentamente, simulando campos de energia:
- Blob esmeralda (700px, opacidade 0.12, ciclo 25s)
- Blob dourado (500px, opacidade 0.08, ciclo 35s)
- Blob esmeralda claro (600px, opacidade 0.10, ciclo 30s)
- Movimento suave com `translateX/Y` e `scale` via keyframes

**Camada 2 — Constelacoes Sutis (Pontos Estaticos com Pulso)**
30-40 pontos minusculos (1-2px) em posicoes fixas espalhados pela tela, com opacidade baixa e um pulso lento individual (fade in/out em 3-6s), simulando estrelas/constelacoes espirituais. Cores alternando entre branco (`rgba(255,255,255,0.3)`) e dourado (`rgba(212,175,55,0.2)`).

**Camada 3 — Raios de Luz Dourada (Shimmer)**
2 feixes diagonais de luz dourada muito sutis que atravessam a tela lentamente (40-60s), simulando raios de sol entrando por uma janela de templo. Implementados com `linear-gradient` rotacionado e animacao de `translateX`.

**Camada 4 — Particulas Ascendentes (ja existentes, melhoradas)**
Aumentar de 15 para 25 particulas, adicionar variacao de tamanho (2-4px) e misturar cores entre verde (`#2FAE66`) e dourado (`#D4AF37`), com opacidade variada.

---

### Detalhes Tecnicos

**Arquivo modificado:** `src/pages/EnergiaBlindada.tsx`

**Novos keyframes** (adicionados ao bloco `<style>` do Helmet):
- `@keyframes aura-float-1` — blob 1 movimento orbital lento (25s)
- `@keyframes aura-float-2` — blob 2 movimento diferente (35s)
- `@keyframes aura-float-3` — blob 3 movimento terciario (30s)
- `@keyframes light-ray` — shimmer diagonal (50s)
- `@keyframes star-pulse` — pulso de estrela individual (3-6s)

**Estrutura HTML do background:**
```text
<!-- Nebulosas Auricas -->
<div class="fixed inset-0 z-0">
  <div class="blob emerald 700px blur-[150px] opacity-12 animate aura-float-1" />
  <div class="blob gold 500px blur-[120px] opacity-8 animate aura-float-2" />
  <div class="blob soft-green 600px blur-[140px] opacity-10 animate aura-float-3" />
</div>

<!-- Constelacoes -->
<div class="fixed inset-0 z-0">
  {stars.map(star => <div class="1-2px dot animate star-pulse" />)}
</div>

<!-- Raios de Luz -->
<div class="fixed inset-0 z-0 overflow-hidden">
  <div class="light-ray diagonal gold animate" />
  <div class="light-ray diagonal gold animate delayed" />
</div>

<!-- Particulas (melhoradas) -->
<div class="fixed inset-0 z-0">
  {particles.map(...)} <!-- 25 particulas verde+dourado -->
</div>
```

**Performance:** Tudo em CSS puro (transform + opacity), respeitando `prefers-reduced-motion`. As estrelas usam `useMemo` para posicoes estaveis.

**Resultado esperado:** Sensacao de estar dentro de um templo mistico iluminado por energia esmeralda e dourada, com profundidade e movimento sutil que da vida a pagina sem competir com o formulario.

