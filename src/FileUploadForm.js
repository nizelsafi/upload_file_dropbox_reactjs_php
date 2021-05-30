import "./FileUploadForm.scss";

import React from "react";
import axios from "axios";
import Dropzone from "react-dropzone";
import DropboxChooser from "react-dropbox-chooser";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Icon from "@material-ui/core/Icon";
import IconButton from "@material-ui/core/IconButton";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

class FileUploadForm extends React.Component {
    UPLOAD_ENDPOINT = "http://127.0.0.1:8000/backend/upload.php";
    
    constructor(props) {
        super(props);
        this.state ={
          file:null,
          progress: false,
          uploaded: false,
          selected: false,
        }
    }
    
    async uploadFile(data){
        this.setState({progress: true});
        await axios.post(this.UPLOAD_ENDPOINT, data)
        .then(response => {
        //handle success
        console.log("Upload Success!", response);
        this.setState({progress: false});
        this.setState({uploaded: true});
        //alert("Upload Success!");
        })
        .catch(response => {
        //handle error
        console.log("Upload fail", response);
        this.setState({progress: false});
        //alert("Upload fail");
        });
    }

    handleDropboxUpload(acceptedFiles){
        this.setState({file: acceptedFiles[0]});
        const file = this.state.file;
        const data = {
            file: {
                link: file.link,
                name: file.name
            }
        };

        return this.uploadFile(JSON.stringify(data));
    }

    handleDropzoneUpload(acceptedFiles) {
        this.setState({file: acceptedFiles[0]});
        const file = this.state.file;
        var bodyFormData = new FormData();

        bodyFormData.append("file", file, file.name);
        return this.uploadFile(bodyFormData);
    }


    render() {
        const circularProgress = 
            <div className="uploadStateIcon">
                <Typography className="dropzone-header" variant="subtitle1">
                    Loading..
                </Typography>
                <CircularProgress size={100} />
            </div>;
        const checkCircleIcon =
            <div className="uploadStateIcon"> 
                <Typography className="dropzone-header" variant="subtitle1">
                    Upload Success!
                </Typography>
                <CheckCircleIcon />
            </div>;
        const listPanel =
            <List component="nav" className="list-container">
                <ListItem className="list-item" button onClick={() => this.setState({uploaded: false})}>
                    <ListItemText primary="Job1" secondary="Flyer" />
                    <ListItemSecondaryAction><IconButton><ArrowDownwardIcon/></IconButton></ListItemSecondaryAction>
                </ListItem>
                <ListItem className="list-item" button onClick={() => this.setState({uploaded: false})}>
                    <ListItemText primary="Job2" secondary="Poster" />
                </ListItem>
            </List>;

        const APP_KEY="ct6dfroz039fuut"

        const dropboxChooser =  
            <DropboxChooser appKey={APP_KEY}
                    success={acceptedFiles => { 
                        this.handleDropboxUpload(acceptedFiles);
                    }}
                    cancel={() => console.log("closed")}
                    linkType={"direct"}
                    >
                        <Typography className="dropboxchooser-text" variant="body2">
                            or upload from
                        </Typography>
                        <IconButton>
                            <img src={require("./assets/icons/dropbox.png").default} alt="" />
                        </IconButton> 
            </DropboxChooser>;

        const dropzone = 
            <div className="dropzone-container">
                <Typography className="dropzone-header" variant="subtitle1">
                    Upload now your file
                </Typography>
                <Dropzone onDrop={acceptedFiles => { 
                        this.handleDropzoneUpload(acceptedFiles);
                    }}>
                    {({getRootProps, getInputProps}) => (
                        <div className="dropzone-content">
                            <div {...getRootProps({
                                    className: "dropzone",
                                })}>
                                <input type="file" {...getInputProps()} />
                                <div>
                                    <Icon>
                                        <img src={require("./assets/icons/move.png").default} alt="" />
                                    </Icon> 
                                    <Typography className="dropzone-text" variant="subtitle1">
                                        upload your graphic file here
                                    </Typography>
                                </div>
                                {dropboxChooser}
                            </div>
                        </div>
                    )}
                </Dropzone>
            </div>;

        return(
            <div className="page-container">
                <Typography className="header" variant="h5">
                    Upload area
                </Typography>
                <div className="page-content">
                    <Typography className="title" variant="subtitle2">
                        Select a job
                    </Typography>
                    <div className="file-upload-container">
                        {listPanel}
                        {this.state.progress ? circularProgress : this.state.uploaded ? checkCircleIcon : dropzone}
                    </div>
                </div>
            </div>
            );             
    }      
}

export default FileUploadForm;