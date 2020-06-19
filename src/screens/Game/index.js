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
        "lowerRight": false,
        "counter": 0
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

        // trackMove[2][4].down = true;
        // trackMove[5][3].up = true;
        // trackMove[4][2].right = true;
        // trackMove[3][5].left = true;

        /* Initial Available Moves */
        // trackMove[2][4].name = "check";
        // trackMove[4][2].name = "check";
        // trackMove[3][5].name = "check";
        // trackMove[5][3].name = "check";
        /* Initial Available Moves */

        this.state = {
            squares: Array(64).fill(null),
            trackMove: trackMove,
            userIsNext: true,
            userCounter: 2,
            computerCounter: 2
        };
    }

    componentDidMount(){
        this.availableMoveForUser();
    }

    handleClick(x, y) {
        let id = x + "" + y;
        console.log(id);

        if (this.state.trackMove[x][y].name === "check") {

            this.setState({
                userIsNext: !this.state.userIsNext
            });

            this.flipUserIcons(x, y);

        }

    }

    availableMoveForUser() {

        this.setState(prevState => {

            for (let row = 0; row < 8; row++) {

                for (let col = 0; col < 8; col++) {

                    if (prevState.trackMove[row][col].name === "user") {

                        let cnt = 0, temp;

                        // To Up direction
                        for (temp = row - 1; temp >= 0; temp--) {

                            if (prevState.trackMove[temp][col].name === "computer") {
                                cnt++;
                            } else if (prevState.trackMove[temp][col].counter >= 0 && cnt > 0) {
                                prevState.trackMove[temp][col].counter += cnt;
                                prevState.trackMove[temp][col].down = true;
                                prevState.trackMove[temp][col].name = "check";
                                break;
                            } else {
                                break;
                            }

                        }


                        // To Down direction
                        cnt = 0;
                        for (temp = row + 1; temp < 8; temp++) {

                            if (prevState.trackMove[temp][col].name === "computer") {
                                cnt++;
                            } else if (prevState.trackMove[temp][col].counter >= 0 && cnt > 0) {
                                prevState.trackMove[temp][col].counter += cnt;
                                prevState.trackMove[temp][col].up = true;
                                prevState.trackMove[temp][col].name = "check";
                                break;
                            } else {
                                break;
                            }

                        }

                        // To Right direction
                        cnt = 0;
                        for (temp = col + 1; temp < 8; temp++) {

                            if (prevState.trackMove[col][temp].name === "computer") {
                                cnt++;
                            } else if (prevState.trackMove[col][temp].counter >= 0 && cnt > 0) {
                                prevState.trackMove[col][temp].counter += cnt;
                                prevState.trackMove[col][temp].left = true;
                                prevState.trackMove[col][temp].name = "check";
                                break;
                            } else {
                                break;
                            }

                        }

                        // To Left direction
                        cnt = 0;
                        for (temp = col - 1; temp >= 0; temp--) {

                            if (prevState.trackMove[col][temp].name === "computer") {
                                cnt++;
                            } else if (prevState.trackMove[col][temp].counter >= 0 && cnt > 0) {
                                prevState.trackMove[col][temp].counter += cnt;
                                prevState.trackMove[col][temp].right = true;
                                prevState.trackMove[col][temp].name = "check";
                                break;
                            } else {
                                break;
                            }

                        }

                    }

                }
            }

            return {
                ...prevState.trackMove
            };
        });



    }

    flipUserIcons(row, col) {

        console.log(this.state.trackMove[row][col]);

        if (this.state.trackMove[row][col].down) {

            this.setState(prevState => {

                for (let x = row; x < 8; x++) {

                    if (prevState.trackMove[x][col].name === "computer" || prevState.trackMove[x][col].name === "check") {
                        prevState.trackMove[x][col].name = "user";
                    }
                    else {
                        break;
                    }

                }

                return {
                    ...prevState.trackMove
                };
            });

        }
        if (this.state.trackMove[row][col].up) {

            this.setState(prevState => {

                for (let x = row; x >= 0; x--) {

                    if (prevState.trackMove[x][col].name === "computer" || prevState.trackMove[x][col].name === "check") {
                        prevState.trackMove[x][col].name = "user";
                    }
                    else {
                        break;
                    }

                }

                return {
                    ...prevState.trackMove
                };
            });

        }
        if (this.state.trackMove[row][col].right) {

            this.setState(prevState => {

                for (let x = col; x < 8; x++) {

                    if (prevState.trackMove[row][x].name === "computer" || prevState.trackMove[row][x].name === "check") {
                        prevState.trackMove[row][x].name = "user";
                    }
                    else {
                        break;
                    }

                }

                return {
                    ...prevState.trackMove
                };
            });



        }
        if (this.state.trackMove[row][col].left) {

            this.setState(prevState => {

                for (let x = col; x >= 0; x--) {

                    if (prevState.trackMove[row][x].name === "computer" || prevState.trackMove[row][x].name === "check") {
                        prevState.trackMove[row][x].name = "user";
                    }
                    else {
                        break;
                    }

                }

                return {
                    ...prevState.trackMove
                };
            });

        }

        this.setState(prevState => {

            for (let x = 0; x < 8; x++) {
            
                for (let y = 0; y < 8; y++) {

                    if (prevState.trackMove[x][y].name === "check"){

                        prevState.trackMove[x][y].name = "";

                    }

                    prevState.trackMove[x][y].up = false;
                    prevState.trackMove[x][y].down = false;
                    prevState.trackMove[x][y].left = false;
                    prevState.trackMove[x][y].right = false;
                    prevState.trackMove[x][y].upperLeft = false;
                    prevState.trackMove[x][y].upperRight = false;
                    prevState.trackMove[x][y].lowerLeft = false;
                    prevState.trackMove[x][y].lowerRight = false;
                    prevState.trackMove[x][y].counter = 0;
                    
                }
            }

            return {
                ...prevState.trackMove
            };
        });



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