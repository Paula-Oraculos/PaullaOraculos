
# PRD — Formulário de Captura WhatsApp (Paula Oráculos)

## Objetivo
Atualizar a página `/form-wpp` (`FormCapturaWpp`) para implementar exatamente o mesmo padrão de envio de dados ao webhook N8N que já existe na página `/wp-energiablindada` (`EnergiaBlindada`), mantendo o visual atual roxo/galáxia da `/form-wpp` mas com a lógica de formulário, validação e webhook idêntica à `/wp-energiablindada`.

---

## Contexto do Projeto

- Framework: React 18 + TypeScript + Vite + Tailwind CSS
- Roteamento: React Router DOM v6
- Utilitários de telefone: `src/lib/phoneUtils.ts`
- Lista de países: `src/lib/countries.ts`
- URL do Webhook N8N (produção): `https://paulaoraculos-n8n.cloudfy.live/webhook/paulaoraculos`

---

## Problema Atual na `/form-wpp`

A página `/form-wpp` tem as seguintes inconsistências em relação ao padrão estabelecido:

1. **`selectedCountry` declarada após uso** — `selectedCountry` é usada na função `handleJoinGroup` (linha 73) mas só é declarada em `const selectedCountry = countries.find(...)` na linha 167, causando hoisting incorreto
2. **`id_unico` com prefixo diferente** — usa `fw-` mas o padrão deveria ser consistente
3. **`Pais` envia `country` (string do nome)** em vez de `selectedCountry.name` — inconsistente
4. **Sem `useNavigate`** — usa `window.open` em vez de redirecionamento limpo
5. **Validação fraca** — não bloqueia submit se nome estiver vazio da mesma forma
6. **Sem `isSubmitting` de forma atômica** — o guard `if (name.trim() && whatsapp.trim())` está misturado com a validação do telefone
7. **Link de destino** diferente: usa `https://api.whatsapp.com/message/BIKYOKADPBMEF1?autoload=1&app_absent=0` — precisa ser confirmado se deve mudar

---

## Referência: Padrão Estabelecido (`/wp-energiablindada`)

### Estado do Componente
```typescript
const [name, setName] = useState("");
const [whatsapp, setWhatsapp] = useState("");
const [phoneError, setPhoneError] = useState("");
const [isSubmitting, setIsSubmitting] = useState(false);
const [selectedCountry, setSelectedCountry] = useState<typeof countries[number]>(countries[0]); // Brasil como padrão
const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
const dropdownRef = useRef<HTMLDivElement>(null);

const phoneConfig = getPhoneConfig(selectedCountry.ddi); // derivado do estado
```

### Máscara e Validação de Telefone em Tempo Real
```typescript
const handleWhatsappChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const maskedValue = applyPhoneMask(e.target.value, selectedCountry.ddi);
  setWhatsapp(maskedValue);
  const validation = validatePhone(maskedValue, selectedCountry.ddi);
  setPhoneError(validation.valid ? "" : validation.message);
};
```

### Seletor de País: Resetar telefone ao trocar país
```typescript
onClick={() => {
  setSelectedCountry(country);
  setIsCountryDropdownOpen(false);
  setWhatsapp(""); // OBRIGATÓRIO: resetar ao trocar país
}}
```

