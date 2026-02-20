
## Atualização da Página `/wp-energiablindada` — Verde Esmeralda + Novo Copy

### O que será feito

Reescrever o arquivo `src/pages/EnergiaBlindada.tsx` aplicando a nova identidade visual verde esmeralda, os novos textos do PRD e removendo a seção de dor.

---

### Mapa de todas as mudanças (linha a linha)

**1. SEO / Helmet** (linhas 150–153)
- `<title>`: "Grupo Gratuito Paulla Oráculos | Clareza, Paz e Evolução"
- `<meta description>`: novo texto sobre o grupo gratuito

**2. Background principal** (linha 161)
- `bg-[#050505]` → `bg-[#0A1F15]` (preto esverdeado profundo)

**3. Gradiente radial de fundo** (linhas 166–171)
- `rgba(201, 163, 82, ...)` → `rgba(31, 143, 90, ...)` (verde profundo)

**4. Partículas flutuantes** (linha 179)
- `bg-[#c9a352]` → `bg-[#2FAE66]`

**5. Ícone decorativo de tarot** (linhas 196–207)
- Todas as ocorrências de `#c9a352` → `#A18F5A` (dourado accent)
- `rgba(201,163,82,...)` → `rgba(161,143,90,...)`

**6. Gradiente do H1** (linhas 212–218)
- `#e8d4a0 → #c9a352` → `#7EB47C → #1F8F5A`

**7. Texto do H1** (linhas 220–222)
- "Pare de Ser a Lixeira Emocional dos Outros" → **"Grupo Gratuito Paulla Oráculos"** (sem `<span>` duplo, título único)

**8. Parágrafo descritivo** (linhas 224–227)
- Novo texto: "Onde a sua confusão vira clareza. Chega de se sentir perdido(a) e com a mente pesada. Entre para o nosso grupo gratuito e receba ferramentas práticas para limpar sua energia e colocar sua vida nos trilhos."

**9. Badge "Com Paula"** (linhas 229–234)
- `rgba(201,163,82,0.1)` → `rgba(47,174,102,0.1)`
- `rgba(201,163,82,0.2)` → `rgba(47,174,102,0.2)`
- "Paula Oráculos" → **"Paulla Oráculos"** (2 L)
- Ícone `✨` → `🌿`

**10. Lista de bullet points** (linhas 237–253)
Substituir os 4 itens atuais por:
- "Alívio para o peso emocional — técnicas simples para tirar o cansaço das costas e recuperar sua paz"
- "Pare de repetir os mesmos erros — entenda por que você trava e como destravar sua mente de vez"
- "Sua caixa de ferramentas de bem-estar — aprenda a se cuidar e transformar sua realidade todos os dias"
- "Você não está mais sozinho(a) — comunidade que entende o que você sente e busca a mesma evolução"
- Checkmarks: `text-[#c9a352]` → `text-[#2FAE66]`

**11. Card — linha top decorativa** (linhas 278–282)
- `#c9a352` → `#A18F5A`

**12. Card — label topo** (linha 284)
- `text-[#c9a352]` → `text-[#A18F5A]`
- `"🔒 Acesso Exclusivo"` → `"🌿 Acesso 100% Gratuito"`

**13. Card — H2 gradiente** (linhas 291–294)
- `#e8d4a0 → #c9a352` → `#7EB47C → #1F8F5A`

**14. Card — título H2** (linhas 297–300)
- "Grupo VIP / Energia Blindada" → **"Grupo Gratuito Aguadeiro"** (sem `<br />`)

**15. Card — subtítulo** (linha 302)
- "Esteja entre quem vai blindar sua energia primeiro" → "Entre para a comunidade que vai transformar sua realidade"

**16. Inputs — focus/hover** (linhas 326–335 e 410–423)
- `borderColor: "#c9a352"` → `"#2FAE66"`
- `rgba(201, 163, 82, 0.4)` → `rgba(47, 174, 102, 0.4)` (glow verde)

**17. Dropdown — hover dos itens** (linha 383)
- `rgba(201,163,82,0.15)` → `rgba(47,174,102,0.15)`
- `rgba(201,163,82,0.2)` → `rgba(47,174,102,0.2)`
- Border do dropdown: `rgba(201, 163, 82, 0.3)` → `rgba(47,174,102,0.3)`

**18. Botão CTA** (linhas 437–443)
- Gradiente: `#c9a352, #e8d4a0` → `#2FAE66, #1F8F5A`
- Sombra: `rgba(201, 163, 82, 0.4)` → `rgba(47, 174, 102, 0.4)`
- Texto: "Quero Blindar Minha Energia" → **"Quero Fazer Parte"**
- Cor do texto do botão: `#050505` → `#ffffff` (texto branco sobre verde)

**19. Ícone de segurança** (linha 448)
- `text-[#c9a352]` → `text-[#2FAE66]`

**20. Webhook payload** (linhas 113, 121–123)
- `id_unico`: prefixo `eb-` → `ga-`
- `Tag`: `"energia-blindada"` → `"aguadeiro-gratuito"`
- `Origem`: `"Formulário Energia Blindada"` → `"Formulário Paulla Oráculos"`
- `Grupo`: `"VIP Energia Blindada"` → `"Grupo Gratuito Aguadeiro"`

**21. Remover Pain Section completa** (linhas 455–511)
- Apagar todo o bloco `<section className="py-16 md:py-20">` com os 4 cards de dor

---

### Technical Details

**Arquivo modificado:** `src/pages/EnergiaBlindada.tsx` (apenas este arquivo)

**Paleta aplicada:**
```text
#0A1F15 — fundo preto esverdeado
#1F8F5A — verde profundo (gradiente radial)
#2FAE66 — verde vibrante (partículas, botão, focus)
#7EB47C — verde claro (gradiente títulos - início)
#1F8F5A — verde escuro (gradiente títulos - fim)
#A18F5A — dourado accent (bordas decorativas, labels)
rgba(47,174,102,...) — versões transparentes do verde para glows e hovers
```

**Redirect mantido:** `navigate("/wp-energiablindada/obrigado")` — sem alteração pois nenhuma URL nova foi especificada no PRD.
