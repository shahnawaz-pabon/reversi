import React from 'react';
import Navbar from '../../components/Navbar';
import Board from '../../components/Board';

export default class Game extends React.Component {

    constructor(props) {
        super(props);

        let trackMove = [];

        let trackMoveObjects = {
            direction: "sad",
            used: true
        }

        for (let x = 0; x < 8; x++) {
            trackMove[x] = [];
            for (let y = 0; y < 8; y++) {
                trackMove[x][y] = trackMoveObjects;
            }
        }

        // var counter = 0;

        // for (let x = 0; x < 8; x++) {
        //     for (let y = 0; y < 8; y++) {
        //         console.log(trackMove[x][y]);

        //         counter++;
        //     }
        // }

        // console.log("trackMove");
        // console.log(counter);

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