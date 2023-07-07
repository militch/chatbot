import {
  ReactNode,
} from 'react';

import {
  Box,
  Link,
} from '@chakra-ui/react';

import {
  Link as ReachLink
} from 'react-router-dom';

import './ChatList.css';

interface ChatListItemProps {
  name?: string;
  children?: ReactNode;
  active?: boolean;
  link?: string;
}

export function ChatListItem(props: ChatListItemProps){
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
        <Link as={ReachLink} to={props?.link??'/#'}
          color={linkColor}
          className='chatlist-item-link'
          px='8'
          py='3'
        >
          {props.name?props.name:props.children??''}
        </Link>
      </Box>
  );
}



export interface ChatListProps {
  children?: ReactNode;
}
function ChatList(props: ChatListProps){
  return (
    <Box className='chatlist' as='ul'
        borderTop='1px'
        borderColor='gray.100'
    >
      {props.children}
    </Box>
  );
}
export default ChatList;
