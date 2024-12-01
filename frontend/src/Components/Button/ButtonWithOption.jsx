import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  Button,
  Tabs,
  TabPanels,
  Flex,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import React, { useRef } from "react";
import { useEffect } from "react";

const ButtonQuickAction = ({ children, isClicked, setClicked, title }) => {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const firstFieldRef = useRef(null);
  useEffect(() => {
    if (isClicked) {
      setClicked(false);
      onClose();
    }
  }, [isClicked]);
  return (
    <Flex justifyContent="center">
      <Popover
        placement="bottom"
        isLazy
        isOpen={isOpen}
        initialFocusRef={firstFieldRef}
        onOpen={onOpen}
        onClose={onClose}
        closeOnBlur={true}
        closeOnEsc={true}
      >
        <PopoverTrigger>
          <Button
            rightIcon={<ChevronDownIcon />}
            colorScheme="green"
            w="fit-content"
          >
            {title ? title : "Quick Actions"}
          </Button>
        </PopoverTrigger>

        <PopoverContent _focus={{ boxShadown: "none" }}>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader fontWeight="bold">Quick Actions</PopoverHeader>
          <PopoverBody w="full">
            <Tabs isLazy colorScheme="green">
              <TabPanels h="fit-content">
                {children ? (
                  children
                ) : (
                  <>
                    <Text>
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                      Architecto doloremque vel nam sapiente omnis, eius aliquid
                      fugit commodi! Earum aperiam beatae dolorum ipsum totam!
                      Sunt iusto quae non obcaecati itaque.
                    </Text>
                    <Button onClick={onClose}>Kick This User</Button>
                  </>
                )}
              </TabPanels>
            </Tabs>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Flex>
  );
};

export { ButtonQuickAction };
