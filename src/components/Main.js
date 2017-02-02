import React, { Component } from 'react';
import './Main.css';
import {Progress} from 'reactstrap';
import {map} from '../actions';
import Submission from './Submission';

class Main extends Component {
  constructor(){
    super();
    this.scrollCount = 0;
    this.state = {
      upper:0,
      lower:window.innerHeight*2
    }
  }
  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll.bind(this));
  }
  componentWillUnmount() {
      window.removeEventListener('scroll', this.handleScroll.bind(this));
  }
  handleScroll(event) {
      let scrollTop = document.body.scrollTop, winHeight = window.innerHeight;
      if((this.scrollCount !== 5000 && this.scrollCount++)) return;
      scrollTop = scrollTop < 0 ? 0 : scrollTop;
      this.scrollCount = 0;
      var quad = 0;
      while(!(scrollTop >= quad && scrollTop <= quad+winHeight)) quad += winHeight;
      if(this.state.upper !== quad - winHeight) this.setState({upper: quad-winHeight*0.5, lower: quad + winHeight * 2});
  }
  render() {
    var visible = [];
    var first = Math.max(0, Math.floor(this.state.upper/64));
    if(this.props.submissions.length - first < 0) first = 0;
    var i = first;
    for(i; i*64 <= this.state.lower && i < this.props.submissions.length; i++){
      const submission = this.props.submissions[i];
      visible.push(<Submission tabIndex={i+2} key={submission.email} submission={submission} />);
    }
    return this.props.original!==null?(
      <div id='main'>
        <div style={{height:first*64}} />
        {visible}
        <div style={{height:(this.props.submissions.length-i)*64}} />
      </div>
    ):<Progress animated color="info" value="100" />
  }
}

export default map(Main);
