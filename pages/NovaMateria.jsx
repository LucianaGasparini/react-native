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

export const CadastroMateria = () => {
    const [titulo, setTitulo] = useState();
    const [professor_nome, setProfessorNome] = useState();
    
     
    const efetuarCadastroMateria = () =>{         
      axios.post ("https://secret-headland-69654.herokuapp.com/materias", {
        titulo,
        professor_nome,
             
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
         setTitulo('');
         setProfessorNome('');         
      
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
       Temas relacionadas a programação Mobile
      </Heading>
      <VStack space={3} mt="5">
      <FormControl>
          <FormControl.Label>Titulo</FormControl.Label>          
          <Input
         value={titulo}
          onChangeText= {setTitulo}
          keyboardType="default"/>
          
        </FormControl>
        <FormControl>
          <FormControl.Label>Nome Professor</FormControl.Label>
          <Input 
         value={professor_nome}
          onChangeText= {setProfessorNome}
          keyboardType="default" />        
        </FormControl>
             
        <Button mt="2" colorScheme="indigo"
        onPress={()=> efetuarCadastroMateria()}
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
        <CadastroMateria />
      </Center>
    </NativeBaseProvider>
  )
}