import { db } from '../../config/Firebase'
import { v4 as uuidv4 } from 'uuid';

export const FetchData = (setTaskLoading) => async (dispatch) => {
  setTaskLoading(true)
  try {
    let taskData = await db.collection("todo").get();
    let task = []

    taskData.forEach((doc) => {
      task.push({
        docId: doc.id,
        ...doc.data()
      })
    })

    dispatch({
      type: "FATCHDATA",
      payload: task
    })
  }
  catch (error) {
    alert(error)
  }
  finally {
    setTaskLoading(false)
  }

}



export const InputDataAction = (inputTask, setInputTask, setUuidGetData, setSubmitLoadding) => async (dispatch) => {
  setSubmitLoadding(true)
  try {
    await db.collection("todo").add(inputTask)
    setUuidGetData(uuidv4())
    setInputTask('')
    alert("Task has been added successfully")
    dispatch({
      type: "INPUTDATA",
      payload: inputTask
    })

  }
  catch (error) {
    alert(error)
  }
  finally {
    setSubmitLoadding(false)
  }
}

export const CompTask = (docId,completedTaskData, setRightBarOpen) => async(dispatch) => {
  try {
    await db.collection("todo").doc(docId).update(completedTaskData)
    alert("Change to completed")
    setRightBarOpen(false)
    dispatch({
      type: "COMPLETEDTASK",
      payload: {...completedTaskData,  docId}
    })
  }
  catch (error) {
    alert(error)
  }

}
  export const UnCompTask = (docId,unCompletedTaskData,setRightBarOpen) => async(dispatch) => {
    try {
      await db.collection("todo").doc(docId).update(unCompletedTaskData)
      alert("Change to uncompleted task")
      setRightBarOpen(false)
      dispatch({
        type: "UNCOMPLETEDTASK",
        payload: {...unCompletedTaskData,  docId}
      })
    }
    catch (error) {
      alert(error)
    }
  
  }
export const TaskDeleteHandler = (deletedId, setRightBarOpen, setTaskDeleteLoading, handleClose) => async (dispatch) => {
  setTaskDeleteLoading(true)
  try {
    await db.collection("todo").doc(deletedId).delete()
    alert("Deleted")
    setRightBarOpen(false)
    handleClose()
    dispatch({
      type: "DELETEHANDLER",
      payload: deletedId
    })
  }
  catch (error) {
    alert(error)
  }
  finally {
    setTaskDeleteLoading(false)
  }

}

export const setUpdatedData = (docId, updatedData, setInputTask, setIsUpadte, setUpdatedLoading) => async (dispatch) => {
  setUpdatedLoading(true)
  try {
    await db.collection("todo").doc(docId).update(updatedData)
    setInputTask("")
    alert('Updated')
    setIsUpadte(false)
    dispatch({
      type: "UPDATEHANDLER",
      payload: { ...updatedData, docId }
    })
  }
  catch (error) {
    alert(error)
  }
  finally {
    setUpdatedLoading(false)
  }
}
export function showRightBarTask(taskData) {
  return {
    type: "RIGHTBARTASK",
    payload: taskData
  }
}
export function UnImportantTask(UnImportanttaskData) {
  return {
    type: "UNIMPORTANT",
    payload: UnImportanttaskData
  }
}
export function ImportantTask(ImportanttaskData) {
  return {
    type: "IMPORTANT",
    payload: ImportanttaskData
  }
}