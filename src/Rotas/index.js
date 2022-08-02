import React from "react";

import { createAppContainer, createSwitchNavigator } from "react-navigation";

import TelaCamera from "../telas/TelaCamera";

const Rotas = {

  MenuInicial: {
    nome: "TelaCamera",
    screen: TelaCamera,
  },
  
};
// Criar as Rotas
const Navegacao = createSwitchNavigator(Rotas);
// Passar para o App
export default createAppContainer(Navegacao);

