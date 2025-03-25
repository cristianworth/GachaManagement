
# Functionalitis
## Task
- [X] Update Is Done Status
- [X] Create new Task
- [ ] Edit Task

## Game
- [ ] Update stamina (Edit Game)
- [ ] Create new Game

# To-do List
- [ ] Create a log table to save the changes from tasks / games
- [ ] Create tests for the main funcionalities
- [ ] Improve css/UI/UX
- [ ] Edit funcionality (redirect to a new Form Page)
- [ ] Reorder structure (separate Task an dbTask)
- [ ] Confirm Dialog Message that the operation was sucessfull
- [ ] Reorder Is Done to last from the display list
- [ ] Filter by Refresh Type (Event, Weekly)
- [ ] Clear form after adding a new task/game

# Bug fix
- [ ] First time entering the page is blank (it's now waiting untill all data is populated)
- [ ] Fix 2 calls for displayAllGames when the page loads

## Main points learned
- Use of script module
- New library Dexie Database
- Use of Event Listeners intead of inline functions
- Deprecated use of `var` (function scoped), use instead `const` and `let` (block scope)

### TypeScript cmds
```
npm install -g typescript // install it globally
node -v // typescript runs under node

tsc index.ts // gera arquivo js
node index.js // runs the js file
tsc index.ts --target "ESNEXT" // arquivo js com a versão mais recente do EcmaScript

tsc --init // gera arquivo tsconfig.json
tsc --watch // automatically generetes de js file
```
