const initialState = {
    tasks:[],
    taskDetail:[],
    completedTask:[],

    updateData:"",
    rightBarTaskData:""
};


export default function InputDataReducer(state = initialState, action) {
    switch (action.type) {
        case "FATCHDATA": {
           return {
               ...state,
               tasks:action.payload
           }
       }    
        
        case "INPUTDATA": {
             let newInputTask = [...state.taskDetail,action.payload]
            return {
                ...state,
                taskDetail:[...newInputTask],
            }
        }
        case "DELETEHANDLER": {
             let newTaskDetail = state.taskDetail.filter((item)=>item.id !== action.payload)
             return {
                ...state,
                taskDetail:newTaskDetail,
            }
            
        }
        case "COMPDELETEHANDLER": {
             let newCompletedTask = state.completedTask.filter((item)=>item.id !== action.payload)
             return {
                ...state,
                completedTask:newCompletedTask,
            }
            
        }
        case "UNIMPORTANT":{
            let newtaskDetail = state.taskDetail.map((item)=>{
                if  (item.id === action.payload.id ) {
                    return action.payload
                }else{
                 return item
                }
            })
            let newcompletedTask = state.completedTask.map((item)=>{
                if  (item.id === action.payload.id ) {
                    return {...action.payload,important:true,importantCheck:true }
                }else{
                 return item
                }
            })
         return {
          ...state,
          taskDetail:newtaskDetail,
          completedTask:newcompletedTask
        }
      
      }
        case "UPDATEHANDLER": {
               let newUpdateData = action.payload
             return {
                ...state,
                updateData:newUpdateData,
            }
            
        }
        case "SETUPDATEHANDLER": {
               let newUpdateData = state.taskDetail.map((item)=>{
                   if  (item.id === action.payload.id ) {
                       console.log(action.payload.id)
                       return action.payload
                   }else{
                    return item
                   }
               })
              
             return {
                ...state,
                taskDetail:newUpdateData,
            }
            
        }
        case "COMPLETEDTASK":{
           let  newTaskDetail =  state.taskDetail.filter((item)=> item.id !== action.payload.id)
           let  newCompletedTask = [...state.completedTask,action.payload]
           return {
            ...state,
            taskDetail:newTaskDetail,
            completedTask:newCompletedTask
          }
        
        }
        case "UNCOMPLETEDTASK":{
           let   newCompletedTask=  state.completedTask.filter((item)=> item.id !== action.payload.id)
           let  newTaskDetail = [...state.taskDetail,action.payload]
           return {
            ...state,
            taskDetail:newTaskDetail,
            completedTask:newCompletedTask
          }
        
        }
        case "RIGHTBARTASK":{
              let newRightBarTask = action.payload
           return {
            ...state,
            rightBarTaskData: newRightBarTask
          }
        
        }
        default:
            return state;
    }
}
