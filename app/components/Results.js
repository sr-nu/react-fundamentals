var React = require('react');
var queryString = require('query-string');
var api = require('../utils/api');
var PropTypes = require('prop-types');
var PlayerPreview = require('./PlayerPreview');


function Profile(props){
    return (
        <PlayerPreview avatar={props.info.avatar_url} username={props.info.login}>
            <ul className='space-list-item'>
                <li className='row'>Followers: {props.info.followers}</li>
            </ul>
        </PlayerPreview>
    )
}

Profile.propTypes = {
    info:PropTypes.object.isRequired
}



function Player(props){
    return (
        <div>
         <h1 className='header'>{props.label}</h1>
         <h3 style={{textAlign:'center'}}>Score: {props.score}</h3>
         <Profile info={props.profile}/>
        </div>
    );
}

Player.propTypes = {
    label: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired,
    profile: PropTypes.object.isRequired

}


class Results extends React.Component{
    constructor(props){
        super(props);

        this.state = {
           error: null,
            winner:null,
            loser:null,
            loading: true 
        }
    }

    componentDidMount(){
        var players = queryString.parse(this.props.location.search);

        api.battle([
            players.playerOneName,
            players.playerTwoName,
        ]).then( function(results) {
            console.log(JSON.stringify(results));


             if(results===null){
                return this.setState(function(){
                    return { 
                        error: 'error check github user exists',
                        loading: false
                    }
                });
             }
            
            this.setState(function(){
                return { 
                    error: null,
                    winner:results[0],
                    loser:results[1],
                    loading: false
                }
            });
        }.bind(this));
    }
    

    render(){
        var error = this.state.error;
        var winner = this.state.winner;
        var loser = this.state.loser;
        var loading = this.state.loadeing;

        if(loading === true){
            return (<p>Loading</p>)
        }

        if(error){
            return (<div><p>{error}</p></div>)
        }

        if(winner === null || loser === null){
              return (<p>Not yet!!</p>)
        }
        
        return (
            <div className='row'> 
                <Player label='Winner'
                score={winner.score} 
                profile={winner.profile}
                />
                <Player label='Loser'
                score={loser.score} 
                profile={loser.profile}
                /> 
            </div>
        )
    }
}


module.exports = Results;
