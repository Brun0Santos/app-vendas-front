import * as z from 'zod';

const message = (campo: string, caracteres: number): string => {
  return `O campo ${campo} deve possuir pelo menos ${caracteres} caracteres.`;
};

export const clienteCadastroSchema = z.object({
  nome: z
    .string()
    .trim()
    .min(3, { message: message('nome', 3) })
    .toLowerCase(),

  cpf: z
    .string()
    .trim()
    .min(11, { message: message('cpf', 11) }),

  dataNascimento: z
    .string({ required_error: 'campo obrigatório' })
    .min(3, { message: message('data nascimento', 6) })
    .trim(),

  endereco: z
    .string()
    .trim()
    .toLowerCase()
    .min(3, { message: 'O campo nome deve possuir pelo menos 3 caracteres.' }),

  email: z
    .string()
    .trim()
    .email()
    .toLowerCase()
    .min(3, { message: 'O campo nome deve possuir pelo menos 4 caracteres.' }),

  telefone: z
    .string()
    .trim()
    .min(3, { message: 'O campo nome deve possuir pelo menos 5 caracteres.' }),
});
