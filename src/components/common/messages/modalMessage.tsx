import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';

import { Produto } from '@/app/models/produtos/produtosModel';

interface ShowModalProps {
  show: boolean;
  produtoNome?: Produto;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  cancelar: () => void;
  excluir: () => void;
}

export default function ModalMessage({ show, cancelar, excluir }: ShowModalProps) {
  // function onOpen() {
  //   setIsOpen(show);
  // }

  return (
    <>
      {/* <Button onClick={onOpen}>Open Modal</Button> */}

      <Modal closeOnOverlayClick={false} isOpen={show} onClose={cancelar}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{`Deseja excluir o produto?`}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>{/* <Lorem count={2} /> */}</ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={excluir}>
              Excluir
            </Button>
            <Button onClick={cancelar}>Cancelar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
