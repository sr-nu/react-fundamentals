var React = require('react');
var PropTypes = require('prop-types');
var Link = require('react-router-dom').Link;
var PlayerPreview = require('./PlayerPreview');



class PlayerInput extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			username: ''
		}
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	

	handleChange(event){
		var value = event.target.value;
		this.setState(function(){
			return {
				username: value
			}
		})
	}

	handleSubmit(event){
		event.preventDefault();
		this.props.onSubmit(this.props.id, this.state.username);
	}

	render(){
		return (
			<form className='column' onSubmit={this.handleSubmit}>
				<label className='header' htmlFor='username'>
					{this.props.lable}
				</label>
				<input id='username'
					placeholder='github username'
					type='text'
					autoComplete='off'
					value={this.state.username}
					onChange={this.handleChange} />	
				<button type='submit'
					className='button'
					disabled={!this.state.username} >
				submit
				</button>	
			</form>		

		)

	}
}


PlayerInput.propTypes = {
	id:PropTypes.string.isRequired,
	lable:PropTypes.string.isRequired,
	onSubmit:PropTypes.func.isRequired
}

class Battle extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			playerOneName:'',
			playerTwoName:'',
			playerOneImage:null,
			playerTwoImage:null


		}

	this.handleSubmit = this.handleSubmit.bind(this);	
	this.handleReset = this.handleReset.bind(this);
	}

	handleReset(id){
		this.setState(function(){
			var newState = {};
			newState[id+'Name'] = '';
			newState[id+'Image']= null;

			return newState;
		})
	}
	handleSubmit(id,username){
		this.setState(function(){
			var newState = {};
			newState[id+'Name'] = username;
			newState[id+'Image']= 'https://github.com/'+username+'.png?size=200';

			return newState;
		});
	}

	render() {
		var playerOneName = this.state.playerOneName;
		var playerTwoName = this.state.playerTwoName;
		var playerOneImage = this.state.playerOneImage;
		var playerTwoImage = this.state.playerTwoImage;
		var match = this.props.match;
		return (
			<div>
				<div className='row'>
				{!playerOneName && <PlayerInput id='playerOne' lable='Player One' onSubmit={this.handleSubmit} />}
				{playerOneImage !== null && 
				<PlayerPreview 
					avatar={playerOneImage} 
					username={playerOneName}>
					<button className='reset'
						onClick={this.handleReset.bind(null,'playerOne')}>
						Reset
					</button>	
				</PlayerPreview>}
				</div>
				<div className='row'>
				{!playerTwoName && <PlayerInput id='playerTwo' lable='Player Two' onSubmit={this.handleSubmit} />}
				{playerTwoImage !== null && 
				<PlayerPreview 
					avatar={playerTwoImage} 
					username={playerTwoName}>
						<button className='reset'
							onClick={this.handleReset.bind(null,'playerTwo')}>
							Reset
						</button>	
				</PlayerPreview>}
				</div>
				 <div className='row'>
					{playerOneImage && playerTwoImage && <Link className='button' to={{
						pathname:match.url+'/results',
						search:'?playerOneName='+playerOneName+'&playerTwoName='+playerTwoName
					}}>Battle</Link>}
				</div> 
			</div>
		)
	}
}



module.exports=Battle;