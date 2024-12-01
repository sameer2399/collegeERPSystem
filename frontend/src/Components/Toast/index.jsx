import { useToast } from "@chakra-ui/react";
export function Toast(props) {
  const toast = useToast();
  return toast({
    title: props.title,
    description: props.desc,
    status: props.status,
    duration: 9000,
    isClosable: true,
    position: "top-right",
  });
}
