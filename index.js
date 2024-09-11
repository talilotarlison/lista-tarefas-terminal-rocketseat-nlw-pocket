import { promises as fs } from "fs";

(async () => {
  const { select, input, checkbox } = await import("@inquirer/prompts");

  // mensagem tela
  let mensagem = "Bem vindo ao suas Metas!!";
  // array de metas cadastradas
  let metas = [
    {
      value: "Jogar bola 3 vezez na semana",
      checked: false,
    },
  ];
  // carregar metas
  let carregarMetas = async () => {
    try {
      const dados = await fs.readFile("metas.json", "utf-8");
      metas = JSON.parse(dados);
    } catch (error) {
      console.error("Erro ao ler o arquivo:", error);
      metas = [];
    }
  };
  // salvar minhas metas
  let salvarMetas = async () => {
    await fs.writeFile("metas.json", JSON.stringify(metas, null, 2));
  };
  // deletar metas
  let deletarMetas = async () => {
    if (metas.length == 0) {
      console.log("Não existe metas");
      return;
    }

    let metasDemacadas = metas.map((meta) => {
      return {
        value: meta.value,
        checked: false,
      };
    });

    const itensDeletar = await checkbox({
      message:
        "Use as setas para mudar de meta e <espaço> para marcar ou desmarca as metas,<enter> para finalizar e deletar.",
      choices: [...metasDemacadas],
      instructions: false,
    });

    if (itensDeletar.length == 0) {
      console.log("Nada marcado para deletar!!");
      return;
    }

    itensDeletar.forEach((item) => {
      metas = metas.filter((meta) => {
        return meta.value != item;
      });
    });
    mensagem = "Metas removidas com sucesso";
  };

  // metas em aberto
  let metasAbetas = async () => {
    if (metas.length == 0) {
      console.log("Não existe metas");
      return;
    }

    let abertas = metas.filter((aberta) => {
      return aberta.checked == false;
    });

    //console.log(abertas);
    if (abertas.length == 0) {
      console.log("Não existe metasem aberto!!");
      return;
    }
    await select({
      message: `Tarefas em aberto: ${abertas.length}`,
      choices: [...abertas],
    });
  };

  //metas metasRealizadas
  let metasRealizadas = async () => {
    if (metas.length == 0) {
      console.log("Não existe metas");
      return;
    }

    let realizadas = metas.filter((realizada) => {
      return realizada.checked == true;
    });

    //console.log(realizadas);
    if (realizadas.length == 0) {
      console.log("Não existe metas realizada!!");
      return;
    }
    await select({
      message: `Tarefas realizadas: ${realizadas.length}`,
      choices: [...realizadas],
    });
  };
  // lista na tela
  let listarMetas = async () => {
    if (metas.length == 0) {
      console.log("Não existe metas");
      return;
    }
    const respostas = await checkbox({
      message:
        "Use as setas para mudar de meta e <espaço> para marcar ou desmarca as metas,<enter> para finalizar.",
      choices: [...metas],
      instructions: false,
    });

    metas.forEach((meta) => {
      meta.checked = false;
    });

    if (respostas.length == 0) {
      console.log("Nenhuma meta selecionado");
      return;
    }

    respostas.forEach((resposta) => {
      const meta = metas.find((meta) => {
        return meta.value == resposta;
      });

      meta.checked = true;
    });
    console.log("Metas concluidas");
  };
  // limpar terminal
  let mostarMensagem = () => {
    console.clear();
    console.log(mensagem);
    console.log("");
    mensagem = "";
  };

  // funcao cadastrar metas
  let cadastrarMetas = async () => {
    let meta = await input({ message: "Digite a sua meta:" });

    if (meta.length == 0) {
      console.log("A meta não pode ser vazia, tente novamente");
      await cadastrarMetas();
    } else {
      metas.push({
        value: meta,
        checked: false,
      });
    }
  };

  //start da aplicação
  const start = async () => {
    await carregarMetas();
    mostarMensagem();
    while (true) {
      await salvarMetas();

      let opcao = await select({
        message: "Menu >",
        choices: [
          {
            name: "Cadastrar Metas",
            value: "cadastrar",
          },
          {
            name: "Listar todas as Metas",
            value: "listar",
          },
          {
            name: "Metas Realizadas",
            value: "realizadas",
          },
          {
            name: "Metas em aberto",
            value: "abertas",
          },
          {
            name: "Deletar Metas",
            value: "deletar",
          },
          {
            name: "Sair",
            value: "sair",
          },
        ],
      });

      switch (opcao) {
        case "cadastrar":
          await cadastrarMetas();
          break;
        case "listar":
          await listarMetas();
          break;
        case "realizadas":
          await metasRealizadas();
          break;
        case "abertas":
          await metasAbetas();
          break;
        case "deletar":
          await deletarMetas();
          break;
        case "sair":
          console.log("Atea a proxima");
          return;
      }
    }
  };
  // start da aplicação
  start();
})();
