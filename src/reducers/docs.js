import {
   CREATE_SUCCESS,
   DELETE_SUCCESS,
   DELETEALL_SUCCESS,
   UPDATE_SUCCESS,
   READALL_SUCCESS,
   READ_SUCCESS,
   READID_SUCCESS
} from "../constants/docs";

export default function docs(state, path, action) {

   if (action.path && action.path !== path)
      return state

   switch (action.type) {

      case READALL_SUCCESS:
         return action.payload.filter(doc => doc.path === path)

       case READ_SUCCESS:
         console.log( 'fetch success')
         return [...state, ...action.payload]

      case READID_SUCCESS:
         if (action.path && action.path !== path)
            return state
         else if (state instanceof Array)
            return [...state, action.payload]
         else
            return action.payload

      /* problem with pull */
      /* we receive two event ADD_SUCCESS and PULL_SUCCES */
      case CREATE_SUCCESS:
      case UPDATE_SUCCESS:
         if (state instanceof Array) {
            var found = false
            let res = state.map(doc => {
               if (doc.id === action.id) {
                  found = true
                  return action
               }
               else
                  return doc
            })
            if (found)
               return res
            else
               return [...state, action]
         }
         else
            return {...state, ...action}

      case DELETE_SUCCESS:
         if (state instanceof Array)
            return state.filter(doc => {
               return doc.id !== action.id
            })
         else
            return state

      case DELETEALL_SUCCESS:
         if (state instanceof Array)
            return []
         else
            return state

      default:
         return state
   }
}


function id() {
   return Math.random().toString(36).substring(7)
}
