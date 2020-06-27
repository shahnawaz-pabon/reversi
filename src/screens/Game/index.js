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
        "lowerLeft": false,
        "left": false,
        "right": false,
        "up": false,
        "down": false,
        "upperLeft": false,
        "upperRight": false,
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

        this.state = {
            squares: Array(64).fill(null),
            trackMove: trackMove,
            userIsNext: true,
            userCounter: 2,
            computerCounter: 2
        };
    }

    componentDidMount() {
        this.availableMoveForBoth("user", "computer");
    }

    handleClick(x, y) {
        let id = x + "" + y;
        console.log(id);

        if (this.state.trackMove[x][y].name === "check") {

            // console.log("CLicked now");
            // console.log(this.state.userIsNext);

            console.log(this.state.trackMove[x][y]);

            if (this.state.userIsNext) {
                this.flipIcons(x, y, "computer", "user");
                this.availableMoveForBoth("computer", "user");
                console.log("For computer's move..");
            }
            else {
                this.flipIcons(x, y, "user", "computer");
                this.availableMoveForBoth("user", "computer");
                console.log("For user's move..");
            }

            // console.log(this.state.trackMove);


            this.setState({
                userIsNext: !this.state.userIsNext
            });

            // console.log("after set state");
            // console.log(this.state.userIsNext);


        }

    }

    availableMoveForBoth(currentName, checkName) {

        this.setState(prevState => {

            for (let row = 0; row < 8; row++) {

                for (let col = 0; col < 8; col++) {

                    if (prevState.trackMove[row][col].name === currentName) {

                        let cnt = 0, temp;

                        // To Up direction
                        for (temp = row - 1; temp >= 0; temp--) {

                            if (prevState.trackMove[temp][col].name === checkName) {
                                cnt++;
                            } else if (prevState.trackMove[temp][col].counter >= 0 && cnt > 0) {
                                prevState.trackMove[temp][col].counter += cnt;
                                prevState.trackMove[temp][col].down = true;

                                // if (this.state.userIsNext) {
                                prevState.trackMove[temp][col].name = "check";
                                // }

                                break;
                            } else {
                                break;
                            }

                        }


                        // To Down direction
                        cnt = 0;
                        for (temp = row + 1; temp < 8; temp++) {

                            if (prevState.trackMove[temp][col].name === checkName) {
                                cnt++;
                            } else if (prevState.trackMove[temp][col].counter >= 0 && cnt > 0) {
                                prevState.trackMove[temp][col].counter += cnt;
                                prevState.trackMove[temp][col].up = true;
                                // if (this.state.userIsNext) {
                                prevState.trackMove[temp][col].name = "check";
                                // }
                                break;
                            } else {
                                break;
                            }

                        }

                        // To Right direction
                        cnt = 0;
                        for (temp = col + 1; temp < 8; temp++) {

                            if (prevState.trackMove[row][temp].name === checkName) {
                                cnt++;
                            } else if (prevState.trackMove[row][temp].counter >= 0 && cnt > 0) {
                                prevState.trackMove[row][temp].counter += cnt;
                                prevState.trackMove[row][temp].left = true;
                                // if (this.state.userIsNext) {
                                prevState.trackMove[row][temp].name = "check";
                                // }
                                break;
                            } else {
                                break;
                            }

                        }

                        // To Left direction
                        cnt = 0;
                        for (temp = col - 1; temp >= 0; temp--) {

                            if (prevState.trackMove[row][temp].name === checkName) {
                                cnt++;
                            } else if (prevState.trackMove[row][temp].counter >= 0 && cnt > 0) {
                                prevState.trackMove[row][temp].counter += cnt;
                                prevState.trackMove[row][temp].right = true;
                                // if (this.state.userIsNext) {
                                prevState.trackMove[row][temp].name = "check";
                                // }
                                break;
                            } else {
                                break;
                            }

                        }

                        // To UpperLeft direction
                        cnt = 0;
                        for (let tempRow = row - 1, tempCol = col - 1; tempRow >= 0 && tempCol >= 0; tempRow--, tempCol--) {

                            if (prevState.trackMove[tempRow][tempCol].name === checkName) {
                                cnt++;
                            } else if (prevState.trackMove[tempRow][tempCol].counter >= 0 && cnt > 0) {
                                prevState.trackMove[tempRow][tempCol].counter += cnt;
                                prevState.trackMove[tempRow][tempCol].lowerRight = true;
                                // if (this.state.userIsNext) {
                                prevState.trackMove[tempRow][tempCol].name = "check";
                                // }
                                break;
                            } else {
                                break;
                            }

                        }

                        // To LowerRight direction
                        cnt = 0;
                        for (let tempRow = row + 1, tempCol = col + 1; tempRow < 8 && tempCol < 8; tempRow++, tempCol++) {

                            if (prevState.trackMove[tempRow][tempCol].name === checkName) {
                                cnt++;
                            } else if (prevState.trackMove[tempRow][tempCol].counter >= 0 && cnt > 0) {
                                prevState.trackMove[tempRow][tempCol].counter += cnt;
                                prevState.trackMove[tempRow][tempCol].upperLeft = true;
                                // if (this.state.userIsNext) {
                                prevState.trackMove[tempRow][tempCol].name = "check";
                                // }
                                break;
                            } else {
                                break;
                            }

                        }


                        // To UpperRight direction
                        cnt = 0;
                        for (let tempRow = row - 1, tempCol = col + 1; tempRow >= 0 && tempCol < 8; tempRow--, tempCol++) {


                            // console.log(tempRow, tempCol);
                            if (prevState.trackMove[tempRow][tempCol].name === checkName) {
                                cnt++;
                                // console.log("checkName");
                                // console.log(checkName);

                            } else if (prevState.trackMove[tempRow][tempCol].counter >= 0 && cnt > 0) {
                                prevState.trackMove[tempRow][tempCol].counter += cnt;
                                prevState.trackMove[tempRow][tempCol].lowerLeft = true;
                                // console.log("DHukse...");
                                // if (this.state.userIsNext) {
                                prevState.trackMove[tempRow][tempCol].name = "check";
                                // }
                                break;
                            } else {
                                break;
                            }

                        }


                        // To LowerLeft direction
                        cnt = 0;
                        for (let tempRow = row + 1, tempCol = col - 1; tempRow < 8 && tempCol >= 0; tempRow++, tempCol--) {

                            if (prevState.trackMove[tempRow][tempCol].name === checkName) {
                                cnt++;
                            } else if (prevState.trackMove[tempRow][tempCol].counter >= 0 && cnt > 0) {
                                prevState.trackMove[tempRow][tempCol].counter += cnt;
                                prevState.trackMove[tempRow][tempCol].upperRight = true;
                                // if (this.state.userIsNext) {
                                prevState.trackMove[tempRow][tempCol].name = "check";
                                // }
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

        // var mx = 0;

        // var MxposX = -1;
        // var MxposY = -1;

        // var MnposX = -1;
        // var MnposY = -1;


        // if (currentName === "computer") {

        //     for (let x = 0; x < 8; x++) {
        //         for (let y = 0; y < 8; y++) {

        //             if (this.state.trackMove[x][y].counter > 0) {

        //                 if (mx < this.state.trackMove[x][y].counter) {

        //                     mx = this.state.trackMove[x][y].counter;

        //                     MxposX = x;

        //                     MxposY = y;

        //                 }
        //             }
        //         }
        //     }

        //     if (MxposX >= 0) {
        //         console.log(MxposX, MxposY);
        //         // this.flipIcons(MxposX, MxposY, "user", "computer");
        //     }
        //     else {
        //         this.setState(prevState => {

        //             for (let x = 0; x < 8; x++) {

        //                 for (let y = 0; y < 8; y++) {

        //                     if (prevState.trackMove[x][y].name === "check") {

        //                         prevState.trackMove[x][y].name = "";

        //                     }

        //                     prevState.trackMove[x][y].up = false;
        //                     prevState.trackMove[x][y].down = false;
        //                     prevState.trackMove[x][y].left = false;
        //                     prevState.trackMove[x][y].right = false;
        //                     prevState.trackMove[x][y].upperLeft = false;
        //                     prevState.trackMove[x][y].upperRight = false;
        //                     prevState.trackMove[x][y].lowerLeft = false;
        //                     prevState.trackMove[x][y].lowerRight = false;
        //                     prevState.trackMove[x][y].counter = 0;

        //                 }
        //             }

        //             return {
        //                 ...prevState.trackMove
        //             };
        //         });

        //         this.setState({
        //             userIsNext: !this.state.userIsNext
        //         });
        //     }

        // }



    }

    flipIcons(row, col, changeIconFrom, changeIconTo) {

        // console.log(this.state.trackMove);
        // console.log("row, col, changeIconFrom, changeIconTo");
        // console.log(row, col, changeIconFrom, changeIconTo);

        this.setState(prevState => {

            prevState.trackMove[row][col].name = changeIconTo;

            if (prevState.trackMove[row][col].down) {

                for (let x = row + 1; x < 8; x++) {

                    if (prevState.trackMove[x][col].name === changeIconFrom) {
                        prevState.trackMove[x][col].name = changeIconTo;
                    }
                    else {
                        break;
                    }

                }

            }

            if (prevState.trackMove[row][col].up) {


                for (let x = row - 1; x >= 0; x--) {

                    if (prevState.trackMove[x][col].name === changeIconFrom) {
                        prevState.trackMove[x][col].name = changeIconTo;
                    }
                    else {
                        break;
                    }

                }

            }

            if (prevState.trackMove[row][col].right) {

                for (let x = col + 1; x < 8; x++) {

                    if (prevState.trackMove[row][x].name === changeIconFrom) {
                        prevState.trackMove[row][x].name = changeIconTo;
                    }
                    else {
                        break;
                    }

                }

            }

            if (prevState.trackMove[row][col].left) {

                for (let x = col - 1; x >= 0; x--) {

                    if (prevState.trackMove[row][x].name === changeIconFrom) {
                        prevState.trackMove[row][x].name = changeIconTo;
                    }
                    else {
                        break;
                    }

                }
            }


            if (prevState.trackMove[row][col].upperLeft) {

                for (let x = row - 1, y = col - 1; x >= 0 && y >= 0; x--, y--) {

                    if (prevState.trackMove[x][y].name === changeIconFrom) {
                        prevState.trackMove[x][y].name = changeIconTo;
                    }
                    else {
                        break;
                    }

                }
            }

            if (prevState.trackMove[row][col].upperRight) {

                for (let x = row - 1, y = col + 1; x >= 0 && y < 8; x--, y++) {

                    if (prevState.trackMove[x][y].name === changeIconFrom) {
                        prevState.trackMove[x][y].name = changeIconTo;
                    }
                    else {
                        break;
                    }

                }
            }

            if (prevState.trackMove[row][col].lowerLeft) {

                for (let x = row + 1, y = col - 1; x < 8 && y >= 0; x++, y--) {

                    if (prevState.trackMove[x][y].name === changeIconFrom) {
                        prevState.trackMove[x][y].name = changeIconTo;
                    }
                    else {
                        break;
                    }

                }
            }


            if (prevState.trackMove[row][col].lowerRight) {

                for (let x = row + 1, y = col + 1; x < 8 && y < 8; x++, y++) {

                    if (prevState.trackMove[x][y].name === changeIconFrom) {
                        prevState.trackMove[x][y].name = changeIconTo;
                    }
                    else {
                        break;
                    }

                }
            }



            return {
                ...prevState.trackMove
            };
        });

        // console.log("Changed trackMove");
        // console.log(this.state.trackMove);

        this.setState(prevState => {

            let userCounter = 0, computerCounter = 0;

            for (let x = 0; x < 8; x++) {

                for (let y = 0; y < 8; y++) {

                    if (prevState.trackMove[x][y].name === "check") {

                        prevState.trackMove[x][y].name = "";

                    }

                    if (prevState.trackMove[x][y].name === "user") {

                        userCounter++;

                    }

                    if (prevState.trackMove[x][y].name === "computer") {

                        computerCounter++;

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

            prevState.userCounter = userCounter;
            prevState.computerCounter = computerCounter;

            return {
                ...prevState.trackMove
            };
        });

        // console.log("this.state.userIsNext");
        // console.log(this.state.userIsNext);

        // if (!this.state.userIsNext) {
        //     this.availableMoveForBoth("computer", "user");
        // }

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