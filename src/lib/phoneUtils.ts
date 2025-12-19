// Configurações de máscara e validação por país
export interface PhoneConfig {
  mask: string;
  placeholder: string;
  minDigits: number;
  maxDigits: number;
}

// Mapeamento de DDI para configurações de telefone
const phoneConfigs: Record<string, PhoneConfig> = {
  // Brasil - (00) 00000-0000
  '55': {
    mask: '(##) #####-####',
    placeholder: '(11) 99999-9999',
    minDigits: 10,
    maxDigits: 11,
  },
  // Argentina - (000) 000-0000
  '54': {
    mask: '(###) ###-####',
    placeholder: '(11) 1234-5678',
    minDigits: 10,
    maxDigits: 10,
  },
  // Estados Unidos/Canadá - (000) 000-0000
  '1': {
    mask: '(###) ###-####',
    placeholder: '(555) 123-4567',
    minDigits: 10,
    maxDigits: 10,
  },
  // Portugal - 000 000 000
  '351': {
    mask: '### ### ###',
    placeholder: '912 345 678',
    minDigits: 9,
    maxDigits: 9,
  },
  // Espanha - 000 00 00 00
  '34': {
    mask: '### ## ## ##',
    placeholder: '612 34 56 78',
    minDigits: 9,
    maxDigits: 9,
  },
  // México - (00) 0000 0000
  '52': {
    mask: '(##) #### ####',
    placeholder: '(55) 1234 5678',
    minDigits: 10,
    maxDigits: 10,
  },
  // Reino Unido - 0000 000 0000
  '44': {
    mask: '#### ### ####',
    placeholder: '7911 123 4567',
    minDigits: 10,
    maxDigits: 11,
  },
  // França - 0 00 00 00 00
  '33': {
    mask: '# ## ## ## ##',
    placeholder: '6 12 34 56 78',
    minDigits: 9,
    maxDigits: 9,
  },
  // Alemanha - 0000 0000000
  '49': {
    mask: '#### #######',
    placeholder: '1512 3456789',
    minDigits: 10,
    maxDigits: 11,
  },
  // Itália - 000 000 0000
  '39': {
    mask: '### ### ####',
    placeholder: '312 345 6789',
    minDigits: 9,
    maxDigits: 10,
  },
  // Chile - 0 0000 0000
  '56': {
    mask: '# #### ####',
    placeholder: '9 1234 5678',
    minDigits: 9,
    maxDigits: 9,
  },
  // Colômbia - 000 000 0000
  '57': {
    mask: '### ### ####',
    placeholder: '310 123 4567',
    minDigits: 10,
    maxDigits: 10,
  },
  // Peru - 000 000 000
  '51': {
    mask: '### ### ###',
    placeholder: '912 345 678',
    minDigits: 9,
    maxDigits: 9,
  },
  // Angola - 000 000 000
  '244': {
    mask: '### ### ###',
    placeholder: '912 345 678',
    minDigits: 9,
    maxDigits: 9,
  },
  // Moçambique - 00 000 0000
  '258': {
    mask: '## ### ####',
    placeholder: '82 123 4567',
    minDigits: 9,
    maxDigits: 9,
  },
  // Japão - 00-0000-0000
  '81': {
    mask: '##-####-####',
    placeholder: '90-1234-5678',
    minDigits: 10,
    maxDigits: 11,
  },
  // Austrália - 0000 000 000
  '61': {
    mask: '#### ### ###',
    placeholder: '0412 345 678',
    minDigits: 9,
    maxDigits: 9,
  },
};

// Configuração padrão para países não mapeados
const defaultConfig: PhoneConfig = {
  mask: '##############',
  placeholder: 'Número de telefone',
  minDigits: 7,
  maxDigits: 15,
};

// Obtém configuração de telefone por DDI
export const getPhoneConfig = (ddi: string): PhoneConfig => {
  return phoneConfigs[ddi] || defaultConfig;
};

// Aplica máscara ao número de telefone
export const applyPhoneMask = (value: string, ddi: string): string => {
  const config = getPhoneConfig(ddi);
  const digits = value.replace(/\D/g, '');
  
  // Se não tiver máscara específica, retorna só os dígitos limitados
  if (!phoneConfigs[ddi]) {
    return digits.slice(0, config.maxDigits);
  }
  
  let result = '';
  let digitIndex = 0;
  
  for (let i = 0; i < config.mask.length && digitIndex < digits.length; i++) {
    if (config.mask[i] === '#') {
      result += digits[digitIndex];
      digitIndex++;
    } else {
      result += config.mask[i];
    }
  }
  
  return result;
};

// Valida número de telefone
export const validatePhone = (value: string, ddi: string): { valid: boolean; message: string } => {
  const config = getPhoneConfig(ddi);
  const digits = value.replace(/\D/g, '');
  
  if (digits.length === 0) {
    return { valid: false, message: 'Telefone é obrigatório' };
  }
  
  if (digits.length < config.minDigits) {
    return { valid: false, message: `Mínimo de ${config.minDigits} dígitos` };
  }
  
  if (digits.length > config.maxDigits) {
    return { valid: false, message: `Máximo de ${config.maxDigits} dígitos` };
  }
  
  return { valid: true, message: '' };
};

// Extrai apenas os dígitos do telefone
export const getPhoneDigits = (value: string): string => {
  return value.replace(/\D/g, '');
};

// Formata número completo com DDI
export const formatFullPhone = (value: string, ddi: string): string => {
  const digits = getPhoneDigits(value);
  return `+${ddi}${digits}`;
};
