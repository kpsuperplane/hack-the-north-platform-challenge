import loki from 'lokijs';
export const fields = ["name", "email", "company", "phone", "country", "status", "skill", "sort"];
const store = (state = {submissions:[], filters: [], original: null, active: null}, action) => {
  switch (action.type) {
    case 'STORE_DATA':
      const db = new loki();
      const submissions = db.addCollection('submissions');  
      submissions.insert(action.payload);
      return {...state, filters: [], submissions: submissions.chain().find().compoundsort(['name']).data(), original: submissions};
    case 'ACTIVE_SUBMISSION':
      document.body.className=action.payload===null?"":"active";
      return {...state, active: action.payload};
    case 'UPDATE_SUBMISSION':
      const submission = Object.assign(state.original.findOne({email: action.payload.submission.email}), action.payload.value);
      state.original.update(submission);
      return {...state, submissions: [...state.submissions], active: Object.assign(state.active)};
    case 'FILTER_DATA':
      const filters = action.payload;
      var lokiFilters = [];
      var lokiSort = [];
      for(var i = 0; i < filters.length; i++){
        var filter = {};
        const searchReg = new RegExp(filters[i][1], "i");
        switch(filters[i][0]){
          case "sort":
            var field = filters[i][1].toLowerCase();
            var descending = false;
            if(field.length > 0 && field[0] === '!'){
              field = field.substring(1);
              descending = true;
            }
            console.log(field);
            if(fields.indexOf(field) !== -1) lokiSort.push([field, descending]);
            continue;
          case "nameOrEmail":
            lokiFilters.push({"$or": [{"name": {"$regex": searchReg}}, {"email": {"$regex": searchReg}}]});
            continue;
          case "skill": 
            filter["skills.skill"] = {"$regex": searchReg};
            break;
          default:
            filter[filters[i][0]] = {"$regex": searchReg};
        }
        lokiFilters.push(filter);
      }
      if(lokiSort.length == 0) lokiSort = ["name"];
      console.log(lokiSort);
      return {...state, filters: filters, submissions: state.original.chain().find({"$and": lokiFilters}).compoundsort(lokiSort).data()};
    default:
        return state;
  }
}
export default store;