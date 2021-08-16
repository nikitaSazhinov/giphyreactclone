import React, {useState} from 'react'
import axios from 'axios';
import { Button } from 'react-bootstrap'

export default function Upload() {
    //TODO Upload gif endpoint implemenmtation
    const [upload, setUpload] = useState(null)

    const selectFileHandle = event => {
        setUpload(event.target.files[0])
    }
    
    const fileUploadHandle = () => {
        const res = axios.post("upload.giphy.com/v1/gifs",
        {params: {
            api_key: "P4jbuZfGCfPyMLNlDBFP2SumJ4CIWiZN",
            file: upload
        }})
        console.log(res)
    }
    return (
        <div>
            <Button className="nav-button"><i class="fa fa-upload fa-10x" aria-hidden="true"></i></Button>
            <input type="file" onChange={selectFileHandle}/>
            <Button onClick={fileUploadHandle}><i class="fa fa-arrow-circle-up" aria-hidden="true"></i></Button>
        </div>
    )
}
