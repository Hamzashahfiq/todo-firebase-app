const initialState = {
    tasks: []
};


export default function InputDataReducer(state = initialState, action) {
    switch (action.type) {
        case "FATCHDATA": {
            return {
                ...state,
                tasks: action.payload
            }
        }

        case "INPUTDATA": {
            let newInputTask = [...state.tasks, action.payload]
            return {
                ...state,
                tasks: newInputTask,
            }
        }

        case "DELETEHANDLER": {
            let newTaskDetail = state.tasks.filter((item) => item.docId !== action.payload)
            return {
                ...state,
                tasks: newTaskDetail,
            }

        }
        
        case "IMPORTANT": {
           
            let newUpdateData = state.tasks.map((item) => {
                if (item.docId === action.payload.docId) {
                    return action.payload
                } else {
                    return item
                }
            })

            return {
                ...state,
                tasks: newUpdateData,
            }

        }
       
        case "UPDATEHANDLER": {
            let newUpdateData = state.tasks.map((item) => {
                if (item.docId === action.payload.docId) {
                    return action.payload
                } else {
                    return item
                }
            })

            return {
                ...state,
                tasks: newUpdateData,
            }

        }
        case "COMPLETEDTASK": {
            let newUpdateData = state.tasks.map((item) => {
                if (item.docId === action.payload.docId) {
                    return action.payload
                } else {
                    return item
                }
            })

            return {
                ...state,
                tasks: newUpdateData,
            }

        }
        case "UNCOMPLETEDTASK": {
            let newUpdateData = state.tasks.map((item) => {
                if (item.docId === action.payload.docId) {
                    return action.payload
                } else {
                    return item
                }
            })

            return {
                ...state,
                tasks: newUpdateData,
            }

        }
        default:
            return state;
    }
}
