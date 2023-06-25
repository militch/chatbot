import {
  ReactNode,
} from 'react';

import {
  Box,
  Text,
} from '@chakra-ui/react';

import './ChatList.css';

interface ChatListProps {
  title?: string;
  children?: ReactNode;
  active?: boolean;
  link?: string;
}

function ChatListItem(props: ChatListProps){
  let itemBgColor = '';
  if (props.active){
    itemBgColor = 'blackAlpha.50';
  }
  let linkColor = '';
  if (props.active){
    linkColor = 'black';
  }
  return (
      <Box as='li'
      backgroundColor={itemBgColor} 
      className='chatlist-item'>
        <Box as='a' href={props?.link??'/#'}
          color={linkColor}
          className='chatlist-item-link'
          px='8'
          py='3'
        >
          {props.title?props.title:props.children??''}
        </Box>
      </Box>
  );
}

function EmptyChat(){
  return (
      <Text
        paddingTop='3'
        borderTop='1px'
        borderColor='gray.100'
        paddingX='8'
      >Empty Chats</Text>
  );
}

function ChatList(){
  const empty = false;
  if (empty) {
    return <EmptyChat/>
  }
  return (
    <Box className='chatlist' as='ul'
        borderTop='1px'
        borderColor='gray.100'
    >
      <ChatListItem
        title='会话1'
          link='/chat/12'
      />
      <ChatListItem
        title='会话2'
      />
      <ChatListItem
        title='会话3'
      />
    </Box>
  );
}
export default ChatList;
