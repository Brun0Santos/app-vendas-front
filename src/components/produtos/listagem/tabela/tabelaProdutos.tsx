import { Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { BsTrash } from 'react-icons/bs';
import { LuEdit } from 'react-icons/lu';

import { Produto } from '@/app/models/produtos/produtosModel';

interface ProdutoRowProps {
  children?: React.ReactNode;
  produto: Produto;
}

interface ListaProdutos {
  children?: React.ReactNode;
  produtos?: Array<Produto>;
}

export function TabelaProdutos({ produtos }: ListaProdutos) {
  return (
    <div>
      <Table variant="simple" size={'lg'}>
        <Thead>
          <Tr>
            <Th>Id</Th>
            <Th>Código do Produto</Th>
            <Th>Nome</Th>
            <Th isNumeric>Preço</Th>
            <Th></Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>{produtos?.map((p, i) => <ProdutoRow produto={p} key={i} />)}</Tbody>
      </Table>
    </div>
  );
}

const ProdutoRow = ({ produto }: ProdutoRowProps) => {
  return (
    <Tr key={produto.id} _hover={{ bg: 'gray.50' }}>
      <Td>{produto.id}</Td>
      <Td>{produto.codProduto}</Td>
      <Td>{produto.nome}</Td>
      <Td isNumeric>{produto.preco}</Td>
      <Td fontSize={'20px'} textAlign={'end'}>
        <button>
          <LuEdit />
        </button>
      </Td>
      <Td fontSize={'20px'}>
        <button>
          <BsTrash />
        </button>
      </Td>
    </Tr>
  );
};
