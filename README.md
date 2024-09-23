# API-REST-QUERO

## 📋 O Desafio


### Funcionalidades

1. **Leitura dos dados**:

- Consuma as ofertas a partir do arquivo `data.json` ou salve-as em um banco de dados, se preferir.

2. **Listagem de Ofertas**:

- [x] Exiba todas as ofertas, retornando os dados nos seguintes formatos:
    - [x] O valor `presencial` deve ser exibido como `Presencial` 🏫.
    - [x] O valor `ead` deve ser exibido como `EaD` 🏠.
    - [x] Os valores de `level`:
        - [x] `bacharelado` → `Graduação (bacharelado)` 🎓.
        - [x] `tecnologo` → `Graduação (tecnólogo)` 🎓.
        - [x] `licenciatura` → `Graduação (licenciatura)` 🎓.
    - [x] Os valores `fullPrice` e `offeredPrice` devem ser formatados como moeda no formato brasileiro _(ex: `R$ 550,00`)_.
    - [x] Calcule e exiba a porcentagem de desconto com base nos preços (`fullPrice` e `offeredPrice`) no formato `27%` 📉.
    - [x] **Filtragem e Ordenação**:

- [ x] Implemente filtros para as seguintes categorias:
    - [x] `level` (graduação, tecnólogo, licenciatura) 🎓.
    - [x] `kind` (presencial, EaD) 🏫.
    - [ ] `offeredPrice` (permitir filtrar por um intervalo de valores) 📉.
-


### Como Executar:

# Procedimento para Executar o Código Express

## 1. Instalar o Node.js

Se ainda não tiver o Node.js instalado, faça o download e instale-o a partir do [site oficial](https://nodejs.org/).

## 2. Criar um Novo Diretório para o Projeto

Abra o terminal e crie um novo diretório:

mkdir meu-projeto-express
cd meu-projeto-express


3. Inicializar um Novo Projeto Node.js
   npm init -y
   
5. Instalar as Dependências Necessárias
   npm install express
   
7. Executar
   7. Executar o Servidor
      node app.js
