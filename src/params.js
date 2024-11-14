import { Dimensions } from "react-native";
const params = {
    blockSize: 30,
    borderSize: 5,
    fontSize: 15,
    headerRatio: 0.15, //proporção do painel superior na tela(cabeçalho)
    difficultLevel: 0.1,
    //Quantidade de colunas
    getColumnsAmount() {
        const width = Dimensions.get("window").width
        //Divide a largura pelo tamanho dos blocos
        return Math.floor(width / this.blockSize)
    },
    //Quantidade de linhas
    getRowsAmount() {
        const totalHeight = Dimensions.get("window").height
        const boardHeight = totalHeight * (1 - this.headerRatio)
        //Divide a altura pelo tamanho dos blocos
        return Math.floor(boardHeight / this.blockSize)
    }
}
export default params