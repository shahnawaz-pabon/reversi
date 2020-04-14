import React from 'react';
import { Row } from 'react-bootstrap';
import './board.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDesktop, faUserSecret, faCheckCircle } from '@fortawesome/free-solid-svg-icons';

function Square(props) {
    // console.log("props.value");
    // console.log(props.position.x);
    // console.log(props.position.y);
    let id_of_button = props.position.x+""+props.position.y;

    return (
        <button className="square" id={id_of_button} onClick={props.onClick}>

            {
                ((props.position.x === 3 && props.position.y === 3) ||
                    (props.position.x === 4 && props.position.y === 4)) &&
                <FontAwesomeIcon icon={faUserSecret} size="lg" color='#2c3e50' />
            }

            {
                ((props.position.x === 3 && props.position.y === 4) ||
                    (props.position.x === 4 && props.position.y === 3)) &&
                <FontAwesomeIcon icon={faDesktop} size="lg" color='#2c3e50' />
            }
            {
                ((props.position.x === 2 && props.position.y === 4) ||
                    (props.position.x === 4 && props.position.y === 2) ||
                    (props.position.x === 3 && props.position.y === 5) ||
                    (props.position.x === 5 && props.position.y === 3)) &&
                <FontAwesomeIcon className="checkIcon" icon={faCheckCircle} size="lg" color='#999' />
            }

        </button>
    );
}

export default class Board extends React.Component {

    constructor(props) {
        super(props);
        this.iconRef = React.createRef();
    }

    renderSquare(x, y) {
        // console.log(i);
        let position = {
            x: x,
            y: y
        };

        return (
            <Square
                position={position}
                onClick={() => this.props.onClick(this.iconRef, x, y)}
                // refs={this.iconRef}
            />
        );
    }

    render() {

        // console.log("this.props.trackMove");
        // console.log(this.props.trackMove[3][3].used);
        // this.props.trackMove[3][3].used = false;
        // this.props.trackMove[3][3].direction = "up";

        return (
            <div>
                <Row className="board-row">
                    {this.renderSquare(0, 0)}
                    {this.renderSquare(0, 1)}
                    {this.renderSquare(0, 2)}
                    {this.renderSquare(0, 3)}
                    {this.renderSquare(0, 4)}
                    {this.renderSquare(0, 5)}
                    {this.renderSquare(0, 6)}
                    {this.renderSquare(0, 7)}
                </Row>
                <Row className="board-row">
                    {this.renderSquare(1, 0)}
                    {this.renderSquare(1, 1)}
                    {this.renderSquare(1, 2)}
                    {this.renderSquare(1, 3)}
                    {this.renderSquare(1, 4)}
                    {this.renderSquare(1, 5)}
                    {this.renderSquare(1, 6)}
                    {this.renderSquare(1, 7)}
                </Row>
                <Row className="board-row">
                    {this.renderSquare(2, 0)}
                    {this.renderSquare(2, 1)}
                    {this.renderSquare(2, 2)}
                    {this.renderSquare(2, 3)}
                    {this.renderSquare(2, 4)}
                    {this.renderSquare(2, 5)}
                    {this.renderSquare(2, 6)}
                    {this.renderSquare(2, 7)}
                </Row>
                <Row className="board-row">
                    {this.renderSquare(3, 0)}
                    {this.renderSquare(3, 1)}
                    {this.renderSquare(3, 2)}
                    {this.renderSquare(3, 3)}
                    {this.renderSquare(3, 4)}
                    {this.renderSquare(3, 5)}
                    {this.renderSquare(3, 6)}
                    {this.renderSquare(3, 7)}
                </Row>
                <Row className="board-row">
                    {this.renderSquare(4, 0)}
                    {this.renderSquare(4, 1)}
                    {this.renderSquare(4, 2)}
                    {this.renderSquare(4, 3)}
                    {this.renderSquare(4, 4)}
                    {this.renderSquare(4, 5)}
                    {this.renderSquare(4, 6)}
                    {this.renderSquare(4, 7)}
                </Row>
                <Row className="board-row">
                    {this.renderSquare(5, 0)}
                    {this.renderSquare(5, 1)}
                    {this.renderSquare(5, 2)}
                    {this.renderSquare(5, 3)}
                    {this.renderSquare(5, 4)}
                    {this.renderSquare(5, 5)}
                    {this.renderSquare(5, 6)}
                    {this.renderSquare(5, 7)}
                </Row>
                <Row className="board-row">
                    {this.renderSquare(6, 0)}
                    {this.renderSquare(6, 1)}
                    {this.renderSquare(6, 2)}
                    {this.renderSquare(6, 3)}
                    {this.renderSquare(6, 4)}
                    {this.renderSquare(6, 5)}
                    {this.renderSquare(6, 6)}
                    {this.renderSquare(6, 7)}
                </Row>
                <Row className="board-row">
                    {this.renderSquare(7, 0)}
                    {this.renderSquare(7, 1)}
                    {this.renderSquare(7, 2)}
                    {this.renderSquare(7, 3)}
                    {this.renderSquare(7, 4)}
                    {this.renderSquare(7, 5)}
                    {this.renderSquare(7, 6)}
                    {this.renderSquare(7, 7)}
                </Row>
            </div>
        )
    }
}