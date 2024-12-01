import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";

const FullScreenModal = ({ isOpen, onClose, title, children }) => {
  return (
    <Modal
      scrollBehavior="inside"
      onClose={onClose}
      size="full"
      isOpen={isOpen}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody p={0}>{children}</ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export { FullScreenModal };
