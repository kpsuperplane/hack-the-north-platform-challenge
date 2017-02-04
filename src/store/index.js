import loki from 'lokijs';
const store = (state = {submissions:[], filters: [], original: null, active: null}, action) => {
  switch (action.type) {
    case 'STORE_DATA':
      const db = new loki();
      const submissions = db.addCollection('submissions');  
      submissions.insert(action.payload);
      return {...state, filters: [], submissions: submissions.find(), original: submissions};
    case 'ACTIVE_SUBMISSION':
      return {...state, active: action.payload};
    case 'UPDATE_SUBMISSION':
      const submission = Object.assign(state.original.findOne({email: action.payload.submission.email}), action.payload.value);
      state.original.update(submission);
      return {...state, submissions: [...state.submissions], active: Object.assign(state.active)};
    case 'FILTER_DATA':
      const filters = action.payload;
      var lokiFilters = [];
      for(var i = 0; i < filters.length; i++){
        var filter = {};
        switch(filters[i][0]){
          case "skill": 
            filter["skills.skill"] = {"$regex": new RegExp(filters[i][1], "i")};
            break;
          default:
            filter[filters[i][0]] = {"$regex": new RegExp(filters[i][1], "i")};
        }
        lokiFilters.push(filter);
      }
      console.log(state.original.find({"$and":lokiFilters}));
      return {...state, filters: filters, submissions: state.original.find({"$and":lokiFilters})};
    default:
        return state;
  }
}
export default store;