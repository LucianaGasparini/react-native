import React, { useState, useContext } from "react";
import axios from 'axios';
import {
  Box,
  Heading,
  VStack,
  FormControl,
  Alert,
  HStack,
  Input,
  CloseIcon,
  Button,
  Center,
  NativeBaseProvider,
  IconButton,
  Collapse,
  Text
} from "native-base"

export const CadastroAluno = () => {
    const [nome, setNome] = useState();
    const [idade, setIdade] = useState();
    const [cidade, setCidade] = useState();
    
     
    const efetuarCadastroAluno = () =>{         
      axios.post ("https://secret-headland-69654.herokuapp.com/alunos", {
        nome,
        idade,
        cidade,      
      }).then ((response) => {
        if (response.status === 201){
          limparCampos();
        }
      })
      .catch((error)=> {
console.log(error)
      })
    

  
    }
       const limparCampos =()=> {
         setNome('');
         setIdade('');
         setCidade('');        
       }
     
  return (
    <Box safeArea p="2" w="90%" maxW="290" py="8">
      <Heading
        size="lg"
        color="coolGray.800"
        _dark={{
          color: "warmGray.50",
        }}
        fontWeight="semibold"
      >
        React Native
      </Heading>
      <Heading
        mt="1"
        color="coolGray.600"
        _dark={{
          color: "warmGray.200",
        }}
        fontWeight="medium"
        size="xs"
      >
       Alunos Serratec 2021.2 - turma 008
      </Heading>
      <VStack space={3} mt="5">
      <FormControl>
          <FormControl.Label>Nome Completo</FormControl.Label>          
          <Input
         value={nome}
          onChangeText= {setNome}
          keyboardType="default"/>
          
        </FormControl>
        <FormControl>
          <FormControl.Label>Idade</FormControl.Label>
          <Input 
         value={idade}
          onChangeText= {setIdade}
          keyboardType="default" />        
        </FormControl>
        <FormControl>
          <FormControl.Label>Cidade</FormControl.Label>
          <Input 
          keyboardType="default" 
          value={cidade}
          onChangeText={setCidade} />  
           </FormControl>      
        <Button mt="2" colorScheme="indigo"
        onPress={()=> efetuarCadastroAluno()}
        >
          Cadastrar
        </Button>           
      </VStack>
    </Box>
  )
}

export default () => {
  return (
    <NativeBaseProvider>
      <Center flex={1} px="3">
        <CadastroAluno />
      </Center>
    </NativeBaseProvider>
  )
}