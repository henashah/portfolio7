import React, { useState } from 'react';
import './App.css';
import Axios from 'axios';
import Button from '@mui/material/Button';
import UploadIcon from '@mui/icons-material/Upload';
import { AgChartsReact } from 'ag-charts-react';

export default function UploadCsv() {

    const submit = () => {
        Axios.post("/api/uploadfile").then(() => {
          console.log("returned from post api");
          alert("Succesfully added");
        });
      }

  return (
    <div className="App">
      <div className="form">
        <form action="/uploadfile" enctype="multipart/form-data" method="post">
          <input type="file" name="uploadfile" accept='csv'/>
          <Button variant="contained" sx = {{backgroundColor : '#00A897' }} startIcon={<UploadIcon/>} onClick={submit}> Upload Task CSV</Button>
        </form>
      </div>
    </div>
  );
}
