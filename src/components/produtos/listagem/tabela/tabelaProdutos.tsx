import { Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { BsTrash } from 'react-icons/bs';
import { LuEdit } from 'react-icons/lu';

import { Produto } from '@/app/models/produtos/produtosModel';

interface ProdutoRowProps {
  produto: Produto;
  onEdit: (produto: Produto) => void;
  onDelete: (produto: Produto) => void;
}

interface ListaProdutos {
  produtos?: Array<Produto>;
  onEdit: (produto: Produto) => void;
  onDelete: (produto: Produto) => void;
}

export function TabelaProdutos({ produtos, onEdit, onDelete }: ListaProdutos) {
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
        <Tbody>
          {produtos?.map((p, i) => (
            <ProdutoRow produto={p} key={i} onEdit={onEdit} onDelete={onDelete} />
          ))}
        </Tbody>
      </Table>
    </div>
  );
}

const ProdutoRow = ({ produto, onEdit, onDelete }: ProdutoRowProps) => {
  return (
    <Tr key={produto.id} _hover={{ bg: 'gray.50' }}>
      <Td>#{produto.id}</Td>
      <Td>{produto.codProduto}</Td>
      <Td>{produto.nome}</Td>
      <Td>{produto.preco} R$</Td>
      <Td fontSize={'20px'} textAlign={'end'}>
        {/* eslint-disable-next-line @typescript-eslint/no-unused-vars */}
        <button onClick={(e) => onEdit(produto)}>
          <LuEdit />
        </button>
      </Td>
      <Td fontSize={'20px'}>
        {/* eslint-disable-next-line @typescript-eslint/no-unused-vars */}
        <button onClick={(e) => onDelete(produto)}>
          <BsTrash />
        </button>
      </Td>
    </Tr>
  );
};
