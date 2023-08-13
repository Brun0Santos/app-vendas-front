import { Flex, Grid, GridItem } from '@chakra-ui/react';
import { Button } from '@chakra-ui/react';
import { useState } from 'react';
import { BsSearch } from 'react-icons/bs';

import { formatCPF } from '@/app/util/parserValue';
import InputData from '@/components/common/input/input';
import Layout from '@/components/layout/layout';

export const ListagemClientes = () => {
  const [nome, setNome] = useState<string>('');
  const [cpf, setCpf] = useState<string>('');

  return (
    <div>
      <Layout titulo="Listagem de Clientes">
        <Flex p={'25px'} w={'90%'}>
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
              <Button colorScheme="blue">
                <p style={{ marginRight: '10px' }}>Pesquisar</p>
                <BsSearch />
              </Button>
            </GridItem>
          </Grid>
        </Flex>
      </Layout>
    </div>
  );
};
