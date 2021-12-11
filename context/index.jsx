import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const UsuarioContext = createContext();
export const UsuarioProvider = ({ children }) => {
  const [usuario, setUsuario] = useState();

  useEffect(() => {
    AsyncStorage.getItem("@usuario").then(login => {
      const usuarioObj = login ? JSON.parse(login): undefined;
      setUsuario(usuarioObj);
    });
  }, []);

  return (
    <UsuarioContext.Provider
      value={{
        usuario,
        setUsuario,
      }}
    >
      {children}
    </UsuarioContext.Provider>
  );
};
export const AlunoContext = createContext();
export const AlunoProvider = ({children}) => {
  const [aluno, setAluno] = useState();

  return (
    <AlunoContext.Provider
      value={{
        aluno,
        setAluno,
      }}
    >
      {children}
    </AlunoContext.Provider>
  );
};

export const MateriaContext = createContext();
export const MateriaProvider = ({children}) => {
  const [materia, setMateria] = useState();

  return (
    <MateriaContext.Provider
      value={{
        materia,
        setMateria,
      }}
    >
      {children}
    </MateriaContext.Provider>
  );
};
