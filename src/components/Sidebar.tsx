import { ReactNode } from 'react';

import {
  Button,
  Center,
  Box,
  ButtonProps,
} from '@chakra-ui/react';

import './Sidebar.css';

export interface SidebarBrandProps {
  title?: string;
}

export function SidebarBrand({ title }: SidebarBrandProps) {
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

export interface SidebarButtonGroupProps {
  children?: ReactNode;
}
export function SidebarButtonGroup(props: SidebarButtonGroupProps) {
  return (
    <Center px='6' py='4'
      borderTop='1px'
      borderColor='gray.100'
    >
      {props?.children}
    </Center>
  );
}

export function SidebarButton(props: ButtonProps) {
  return (
    <Button
      w='100%'
      colorScheme='teal'
      variant='solid'
      {...props}
    >
      {props.children}
    </Button>
  );
}

export interface SidebarProps {
  children?: ReactNode;
}

function Sidebar(props: SidebarProps) {
  return (
    <Box
      borderX='1px'
      borderColor='gray.100'
      background='white'
      className='sidebar'
    >
      {props.children}
    </Box>
  );
}

export default Sidebar;
