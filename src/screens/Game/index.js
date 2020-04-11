import React from 'react';
import Navbar from '../../components/Navbar';
import Board from '../../components/Board';

export default class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null)
            }],
            xIsNext: true
        };
    }

    handleClick(i){
        console.log(i);
    }

    render() {

        const history = this.state.history;
        const current = history[history.length - 1];

        return (
            <>
                <Navbar />
                <Board
                    squares={current.squares}
                    onClick={(i) => this.handleClick(i)}
                />
            </>
        );
    }
}