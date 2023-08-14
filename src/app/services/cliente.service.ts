import { AxiosResponse } from 'axios';

import { httpCliente } from '@/app/http/routes';
import { Cliente } from '@/app/models/clientes/clientesModel';
import { Page } from '@/components/common/pageable/pageableCliente';

const resourceUrl: string = '/api/clientes';

export const useClienteService = () => {
  const salvar = async (cliente: Cliente): Promise<Cliente> => {
    const response: AxiosResponse<Cliente> = await httpCliente.post<Cliente>(resourceUrl, cliente);
    return response.data;
  };

  const atualizarCliente = async (Cliente: Cliente): Promise<void> => {
    const url: string = `${resourceUrl}/${Cliente.id}`;
    await httpCliente.put<Cliente>(url, Cliente);
  };

  const getClienteFromId = async (id: string): Promise<Cliente> => {
    const url: string = `${resourceUrl}/${id}`;
    const response: AxiosResponse<Cliente> = await httpCliente.get(url);
    return response.data;
  };

  const deletarCliente = async (id: string): Promise<void> => {
    const url: string = `${resourceUrl}/${id}`;
    await httpCliente.delete(url);
  };

  const getPageClient = async (
    nome: string = '',
    cpf: string = '',
    page: number = 0,
    size: number = 7,
  ): Promise<Page<Cliente>> => {
    const url: string = `${resourceUrl}?name=${nome}&cpf${cpf}&page=${page}&size=${size}`;
    const response: AxiosResponse<Page<Cliente>> = await httpCliente.get<Page<Cliente>>(url);
    return response.data;
  };

  return {
    salvar,
    atualizarCliente,
    getClienteFromId,
    deletarCliente,
    getPageClient,
  };
};
