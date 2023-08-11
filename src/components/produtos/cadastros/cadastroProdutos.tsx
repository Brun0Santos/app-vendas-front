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
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { Produto } from '@/app/models/produtos/produtosModel';
import { useProdutoService } from '@/app/services';
import { convereterEmBigDecimal, formatReal } from '@/app/util/parserValue';
import InputData from '@/components/common/input/input';
import { messageToast } from '@/components/common/messages/messages';
import Layout from '@/components/layout/layout';

export const CadastroProdutos = () => {
  const service = useProdutoService();
  const message = messageToast();
  const [codProduto, setCodProduto] = useState<string | undefined>('');
  const [preco, setPreco] = useState<string>('');
  const [nome, setNome] = useState<string | undefined>('');
  const [descricao, setDescricao] = useState<string | undefined>('');
  const [id, setId] = useState<string>();
  const [dataCadastro, setDataCadastro] = useState<string | undefined>('');
  const router = useRouter();
  const { id: queryId } = router.query;

  useEffect(() => {
    if (typeof queryId === 'string') {
      service.getProdutoFromId(queryId).then((data) => {
        setId(data.id);
        setDataCadastro(data.dataCadastro);
        setCodProduto(data.codProduto);
        setPreco(formatReal(String(data.preco)));
        setNome(data.nome);
        setDescricao(data.descricao);
      });
    }
  }, [queryId]);

  function submit() {
    const produto: Produto = {
      id,
      codProduto,
      preco: convereterEmBigDecimal(preco),
      nome,
      descricao,
    };

    if (!codProduto || !preco || !nome || !descricao) {
      message.viewToast({
        title: 'Os campos cod produto, preço, nome e descrição são obrigatórios',
        status: 'error',
        duration: 4400,
      });
    } else {
      if (id) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        service.atualizarProduto(produto).then((res) => {
          message.viewToast({
            title: 'Produto atualizado com sucesso',
            status: 'success',
          });
        });
      } else {
        service.salvar(produto).then((res) => {
          setId(res.id);
          setDataCadastro(res.dataCadastro);
          message.viewToast({
            title: 'Produto salvo com sucesso',
            status: 'success',
          });
        });
      }
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
              valueInput={codProduto}
              placeholder="Digite o código do produto"
              onChanges={setCodProduto}
              typeInput="number"
            />
          </GridItem>

          <GridItem w="100%">
            <InputData
              label="Preço"
              valueInput={preco}
              placeholder="Digite o preço do produto"
              onChanges={setPreco}
              maxLength={13}
              formatter={formatReal}
            />
          </GridItem>
        </Grid>

        <InputData
          label="Nome"
          valueInput={nome}
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
          <Link href={'/consultas/produtos'}>
            <Button colorScheme="blackAlpha">Voltar</Button>
          </Link>
        </ButtonGroup>
      </Flex>
    </Layout>
  );
};
