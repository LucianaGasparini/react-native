import {NativeBaseProvider, Text}from "native-base";
import React, { useEffect, useState } from "react";
import { StatusBar } from 'react-native';
import "react-native-gesture-handler";
import Menu from "./components/Menu";
import { UsuarioProvider, AlunoProvider, MateriaProvider } from "./context";



export default function App() {
  const[carregando, setCarregando]= useState(true);
  useEffect(()=>{
    setTimeout(()=> {
      setCarregando(false);
    }, 1000);
  }, []);
  
  return (
    <MateriaProvider>
    <UsuarioProvider>
      <AlunoProvider>
    <NativeBaseProvider>
      {!carregando? <Menu/>: <Text> Carregando </Text>}   
        
      <StatusBar
        backgroundColor="blue"       
        barStyle="dark-content"
      />
      </NativeBaseProvider>
      </AlunoProvider>
      </UsuarioProvider>
      </MateriaProvider>
  );
}



