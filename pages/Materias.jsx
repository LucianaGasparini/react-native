import axios from "axios";
import { MaterialIcons } from "@expo/vector-icons";
import {Actionsheet, AlertDialog,Icon,
    Box, HStack, Pressable, Spacer, VStack,useDisclose, Text
} from 'native-base';
import React, { useContext, useEffect, useState } from "react";

import { SwipeListView } from 'react-native-swipe-list-view';
import { MateriaContext } from "../context";

const Materias = ()=>{
    const {materia, setMateria} = useContext(MateriaContext);
    const [materiaSelecionada, setMateriaSelecionada] = useState();
    const { isOpen, onOpen, onClose } = useDisclose();
    const [isOpenDeleted, setIsOpenDeleted] = useState(false);
  const cancelRef = React.useRef(null)

    const URLM = 'https://secret-headland-69654.herokuapp.com/materias'

    useEffect (()=> {
      consultarMaterias();
    },[]);

    const consultarMaterias = ()=>{
axios.get(URLM)
.then (response => {
    setMateria(response.data)
});
}
const deletarMateria = () =>{
  axios.delete (URLM, {data:materiaSelecionada}).then((response)=>{
    onclose();
    setIsOpenDeleted(true);
    consultarMaterias();
  });
};

          const renderItem = ({ item}) => {
            const clicarMateria = () =>{
              setMateriaSelecionada(item);
              setMateria([...materia]);
              onOpen();

            }
            return(
            <Box>
              <Pressable 
              onPress={() =>clicarMateria()} 
              bg={item.id == materiaSelecionada?.id ? "#8AA19D" : "#FFFED0"}
              >
                <Box
                  pl="4"
                  pr="5"
                  py="2"
                  >
                  <HStack alignItems="center" space={3}>
                     <VStack>
                      <Text color="coolGray.900"  _dark={{ color: 'warmGray.50' }}  bold>
                        {item.titulo}
                      </Text>
                      <Text color="coolGray.600" _dark={{ color: 'warmGray.200' }}>{item.professor_nome}</Text>
                    </VStack>
                    <Spacer />                  
                  
                  </HStack> 
                </Box>
              </Pressable>
            </Box>
          );
            };
    return (
        <>
        <SwipeListView  
        data={materia}    
        renderItem = {renderItem}/>
         <AlertDialog
        leastDestructiveRef={cancelRef}
        isOpen={isOpenDeleted}
        onClose={() => setIsOpenDeleted(false)}
      >
        <AlertDialog.Content>
          <AlertDialog.CloseButton />
          <AlertDialog.Header>Matéria deletado</AlertDialog.Header>
          <AlertDialog.Body>
            Cadastro excluído com sucesso
          </AlertDialog.Body>
        </AlertDialog.Content>
      </AlertDialog>

      <Actionsheet isOpen={isOpen} onClose={onClose} size="full">
        <Actionsheet.Content>
          <Box w="100%" h={60} px={4} justifyContent="center">
            <Text
              fontSize="16"
              color="gray.500"
              _dark={{
                color: "gray.300",
              }}
            >
              Opções
            </Text>
          </Box>
          <Actionsheet.Item
            startIcon={
              <Icon
                as={MaterialIcons}
                color="trueGray.400"
                mr="1"
                size="6"
                name="delete"
              />
            }
            onPress={() => deletarMateria()}
          >
            Deletar
          </Actionsheet.Item>
          <Actionsheet.Item
            startIcon={
              <Icon
                as={MaterialIcons}
                name="edit"
                color="trueGray.400"
                mr="1"
                size="6"
              />
            }
          >
            Editar
          </Actionsheet.Item>
        </Actionsheet.Content>
      </Actionsheet>   
        </>
        );
}



export default Materias;