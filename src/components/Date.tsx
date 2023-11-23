import "react-datepicker/dist/react-datepicker.css";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import moment from 'moment';

export default function DatePickerComponent({ setDate}:any){
  const [selectedDate, setSelectedDate] = useState(undefined);
  const handleChange = (date: any) => {
    setSelectedDate(date);
    setDate(moment(date).format());
  };

  return (
    <div className="flex justify-center border-2 p-2 space-x-3">
      <p className="p-2">Departure</p>
      <DatePicker
        className="bg-slate-100 border-none p-2"
        selected={selectedDate}
        value={selectedDate}
        onChange={handleChange}
        />
    </div>
  );
}