import {
  Button,
  ButtonGroup,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Textarea,
} from '@chakra-ui/react';
import { useState } from 'react';

import InputData from '@/components/common/input/input';
import Layout from '@/components/layout/layout';

export const CadastroProdutos = () => {
  const [sku, setSku] = useState<string | undefined>('');
  const [preco, setPreco] = useState<string>('');
  const [nome, setNome] = useState<string | undefined>('');
  const [descricao, setDescricao] = useState<string | undefined>('');

  function submit() {
    const produto = {
      sku,
      preco,
      nome,
      descricao,
    };
    console.log(produto);
  }

  return (
    <Layout titulo="Produtos">
      <Flex flexDirection={'column'} p={'25px'} w={'97%'}>
        <Grid templateColumns="repeat(2, 1fr)" gap={6}>
          <GridItem w="100%">
            <InputData label="Sku" value={sku} placeholder="Digite o SKU" onChange={setSku} />
          </GridItem>

          <GridItem w="100%">
            <InputData
              label="Preço"
              value={preco}
              placeholder="Digite o preço do produto"
              onChange={setPreco}
            />
          </GridItem>
        </Grid>

        <InputData
          label="Nome"
          value={nome}
          placeholder="Digite o nome do produto"
          onChange={setNome}
        />

        <FormControl isRequired pb={'30px'}>
          <FormLabel>Descrição: </FormLabel>
          <Textarea
            placeholder="Digite a descrição do produto"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />
        </FormControl>

        <ButtonGroup gap="4">
          <Button colorScheme="green" onClick={submit}>
            Salvar
          </Button>
          <Button colorScheme="blackAlpha">Voltar</Button>
        </ButtonGroup>
      </Flex>
    </Layout>
  );
};
