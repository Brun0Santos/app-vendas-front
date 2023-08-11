/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, ButtonGroup, Flex, Grid, GridItem } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Cliente } from '@/app/models/clientes/clientesModel';
import { clienteCadastroSchema } from '@/components/common/input/clienteSchema';
import InputData from '@/components/common/input/input';
import Layout from '@/components/layout/layout';

type FormInput = z.infer<typeof clienteCadastroSchema>;

export default function CadastroClientes() {
  const [codigoId, setCodigoId] = useState<string>('');
  const [dataCadastro, setDataCadastro] = useState<string>('');
  const [nome, setNome] = useState<string>('');
  const [cpf, setCpf] = useState<string>('');
  const [dataNascimento, setDataNascimento] = useState<string>('');
  const [endereco, setEndereco] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [telefone, setTelefone] = useState<string>('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>({
    resolver: zodResolver(clienteCadastroSchema),
  });

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
    console.log(dataCliente);
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
                typeInput="number"
                placeholder="Digite seu cpf"
                autoComplete="off"
                valueInput={cpf}
                onChanges={setCpf}
              />
              {errors.cpf?.message && (
                <p style={{ color: 'red', fontSize: '13px' }}>{errors.cpf?.message}</p>
              )}
            </GridItem>

            <GridItem>
              <InputData
                label="Data Nascimento"
                typeInput="number"
                autoSave="false"
                placeholder="Digite sua data de nascimento"
                valueInput={dataNascimento}
                onChanges={setDataNascimento}
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
                typeInput="number"
                placeholder="Digite seu email"
                valueInput={email}
                onChanges={setEmail}
              />
            </GridItem>

            <GridItem>
              <InputData
                label="Telefone"
                typeInput="number"
                autoSave="false"
                placeholder="Digite seu telefone"
                valueInput={telefone}
                onChanges={setTelefone}
              />
            </GridItem>
          </Grid>
          <ButtonGroup mt={'15px'}>
            <Button colorScheme="green" _hover={{ bg: 'gray.400' }} onClick={submit} type="submit">
              Salvar
            </Button>
          </ButtonGroup>
        </Flex>
      </Layout>
    </div>
  );
}
