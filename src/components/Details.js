import React, {Component} from 'react';
import {map} from '../actions';
import { Media } from 'reactstrap';
import './Submission.css';
import './Details.css';

class Details extends Component {
  render() {
      const active = this.props.active;
      return (<div id="details" style={{height: window.innerHeight-46}}>{active != null ? (
        <Media>
            <span className="media-left"><img key={active.email} className="media-object submission-image" src={active.picture} alt={active.name} /></span>
            <Media body className="submission-body">
                <h5>{active.name}</h5>
                <h6>{active.email}</h6>
            </Media>
      </Media>): null}</div>);
  }
}
export default map(Details);
