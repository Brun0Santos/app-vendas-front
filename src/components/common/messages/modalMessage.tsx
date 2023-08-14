import {
  Button,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';

interface ShowModalProps {
  show: boolean;
  cancelar: () => void;
  excluir: () => void;
}

export default function ModalMessage({ show, cancelar, excluir }: ShowModalProps) {
  return (
    <>
      <Modal closeOnOverlayClick={false} isOpen={show} onClose={cancelar} size={'sm'}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{`Deseja excluir o produto?`}</ModalHeader>
          <ModalCloseButton />
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
