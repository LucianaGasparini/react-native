import axios from "axios";
import {
    Box, HStack, Pressable, Spacer, VStack, Text
} from 'native-base';
import React, { useEffect, useState } from "react";

import { SwipeListView } from 'react-native-swipe-list-view';

const Materias = ()=>{
    const [materias, setMaterias] = useState([]);

    useEffect (()=> {        
axios.get('https://secret-headland-69654.herokuapp.com/materias')
.then (response => {
    setMaterias(response.data)
});
    },[]);

          const renderItem = ({ item}) => (
            <Box>
              <Pressable onPress={() => console.log('You touched me')} bg="#FFFED0">
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

    return (
        <>
        <SwipeListView  
        data={materias}    
        renderItem = {renderItem}
        />
        </>);
}



export default Materias;