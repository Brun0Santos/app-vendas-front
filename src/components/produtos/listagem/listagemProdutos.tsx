import { Box, Button, Flex } from '@chakra-ui/react';
import { AxiosResponse } from 'axios';
import Link from 'next/link';
import Router from 'next/router';
import { useEffect, useState } from 'react';
import useSWR from 'swr';

import { httpCliente } from '@/app/http/routes';
import { Produto } from '@/app/models/produtos/produtosModel';
import { useProdutoService } from '@/app/services';
import Loader from '@/components/common/loader/loader';
import { messageToast } from '@/components/common/messages/messages';
import Layout from '@/components/layout/layout';

import { TabelaProdutos } from './tabela/tabelaProdutos';

export function ListagemProdutos() {
  const service = useProdutoService();
  const message = messageToast();
  const [listaProdutos, setListaProduto] = useState<Array<Produto>>([]);
  const { data: response } = useSWR<AxiosResponse<Produto[]>>('/api/produtos', (url) =>
    httpCliente.get(url),
  );

  useEffect(() => {
    setListaProduto(response?.data || []);
  }, [response]);

  const handleOnEdit = (produto: Produto) => {
    const urlResource = `/cadastro/produtos?id=${produto.id}`;
    Router.push(urlResource);
  };

  const handleOnDelete = (produto: Produto) => {
    //eslint-disable-next-line @typescript-eslint/no-unused-vars
    service.deletarProduto(String(produto.id)).then((e) => {
      message.viewToast({
        status: 'success',
        title: 'Produto deletado',
      });
    });
    const novaLista: Array<Produto> = listaProdutos.filter((p) => p.id !== produto.id);
    setListaProduto(novaLista);
  };

  return (
    <Layout titulo="Produtos">
      <Box w={'100%'}>
        <Link href={'/cadastro/produtos'}>
          <Button bg="green.200" m={'30px 0 15px 20px'} _hover={{ bg: 'gray.400' }}>
            Novo Produto
          </Button>
        </Link>

        <Flex flexDirection={'column'}>
          <TabelaProdutos
            produtos={listaProdutos}
            onEdit={handleOnEdit}
            onDelete={handleOnDelete}
          />
        </Flex>
        <Box textAlign={'center'} pt={'30px'}>
          <Loader isRender={!response} />
        </Box>
      </Box>
    </Layout>
  );
}
