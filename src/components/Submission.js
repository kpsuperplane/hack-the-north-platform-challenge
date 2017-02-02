import React, {Component} from 'react';
import {map} from '../actions';
import { Media } from 'reactstrap';
import './Submission.css';

class Submission extends Component {
  componentDidUpdate(){
    if((this.props.active != null) && (this.props.active.email === this.props.submission.email)) this.refs.link.focus();
  }
  render() {
    const {email, picture, name} = this.props.submission;
    return <a ref="link" onClick={this.props.makeActive.bind(this, this.props.submission)} tabIndex={this.props.tabIndex} href="javascript:void(0);" className={"submission"+(((this.props.active != null) && (this.props.active.email === email))?" active":"")}><Media>
                <span className="media-left"><img className="media-object submission-image" src={picture} alt={name} /></span>
                <Media body className="submission-body">
                    <h5>{name}</h5>
                    <h6>{email}</h6>
            </Media>
      </Media></a>;
  }
}
export default map(Submission);
