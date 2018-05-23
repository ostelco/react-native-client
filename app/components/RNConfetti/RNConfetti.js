import React from "react";
import Confetti from 'react-native-confetti';

class RNConfetti extends React.Component {

    componentDidMount() {
        if (this._confettiView) {
            this._confettiView.startConfetti();
        }
    }

    componentWillEnter() {

    }

    componentWillLeave() {

    }

    componentWillUnmount() {
        if (this._confettiView) {
            this._confettiView.stopConfetti();
        }
    }

    _showHome = () => {
        this.props.close()
    }

    render() {
        return (
            <Confetti ref={(node) => this._confettiView = node} confettiCount={5000} timeout={5} />
        )
    }
}

export default RNConfetti;