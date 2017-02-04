import React, { Component } from 'react';
import './Main.css';
import {Progress} from 'reactstrap';
import {map} from '../actions';
import Submission from './Submission';

class Main extends Component {
  constructor(){
    super();
    this.lastScrollTop = 0; //update viewport-visible every 200 pixels
    this.state = { // upper and lower pixel bounds for what should be rendered
      upper:0,
      lower:window.innerHeight*2
    }
  }
  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll.bind(this)); //bind the scroll events
  }
  componentWillUnmount() {
      window.removeEventListener('scroll', this.handleScroll.bind(this)); //unbind the scroll events
  }
  handleScroll(event) {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop, winHeight = window.innerHeight; 
      if(Math.abs(this.lastScrollTop - scrollTop) < 200) return; //only check every > 200 scroll pixels
      scrollTop = scrollTop < 0 ? 0 : scrollTop; //don't break on Safari bounce animations
      this.lastScrollTop = scrollTop; //reset scrollCount
      var quad = 0; //A "quad" - aka one viewport-height
      while(!(scrollTop >= quad && scrollTop <= quad+winHeight)) quad += winHeight; //figure out which "quad" we're in
      if(this.state.upper !== quad - winHeight) this.setState({upper: quad-winHeight*1, lower: quad + winHeight * 2});
  }
  render() {
    var visible = [];
    var first = Math.max(0, Math.floor(this.state.upper/64));
    if(this.props.submissions.length - first < 0) first = 0;
    var i = first;
    for(i; i*64 <= this.state.lower && i < this.props.submissions.length; i++){ //loop through the appropriate quad and add Submission elements
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
