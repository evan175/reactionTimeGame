/*
A reaction time game created with react
@author evan175
*/

import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';

class Shooter extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            showsCt : true,
            showsResult : false,
            time1 : 0,
            time2 : 0,
            initClicked : false,
            reactionTime : 0,
            earlyClick : false,
            timeoutID : null

        }
        this.ctSrc = require('./images/ct.png');
        this.tSrc = require('./images/t.png');
        this.handleClick = this.handleClick.bind(this);
        this.randNum = this.randNum.bind(this);
    }
    randNum(){
        let randTime = Math.floor(Math.random() * 8000) + 2000;
        return randTime;
    }
    handleClick(){
        if(this.state.earlyClick){
            this.setState(state => ({...state, showsCt : true, showsResult : false, time1 : 0, time2 : 0, initClicked : false, reactionTime : 0, earlyClick : false, timeoutID : null}));
        }
        else if(this.state.showsCt && this.state.initClicked){
            clearTimeout(this.state.timeoutID);
            this.setState(state => ({...state, earlyClick : true}));
        }
        else if(this.state.showsCt) {
            this.setState(state => ({...state, initClicked : true}));
            let ID = setTimeout(() => {document.getElementById("shooter").src = this.tSrc; this.setState(state => ({...state, showsCt : false, time1 : new Date()}));}, this.randNum())
            this.setState(state => ({...state, timeoutID : ID}));
        }
        else if(!this.state.showsCt && !this.state.showsResult){
            this.setState(state => ({...state, showsResult : true, time2 : new Date()}));
        }
        else if(!this.state.showsCt && this.state.showsResult){
            this.setState(state => ({...state, showsCt : true, showsResult : false, time1 : 0, time2 : 0, initClicked : false, reactionTime : 0, earlyClick : false, timeoutID : null}));
            document.getElementById("shooter").src = this.ctSrc;
        }
    }
    getClickMessage(){
        if(this.state.showsCt && !this.state.initClicked){
            return 'Click to start, and when they start shooting, click as fast as you can to see your reaction time';
        }
        else if(!this.state.showsCt && this.state.showsResult){
            return 'Click to try again';
        }
        else if(this.state.earlyClick){
            return 'Too soon! Click to retry';
        }
        else{
            return "..."
        }
    }
    getReactionTime(){
        if(this.state.time1 > 0 && this.state.time2 > 0){
            let reactionTime = this.state.time2.getTime() - this.state.time1.getTime();
            return reactionTime;
        }
        return null;
    }
    getClickMessage2(time){
        if(time === null){
            return;
        }
        if(time >= 0 && time < 150){
            return 'You are either on drugs or not human';
        }
        if(time >= 150 && time < 180){
            return 'Not bad, but I have seen better';
        }
        if(time >= 180 && time < 275){
            return 'Average';
        }
        if(time >= 275){
            return 'Painfully slow';
        }
    }
    render(){
        const clickMsg = this.getClickMessage();
        let reactionTime = this.getReactionTime();
        reactionTime = reactionTime !== null ? reactionTime - 40 : reactionTime;
        const clickMsg2 = this.getClickMessage2(reactionTime);
        reactionTime = reactionTime !== null ? reactionTime.toString() + ' ms' : reactionTime;
        return(
            <div>
                <div className='message'>
                    <div>{clickMsg}</div>
                </div>
                <div className='shooterImg'>
                    <img id = 'shooter' src = {this.ctSrc} onClick={this.handleClick} alt = {'shooter'}></img>
                </div>
                <div className='info'>
                    <div id='time'>{reactionTime}</div>
                    <div id='message2'>{clickMsg2}</div>
                </div>
            </div>
        );
    }
}

class Game extends React.Component{
    render(){
        return(
            <div className='game'>
                <div className='switchShooter'>
                    <Shooter />
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <Game />,
    document.getElementById('root'),
)
