import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Input } from "../Input";

const ModalWithContent = (props) => {
  const { children, title, btnName, isClicked, setClicked } = props;
  console.log(props);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const OverlayOne = () => (
    <ModalOverlay
      bg="blackAlpha.300"
      backdropFilter="blur(10px) hue-rotate(90deg)"
    />
  );

  const [overlay, setOverlay] = useState(<OverlayOne />);
  useEffect(() => {
    if (isClicked) {
      setClicked(false);
      onClose();
    }
  }, [isClicked]);
  return (
    <>
      <Button onClick={onOpen}>{btnName ? btnName : "Open Modal"}</Button>
      <Modal
        isOpen={props.isOpen ? props.isOpen : isOpen}
        onClose={onClose}
        onEsc={onClose}
        onClickOutside={onClose}
        isCentered
      >
        {overlay}
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title ? title : "Create your account"}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            {children ? (
              children
            ) : (
              <>
                <FormControl>
                  <FormLabel>First name</FormLabel>
                  <Input placeholder="First name" />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Last name</FormLabel>
                  <Input placeholder="Last name" />
                </FormControl>
              </>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export { ModalWithContent };
