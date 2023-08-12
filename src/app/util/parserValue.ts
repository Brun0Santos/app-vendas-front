import { isBlank, removeNonNumeric } from './funcoesUtil';

export const convereterEmBigDecimal = (value: string): number => {
  if (!value) {
    return 0;
  }
  return parseFloat(value.replace('.', '').replace(',', '.'));
};

export const formatReal = (valor: string) => {
  const v = ((Number(valor.replace(/\D/g, '')) / 100).toFixed(2) + '').split('.');

  const m = v[0]
    .split('')
    .reverse()
    .join('')
    .match(/.{1,3}/g);

  if (m == null) {
    throw new Error('Error');
  } else {
    for (let i = 0; i < m.length; i++) m[i] = m[i].split('').reverse().join('') + '.';

    const r = m.reverse().join('');

    return r.substring(0, r.lastIndexOf('.')) + ',' + v[1];
  }
};

export const formatCPF = (cpf?: string | null): string => {
  if (isBlank(cpf)) return '';
  cpf = removeNonNumeric(cpf);
  if (cpf.length > 11) cpf = cpf.substring(0, 11);
  if (cpf.length > 9) {
    cpf = `${cpf.substring(0, 3)}.${cpf.substring(3, 6)}.${cpf.substring(6, 9)}-${cpf.substring(
      9,
    )}`;
  } else if (cpf.length > 6) {
    cpf = `${cpf.substring(0, 3)}.${cpf.substring(3, 6)}.${cpf.substring(6)}`;
  } else if (cpf.length > 3) {
    cpf = `${cpf.substring(0, 3)}.${cpf.substring(3)}`;
  }
  return cpf;
};

export const formatTelefone = (telefone?: string | null): string => {
  telefone = removeNonNumeric(telefone);
  if (isBlank(telefone)) return '';
  if (telefone.length > 11) telefone = telefone.substring(0, 11);

  if (telefone.length === 11) {
    return `(${telefone.substring(0, 2)})${telefone.substring(2, 7)}-${telefone.substring(7)}`;
  } else if (telefone.length > 6) {
    return `(${telefone.substring(0, 2)})${telefone.substring(2, 6)}-${telefone.substring(6)}`;
  } else if (telefone.length > 2) {
    return `(${telefone.substring(0, 2)})${telefone.substring(2)}`;
  }

  return `(${telefone}`;
};

export const formatData = (data: string): string => {
  data = data.replace(/\D/g, '');

  if (data.length > 8) {
    data = data.substring(0, 8);
  }

  if (data.length >= 4) {
    data = data.replace(/(\d{2})(\d{2})(\d{0,4})/, '$1/$2/$3');
  } else if (data.length >= 2) {
    data = data.replace(/(\d{2})(\d{0,2})/, '$1/$2');
  }

  return data;
};
