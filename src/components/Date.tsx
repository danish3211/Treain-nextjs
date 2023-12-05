import "react-datepicker/dist/react-datepicker.css";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import moment from 'moment';

export default function DatePickerComponent({ setDate }: any) {
  const [selectedDate, setSelectedDate] = useState(undefined);
  const handleChange = (date: any) => {
    setSelectedDate(date);
    setDate(moment(date).format());
  };

  return (
    <div className="flex-grow">
      <p className="block mb-2">Dept.</p>
      <DatePicker
        className="w-full bg-red-100 border-none p-2 rounded-md lg:w-full"
        selected={selectedDate}
        value={selectedDate}
        onChange={handleChange}
      />
    </div>
  );
}
