import { ReactNode } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
} from 'react-router-dom';
import {
  Box,
  Button,
  Center,
  Text,
  Heading,
  useDisclosure,
} from '@chakra-ui/react';

import Sidebar, {
  SidebarProps,
} from './components/Sidebar';

import ChatDetail from './components/ChatDetail';

import NewChatModal from './components/NewChatModal';

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
  return (
    <Box>
      <Sidebar />
      <PageMain>
        {props?.children??<Outlet />}
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

function ErrorPage(){
  return (
  <Heading as='h1'>Error</Heading>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path='/' 
          element={<AppLayout />}
        >
          <Route index element={<AppEmpty/>} />
          <Route path='/chat/:chatId' 
            element={<ChatDetail />} 
            />
          <Route path='*' element={<ErrorPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
