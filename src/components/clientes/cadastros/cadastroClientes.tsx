import { Button, ButtonGroup, Flex, Grid, GridItem, Link } from '@chakra-ui/react';

import InputData from '@/components/common/input/input';
import Layout from '@/components/layout/layout';

export default function CadastroClientes() {
  return (
    <div>
      <Layout titulo="Clientes">
        <Flex flexDirection={'column'} p={'25px'} w={'97%'}>
          <Grid templateColumns="repeat(2, 1fr)" gap={6} w="100%">
            <GridItem>
              <InputData label="Código" typeInput="number" disableInput={true} />
            </GridItem>

            <GridItem>
              <InputData label="Data Cadastro" disableInput={true} />
            </GridItem>
          </Grid>

          <Grid templateColumns="repeat(3, 1fr)" gap={6} w="100%">
            <GridItem>
              <InputData label="Nome" placeholder="Digite seu nome" autoComplete="off" />
            </GridItem>

            <GridItem>
              <InputData
                label="CPF"
                typeInput="number"
                placeholder="Digite seu cpf"
                autoComplete="off"
              />
            </GridItem>

            <GridItem>
              <InputData
                label="Data Nascimento"
                typeInput="number"
                autoSave="false"
                placeholder="Digite sua data de nascimento"
              />
            </GridItem>
          </Grid>

          <InputData label="Endereço" placeholder="Digite seu endereço" autoComplete="off" />

          <Grid templateColumns="repeat(2, 1fr)" gap={6} w="100%">
            <GridItem>
              <InputData label="Email" typeInput="number" placeholder="Digite seu email" />
            </GridItem>

            <GridItem>
              <InputData
                label="Telefone"
                typeInput="number"
                autoSave="false"
                placeholder="Digite seu telefone"
              />
            </GridItem>
          </Grid>

          <ButtonGroup gap="4">
            <Link href={'/consultas/produtos'}>
              <Button colorScheme="green" _hover={{ bg: 'gray.400' }}>
                Salvar
              </Button>
            </Link>
          </ButtonGroup>
        </Flex>
      </Layout>
    </div>
  );
}
