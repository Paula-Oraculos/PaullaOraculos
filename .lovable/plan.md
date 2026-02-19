## Atualização da Página `/wp-energiablindada`

### Resumo das Mudanças

Transformar a página `EnergiaBlindada` para o posicionamento do **Grupo Gratuito Paulla Oráculos**, aplicando nova paleta verde premium + dourado, novos textos e removendo a seção de cards de dor.

---

### 1. Identidade Visual — Nova Paleta de Cores

Substituição completa do tema dourado atual pelo verde premium:


| Elemento                     | Cor Atual                      | Nova Cor                              |
| ---------------------------- | ------------------------------ | ------------------------------------- |
| Fundo principal              | `#050505` (preto)              | `#0A1F15` (preto esverdeado profundo) |
| Gradiente radial de fundo    | `rgba(201,163,82,...)` dourado | `rgba(31,143,90,...)` verde profundo  |
| Partículas flutuantes        | `#c9a352` dourado              | `#2FAE66` verde vibrante              |
| Linha decorativa top do card | `#c9a352`                      | `#A18F5A` dourado accent              |
| Gradiente dos títulos        | `#e8d4a0 → #c9a352`            | `#7EB47C → #1F8F5A`                   |
| Texto accent/label           | `#c9a352`                      | `#A18F5A` dourado                     |
| Botão CTA                    | `#c9a352 → #e8d4a0`            | `#2FAE66 → #1F8F5A`                   |
| Focus dos inputs             | border `#c9a352`, glow dourado | border `#2FAE66`, glow verde          |
| Hover no dropdown            | `rgba(201,163,82,0.15)`        | `rgba(47,174,102,0.15)`               |


---

### 2. Alterações de Conteúdo (Copywriting)

#### Hero — Lado Esquerdo

- **Título principal:** "Grupo Gratuito Paulla Oráculos" *(com 2 L obrigatório)*
- **Subtítulo/promessa:** "Onde a sua confusão vira clareza. Chega de se sentir perdido(a) e com a mente pesada. Entre para o nosso grupo gratuito e receba ferramentas práticas para limpar sua energia e colocar sua vida nos trilhos."
- **Badge abaixo:** "Com **Paulla Oráculos**" *(2 L)*

#### Bullet Points de Benefícios (substituir os 4 atuais)

1. Alívio para o peso emocional — técnicas simples para tirar o cansaço das costas e recuperar sua paz
2. Pare de repetir os mesmos erros — entenda por que você trava e como destravar sua mente de vez
3. Sua caixa de ferramentas de bem-estar — aprenda a se cuidar e transformar sua realidade todos os dias
4. Você não está mais sozinho(a) — comunidade que entende o que você sente e busca a mesma evolução

#### Card do Formulário — Lado Direito

- **Label topo:** "🌿 Acesso 100% Gratuito"
- **Título do card (H2):** "Grupo Gratuito Aguadeiro"
- **Subtítulo do card:** "Entre para a comunidade que vai transformar sua realidade"
- **Botão CTA:** "Quero Fazer Parte"

---

### 3. Configuração do Webhook — Novos Valores de Payload

Mantém a mesma estrutura de 17 campos, apenas com valores diferentes:


| Campo      | Valor Atual                     | Novo Valor                     |
| ---------- | ------------------------------- | ------------------------------ |
| `id_unico` | `eb-...`                        | `ga-...` *(prefixo aguadeiro)* |
| `Tag`      | `"energia-blindada"`            | `"aguadeiro-gratuito"`         |
| `Origem`   | `"Formulário Energia Blindada"` | `"Formulário Paulla Oráculos"` |
| `Grupo`    | `"VIP Energia Blindada"`        | `"Grupo Gratuito Aguadeiro"`   |


O redirect pós-envio atual (`navigate("/wp-energiablindada/obrigado")`) deve ser substituído por `window.open` para o link do grupo WhatsApp (ou mantido para a mesma página de obrigado — como o PRD não especifica nova URL, manterei a página de obrigado existente com redirect).

> **Nota:** O PRD não menciona URL de destino após envio. Irei manter o redirect para `/wp-energiablindada/obrigado` existente, que é a página de "Obrigado" já criada.

---

### 4. Remoção da Seção de Dor (Pain Section)

Remover completamente o bloco `<section>` das linhas 455–511 que contém:

- Título "Se você sente isso, você precisa estar aqui..."
- Os 4 cards: Cansaço que nunca acaba, Você sente TUDO, Você carrega o peso do mundo, Ninguém te entende

---

### Technical Details

**Arquivo modificado:** `src/pages/EnergiaBlindada.tsx`

**Mudanças por bloco:**

1. **SEO (Helmet)** — atualizar `<title>` e `<meta description>` para o novo posicionamento
2. **Background radial** — trocar `rgba(201,163,82,...)` por `rgba(31,143,90,...)`
3. **Partículas** — trocar cor `#c9a352` por `#2FAE66`
4. **Logo decorativo** — trocar bordas `#c9a352` por `#A18F5A`
5. **H1 gradiente** — trocar `#e8d4a0 → #c9a352` por `#7EB47C → #1F8F5A`
6. **Texto do H1** — "Grupo Gratuito Paulla Oráculos"
7. **Parágrafo descritivo** — novo texto da promessa
8. **Badge** — trocar para "Com **Paulla Oráculos**" (2 L)
9. **Lista de bullets** — 4 novos benefícios
10. **Card: linha top** — trocar `#c9a352` por `#A18F5A`
11. **Card: label topo** — "🌿 Acesso 100% Gratuito" em verde/dourado
12. **Card: H2** — "Grupo Gratuito Aguadeiro"
13. **Card: subtítulo** — novo texto
14. **Inputs: focus** — trocar `#c9a352` por `#2FAE66`, glow verde
15. **Dropdown: hover** — trocar `rgba(201,163,82,...)` por `rgba(47,174,102,...)`
16. **Botão CTA** — gradiente `#2FAE66 → #1F8F5A`, texto "Quero Fazer Parte", sombra verde
17. **Texto de segurança** — "Seus dados estão 100% seguros"
18. **Webhook payload** — atualizar `id_unico` prefix, `Tag`, `Origem`, `Grupo`
19. **Remover Pain Section** completa (linhas 455–511)