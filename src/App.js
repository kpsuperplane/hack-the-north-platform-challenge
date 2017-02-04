import React, { Component } from 'react';
import Main from './components/Main';
import Details from './components/Details';
import './App.css';
import {map} from './actions';
import logoSvg from './assets/logo.svg'

class App extends Component {
  constructor(){
    super();
    this.state = {
      search: "",
      searching: false,
      suggestion: "  Type to search..."
    }
    this.checkTab = this.checkTabMethod.bind(this);
    this.searchChange = this.searchChangeMethod.bind(this);
    this.typingTimeout = null;
    this.typeCount = 0;
  }
  /**
   * Uses canvas.measureText to compute and return the width of the given text of given font in pixels.
   * 
   * @param {String} text The text to be rendered.
   * @param {String} font The css font descriptor that text is to be rendered with (e.g. "bold 14px verdana").
   * 
   * @see http://stackoverflow.com/questions/118241/calculate-text-width-with-javascript/21015393#21015393
   */
  getSearchWidth() {
      // re-use canvas object for better performance
      var canvas = this.widthCanvas || (this.widthCanvas = document.createElement("canvas"));
      var context = canvas.getContext("2d");
      context.font = "300 16px Roboto";
      var metrics = context.measureText(this.state.search);
      return metrics.width*1.0315+10;
  }
  checkTabMethod(e){
    if(e.key === 'Enter'){
      this.setState({search: this.state.search + this.state.suggestion, suggestion: ""});
    }
  }
  maybeFocus(e){
    if(e.target.tagName.toLowerCase() !== 'input' && e.keyCode !== 40 && e.keyCode !== 38) this.refs.searchField.focus();
    else if(e.keyCode === 38 || e.keyCode === 40){
      e.preventDefault();
      const {submissions, active, makeActive} = this.props;
      var currentlySelected = submissions.indexOf(active);
      if(currentlySelected === -1) makeActive(submissions[e.keyCode === 38?submissions.length-1:0]);
      else if(e.keyCode === 38){ //up arrow
        if(currentlySelected === 0){
          this.refs.searchField.focus();
          makeActive(null);
        }else{
          makeActive(submissions[currentlySelected-1]);
        }
      }else{ //down arrow
        if(currentlySelected === submissions.length-1){
          this.refs.searchField.focus();
          makeActive(null);
        }else{
          makeActive(submissions[currentlySelected+1]);
        }
      }
    } 
  }
  componentDidMount() {
    window.addEventListener('keydown', this.maybeFocus.bind(this));
  }
  componentWillUnmount() {
      window.removeEventListener('keydown', this.maybeFocus.bind(this));
  }
  searchChangeMethod(e){
    if(this.typingTimeout !== null) clearTimeout(this.typingTimeout);
    let v = e.target.value.trim();
    var suggestion = "";
    const {props} = this;
    var newFilters = [];
    if(v.length === 0){
      suggestion = "  Type to search...";
    }else{
      var filters = v.split(',').map(str=>str.trim());
      var fields = ["name", "email", "sortby", "company", "phone", "country", "status", "skill"]
      var lastFilter = filters[filters.length-1];
      if(lastFilter !== "")
        for(var field of fields){
          if(field.length > lastFilter.length && field.substring(0,lastFilter.length) === lastFilter.toLowerCase()){
            suggestion = field.substring(lastFilter.length) + ": ";
            break;
          }
        }
      for(var filter of filters){
        const splitFilter = filter.split(':').map(str=>str.trim().toLowerCase());
        if(splitFilter.length === 2 && fields.indexOf(splitFilter[0]) !== -1){
          newFilters.push(splitFilter);
        }
      } 
    }
    if(this.typeCount % 3) props.filterData(newFilters);
    this.typeCount++;
    this.typingTimeout = setTimeout(()=>{props.filterData(newFilters);this.typeCount=0;this.setState({searching: false});}, 250);
    this.setState({search: e.target.value, suggestion: suggestion, searching: true});
  }
  render() {
    return (
      <div>
        <header className='header' onClick={()=>{this.refs.searchField.focus();}} >
          <div className='logo'>
            <img src={logoSvg} alt="logo"/>
          </div>
          <input type="text" tabIndex="0" id="main-search" ref="searchField" onKeyPress={this.checkTab} style={{width: this.getSearchWidth()}} value={this.state.search} onChange={this.searchChange} className="search-field" />
          <span id="suggestion" className="search-field">{this.state.suggestion}</span>
        </header>
        <section id="main-content" className={this.state.searching?"searching":""}><Main /></section>
        <Details />
      </div>
    );
  }
}

export default map(App);
