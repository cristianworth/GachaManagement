# TypeScript cmds
```
npm install -g typescript // install it globally
node -v // typescript runs under node

tsc index.ts // gera arquivo js
node index.js // runs the js file
tsc index.ts --target "ESNEXT" // arquivo js com a versão mais recente do EcmaScript

tsc --init // gera arquivo tsconfig.json
tsc --watch // automatically generetes de js file
```

# TO DO
- fix teste da data quebrando
- quando add um novo jogo fazer ele calcular o max stamina com a data atual
- temporizador de resina (eu tenho 72resina, boto um temporizador pra me avisar quando vai ter 80)
- nova coluna no game, com a resina atual (bota update, para atualizar o temporizador de todos)