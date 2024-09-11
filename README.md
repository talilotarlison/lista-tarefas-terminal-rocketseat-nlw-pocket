
# Meu Projeto Lista Tarefas de Metas em Node.js feito no evento nlw-pocket da Rocketseat

Projeto roda no terminal do sistema, se apresentar algum erro atente as informações abaixo:

Este projeto utiliza a biblioteca `inquirer` para prompts interativos no terminal. Abaixo estão as instruções para importar corretamente a biblioteca e resolver problemas comuns de importação.

## Importando a Biblioteca `inquirer`

### Usando `import`

Se o seu projeto estiver configurado para usar módulos ES, você pode importar o `inquirer` assim:

```javascript
import { select, prompt } from '@inquirer/prompts';
```
Usando require com Versões Anteriores
Se você preferir continuar usando require, você pode instalar uma versão anterior do inquirer que ainda suporta CommonJS:

```
npm install inquirer@^8.0.0
```
E então, no seu código:

JavaScript
```
const { select, prompt } = require('@inquirer/prompts');
```
Código gerado por IA. Examine e use com cuidado. Mais informações em perguntas frequentes.
Usando require com a Versão Atual
Se você quiser usar a versão mais recente do inquirer com require, você pode usar uma importação dinâmica:

```JavaScript
(async () => {
  const { select, prompt } = await import('@inquirer/prompts');
  // seu código aqui
})();
```
Código gerado por IA. Examine e use com cuidado. Mais informações em perguntas frequentes.
Resolvendo o Erro SyntaxError: Cannot use import statement outside a module
Esse erro ocorre porque o Node.js não está reconhecendo seu arquivo como um módulo ES. Aqui estão algumas maneiras de resolver isso:

Definir o Tipo de Módulo no package.json
Adicione "type": "module" no seu arquivo package.json para que o Node.js trate todos os arquivos .js como módulos ES.

```JSON

{
  "name": "seu-projeto",
  "version": "1.0.0",
  "type": "module",
  "main": "app.js",
  "dependencies": {
    // suas dependências
  }
}
```
Código gerado por IA. Examine e use com cuidado. Mais informações em perguntas frequentes.
Usar a Extensão .mjs
Renomeie seu arquivo de .js para .mjs. O Node.js reconhece automaticamente arquivos com essa extensão como módulos ES.
```
Usar a Flag --experimental-modules
```
Se você estiver usando uma versão mais antiga do Node.js, pode executar seu script com a flag --experimental-modules:
```
node --experimental-modules seu-arquivo.js
```
Importação Dinâmica
Se você preferir não alterar a configuração do seu projeto, pode usar a importação dinâmica:

```JavaScript

(async () => {
  const { select, prompt } = await import('@inquirer/prompts');
  // seu código aqui
})();
```
Essas abordagens devem ajudar a resolver o erro de importação.

