import { Box, Button, Flex } from '@chakra-ui/react';
import { AxiosResponse } from 'axios';
import Link from 'next/link';
import Router from 'next/router';
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
  const { data: response } = useSWR<AxiosResponse<Produto[]>>('/api/produtos', (url) =>
    httpCliente.get(url),
  );

  const handleOnEdit = (produto: Produto) => {
    const urlResource = `/cadastro/produtos?id=${produto.id}`;
    Router.push(urlResource);
  };

  const handleOnDelete = (produto: Produto) => {
    console.log(produto);
    if (typeof produto.id === 'number') {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      service.deletarProduto(produto.id).then((e) => {
        console.log('aaaa');
        message.viewToast({
          status: 'success',
          title: 'Produto deletado',
        });
      });
    }
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
            produtos={response?.data || []}
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
