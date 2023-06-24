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



function DeleteChatButton(){
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

function ChatTitle(props: ChatTitleProps){
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(props.title);
  const handleInputChange = (e:ChangeEvent<HTMLInputElement>)=>{
    setTitle(e.target.value);
  }
  const handleInputBlur = () =>{
    setIsEditing(false);
  }
  const handleSubmit = (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsEditing(false);
  }
  return (
    <Flex alignItems='baseline'>
      {!isEditing ? (
      <Text fontSize='xl' mr='2'>
        {title}
      </Text>
      ): (
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
      {!isEditing?(
        <IconButton 
          aria-label='edit'
          size='xs'
          onClick={()=>{setIsEditing(true)}}
          icon={<BsPencil />} 
        />
      ):<></>}
    </Flex>
  );
}

function ChatDetail(){
  return (
  <>
      <Flex p='4' bg='white'
        alignItems='center'
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
      <Box 
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
      </>
  );
}
export default ChatDetail;
