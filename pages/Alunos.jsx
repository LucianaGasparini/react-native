import { MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
import {
  Actionsheet, AlertDialog, Box, HStack,
  Icon,
  Pressable,
  Spacer, Text, useDisclose, VStack
} from "native-base";
import React, { useEffect, useState, useContext } from "react";
import { SwipeListView } from "react-native-swipe-list-view";
import { AlunoContext } from "../context/index";


const Alunos = () => {
  const {aluno, setAluno} = useContext(AlunoContext); 
  const { isOpen, onOpen, onClose } = useDisclose();
  const [alunoSelecionado, setAlunoSelecionado] = useState();
  const [isOpenDeleted, setIsOpenDeleted] = useState(false);
  const cancelRef = React.useRef(null)

  const URL = "https://secret-headland-69654.herokuapp.com/alunos";

  useEffect(() => {
    consultarAlunos();
  }, []);

  const consultarAlunos = () => {
    axios.get(URL).then((response) => {
      setAluno(response.data);
    });
  };

  const deletarAluno = () => {
    axios.delete(URL, { data: alunoSelecionado }).then((response) => {
      onClose();
      setIsOpenDeleted(true);
      consultarAlunos();
    });
  };

  const renderItem = ({ item }) => {
    const clicarAluno = () => {
      setAlunoSelecionado(item);
      setAluno([...aluno]);
      onOpen();
    };
    return (
      <Box>
        <Pressable
          onPress={() => clicarAluno()}
          bg={item.id == alunoSelecionado?.id ? "#8AA19D" : "#C7E8E3"}
        >
          <Box pl="4" pr="5" py="2">
            <HStack alignItems="center" space={3}>
              <VStack>
                <Text
                  color="coolGray.900"
                  _dark={{ color: "warmGray.50" }}
                  bold
                >
                  {item.nome}
                </Text>
                <Text color="coolGray.600" _dark={{ color: "warmGray.200" }}>
                  {item.cidade}
                </Text>
              </VStack>
              <Spacer />
              <Text
                fontSize="xs"
                color="coolGray.800"
                _dark={{ color: "warmGray.50" }}
                alignSelf="flex-start"
              >
                {`${item.idade} anos`}
              </Text>
            </HStack>
          </Box>
        </Pressable>
      </Box>
    );
  };
  return (
    <>
      <SwipeListView data={aluno} renderItem={renderItem} />
      <AlertDialog
        leastDestructiveRef={cancelRef}
        isOpen={isOpenDeleted}
        onClose={() => setIsOpenDeleted(false)}
      >
        <AlertDialog.Content>
          <AlertDialog.CloseButton />
          <AlertDialog.Header>Aluno deletado</AlertDialog.Header>
          <AlertDialog.Body>
            Cadastro exclu??do com sucesso
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
              Op????es
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
            onPress={() => deletarAluno()}
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
};

export default Alunos;
