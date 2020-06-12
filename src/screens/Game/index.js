import React from 'react';
import ReactDOM from 'react-dom';
import Navbar from '../../components/Navbar';
import Board from '../../components/Board';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDesktop, faUserSecret, faCheckCircle } from '@fortawesome/free-solid-svg-icons';

var trackMoveObjects = function(x, y, z) {
    return {
        "direction" : x,
        "used" : y,
        "name": z
    };
};

export default class Game extends React.Component {

    constructor(props) {
        super(props);

        let trackMove = [];

        for (let x = 0; x < 8; x++) {
            trackMove[x] = [];
            for (let y = 0; y < 8; y++) {
                trackMove[x][y] = trackMoveObjects("", false, "");
            }
        }

        trackMove[3][3].used = true;
        trackMove[3][3].name = "user";
        trackMove[3][4].used = true;
        trackMove[3][4].name = "computer";
        trackMove[4][3].used = true;
        trackMove[4][3].name = "computer";
        trackMove[4][4].used = true;
        trackMove[4][4].name = "user";
        trackMove[2][4].direction = "down";
        trackMove[5][3].direction = "up";
        trackMove[4][2].direction = "right";
        trackMove[3][5].direction = "left";

        /* Initial Available Moves */
        trackMove[2][4].name = "check";
        trackMove[4][2].name = "check";
        trackMove[3][5].name = "check";
        trackMove[5][3].name = "check";
        /* Initial Available Moves */

        this.state = {
            squares: Array(64).fill(null),
            trackMove: trackMove,
            userIsNext: true
        };
    }

    handleClick(event, x, y) {
        console.log("event");
        console.log(event);

        // console.log(x);
        // console.log(y);
        let id = x+""+y;
        console.log(id);

        console.log(document.getElementById(id));
        // console.log(x, y);

        console.log(this.state.trackMove[x][y]);

        this.state.trackMove[x][y].name = "user";

        // return (<FontAwesomeIcon icon={faDesktop} size="lg" color='#2c3e50' />)
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
                        onClick={(event, x, y) => this.handleClick(event, x, y)}
                    />
                </div>
            </>
        );
    }
}