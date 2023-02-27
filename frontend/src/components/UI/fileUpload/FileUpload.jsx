import React, { useState } from 'react'
import { UilUpload } from '@iconscout/react-unicons'
import classes from './FileUpload.module.css'

function FileUpload(props) {

    const [currentFile, setCurrentFile] = useState('')
    const [drag, setDrag] = useState('')

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setCurrentFile(file.name);
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    function dragStartHandler(e) {
        e.preventDefault()
        setDrag(true)
    }

    function dragLeaveHandler(e) {
        e.preventDefault()
        setDrag(false)
    }

    return (
        <div>
            {drag || currentFile
                ? <div
                    style={props} className={[classes.FileUpload, classes.FileUploadComplete].join(' ')}
                    onDragStart={e => dragStartHandler(e)}
                    onDragLeave={e => dragLeaveHandler(e)}
                    onDragOver={e => dragStartHandler(e)}
                >
                    <div className={classes.LoadedFile}>
                        <span>{currentFile}</span>
                        <input type="file" onChange={handleFileUpload} />
                    </div>
                </div>
                : <div
                    style={props} className={classes.FileUpload}
                    onDragStart={e => dragStartHandler(e)}
                    onDragLeave={e => dragLeaveHandler(e)}
                    onDragOver={e => dragStartHandler(e)}
                >
                    <div>
                        <span>Select your file <UilUpload size="15" /></span>
                        <input type="file" onChange={handleFileUpload} />
                    </div>
                </div>
            }



        </div>



        // <div style={props} className={classes.FileUpload}>
        //     {currentFile
        //         ? <div className={classes.LoadedFile}>
        //             <span>{currentFile}</span>
        //             <input type="file" onChange={handleFileUpload} />
        //         </div>
        //         : <div>
        //             <span>Select File <UilUpload size="15" /></span>
        //             <input type="file" onChange={handleFileUpload} />
        //         </div>}
        // </div>
    )
}

export default FileUpload