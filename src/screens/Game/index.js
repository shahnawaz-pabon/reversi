import React from 'react';
import Navbar from '../../components/Navbar';
import Board from '../../components/Board';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDesktop, faUserSecret, faCheckCircle } from '@fortawesome/free-solid-svg-icons';

var trackMoveObjects = function (x, y, z) {
    return {
        "direction": x,
        "used": y,
        "name": z,
        "left": false,
        "right": false,
        "up": false,
        "down": false,
        "upperLeft": false,
        "upperRight": false,
        "lowerLeft": false,
        "lowerRight": false
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

        trackMove[2][4].down = true;
        trackMove[5][3].up = true;
        trackMove[4][2].right = true;
        trackMove[3][5].left = true;

        /* Initial Available Moves */
        trackMove[2][4].name = "check";
        trackMove[4][2].name = "check";
        trackMove[3][5].name = "check";
        trackMove[5][3].name = "check";
        /* Initial Available Moves */

        this.state = {
            squares: Array(64).fill(null),
            trackMove: trackMove,
            userIsNext: true,
            userCounter: 2,
            computerCounter: 2
        };
    }

    handleClick(x, y) {
        let id = x + "" + y;
        console.log(id);

        this.setState({
            userIsNext: !this.state.userIsNext
        });

        this.setState(prevState => {
            prevState.trackMove[x][y].name = "user";

            return {
                ...prevState.trackMove
            };
        });

        console.log(this.state.trackMove[x][y]);

    }

    render() {

        return (
            <>
                <Navbar />

                <div style={{
                    textAlign: "center",
                    fontFamily: 'Ubuntu',
                    fontWeight: 'bold',
                    marginTop: 25
                }}
                >
                    {
                        (this.state.userIsNext) ?
                            <h3>User's Turn</h3> :
                            <h3>Computer's Turn</h3>
                    }
                </div>
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