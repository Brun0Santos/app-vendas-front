import { Button, Flex, Grid, GridItem } from '@chakra-ui/react';
import Router from 'next/router';
import { Column } from 'primereact/column';
import { DataTable, DataTablePageEvent } from 'primereact/datatable';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { BsSearch, BsTrash } from 'react-icons/bs';
import { LuEdit } from 'react-icons/lu';

import { Cliente } from '@/app/models/clientes/clientesModel';
import { useClienteService } from '@/app/services/index';
import { formatCPF } from '@/app/util/parserValue';
import InputData from '@/components/common/input/input';
import ModalMessage from '@/components/common/messages/modalMessage';
import { Page } from '@/components/common/pageable/pageableCliente';
import Layout from '@/components/layout/layout';

export const ListagemClientes = () => {
  const [nome, setNome] = useState<string>('');
  const [cpf, setCpf] = useState<string>('');
  const [modal, setModal] = useState<boolean>(false);
  const [data, setData] = useState<Cliente>();
  const [clientes, setClientes] = useState<Page<Cliente>>({
    content: [],
    first: 0,
    number: 0,
    size: 7,
    totalElements: 0,
  });
  const service = useClienteService();

  const handlePage = (event?: DataTablePageEvent) => {
    // setModal(true); .finally(() => setModal(false));
    service
      .getPageClient(nome, cpf, event?.page, event?.rows)
      .then((result) => {
        setClientes(result);
      })
      .catch(() => toast.error('Nenhum cliente encontrado'));
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
          <LuEdit fontSize={'18'} />
        </button>
        <button onClick={() => toastData(registro)}>
          <BsTrash fontSize={'18'} />
        </button>
      </div>
    );
  };

  function cancelar() {
    setModal(false);
  }

  function toastData(cliente: Cliente) {
    setModal(true);
    setData(cliente);
  }

  const deletarCliente = () => {
    if (data?.id !== undefined) {
      service
        .deletarCliente(data.id)
        .then(() => {
          setModal(false);
          toast.success('Produto deletado com sucesso!');
          handlePage();
        })
        .catch(() => {
          toast.error('Erro ao tentar deletar produto.');
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
            tableStyle={{ minWidth: '50rem', marginTop: '50px' }}
            totalRecords={clientes.totalElements}
            first={clientes.first}
            lazy
            paginator
            rows={clientes.size}
            onPage={handlePage}
            emptyMessage={'Nenhum registro'}
            size="small"
            rowsPerPageOptions={[7, 10, 15]}
          >
            <Column field="id" header="Codigo" style={{ backgroundColor: 'white' }}></Column>
            <Column field="nome" header="Nome" style={{ backgroundColor: 'white' }}></Column>
            <Column field="cpf" header="CPF" style={{ backgroundColor: 'white' }}></Column>
            <Column field="email" header="Email" style={{ backgroundColor: 'white' }}></Column>
            <Column body={actionTemplate} style={{ backgroundColor: 'white' }} />
          </DataTable>
          <ModalMessage show={modal} cancelar={cancelar} excluir={deletarCliente} />
        </Flex>
      </Layout>
    </div>
  );
};
