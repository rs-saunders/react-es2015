import React, {PropTypes} from 'react';

const getLetterForIndex = (index) => {
    return String.fromCharCode(65 + +index);
};

const LeagueBoxRow = (props) => {
    const letter = getLetterForIndex(props.index);
    const {player, submitScore, scores} = props;
    let isPlayerRow;
    let classNames = [];
    const scoreBoxes = [];
    let i = 0;

    scores.forEach((score, opponent) => {

        isPlayerRow = (i++ === props.index);

        if(isPlayerRow) {
            classNames.push('black');
            scoreBoxes.push(<td key={i++} className="score-box black">&nbsp;</td>);
        }

        classNames = ['score-box'];

        if(opponent == 'bp') {
            classNames.push('bp-box');
        }
        if(opponent == 'total') {
            classNames.push('total-box');
        }

        const scoreMap = new Map([[player, 6], [opponent, 4]]);

        scoreBoxes.push(<td key={i} className={classNames.join(' ')} onClick={() => submitScore(scoreMap)}>{score}</td>);
    });

    return (
        <tr>
            <td>{player.name}</td>
            <td>{player.tel1}</td>
            <td>{player.tel2}</td>
            <td>{player.email}</td>
            <td className="letter-box">{letter}</td>
            {scoreBoxes}
        </tr>
    );
};

class LeagueBox extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            leagueData: props.leagueData
        };

        this.submitScore = this.submitScore.bind(this);
    }

    submitScore(scoreMap) {
        const {leagueData} = this.state;

        const [player1, player2] = [...scoreMap.keys()];
        const [score1, score2] = [...scoreMap.values()];

        leagueData.get(player1).set(player2, score1);
        leagueData.get(player2).set(player1, score2);
        this.setState({
            leagueData
        })
    }

    render() {

        const {leagueData} = this.state;
        const leagueBoxRows = [];
        let i = 0;
        let scoreBoxHeaders = [];
        leagueData.forEach((scores, player) => {
            leagueBoxRows.push(<LeagueBoxRow
                key={i}
                index={i}
                scores={scores}
                submitScore={this.submitScore}
                player={player}
            />);
            const letter = getLetterForIndex(i);
            scoreBoxHeaders.push(<th key={i} className="letter-box">{letter}</th>);
            i++;
        });
        return (
            <table className="league-box">
                <thead>
                <tr>
                    <th className="name">Name</th>
                    <th className="tel">Tel 1</th>
                    <th className="tel">Tel 2</th>
                    <th className="email">Email</th>
                    <th>&nbsp;</th>
                    {scoreBoxHeaders}
                    <th className="bp-box">BP</th>
                    <th className="total-box">Total</th>
                </tr>
                </thead>
                <tbody>
                    {leagueBoxRows}
                </tbody>
            </table>
        );
    }
}

LeagueBox.propTypes = {
    leagueData: React.PropTypes.instanceOf(Map)
};

const player = [
    {
        name: 'Richard Saunders',
        tel1: '00000 000 000',
        tel2: '',
        email: 'richard@sdevsolutions.com'
    },
    {
        name: 'John Doe',
        tel1: '00000 000 000',
        tel2: '00000 000 000',
        email: 'xxxx@xxxxx.xxx'
    },
    {
        name: 'Bruce Banner',
        tel1: '00000 000 000',
        tel2: '',
        email: 'xxxx@xxxxx.xxx'
    },
    {
        name: 'Stephen Strange',
        tel1: '00000 000 000',
        tel2: '',
        email: 'xxxx@xxxxx.xxx'
    },
    {
        name: 'Tony Stark',
        tel1: '00000 000 000',
        tel2: '00000 000 000',
        email: 'xxxx@xxxxx.xxx'
    },
    {
        name: 'Bruice Wayne',
        tel1: '00000 000 000',
        tel2: '',
        email: ''
    },

];

const leagueDataMap = new Map();
leagueDataMap.set(player[0], new Map([[player[1], 7], [player[2], 6], [player[3], null], [player[4], null], [player[5], null], ['bp', null], ['total', null]]));
leagueDataMap.set(player[1], new Map([[player[0], 1], [player[2], null], [player[3], null], [player[4], null], [player[5], null], ['bp', null], ['total', null]]));
leagueDataMap.set(player[2], new Map([[player[0], 2], [player[1], null], [player[3], null], [player[4], null], [player[5], null], ['bp', null], ['total', null]]));
leagueDataMap.set(player[3], new Map([[player[0], null], [player[1], null], [player[2], null], [player[4], null], [player[5], null], ['bp', null], ['total', null]]));
leagueDataMap.set(player[4], new Map([[player[0], null], [player[1], null], [player[2], null], [player[3], null], [player[5], null], ['bp', null], ['total', null]]));
leagueDataMap.set(player[5], new Map([[player[0], null], [player[1], null], [player[2], null], [player[3], null], [player[4], null], ['bp', null], ['total', null]]));

const HomePage = () => {
    return (
        <div>
            <h1>Home</h1>
            <LeagueBox leagueData={leagueDataMap} />
        </div>
    );
};

export default HomePage;
