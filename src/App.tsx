import { ReactNode } from 'react';
import {
  Box,
  Button,
  Center,
  Text,
  Heading,
  useDisclosure,
  Container,
} from '@chakra-ui/react';

import Sidebar, { SidebarProps } from './Sidebar';
import ChatDetail from './ChatDetail';

import NewChatModal from './NewChatModal';

interface PageMainProps {
  children?: ReactNode;
}

function PageMain({ children }: PageMainProps) {
  return (
    <Box ml='60'>
      {children}
    </Box>
  );
}

interface AppLayoutProps extends SidebarProps {
  children?: ReactNode;
}

function AppLayout(props: AppLayoutProps) {
  const { children, onNewChat } = props;
  return (
    <Box>
      <Sidebar onNewChat={onNewChat} />
      <PageMain>
        {children}
      </PageMain>
    </Box>
  )
}

interface AppEmptyProps {
  onNewChat?: () => void;
}

function AppEmpty(props?: AppEmptyProps) {
  return (
    <Center minH='calc(100vh)' flexDirection='column'>
      <Heading as='h1'>
        Welcome
      </Heading>
      <Text mb='2'>
        You can choose a Chat here or create a new one.
      </Text>
      <Button colorScheme='teal' size='md'
        onClick={props?.onNewChat}
      >
        New Chat
      </Button>
    </Center>
  );
}

function App() {
  let empty: boolean = false;
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <AppLayout
        onNewChat={onOpen}
      >
        {empty ?
          <AppEmpty
            onNewChat={onOpen}
          /> : <ChatDetail />}
      </AppLayout>
      <NewChatModal
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  )
}

export default App;
