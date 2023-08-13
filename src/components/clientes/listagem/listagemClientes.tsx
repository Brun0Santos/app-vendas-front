import {
  Button,
  Flex,
  Grid,
  GridItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import Router from 'next/router';
import { Column } from 'primereact/column';
import { DataTable, DataTablePageEvent } from 'primereact/datatable';
import { useState } from 'react';
import { BsSearch, BsTrash } from 'react-icons/bs';
import { LuEdit } from 'react-icons/lu';

import { Cliente } from '@/app/models/clientes/clientesModel';
import { useClienteService } from '@/app/services/index';
import { formatCPF } from '@/app/util/parserValue';
import InputData from '@/components/common/input/input';
import { messageToast } from '@/components/common/messages/messages';
import ModalMessage from '@/components/common/messages/modalMessage';
import { Page } from '@/components/common/pageable/pageableCliente';
import Layout from '@/components/layout/layout';

export const ListagemClientes = () => {
  const [nome, setNome] = useState<string>('');
  const [cpf, setCpf] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<Cliente>();
  const [clientes, setClientes] = useState<Page<Cliente>>({
    content: [],
    first: 0,
    number: 0,
    size: 7,
    totalElements: 0,
  });
  const serive = useClienteService();
  const message = messageToast();

  const handlePage = (event?: DataTablePageEvent) => {
    // setLoading(true); .finally(() => setLoading(false));
    serive.getPageClient(nome, cpf, event?.page, event?.rows).then((result) => {
      setClientes(result);
    });
  };

  const handleSubmit = () => {
    handlePage();
  };

  const actionTemplate = (registro: Cliente) => {
    const url = '/cadastro/clientes';
    return (
      <div>
        <button
          style={{ marginRight: '30px' }}
          onClick={() => Router.push(`${url}?id=${registro.id}`)}
        >
          <LuEdit />
        </button>
        <button onClick={() => toastMessageDelete(registro)}>
          <BsTrash />
        </button>
      </div>
    );
  };

  function cancelar() {
    setLoading(false);
  }

  function toastMessageDelete(cliente: Cliente) {
    setLoading(true);
    setData(cliente);
  }

  const deletarCliente = () => {
    if (data?.id !== undefined) {
      serive.deletarCliente(data.id).then(() => {
        setLoading(false);
        message.viewToast({
          title: 'Produto deletado com sucesso',
          status: 'success',
        });
      });
    }
  };

  return (
    <div>
      <Layout titulo="Listagem de Clientes">
        <Flex p={'25px'} w={'100%'} flexDirection={'column'}>
          <Grid templateColumns="repeat(3, 1fr)" gap={6} w="100%">
            <GridItem>
              <InputData
                label="Nome"
                typeInput="text"
                placeholder="Pesquisar por nome"
                valueInput={nome}
                onChanges={setNome}
              />
            </GridItem>

            <GridItem>
              <InputData
                label="CPF"
                typeInput="text"
                placeholder="Pesquisar por CPF"
                valueInput={cpf}
                onChanges={setCpf}
                formatter={formatCPF}
              />
            </GridItem>

            <GridItem ml={'20px'} mt={'31px'} fontSize={'20px'}>
              <Button colorScheme="blue" onClick={handleSubmit}>
                <p style={{ marginRight: '10px' }}>Pesquisar</p>
                <BsSearch />
              </Button>
            </GridItem>
          </Grid>

          <DataTable
            value={clientes.content}
            tableStyle={{ minWidth: '50rem', marginTop: '50px', color: 'red' }}
            totalRecords={clientes.totalElements}
            first={clientes.first}
            lazy
            paginator
            rows={clientes.size}
            onPage={handlePage}
            emptyMessage={'Nenhum registro'}
            size="small"
          >
            <Column field="id" header="Codigo" style={{ backgroundColor: 'white' }}></Column>
            <Column field="nome" header="Nome" style={{ backgroundColor: 'white' }}></Column>
            <Column field="cpf" header="CPF" style={{ backgroundColor: 'white' }}></Column>
            <Column field="email" header="Email" style={{ backgroundColor: 'white' }}></Column>
            <Column body={actionTemplate} style={{ backgroundColor: 'white' }} />
          </DataTable>
          <ModalMessage show={loading} cancelar={cancelar} excluir={deletarCliente} />
        </Flex>
      </Layout>
    </div>
  );
};
