export function isBlank(value?: string | null): boolean {
  return !value || value.trim().length === 0;
}

export function removeNonNumeric(value?: string | null): string {
  if (!value) return '';
  return value.replace(/\D/g, '');
}
