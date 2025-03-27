# 📌 Gacha Management - DEV Notes

## 🔧 Funcionalidades Implementadas
### 📝 Tarefas
- [X] Atualização do status de concluído (Is Done)
- [X] Criação de novas tarefas
- [ ] Edição de tarefas

### 🎮 Jogos
- [ ] Atualização da stamina (Editar Jogo)
- [ ] Criação de um novo jogo

## 🛠️ Melhorias Planejadas (To-Do List)
- [ ] Criar um histórico de alterações em tarefas/jogos
- [ ] Criar testes automatizados para funcionalidades principais
- [ ] Melhorar a interface (CSS/UI/UX)
- [ ] Implementar funcionalidade de edição com redirecionamento para uma nova página de formulário
- [X] Reorganizar estrutura separando **Task** de **dbTask**
- [ ] Adicionar mensagens de confirmação ao concluir uma operação
- [ ] Reordenar as tarefas concluídas para o final da lista
- [ ] Criar um filtro por tipo de evento (Diário, Semanal, etc.) e jogo
- [ ] Limpar os formulários após adicionar uma nova tarefa/jogo

## 🐛 Correções de Bug Pendentes
- [ ] A primeira vez que a página é carregada fica em branco (deve esperar o carregamento dos dados)
- [ ] Corrigir chamadas duplicadas da função `displayAllGames()` ao carregar a página

## 📌 Aprendizados Importantes
- Uso de **módulos JavaScript** (`import/export`)
- Introdução ao **Dexie.js** para banco de dados IndexedDB
- Uso de **Event Listeners** ao invés de funções inline no HTML
- **Evitar `var`** (escopo de função), preferindo `const` e `let` (escopo de bloco)
- Diferenças entre **ES Modules** (`import/export`) e **CommonJS** (`require()`)
