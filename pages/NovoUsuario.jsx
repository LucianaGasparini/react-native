import React, { useState, useContext } from "react";


import { UsuarioContext } from "../context";
import axios from 'axios';
import {
  AlertDialog,
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

export const NovoUsuario = ({navigation}) => {
    const [nome, setNome] = useState();
    const [email, setEmail] = useState();
    const [senha, setSenha] = useState();
    const [confSenha, setConfSenha] = useState();
     const [mensagemDeErro, setMensagemDeErro]  = useState(false)
     const [isOpenCadastro, setIsOpenCadastro] = useState(false);
     const cancelRef = React.useRef(null)
     
    const efetuarCadastro = () =>{   
      if (senha === confSenha){
      axios.post ("https://secret-headland-69654.herokuapp.com/usuario", {
        nome,
        email,
        senha,      
      }).then ((response) => {
        if (response.status === 201){
          setIsOpenCadastro(true);
          limparCampos();
        }
      })
      .catch((error)=> {
console.log(error)
      })
    

    } else {
setMensagemDeErro(true)
    }
    }
       const limparCampos =()=> {
         setNome('');
         setEmail('');
         setSenha('');
         setConfSenha('')
         setMensagemDeErro(false);
       }
     
  return (
    <NativeBaseProvider>
       <Center flex={1} px="3">
    <Box safeArea p="2" w="90%" maxW="290" py="8">
    <AlertDialog
        leastDestructiveRef={cancelRef}
        isOpen={isOpenCadastro}
        onClose={() => setIsOpenCadastro(false)}
      >
        <AlertDialog.Content>
          <AlertDialog.CloseButton />
          <AlertDialog.Header>Cadastro Efetuado</AlertDialog.Header>
          <AlertDialog.Body>
            Cadastro efetuado com sucesso
          </AlertDialog.Body>
        </AlertDialog.Content>
      </AlertDialog>
      <Heading
        size="lg"
        color="coolGray.800"
        _dark={{
          color: "warmGray.50",
        }}
        fontWeight="semibold"
      >
        Bem Vindo
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
        Cadastre-se para continuar!
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
          <FormControl.Label>Email</FormControl.Label>
          <Input 
         value={email}
          onChangeText= {setEmail}
          keyboardType="default" />        
        </FormControl>
        <FormControl>
          <FormControl.Label>Senha</FormControl.Label>
          <Input 
          type="password" 
          value={senha}
          onChangeText={setSenha}
          />
        </FormControl>
         <FormControl> 
           <FormControl.Label>Confirme sua senha</FormControl.Label> 
          <Input  
          type="password" 
          value={confSenha} 
           onChangeText={setConfSenha} 
            /> 
        </FormControl> 
        <Button mt="2" colorScheme="indigo"
        onPress={()=> efetuarCadastro()}
        >
          Cadastre-se
        </Button>
        <Collapse isOpen = {mensagemDeErro}> 
          <Alert w="100%" status={"error"}mt="5">
            <VStack space={2} flexShrink={1} w="100%">
              <HStack flexShrink={1} space={2} justifyContent="space-between">
                <HStack space={2} flexShrink={1}>
                  <Alert.Icon mt="1" />
                  <Text fontSize="md" color="coolGray.800">
                    {'Senhas divergentes'}
                  </Text>
                </HStack>
                <IconButton
                  variant="unstyled"
                  icon={<CloseIcon size="3" color="coolGray.600" />}
                  onPress={()=>{setMensagemDeErro(false)}}
                  
                />
              </HStack>            
         
            </VStack>
          </Alert>
          </Collapse>               
      </VStack>
      <Text
      mt = "5"
            fontSize="sm"
            color="coolGray.600"
            _dark={{
              color: "warmGray.200",
            }}
          >
            Retorne a tela para login {" "}
          </Text>
          
          <Button
          mt = "5"
        size="lg"
        //variant="outline"
        onPress={()=>navigation.navigate("Login")}
      >
        Clicando aqui
      </Button>  
    </Box>
    </Center>
    </NativeBaseProvider>
  )
}

export default NovoUsuario;