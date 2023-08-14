/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, ButtonGroup, Flex, Grid, GridItem } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as z from 'zod';

import { Cliente } from '@/app/models/clientes/clientesModel';
import { useClienteService } from '@/app/services/index';
import { formatCPF, formatData, formatTelefone } from '@/app/util/parserValue';
import { clienteCadastroSchema } from '@/components/common/input/clienteSchema';
import InputData from '@/components/common/input/input';
import Layout from '@/components/layout/layout';

type FormInput = z.infer<typeof clienteCadastroSchema>;

export default function CadastroClientes() {
  const [codigoId, setCodigoId] = useState<string | undefined>('');
  const [dataCadastro, setDataCadastro] = useState<string | undefined>('');
  const [nome, setNome] = useState<string | undefined>('');
  const [cpf, setCpf] = useState<string | undefined>('');
  const [dataNascimento, setDataNascimento] = useState<string | undefined>('');
  const [endereco, setEndereco] = useState<string | undefined>('');
  const [email, setEmail] = useState<string | undefined>('');
  const [telefone, setTelefone] = useState<string | undefined>('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>({
    resolver: zodResolver(clienteCadastroSchema),
  });
  const service = useClienteService();
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      service.getClienteFromId(String(id)).then((data) => {
        setCodigoId(data.id);
        setDataCadastro(data.dataCadastro);
        setNome(data.nome);
        setCpf(data.cpf);
        setDataNascimento(data.dataNascimento);
        setEndereco(data.endereco);
        setEmail(data.email);
        setTelefone(data.telefone);
      });
    }
  }, [id]);

  function submit() {
    const dataCliente: Cliente = {
      id: codigoId,
      dataCadastro,
      nome,
      cpf,
      dataNascimento,
      endereco,
      email,
      telefone,
    };

    if (codigoId) {
      service
        .atualizarCliente(dataCliente)
        .then(() => toast.success('Produto atualizado com sucesso!'));
    } else {
      service.salvar(dataCliente).then((data) => {
        setCodigoId(String(data.id));
        setDataCadastro(String(data.dataCadastro));
        toast.success('Produto salvo com sucesso!');
      });
    }
  }

  return (
    <div>
      <Layout titulo="Clientes">
        <Flex flexDirection={'column'} p={'25px'} w={'97%'}>
          {codigoId && (
            <Grid templateColumns="repeat(2, 1fr)" gap={6} w="100%">
              <GridItem>
                <InputData
                  label="Código"
                  typeInput="number"
                  disableInput={true}
                  valueInput={codigoId}
                />
              </GridItem>

              <GridItem>
                <InputData label="Data Cadastro" disableInput={true} valueInput={dataCadastro} />
              </GridItem>
            </Grid>
          )}

          <Grid templateColumns="repeat(3, 1fr)" gap={6} w="100%">
            <GridItem>
              <InputData
                label="Nome"
                placeholder="Digite seu nome"
                autoComplete="off"
                valueInput={nome}
                onChanges={setNome}
              />
              {errors.nome?.message && (
                <p style={{ color: 'red', fontSize: '13px' }}>{errors.nome?.message}</p>
              )}
            </GridItem>

            <GridItem>
              <InputData
                label="CPF"
                typeInput="text"
                placeholder="Digite seu cpf"
                autoComplete="off"
                valueInput={cpf}
                onChanges={setCpf}
                formatter={formatCPF}
                disableInput
              />
              {errors.cpf?.message && (
                <p style={{ color: 'red', fontSize: '13px' }}>{errors.cpf?.message}</p>
              )}
            </GridItem>

            <GridItem>
              <InputData
                label="Data Nascimento"
                typeInput="text"
                autoSave="false"
                placeholder="Digite sua data de nascimento"
                valueInput={dataNascimento}
                onChanges={setDataNascimento}
                formatter={formatData}
              />
            </GridItem>
          </Grid>

          <InputData
            label="Endereço"
            placeholder="Digite seu endereço"
            autoComplete="off"
            valueInput={endereco}
            onChanges={setEndereco}
          />

          <Grid templateColumns="repeat(2, 1fr)" gap={6} w="100%">
            <GridItem>
              <InputData
                label="Email"
                typeInput="text"
                placeholder="Digite seu email"
                valueInput={email}
                onChanges={setEmail}
              />
            </GridItem>

            <GridItem>
              <InputData
                label="Telefone"
                typeInput="text"
                autoSave="false"
                placeholder="Digite seu telefone"
                valueInput={telefone}
                onChanges={setTelefone}
                formatter={formatTelefone}
              />
            </GridItem>
          </Grid>
          <ButtonGroup mt={'15px'} gap="4">
            <Button colorScheme="green" _hover={{ bg: 'gray.400' }} onClick={submit} type="submit">
              {id ? 'Atualizar' : 'Salvar'}
            </Button>
            <Link href={'/consultas/clientes'}>
              <Button colorScheme="blackAlpha">Voltar</Button>
            </Link>
          </ButtonGroup>
        </Flex>
      </Layout>
    </div>
  );
}
