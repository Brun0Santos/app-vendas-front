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

import { Produto } from '@/app/models/produtos/produtosModel';
import { useProdutoService } from '@/app/services';
import { convereterEmBigDecimal } from '@/app/util/parserValue';
import InputData from '@/components/common/input/input';
import Layout from '@/components/layout/layout';

export const CadastroProdutos = () => {
  const service = useProdutoService();
  const [codProduto, setCodProduto] = useState<string>('');
  const [preco, setPreco] = useState<string>('');
  const [nome, setNome] = useState<string>('');
  const [descricao, setDescricao] = useState<string>('');
  const [id, setId] = useState<string>();
  const [dataCadastro, setDataCadastro] = useState<string | undefined>('');

  function submit() {
    const produto: Produto = {
      id,
      codProduto,
      preco: convereterEmBigDecimal(preco),
      nome,
      descricao,
    };

    if (id) {
      service.atualizarProduto(produto).then((res) => {
        console.log(res);
      });
    } else {
      service.salvar(produto).then((res) => {
        console.log(res);
        setId(res.id);
        setDataCadastro(res.dataCadastro);
      });
    }
  }

  return (
    <Layout titulo="Produtos">
      <Flex flexDirection={'column'} p={'25px'} w={'97%'}>
        {id && (
          <Grid templateColumns="repeat(2, 1fr)" gap={6}>
            <GridItem w="100%">
              <InputData label="Id" valueInput={id} disableInput={true} />
            </GridItem>

            <GridItem w="100%">
              <InputData label="Data Cadastro" valueInput={dataCadastro} disableInput={true} />
            </GridItem>
          </Grid>
        )}

        <Grid templateColumns="repeat(2, 1fr)" gap={6}>
          <GridItem w="100%">
            <InputData
              label="Código do Produto"
              value={codProduto}
              placeholder="Digite o código do produto"
              onChanges={setCodProduto}
              typeInput="number"
            />
          </GridItem>

          <GridItem w="100%">
            <InputData
              label="Preço"
              value={preco}
              placeholder="Digite o preço do produto"
              onChanges={setPreco}
              currency={true}
              maxLength={13}
            />
          </GridItem>
        </Grid>

        <InputData
          label="Nome"
          value={nome}
          placeholder="Digite o nome do produto"
          onChanges={setNome}
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
            {id ? 'Atualizar' : 'Salvar'}
          </Button>
          <Button colorScheme="blackAlpha">Voltar</Button>
        </ButtonGroup>
      </Flex>
    </Layout>
  );
};
