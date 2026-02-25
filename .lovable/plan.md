

## Foto da Paulla + Correcao das Bandeiras

### 1. Adicionar Foto Oval da Paulla com Borda Dourada Animada

**Posicionamento escolhido:** Substituir o icone de carta de tarot (linhas 195-207) pela foto oval da Paulla. Este e o melhor local porque:
- Fica acima do titulo, dando autoridade e presenca imediata
- No mobile, aparece primeiro que o formulario, criando conexao antes do CTA
- No desktop, alinha perfeitamente com o lado esquerdo do hero
- Evita poluir a area do titulo ou do badge

**Especificacoes da foto:**
- Formato oval (120x120px desktop, 100x100px mobile)
- Borda dourada animada usando a mesma tecnica `conic-gradient` + `border-rotate` ja existente no card do formulario, porem mais sutil (3px de borda, rotacao mais lenta ~12s)
- Foto importada de `src/assets/paulla-portrait.webp` (ja existe no projeto) ou a foto enviada pelo usuario
- `object-fit: cover` para enquadrar o rosto
- Sombra dourada sutil ao redor (`box-shadow` com `rgba(212,175,55,0.3)`)

**Arquivo:** Copiar a foto enviada para `src/assets/paulla-avatar.jpeg` e importar no componente.

### 2. Corrigir Bandeiras em Todos os Dispositivos

**Problema:** No Windows, flag emojis como a bandeira do Brasil nao renderizam corretamente — aparecem como letras (ex: "BR" duas vezes: uma do `country.code` + outra do `country.flag` que vira texto).

**Solucao:** Usar imagens SVG de bandeiras do CDN `flagcdn.com` em vez de emoji. Cada pais ja tem um `code` (ISO 3166-1 alpha-2) no arquivo `countries.ts`, entao a URL da bandeira sera:

```
https://flagcdn.com/w40/{code_lowercase}.png
```

Exemplo: Brasil = `https://flagcdn.com/w40/br.png`

**Mudancas:**
- No botao do seletor: substituir `{selectedCountry.flag}` por uma tag `<img>` com a URL do flagcdn
- Remover o `{selectedCountry.code}` em texto (ja que a bandeira agora e visual)
- No dropdown de paises: mesma substituicao de emoji por `<img>`
- Tamanho da imagem: 20x15px com `rounded-sm` para elegancia

### 3. Remover Icone de Carta de Tarot

O bloco de linhas 195-207 (div com `✦` e bordas decorativas) sera substituido inteiramente pela foto oval.

---

### Technical Details

**Arquivos modificados:**
1. `src/pages/EnergiaBlindada.tsx` — substituir icone tarot por foto oval, trocar emoji flags por `<img>` do flagcdn

**Novo arquivo:**
1. `src/assets/paulla-avatar.jpeg` — copia da foto enviada pelo usuario

**Estrutura HTML da foto oval:**
```text
<div class="p-[3px] rounded-full" style="conic-gradient rotating border">
  <img src={paullaAvatar} class="w-[100px] h-[100px] md:w-[120px] md:h-[120px] rounded-full object-cover" />
</div>
```

**Estrutura HTML da bandeira (seletor):**
```text
<img
  src={`https://flagcdn.com/w40/${country.code.toLowerCase()}.png`}
  alt={country.name}
  class="w-5 h-[15px] rounded-sm object-cover"
/>
```

Animacao da borda da foto: reutiliza `@keyframes border-rotate` e `@property --border-angle` ja definidos no `<style>` do Helmet, com duracao mais lenta (12s) para sutileza.
