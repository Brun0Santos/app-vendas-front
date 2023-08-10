import { Box, Button, Flex } from '@chakra-ui/react';
import Link from 'next/link';

// import { MdPlaylistAdd } from 'react-icons/md';
import { Produto } from '@/app/models/produtos/produtosModel';
import Layout from '@/components/layout/layout';

import { TabelaProdutos } from './tabela/tabelaProdutos';

const produtosArrays: Array<Produto> = [
  {
    id: '1',
    nome: 'teste',
    codProduto: '12121',
    dataCadastro: '',
    descricao: '',
    preco: 12121,
  },
  {
    id: '2',
    nome: 'teste',
    codProduto: '12121',
    dataCadastro: '',
    descricao: '',
    preco: 12121,
  },
];

export function ListagemProdutos() {
  return (
    <Layout titulo="Produtos">
      <Box w={'100%'}>
        <Link href={'/cadastro/produtos'}>
          <Button bg="green.200" m={'30px 0 15px 20px'} _hover={{ bg: 'gray.400' }}>
            Novo Produto
          </Button>
        </Link>

        <Flex flexDirection={'column'}>
          <TabelaProdutos produtos={produtosArrays} />
        </Flex>
      </Box>
    </Layout>
  );
}
