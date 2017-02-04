import React, {Component} from 'react';
import {map} from '../actions';
import { Media, Badge, Row, Col } from 'reactstrap';
import './Submission.css';
import './Details.css';
import IoEmail from 'react-icons/lib/io/email';
import IoIosTelephone from 'react-icons/lib/io/ios-telephone';
import IoIosBriefcase from 'react-icons/lib/io/ios-briefcase';
import IoClose from 'react-icons/lib/io/close';
import IoGear from 'react-icons/lib/io/ios-gear';

class Details extends Component {
    constructor(){
        super();
        this.changeStatus = this.changeStatusMethod.bind(this); //autobind this on construction to improve performance
    }
    capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    changeStatusMethod(e){
        this.props.updateSubmission(this.props.active, {status: e.target.value});
    }
    render() {
        const {active} = this.props;
        const {changeStatus} = this;

        if(active == null) return <div id="details" style={{height: window.innerHeight-46}} className="empty"><h1 id="details-placeholder"><IoGear /></h1></div> //blank "details" tab 

        const position = {lat: active.latitude, lng: active.longitude}; //extract our position

        const sortedSkills = active.skills.sort((a,b)=>b.rating-a.rating); //sort our skills

        return (<div id="details" style={{height: window.innerHeight-46}}><Media id="details-submission">
            <span className="media-left"><img key={active.email} className="media-object submission-image" src={active.picture} alt={active.name} /></span>
            <Media body className="submission-body">
                <h5>{active.name}</h5>
                <h6>{sortedSkills.map((skill)=><Badge className="skill" key={skill.skill}>{skill.skill} ({skill.rating})</Badge>)}</h6>
            </Media>
            <button id="details-close" onClick={this.props.makeActive.bind(this, null)}><IoClose /></button>
            <select id="details-status" className={active.status} onChange={changeStatus} value={active.status}>
                <option value="accepted">Accepted</option>
                <option value="rejected">Rejected</option>
                <option value="in_review">In Review</option>
            </select>
        </Media>
        <Row>
            <Col sm="auto"><span className="details-light"><IoEmail /></span><a href={"mailto:"+active.email}>{active.email}</a></Col>
            <Col sm="auto"><span className="details-light"><IoIosTelephone /></span><a href={"tel:"+active.phone}>{active.phone}</a></Col>
        </Row>
        <Row>
            <Col sm="auto" lg="6"><span className="details-light"><IoIosBriefcase /></span>{active.company}</Col>
        </Row>
        <img id="details-map" alt="Map" src={"https://maps.googleapis.com/maps/api/staticmap?center="+position.lat+","+position.lng+"&zoom=13&size=640x200&key=AIzaSyDU3UAm86uG_iRX2AneKU0FG6moOeufKo8&maptype=roadmap&markers=color:blue%7C"+position.lat+","+position.lng}/>
       </div>);
    }
}
export default map(Details);
