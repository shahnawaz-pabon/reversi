import React from 'react';
import Navbar from '../../components/Navbar';
import Board from '../../components/Board';

export default class Game extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            squares: Array(64).fill(null),
            userIsNext: true
        };
    }

    handleClick(i) {
        console.log(i);
    }

    render() {

        return (
            <>
                <Navbar />
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: '5%'
                }}>
                    <Board
                        squares={this.state.squares}
                        onClick={(i) => this.handleClick(i)}
                    />
                </div>
            </>
        );
    }
}