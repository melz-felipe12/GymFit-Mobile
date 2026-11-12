# GymmApp — projeto unificado (TelasMobile)

União dos quatro projetos Expo (Caylanne, Felipe, Julio e Nelson) em um único app,
com uma navegação só (React Navigation, native stack). Expo SDK 58.

## Como rodar

```bash
npm install
npx expo start          # celular (Expo Go) — QR Code
npx expo start --web    # navegador
npm run typecheck       # checagem de tipos
```

## Quem fez o quê (cada um continua na sua pasta em `src/`)

| Pasta | Conteúdo |
|---|---|
| `src/nelson/` | `Login` (entrar/cadastrar) + `validate.js` |
| `src/caylanne/` | `AlunoInicio`, `InstrutorInicio` + componentes e tema próprios |
| `src/felipe/` | `AlunoProgresso`, `AlunoMensagens` + componentes, tema e dados mock |
| `src/julio/` | `Historico`, `Perfil`, `Treino` (placeholder) + componentes e cores |
| `src/navigation/` | **Código novo**: rotas, tipos e ligação dos menus |

As pastas têm `Card`, `BottomMenu`, `SectionTitle`, `StatCard` e temas próprios (com pequenas
diferenças entre si). Foram mantidos separados de propósito para não mexer no código de ninguém;
dá para unificar depois num `src/components` único.

## Mapa de navegação

```
Login ──(entrar)──▶ AlunoInicio ◀──avatar NA / PM──▶ InstrutorInicio
                       │
        menu inferior do aluno (em todas as telas do aluno)
   Início · Treino · Histórico · Progresso · Mensagens · Perfil
                                                         │
                                          Perfil ──(Sair)──▶ Login
```

- Rotas: `Login`, `AlunoInicio`, `Treino`, `Historico`, `AlunoProgresso`, `AlunoMensagens`, `Perfil`, `InstrutorInicio`
  (registradas em `src/navigation/AppNavigator.tsx`).
- `src/navigation/alunoTabs.ts` liga cada aba do menu à sua rota; é usado por todas as telas do aluno.
- `src/navigation/withAlunoMenu.tsx` encaixa o menu inferior nas telas do Julio (que antes dependiam
  do `<Tabs>` do expo-router) sem alterar o código delas.
- O avatar (`NA` / `PM`) continua sendo o atalho de demonstração entre aluno e instrutor, como no projeto da Caylanne.

## O que mudou em relação aos originais

Só navegação, mais dois ajustes de compatibilidade:

- **Navegação:** `BottomMenu` da Caylanne ganhou `onSelect`; `AlunoInicio`, `AlunoProgresso` e `AlunoMensagens`
  passaram a usar `goToAlunoTab`; `Perfil` (Sair) volta ao `Login`; o `App` do Nelson virou a tela `Login`
  e, ao entrar, abre `AlunoInicio`. O `_layout.tsx` (Tabs do expo-router) do Julio foi substituído por `src/navigation/`.
- **Ajuste 1 (bug):** `validate.js` do Nelson não exportava nada (`function Validate` sem `export`, importado como `validate`),
  então o botão Entrar/Cadastrar quebrava. Agora é `export function validate`.
- **Ajuste 2 (tipo):** `useRef<ScrollView>` → `useRef<ScrollViewInstance>` em `AlunoMensagens`, exigido pelo RN 0.88.
  Não muda o comportamento.

## Pendências (não existiam nos projetos originais)

- Aba **Treino** do aluno é só o placeholder do Julio.
- Menu do **instrutor**: só `Início` existe; `Alunos`, `Treinos` e `Mensagens` ainda não têm tela, e `Perfil` segue como atalho para o aluno.
