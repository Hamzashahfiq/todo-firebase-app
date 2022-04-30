import { db } from '../../config/Firebase'
import { toast } from 'react-toastify';

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
    toast.error(error)
  }
  finally {
    setTaskLoading(false)
  }

}



export const InputDataAction = (inputTask, setInputTask, setSubmitLoadding) => async (dispatch) => {
  setSubmitLoadding(true)
  try {
    let dataRes = await db.collection("todo").add(inputTask)
    let docId = dataRes.id
    setInputTask('')
    toast.success("Task has been added successfully")
    dispatch({
      type: "INPUTDATA",
      payload: { ...inputTask, docId }
    })

  }
  catch (error) {
    toast.error(error)
  }
  finally {
    setSubmitLoadding(false)
  }
}

export const CompTask = (docId, completedTaskData, setCompTaskLoading, setLoadingId, setRightBarCheck) => async (dispatch) => {
  try {
    setCompTaskLoading(true)
    setLoadingId(docId)
    await db.collection("todo").doc(docId).update(completedTaskData)
    toast.success("Change to completed")
    setRightBarCheck(false)

    dispatch({
      type: "COMPLETEDTASK",
      payload: { ...completedTaskData, docId }
    })
  }
  catch (error) {
    toast.error(error)
  }
  finally {
    setCompTaskLoading(false)

  }
}
export const UnCompTask = (docId, unCompletedTaskData, setCompTaskLoading, setLoadingId, setRightBarCheck) => async (dispatch) => {
  setCompTaskLoading(true)
  setLoadingId(docId)
  try {
    await db.collection("todo").doc(docId).update(unCompletedTaskData)
    toast.success("Change to uncompleted task")
    setRightBarCheck(true)
    dispatch({
      type: "UNCOMPLETEDTASK",
      payload: { ...unCompletedTaskData, docId }
    })
  }
  catch (error) {
    toast.error(error)
  }
  finally {
    setCompTaskLoading(false)

  }
}
export const TaskDeleteHandler = (deletedId, setRightBarOpen, setTaskDeleteLoading, handleDeleteClose) => async (dispatch) => {
  setTaskDeleteLoading(true)
  try {
    await db.collection("todo").doc(deletedId).delete()
    toast.success("Successfully Deleted")
    setRightBarOpen(false)
    handleDeleteClose()
    dispatch({
      type: "DELETEHANDLER",
      payload: deletedId
    })
  }
  catch (error) {
    toast.error(error)
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
    toast.success('Successfully Updated')
    setIsUpadte(false)
    dispatch({
      type: "UPDATEHANDLER",
      payload: { ...updatedData, docId }
    })
  }
  catch (error) {
    toast.error(error)
  }
  finally {
    setUpdatedLoading(false)
  }
}


export const ImportantTask = (docId, ImportanttaskData, setImportantLoading) => async(dispatch) => {
  try {
    setImportantLoading(true)
    await db.collection("todo").doc(docId).update(ImportanttaskData)
    if (ImportanttaskData.important){
      toast.success('Change to Important task')
    }else {
      toast.success('Change to Unimportant task')
    }
    
    dispatch({
      type: "IMPORTANT",
      payload: { ...ImportanttaskData, docId }
    })
  }
  catch (error) {
    toast.error(error)
  }
  finally {
    setImportantLoading(false)
  }
}