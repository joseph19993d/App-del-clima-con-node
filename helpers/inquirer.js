const inquirer = require("inquirer");
const { type } = require("os");
const { resolve } = require("path");
const { validate } = require("uuid");
require("colors");

const preguntas = [
  {
    type: "list",
    name: "option",
    message: "¿Que desea hacer?",
    choices: [
      {
        value: 1,
        name: `${"1.".green} Buscar ciudad`,
      },
      {
        value: 2,
        name: `${"2.".green} Historial`,
      },
      {
        value: 3,
        name: `${"3.".green} Buscar Lugar`,
      },
      {
        value: 0,
        name: `${"4.".green} Salir`,
      },
    ],
  },
];

const inquirerMenu = async () => {

  console.clear();
  console.log("========================".green);
  console.log("selecione una opcion");
  console.log("========================".green);

  const { option } = await inquirer.prompt(preguntas);
  return option;
};

const pausa = async () => {
  const questions = [
    {
      type: "input",
      name: "enter",
      message: `Presione ${"ENTER".green} para continuar \n`,
    },
  ];
  console.log("\n");
  await inquirer.prompt(questions);
};

const inputText = async (message) => {
  const questions = {
    type: "input",
    name: "desc",
    message,
    validate(value) {
      if (value.length <= 0) {
        return "Porfavor ingrese un valor";
      }
      return true;
    },
  };
  const { desc } = await inquirer.prompt(questions);
  return desc;
};

const listarLugares = async (lugares = [], mensaje) => {
  const choices = lugares.map((lugar, i) => {
    const idx = `${i + 1}.`.green;
    return {
      value: `${lugar.id}`,
      name: `${idx} ${lugar.nombre} ${lugar.pais? "/ "+lugar.pais : ''}`,
    };
  });

  choices.unshift({
    value: '0',
    name: '0.'.green + ' Cancelar'
  })

  const preguntas = {
    type: "list",
    name: "id",
    message: mensaje || "Selecione el lugar",
    choices,
  };

  const { id } = await inquirer.prompt(preguntas);
  return id;
};

const selecionDeTareas = async (tareas = []) => {
  const choices = tareas.map((tarea, i) => {
    const idx = `${i + 1}.`.green;
    return {
      value: tarea.id,
      name: `${idx} ${tarea.desc}`,
      checked: !!tarea.completadoEn,
    };
  });

  const preguntas = {
    type: "checkbox",
    name: "ids",
    message: "Seleccionar tareas a completar",
    choices,
  };

  const { ids } = await inquirer.prompt(preguntas);
  return ids;
};


const confirmar = async (message) => {
  const question = [
    {
      type: 'confirm',
      name: 'ok',
      message
    }
  ]
  const { ok } = await inquirer.prompt(question);
  return ok;
}

module.exports = {
  inquirerMenu,
  pausa,
  inputText,
  listarLugares,
  confirmar,
  selecionDeTareas
};
