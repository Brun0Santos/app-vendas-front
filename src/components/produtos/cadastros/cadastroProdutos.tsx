import Layout from "@/components/layout/layout"
import { Flex, FormControl, FormLabel, Input, Textarea, Button, ButtonGroup   } from "@chakra-ui/react"

export const CadastroProdutos = () => {
  return (
      <Layout titulo="Produtos">
          <Flex
            flexDirection={"column"}
            p={"25px"}
            w={"97%"}
          >
            <FormControl 
              isRequired
              pb={"30px"}
            >
              <FormLabel>Sku: </FormLabel>
              <Input placeholder='Digite o SKU do produto'/>
            </FormControl>

            <FormControl 
              isRequired
              pb={"30px"}
            >
              <FormLabel>Preço: </FormLabel>
              <Input placeholder='Digite o preço do produto' />
            </FormControl>

            <FormControl 
              isRequired
              pb={"30px"}
            >
              <FormLabel>Nome: </FormLabel>
              <Input placeholder='Digite o nome do produto' />
            </FormControl>

            <FormControl 
              isRequired
              pb={"30px"}
            >
              <FormLabel>Descrição: </FormLabel>
              <Textarea placeholder='Digite a descrição do produto'/>
            </FormControl>
            
            <ButtonGroup gap='4'>
              <Button colorScheme='green'>Salvar</Button>
              <Button colorScheme='blackAlpha'>Voltar</Button>
            </ButtonGroup>
          </Flex>
      </Layout>
    )
}