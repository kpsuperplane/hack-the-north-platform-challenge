import React, {Component} from 'react';
import {map} from '../actions';
import { Media, Badge } from 'reactstrap';
import './Submission.css';

class Submission extends Component {
  componentDidUpdate(){
    if((this.props.active != null) && (this.props.active.email === this.props.submission.email)) this.refs.link.focus();
  }
  render() {
    const {email, picture, name, status, skills} = this.props.submission;
    const sortedSkills = skills.sort((a,b)=>b.rating-a.rating);
    return <button ref="link" onClick={this.props.makeActive.bind(this, this.props.submission)} tabIndex={this.props.tabIndex} className={"submission"+(((this.props.active != null) && (this.props.active.email === email))?" active":"")}><Media>
                <span className="media-left"><img className="media-object submission-image" src={picture} alt={name} /><span className={"submission-status " + status}/></span>
                <Media body className="submission-body">
                    <h5>{name}</h5>
                    <h6>{sortedSkills.map((skill)=><Badge key={skill.skill}>{skill.skill} ({skill.rating})</Badge>)}</h6>
            </Media>
      </Media></button>;
  }
}
export default map(Submission);
