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