### Lógica de Submit — Exatamente como na Energia Blindada
```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (isSubmitting) return;

  // 1. Valida telefone ANTES de tudo
  const validation = validatePhone(whatsapp, selectedCountry.ddi);
  if (!validation.valid) {
    setPhoneError(validation.message);
    return;
  }

  setIsSubmitting(true);

  try {
    // 2. Formata telefone
    const phoneDigits = whatsapp.replace(/\D/g, "");
    const formattedPhone = `${selectedCountry.ddi}${phoneDigits}`;

    // 3. Funções auxiliares de enriquecimento
    const formatarData = () => {
      const agora = new Date();
      const dia = agora.getDate().toString().padStart(2, '0');
      const mes = (agora.getMonth() + 1).toString().padStart(2, '0');
      const ano = agora.getFullYear();
      const horas = agora.getHours().toString().padStart(2, '0');
      const minutos = agora.getMinutes().toString().padStart(2, '0');
      const segundos = agora.getSeconds().toString().padStart(2, '0');
      return `${dia}/${mes}/${ano} ${horas}:${minutos}:${segundos}`;
    };

    const obterDiaSemana = () => {
      const diasSemana = ['domingo', 'segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado'];
      return diasSemana[new Date().getDay()];
    };

    const obterHora = () => {
      const hora = new Date().getHours();
      if (hora >= 5 && hora < 12) return 'manhã';
      if (hora >= 12 && hora < 18) return 'tarde';
      return 'noite';
    };

    const obterDispositivo = () => {
      const ua = navigator.userAgent;
      if (/tablet|ipad|playbook|silk/i.test(ua)) return 'tablet';
      if (/mobile|iphone|ipod|android|blackberry|opera mini|iemobile/i.test(ua)) return 'mobile';
      return 'desktop';
    };

    const obterUTM = (param: string) => {
      const urlParams = new URLSearchParams(window.location.search);
      return urlParams.get(param) || '';
    };

    // 4. Envia ao webhook com mode: "no-cors"
    await fetch("https://paulaoraculos-n8n.cloudfy.live/webhook/paulaoraculos", {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id_unico: `fw-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
        Nome: name,
        Whatsapp: formattedPhone,
        DDI: selectedCountry.ddi,
        Status: "Novo",
        Data: formatarData(),
        Hora: obterHora(),
        Dia_Semana: obterDiaSemana(),
        Tag: "captura-wpp",
        Origem: "Formulário Landing Page",
        Grupo: "Grupo Paula Oráculos",
        Pais: selectedCountry.name,        // CORRIGIDO: selectedCountry.name (não country)
        URL: window.location.href,
        UTM_Source: obterUTM('utm_source'),
        UTM_Campaign: obterUTM('utm_campaign'),
        UTM_Medium: obterUTM('utm_medium'),
        Dispositivo: obterDispositivo(),
      }),
    });
  } catch (error) {
    console.error("Webhook error:", error);
    // Não exibe alert — apenas loga o erro e redireciona mesmo assim
  }

  // 5. Redireciona SEMPRE (mesmo com erro no webhook)
  window.open('https://api.whatsapp.com/message/BIKYOKADPBMEF1?autoload=1&app_absent=0', '_blank');
  setIsSubmitting(false);
};
```

### Payload JSON — 17 Campos Obrigatórios (ordem exata)
| Campo | Valor | Notas |
|---|---|---|
| `id_unico` | `fw-{timestamp}-{random6}` | Prefixo `fw-` para form-wpp |
| `Nome` | `name` (estado) | String |
| `Whatsapp` | `{ddi}{digitos}` | Sem formatação, concatenado |
| `DDI` | `selectedCountry.ddi` | String sem `+` |
| `Status` | `"Novo"` | Fixo |
| `Data` | `dd/mm/aaaa hh:mm:ss` | Formato PT-BR |
| `Hora` | `manhã` / `tarde` / `noite` | Período do dia |
| `Dia_Semana` | ex: `segunda-feira` | PT-BR |
| `Tag` | `"captura-wpp"` | Identificador da origem |
| `Origem` | `"Formulário Landing Page"` | Descrição legível |
| `Grupo` | `"Grupo Paula Oráculos"` | Grupo de destino |
| `Pais` | `selectedCountry.name` | Nome do país (não abreviação) |
| `URL` | `window.location.href` | URL completa com parâmetros |
| `UTM_Source` | `?utm_source=` | Ou string vazia |
| `UTM_Campaign` | `?utm_campaign=` | Ou string vazia |
| `UTM_Medium` | `?utm_medium=` | Ou string vazia |
| `Dispositivo` | `mobile`/`tablet`/`desktop` | Detectado por user-agent |

### Campo de Telefone — Layout e Estilo
```tsx
<div className="flex gap-2 items-stretch">
  {/* Country Selector */}
  <div ref={dropdownRef} className="relative flex-shrink-0">
    <button
      type="button"
      onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
      className="h-full flex items-center gap-1.5 px-3 rounded-xl text-white transition-all whitespace-nowrap min-h-[56px]"
      // ... estilos do tema atual (roxo/galáxia)
    >
      <span>{selectedCountry.flag}</span>
      <span>+{selectedCountry.ddi}</span>
      <ChevronDown className={`transition-transform ${isCountryDropdownOpen ? 'rotate-180' : ''}`} />
    </button>

    {isCountryDropdownOpen && (
      <div className="absolute top-full left-0 mt-2 w-64 max-h-60 overflow-y-auto rounded-xl z-50 ...">
        {countries.map((country) => (
          <button
            key={`${country.ddi}-${country.name}`}  // key com ddi+name para evitar duplicatas
            type="button"
            onClick={() => {
              setSelectedCountry(country);
              setIsCountryDropdownOpen(false);
              setWhatsapp(""); // Resetar ao trocar país
            }}
          >
            {country.flag} {country.name} +{country.ddi}
          </button>
        ))}
      </div>
    )}
  </div>

  {/* Phone Input */}
  <div className="flex-1 min-w-0 flex flex-col">
    <input
      type="tel"
      placeholder={phoneConfig.placeholder}
      value={whatsapp}
      onChange={handleWhatsappChange}
      className={`min-h-[56px] ... ${phoneError ? 'border-red-400' : '...'}`}
      required
    />
    {phoneError && <span className="text-red-400 text-xs mt-1">{phoneError}</span>}
  </div>
