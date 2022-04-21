import { db } from '../../config/Firebase'

export const FetchData = () => async(dispatch) => {
 try{
  let taskData = await db.collection("todo").get();
  let task =[]
  
  taskData.forEach((doc) =>{
    task.push({
      docId : doc.id,
      ...doc.data()
    })
  })

  dispatch ({
    type: "FATCHDATA",
    payload: task
  })
 }
 catch (error) {
    alert(error)
 }
  
 
}






export function InputDataAction(inputTask) {
  return {
    type: "INPUTDATA",
    payload: inputTask
  }
}

export function CompTask(CompletedTask) {
  return {
    type: "COMPLETEDTASK",
    payload: CompletedTask
  }
}
export function UnCompTask(unCompletedTask) {
  return {
    type: "UNCOMPLETEDTASK",
    payload: unCompletedTask
  }
}
export function TaskDeleteHandler(deletedId) {
  return {
    type: "DELETEHANDLER",
    payload: deletedId
  }
}
export function CompDeleteHandler(deletedId) {
  return {
    type: "COMPDELETEHANDLER",
    payload: deletedId
  }
}
export function UpdateHandler(updateData) {
  return {
    type: "UPDATEHANDLER",
    payload: updateData
  }
}
export function SetUpdateHandler(UpdatedData) {
  return {
    type: "SETUPDATEHANDLER",
    payload: UpdatedData
  }
}
export function showRightBarTask(taskData) {
  return {
    type:"RIGHTBARTASK",
    payload: taskData
  }
}
export function UnImportantTask(UnImportanttaskData) {
  return {
    type:"UNIMPORTANT",
    payload: UnImportanttaskData
  }
}
export function ImportantTask(ImportanttaskData) {
  return {
    type:"IMPORTANT",
    payload: ImportanttaskData
  }
}