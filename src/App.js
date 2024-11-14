import React, { Component } from "react";
import { Alert, StyleSheet, View } from "react-native";
import params from "./params";
import {
    cloneBoard,
    createMineBoard,
    flagUsed,
    hadExplosion,
    invertFlag,
    openField,
    showMines,
    wonGame
} from "./functions";
import MineFields from "./components/MineFields";
import Header from "./components/Header";
import LevelSelection from "./screens/LevelSelection";
export default class App extends Component {

    constructor(props) {
        super(props)
        this.state = this.createState()
    }
    minesAmount = () => {
        const cols = params.getColumnsAmount()
        const rows = params.getRowsAmount()
        return Math.ceil(cols * rows * params.difficultLevel)
    }
    createState = () => {
        const cols = params.getColumnsAmount()
        const rows = params.getRowsAmount()
        return {
            board: createMineBoard(rows, cols, this.minesAmount()),
            won: false,
            lost: false,
            showLevelSelection: false,
        }
    }

    onOpenField = (row, column) => {
        const board = cloneBoard(this.state.board)
        openField(board, row, column)
        const lost = hadExplosion(board)
        const won = wonGame(board)
        if (lost) {
            showMines(board)
            Alert.alert("Perdeuuuu!", "Que burrooo!")
        }
        if (won) {
            Alert.alert("Parabens", "Você Venceu!")
        }
        this.setState({ board, lost, won })
    }

    onSelectField = (row, column) => {
        const board = cloneBoard(this.state.board)
        invertFlag(board, row, column)
        const won = wonGame(board)

        if (won) {
            Alert.alert("Parabens", "Você ganhou!")
        }
        this.setState({ board, won })
    }

    onLevelSelect = level => {
        params.difficultLevel = level
        this.setState(this.createState())
    }

    render() {
        return (
            <View style={style.container}>
                <LevelSelection isVisible={this.state.showLevelSelection}
                    onLevelSelected={this.onLevelSelect}
                    onCancel={() => this.setState({ showLevelSelection: false })}
                />
                <Header flagLeft={this.minesAmount() - flagUsed(this.state.board)}
                    onNewGame={() => this.setState(this.createState())}
                    onFlagPress={() => this.setState({ showLevelSelection: true })} />
                <View style={style.board}>
                    <MineFields board={this.state.board} onOpenField={this.onOpenField} onSelectField={this.onSelectField} />
                </View>

            </View>
        )
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-end",
    },
    board: {
        alignItems: "center",
        borderBlockColor: "#AAA"
    }
})