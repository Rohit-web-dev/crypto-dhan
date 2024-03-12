import React from 'react'
import {
  BrowserRouter,
} from "react-router-dom";
import SidebarOld from './components/common/SidebarOld'

const App = () => {

  return (
    <>
      <BrowserRouter>
        {/* <Sidebar /> */}
        <SidebarOld />
      </BrowserRouter>
    </>
  )
}

export default App