import React from 'react'
import { render } from 'react-dom'
import { Router, Route, Link,hashHistory } from 'react-router'
import { FormGroup,ControlLabel,FormControl,Button } from 'react-bootstrap';

const Login = React.createClass({
	getInitialState: function() {
		return {
			message: 'Hello!',
			user:'',
			pwd:''
		};
	},
	handleUserChange: function(event) {
		this.setState({user: event.target.value});
	},
	handlePwdChange: function(event) {
		this.setState({pwd: event.target.value});
	},
	loginClick: function(event) {
		//$('')
		console.log(this.state.user,this.state.pwd);
	},
	render(){
	var message = this.state.message;
    return (
		<div className='container'>
			<div className='row'>
				<div className="col-sm-6 col-sm-offset-3 form-box">
					<div style={{padding: '25px 25px 30px 25px',background: '#eee'}}>
						<form>
							<FormGroup>
								<ControlLabel>账号11</ControlLabel>
								<FormControl type="text" placeholder="账号" onChange={this.handleUserChange} value={this.state.user}/>
							</FormGroup>
							<FormGroup>
								<ControlLabel>密码</ControlLabel>
								<FormControl type="password" placeholder="密码" onChange={this.handlePwdChange} value={this.state.pwd}/>
							</FormGroup>
							<FormGroup>
								<ControlLabel></ControlLabel>
								<Button className='col-sm-12 col-xs-12'  onClick={this.loginClick} bsStyle='success'>登录</Button>
							</FormGroup>
						</form> 
					</div>
				</div>
			</div>
		</div>
		)
	}
})

const App = React.createClass({
  render() {
    return (
      <div>
        <h1>App</h1>
        <ul>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/inbox">Inbox</Link></li>
        </ul>
        {this.props.children}
      </div>
    )
  }
})

const About = React.createClass({
  render() {
    return <h3>About</h3>
  }
})

const Inbox = React.createClass({
  render() {
    return (
      <div>
        <h2>Inbox</h2>
        {this.props.children || "Welcome to your Inbox"}
      </div>
    )
  }
})

const Message = React.createClass({
  render() {
    return <h3>Message {this.props.params.id}</h3>
  }
})

render((
  <Router history={hashHistory}>
    <Route path="/" component={Login}>
      <Route path="about" component={About} />
      <Route path="inbox" component={Inbox}>
        <Route path="messages/:id" component={Message} />
      </Route>
    </Route>
  </Router>
), document.getElementById('root'))