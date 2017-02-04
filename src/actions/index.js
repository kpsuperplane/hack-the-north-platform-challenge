import {get} from 'superagent';
import {connect} from 'react-redux';
export const fetchData = () => {
    return (dispatch) => {
        get('https://hackthenorth.com/fe-users.json').end((err, res)=>{dispatch({type: 'STORE_DATA', payload: res.body});});
    }
}
const mapStateToProps = (state, ownProps) => {
  return {
    active: state.active,
    submissions: state.submissions
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchData: fetchData,
    updateSubmission: (submission, value) => dispatch({type: 'UPDATE_SUBMISSION', payload: {submission: submission, value: value}}),
    makeActive: submission => dispatch({type: 'ACTIVE_SUBMISSION', payload: submission}),
    filterData: filters => dispatch({type: 'FILTER_DATA', payload: filters})
  }
}

export const map = connect(
  mapStateToProps,
  mapDispatchToProps
)