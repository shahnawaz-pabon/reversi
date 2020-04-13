import React from 'react';
import Navbar from '../../components/Navbar';
import Board from '../../components/Board';

var trackMoveObjects = function(x, y) {
    return {
        "direction" : x,
        "used" : y
    };
};

export default class Game extends React.Component {

    constructor(props) {
        super(props);

        let trackMove = [];

        for (let x = 0; x < 8; x++) {
            trackMove[x] = [];
            for (let y = 0; y < 8; y++) {
                trackMove[x][y] = trackMoveObjects("", false);
            }
        }

        trackMove[3][3].used = true;
        trackMove[3][4].used = true;
        trackMove[4][3].used = true;
        trackMove[4][4].used = true;
        trackMove[2][4].direction = "down";
        trackMove[5][3].direction = "up";
        trackMove[4][2].direction = "right";
        trackMove[3][5].direction = "left";

        this.state = {
            squares: Array(64).fill(null),
            trackMove: trackMove,
            userIsNext: true
        };
    }

    handleClick(x, y) {
        console.log(x, y);
        console.log(this.state.trackMove[x][y]);
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
                        trackMove={this.state.trackMove}
                        onClick={(x, y) => this.handleClick(x, y)}
                    />
                </div>
            </>
        );
    }
}