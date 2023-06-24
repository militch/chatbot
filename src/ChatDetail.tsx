import {
  ChangeEvent,
  FormEvent,
  useRef,
  useState
} from 'react';
import {
  Flex,
  Text,
  HStack,
  Box,
  IconButton,
  Textarea,
  Button,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
  Input,
} from '@chakra-ui/react';

import {
  BsTrash,
  BsPencil,
} from 'react-icons/bs';

import './ChatDetail.css';

function DeleteChatButton() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();
  return (
    <>
      <IconButton
        size='sm'
        colorScheme='red'
        aria-label='delete'
        onClick={onOpen}
        icon={<BsTrash />}
      />
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Delete Chat
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme='red' onClick={onClose} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}


interface ChatTitleProps {
  title?: string;
}

function ChatTitle(props: ChatTitleProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(props.title);
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  }
  const handleInputBlur = () => {
    setIsEditing(false);
  }
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsEditing(false);
  }
  return (
    <Flex alignItems='baseline'>
      {!isEditing ? (
        <Text fontSize='xl' mr='2'>
          {title}
        </Text>
      ) : (
        <form onSubmit={handleSubmit}>
          <Flex alignItems='baseline'>
            <Input
              fontSize='xl'
              size='md'
              mr='2'
              onChange={handleInputChange}
              value={title}
              placeholder=''
              onBlur={handleInputBlur}
              autoFocus
            />
          </Flex>
        </form>
      )}
      {!isEditing ? (
        <IconButton
          aria-label='edit'
          size='xs'
          onClick={() => { setIsEditing(true) }}
          icon={<BsPencil />}
        />
      ) : <></>}
    </Flex>
  );
}

function ChatDetailFooter() {
  return (
    <Box
      borderTop='1px'
      borderColor='gray.100'
      position='fixed'
      bg='white'
      display='flex'
      bottom='0'
      left='60'
      right='0'
      p='4'
      alignItems='flex-end'
    >
      <Textarea
        resize='none'
        variant='filled'
        rows={1}
        focusBorderColor='teal'
      />
      <Button
        colorScheme='teal'
        ml='4'
      >
        Send
      </Button>
    </Box>
  );
}


function ChatDetailHeader() {
  return (
    <Flex p='4' bg='white'
      borderBottom='1px'
      borderBottomColor='gray.100'
    >
      <Flex flex={1} flexDirection='column'>
        <ChatTitle title='Chat 1' />
        <Text fontSize='xs' color='gray.600'>
          GPT-Mode3
        </Text>
      </Flex>
      <HStack>
        <DeleteChatButton />
      </HStack>
    </Flex>
  );
}

interface ChatDetailItemProps {
  send?: string;
  message?: string;
}
function ChatDetailItem(props: ChatDetailItemProps) {
  return (
    <Flex 
      className='chatdetail-list-item'
      borderBottom='1px'
      borderColor='gray.100'
      px='4'
      py='2'
      width='100%' 
      flexDirection='column'>
      <Flex mb='1' flexDirection='row' alignItems='baseline'>
        <Text mr='1' fontSize='lg'>
          {props.send}
        </Text>
        <Text fontSize='sm' 
          color='gray.800'
          mr='1'
        >
          12:00
        </Text>
      </Flex>
      <Text>
        {props.message}
      </Text>
    </Flex>
  );
}

function ChatDetailList() {
  return (
    <Flex flexDirection='column'>
      <ChatDetailItem send='self' message='nihao' />
      <ChatDetailItem send='self' message='wo zai zhe li' />
      <ChatDetailItem send='bot' message='wo zhi dao le' />
      <ChatDetailItem send='bot' message='ni zai zhe li' />
      <ChatDetailItem send='self' message='xian zai ji dian' />
      <ChatDetailItem send='bot' message='xian zai 10 dian' />
    </Flex>
  );
}
function ChatDetail() {
  return (
    <>
      <ChatDetailHeader />
      <ChatDetailList />
      <ChatDetailFooter />
    </>
  );
}
export default ChatDetail;
