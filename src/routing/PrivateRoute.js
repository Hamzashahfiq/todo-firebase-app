import React from 'react'
import { Route, Navigate} from "react-router-dom";

export default function PrivateRoute({children, auth, ...rest}) {
  return (
    <Route {...rest} render = {() => auth? children : <Navigate to= {"/login"}></Navigate> }/>
  )
}
