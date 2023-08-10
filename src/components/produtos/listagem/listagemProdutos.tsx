import { Button } from '@chakra-ui/react';
import Link from 'next/link';

import Layout from '@/components/layout/layout';

export function ListagemProdutos() {
  return (
    <Layout titulo="Produtos">
      <Link href={'/cadastro/produtos'}>
        <Button colorScheme="blue">Novo Produto</Button>
      </Link>
      <br />
    </Layout>
  );
}
