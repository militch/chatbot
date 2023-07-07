import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
} from '@chakra-ui/react';
import { FormEventHandler } from 'react';

export interface NewChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: FormEventHandler;
}

function NewChatModal(props: NewChatModalProps) {
  const { onClose } = props;
  return (
    <Modal
      {...props}
    >
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={props?.onSubmit}>
        <ModalHeader>Create New Chat</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>Chat name</FormLabel>
            <Input placeholder='Chat name' />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Model name</FormLabel>
            <Select placeholder='Select Model'>
              <option value='gpt-3.5-turbo'>gpt-3.5-turbo</option>
              <option value='gpt-4'>gpt-4</option>
            </Select>
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme='teal' mr={3} type='submit'>
            Submit
          </Button>
          <Button onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}

export default NewChatModal;

