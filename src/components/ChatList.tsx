import {
  ReactNode,
} from 'react';

import {
  Box,
} from '@chakra-ui/react';

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
        <Box as='a' href={props?.link??'/#'}
          color={linkColor}
          className='chatlist-item-link'
          px='8'
          py='3'
        >
          {props.name?props.name:props.children??''}
        </Box>
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
