import React, { useEffect, useState } from 'react';
import './App.css';
import Axios from 'axios';
import Button from '@mui/material/Button';
import RefreshIcon from '@mui/icons-material/Refresh';
import UploadIcon from '@mui/icons-material/Upload';
import { AgChartsReact } from 'ag-charts-react';
import GenerateChart from './generateChart';
import UploadCsv from './uploadCsv';

export default function Time() {
  
  return (
    <div className="App">
      <header className="App-header"> 
        <h1>
          How am I using my time? 
        </h1>
      </header>
      <UploadCsv />
      {/* <div className="form">
        <form action="/uploadfile" enctype="multipart/form-data" method="post">
          <input type="file" name="uploadfile" accept='csv'/>
          <Button variant="contained" startIcon={<UploadIcon/>} onClick={submit}> Upload Task CSV</Button>
        </form>  
      </div> */}
      <div classname="chart-grid">
        <GenerateChart/>
      </div>
    </div>
  );
}
