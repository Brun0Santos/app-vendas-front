import { AxiosResponse } from 'axios';

import { httpCliente } from '@/app/http/routes';
import { Produto } from '@/app/models/produtos/produtosModel';

const resourceUrl: string = '/api/produtos';

export const useProdutoService = () => {
  const salvar = async (produto: Produto): Promise<Produto> => {
    const response: AxiosResponse<Produto> = await httpCliente.post<Produto>(resourceUrl, produto);
    return response.data;
  };

  const atualizarProduto = async (produto: Produto): Promise<void> => {
    const url: string = `${resourceUrl}/${produto.id}`;
    await httpCliente.put<Produto>(url, produto);
  };

  const getProdutoFromId = async (id: string): Promise<Produto> => {
    const url: string = `${resourceUrl}/${id}`;
    const response: AxiosResponse<Produto> = await httpCliente.get(url);
    return response.data;
  };

  const deletarProduto = async (id: string): Promise<void> => {
    const url: string = `${resourceUrl}/${id}`;
    await httpCliente.delete(url);
  };

  return {
    salvar,
    atualizarProduto,
    getProdutoFromId,
    deletarProduto,
  };
};
