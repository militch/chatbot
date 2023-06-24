import './Sidebar.css';

import {
  Button,
  Center,
  Box,
} from '@chakra-ui/react';

import ChatList from './ChatList';

interface SidebarBrandProps {
  title?: string;
}

function SidebarBrand({title}:SidebarBrandProps) {
  return (
    <Box as='a'
      py='4'
      className='sidebar-brand'
      href='/'>
      <Box as='span' className='sidebar-title'>
        {title}
      </Box>
    </Box>
  );
}
export interface SidebarProps{
  onNewChat?:()=>void;
}
function Sidebar(props:SidebarProps){
  return (
    <Box 
      borderX='1px'
      borderColor='gray.100'
      background='white'
      className='sidebar'
    >
      <SidebarBrand 
        title='UCHAT'
        />
      <Center px='6' py='4'
        borderTop='1px'
        borderColor='gray.100'
      >
        <Button w='100%' colorScheme='teal'
          variant='solid'
          onClick={props.onNewChat}
        >
          New Chat
        </Button>
      </Center>
      <ChatList />
    </Box>
  );
}

export default Sidebar;
