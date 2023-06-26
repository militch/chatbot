import { ReactNode, useState } from 'react';

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

import {
  Sidebar,
  SidebarProps,
  SidebarBrand,
  SidebarButtonGroup,
  SidebarButton,
  NewChatModal,
  ChatList,
  ChatListItem,
  ChatDetail,
} from './components';

import {
  AppLayoutProvider,
  useAppLayout,
} from './AppContext';
import { useRequest } from 'ahooks';

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

const chatListData = [
  {
    id: 1,
    name: 'Chat 1',
  },
  {
    id: 2,
    name: 'Chat 2',
  },
  {
    id: 3,
    name: 'Chat 3',
  },
  {
    id: 4,
    name: 'Chat 4',
  },
  {
    id: 5,
    name: 'Chat 5',
  },
  {
    id: 6,
    name: 'Chat 6',
  },
  {
    id: 7,
    name: 'Chat 7',
  },
];


function SidebarNewChatButton() {
  const { onOpen, isOpen, onClose } = useDisclosure();
  return (
    <>
      <SidebarButton
        onClick={onOpen}
      >
        New Chat
      </SidebarButton>
      <NewChatModal
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  );
}

interface ChatListItem {
  id?: number;
  name?: string;
}


function fakeRequestGetChatList(){
  return new Promise<Array<ChatListItem>>((resolve, reject)=>{
    setTimeout(()=>{
      resolve(chatListData);
    }, 1000);
  });
}

function useAppLayoutLoadingRequest<T>(fn: ()=>Promise<T>){
  const {setLoading} = useAppLayout();
  return useRequest(fn, {
    onBefore: ()=>{
      setLoading(true);
    },
    onFinally: ()=>{
      setLoading(false);
    }
  });
}

function AppSidebar() {
  const {data} = useAppLayoutLoadingRequest(fakeRequestGetChatList);
  return (
    <Sidebar>
      <SidebarBrand title='UCHAT' />
      <SidebarButtonGroup>
        <SidebarNewChatButton />
      </SidebarButtonGroup>
      <ChatList>
        {(data && data.length > 0 )? data?.map((val) => {
          return (
            <ChatListItem
              key={`chatListItem-${val.id}`}
              name={val.name}
              link={`/chat/${val.id}`}
            />
          );
        }):(
            <Center 
              paddingTop='3'
              borderTop='1px' 
              borderColor='gray.100' 
              paddingX='8'>
              Empty Chats
            </Center>
          )}
      </ChatList>
    </Sidebar>
  );
}

function AppLayout(props: AppLayoutProps) {
  return (
    <AppLayoutProvider>
      <AppSidebar />
      <PageMain>
        {props?.children ?? <Outlet />}
      </PageMain>
    </AppLayoutProvider>
  );
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

function ErrorPage() {
  return (
    <Heading as='h1'>
      Error
    </Heading>
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
          <Route index element={<AppEmpty />} />
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
