import React from 'react';
import { Row } from 'react-bootstrap';
import './board.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDesktop, faUserSecret, faCheckCircle } from '@fortawesome/free-solid-svg-icons';

export default class Board extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            trackMove: props.trackMove
        }
    }

    renderSquare(x, y) {

        let key = "" + x + "" + y;

        return (

            <button key={key} className="square" onClick={() => this.props.onClick(x, y)}>

                {
                    (this.state.trackMove[x][y].name === "user") &&
                    <FontAwesomeIcon icon={faUserSecret} size="lg" color='#2c3e50' />
                }

                {
                    (this.state.trackMove[x][y].name === "computer") &&
                    <FontAwesomeIcon icon={faDesktop} size="lg" color='#2c3e50' />
                }

                {
                    (this.state.trackMove[x][y].name === "check") &&
                    <FontAwesomeIcon className="checkIcon" icon={faCheckCircle} size="lg" color='#999' />
                }

            </button>
        );
    }

    render() {

        return (
            <div>
                {
                    [0, 1, 2, 3, 4, 5, 6, 7].map((row) => {
                        return <Row key={row} className="board-row">
                            {
                                [0, 1, 2, 3, 4, 5, 6, 7].map((col) => {
                                    return this.renderSquare(row, col)
                                })
                            }
                        </Row>

                    })
                }
            </div>
        )
    }
}