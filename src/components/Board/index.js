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
    let id_of_button = props.position.x + "" + props.position.y;

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

        let key = "" + x + "" + y;

        return (
            <Square
                key={key}
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