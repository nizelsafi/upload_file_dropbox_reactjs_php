import FileUploadForm  from "./FileUploadForm.js";
import React from "react";
import {
    BrowserRouter as
    Route,
  } from "react-router-dom";


class App extends React.Component {
    render() {
        return (
            <Route path="/upload">
                <FileUploadForm />
            </Route>
        );
    }
}
export default App;