import React from 'react';
import axios from 'axios';
import { getAuthKey } from '../home/Home';
import MainNavbar from '../../components/MainNavbar';

function Data() {
    const [file, setFile] = React.useState<any>()

    function handleChange(event: any) {
        setFile(event.target.files[0])

        console.log(file);
    }
    
    function handleSubmit(event: any) {
        event.preventDefault()
        const url = '/api/uploadDataFile';
        const formData = new FormData();

        const key = getAuthKey()!;

        formData.append('file', file);
        formData.append('fileName', file.name);
        formData.append('key', key);
        const config = {
          headers: {
            'content-type': 'multipart/form-data',
          },
        };
        axios.post(url, formData, config).then((response) => {
          console.log(response.data);
          alert(JSON.stringify(response.data))
        });
    
    }

    return (
        <>
            <MainNavbar/>
            <div className='container'>
                <h1>Data</h1>
                <form onSubmit={handleSubmit}>
                    <input type="file" onChange={handleChange} />
                    <button type="submit">Upload</button>
                </form>
                <form action="/api/downloadDataFile" method="get">
                    <button type="submit">Download Single File</button>
                </form>
            </div>
        </>
    );
}


export default Data;