</div>
```

---

## O Que Deve Ser Mantido da `/form-wpp` (NÃO alterar)

- Visual/tema: fundo galáxia (indigo/roxo escuro), estrelas animadas, efeito nebulosa com mouse
- Textos e conteúdo: título "Paula Oráculos", benefícios do grupo, footer
- Link de redirecionamento: `https://api.whatsapp.com/message/BIKYOKADPBMEF1?autoload=1&app_absent=0`
- Estilo do botão CTA: gradiente âmbar/amarelo animado
- Animações: shooting stars, floating particles, fade-in, slide-up
- Mouse tracking com `requestAnimationFrame` (já otimizado)

---

## O Que Deve Ser Alterado na `/form-wpp`

1. Mover declaração de `selectedCountry` para o topo como estado: `useState<typeof countries[number]>(countries[0])`
2. Remover o estado `country: string` e usar apenas `selectedCountry` (objeto completo)
3. Substituir `handleJoinGroup` por `handleSubmit` com `e: React.FormEvent` e lógica do padrão
4. Envolver o formulário em tag `<form onSubmit={handleSubmit}>` em vez de `onClick` no botão
5. Corrigir `Pais: selectedCountry.name` (era `country`)
6. Adicionar reset `setWhatsapp("")` ao trocar país no dropdown
7. Remover `alert()` de validação — apenas usar estado de erro `phoneError`
8. Remover `console.log('Cadastro enviado!')` — não logar dados de usuário
9. Garantir `finally { setIsSubmitting(false) }` ou setar após redirect

---

## Importações Necessárias
```typescript
import { useState, useEffect, useRef } from 'react';
import { Sparkles, Moon, Stars, ArrowRight, ChevronDown } from 'lucide-react';
import { countries } from '@/lib/countries';
import { applyPhoneMask, getPhoneConfig, validatePhone } from '@/lib/phoneUtils';
```

---

## Checklist de Validação Pós-Implementação

- [ ] Formulário em tag `<form>` com `onSubmit`
- [ ] `selectedCountry` é um objeto `{name, ddi, flag}` inicializado como `countries[0]` (Brasil)
- [ ] `phoneConfig` derivado de `getPhoneConfig(selectedCountry.ddi)`
- [ ] `handleWhatsappChange` aplica máscara via `applyPhoneMask` e valida com `validatePhone`
- [ ] Ao trocar país no dropdown, `whatsapp` é resetado para `""`
- [ ] `handleSubmit` valida telefone ANTES de setar `isSubmitting = true`
- [ ] Payload tem exatamente 17 campos na ordem especificada
- [ ] `fetch` usa `mode: "no-cors"` 
- [ ] Redirecionamento acontece mesmo em caso de erro do webhook
- [ ] Nenhum `alert()` de validação
- [ ] `phoneError` exibido inline abaixo do campo de telefone
- [ ] `isSubmitting` desabilita o botão e exibe "Enviando..."
