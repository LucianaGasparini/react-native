import axios from "axios";
import { Box, HStack, Pressable, Spacer, Text, VStack } from "native-base";
import React, { useContext, useEffect } from "react";
import { SwipeListView } from "react-native-swipe-list-view";
import { UsuarioContext } from "../context/index";

const Usuarios = () => {
  const { usuario, setUsuario } = useContext(UsuarioContext);
  useEffect(() => {
    getUsuarios();
  }, []);
  const getUsuarios = () => {
    axios
      .get("https://secret-headland-69654.herokuapp.com/usuario")
      .then((response) => {
        setUsuario(response.data);
      });
  };

  const renderItem = ({ item }) => (
    <Box>
      <Pressable onPress={() => console.log("You touched me")} bg="#BFF586">
        <Box pl="4" pr="5" py="2">
          <HStack alignItems="center" space={3}>
            <VStack>
              <Text color="coolGray.900" _dark={{ color: "warmGray.50" }} bold>
                {item.nome}
              </Text>
              <Text color="coolGray.600" _dark={{ color: "warmGray.200" }}>
                {item.email}
              </Text>
            </VStack>
            <Spacer />
            <Text
              fontSize="xs"
              color="coolGray.800"
              _dark={{ color: "warmGray.50" }}
              alignSelf="flex-start"
            >
              {item.senha}
            </Text>
          </HStack>
        </Box>
      </Pressable>
    </Box>
  );

  return (
    <>
      <SwipeListView data={usuario} renderItem={renderItem} />
    </>
  );
};

export default Usuarios;
