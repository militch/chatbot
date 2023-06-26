import React, { ReactNode, createContext, useContext, useState } from "react";
import{ 
  Box,
  Spinner,
  Text,
} from '@chakra-ui/react';

interface AppLayoutContextProps {
  isLoading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const AppLayoutContext = createContext<AppLayoutContextProps | undefined>(undefined);

function AppLoading() {
  return (
    <Box
      as='div'
      left='0'
      right='0'
      top='0'
      bottom='0'
      position='fixed'
      zIndex='999'
      bgColor='white'
      display='flex'
      justifyContent='center'
      alignItems='center'
      flexDirection='column'
    >
      <Spinner speed='0.65s' mb='2' />
      <Text color='gray.600' fontSize='3xl'>
        Loading...
      </Text>
    </Box>
  );
}

interface AppLayoutProviderProps {
  children: ReactNode,
}
export function AppLayoutProvider({children}: AppLayoutProviderProps){
  const [isLoading, setLoading] = useState(false);
  return (
    <AppLayoutContext.Provider
      value={{isLoading, setLoading}}
    >
      {children}
      {isLoading && (<AppLoading />)}
    </AppLayoutContext.Provider>
  );
}

export function useAppLayout(){
  const context = useContext(AppLayoutContext);
  if (context === undefined) {
    throw new Error('hook function must be used within a Provider');
  }
  return context;
}
