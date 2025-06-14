import dayjs from 'dayjs';
import React, {useState} from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import './App.css';

const mfList = [{
    "title": "Axis SIP 1",
    "date": "06/07/2025"
},
{
    "title": "Axis SIP 2",
    "date": "06/05/2025"
},
{
    "title": "Axis SIP 3",
    "date": "06/01/2025"
},
{
    "title": "Axis SIP 4",
    "date": "06/02/2025"
},{
    "title": "Tata SIP 1",
    "date": "05/02/2025"
},
{
    "title": "Tata SIP 2",
    "date": "03/06/2025"
},{
    "title": "Axis SIP 5",
    "date": "04/08/2025"
},
{
    "title": "Aditya Birla SIP 5",
    "date": "04/05/2025"
},
{
    "title": "Adithya Birla SIP 5",
    "date": "02/20/2025"
},
{
    "title": "Adithya Birla SIP 5",
    "date": "01/01/2025"
}]

function App() {
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [timeline, setTimeline] = React.useState('custom');
  const [error, setError] = useState(null);

  const handleChange = (event) => {
    const period = event.target.value;
    setError(null)
    setTimeline(period);
    if(period !== 'custom') {
      setFromDate(dayjs().subtract(period, 'month'))
      setToDate(dayjs())
    } else {
      console.log(toDate)
      setFromDate(dayjs())
      setToDate(dayjs())
    }
  };
  const handleFromDate = (newValue) => {

    setFromDate(newValue)
    setToDate(null)
    setError(null)
  }

  const handleToDate = (newValue) => {
    setToDate(newValue)
    if(dayjs(newValue).isBefore(dayjs(fromDate))) {
      setError("To date can't be earlier than from date")
    }
  }
  return (
    <div className="App">
      <p>Welcome to CAMS MF Lister!!</p>
      <FormControl>
        <InputLabel id="demo-simple-select-label">Select Timeline</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="timeline"
          value={timeline}
          label="timeline"
          onChange={handleChange}
        >
          <MenuItem value={1}>Last 1 month</MenuItem>
          <MenuItem value={3}>Last 3 months</MenuItem>
          <MenuItem value={6}>Last 6 months</MenuItem>
          <MenuItem value={'custom'}>Custom Range</MenuItem>
        </Select>
        <div style={{display: 'flex', margin:'20px 0', justifyContent: 'space-between'}}>
         <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker 
            label="From Date" 
            value={fromDate} 
            yearsOrder="desc"
            disabled={timeline !== 'custom'}
            onChange={(newValue) => handleFromDate(newValue)}
          />
        </LocalizationProvider>
        
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker 
            label="To Date" 
            value={toDate} 
            yearsOrder="desc"
            disabled={timeline !== 'custom'}
            onChange={(newValue) => handleToDate(newValue)}

          />
        </LocalizationProvider>
      </div>
      {error && <p style={{color: 'red'}}>{error}</p> }
      </FormControl>
      <div>
        {mfList.map((mf) => {
          if(fromDate && toDate && !error && dayjs(mf.date).isBetween(fromDate, toDate, null, '[]')) {
            return <ol style={{listStyleType: 'none'}}>
              <li>{mf.title}</li>
              <li>{mf.date}</li>
            </ol>
          } else {
            return null
          }
        })}
      </div>
    </div>
  );
}

export default App;
