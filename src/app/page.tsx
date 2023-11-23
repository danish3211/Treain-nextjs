"use client";
import { useState } from "react";
import DatePicker from "../components/Date";

const Page = () => {
  const [stations, setStations] = useState({ from: "", to: "" });
  const [date, setDate] = useState<null | Date>(null);
  const [trains, setTrains] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `https://indian-railway-api.cyclic.app/trains/betweenStations/?from=${stations?.from}&to=${stations?.to}&date=${date}`
      );
      const result = await response.json();
      setTrains(() => result?.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }    
  };

  const handleFromChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStations((prev) => ({ ...prev, from: e.target.value }));
  };

  const handleToChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStations((prev) => ({ ...prev, to: e.target.value }));
  };

  return (
    <>
      <div className="p-5">
        <p className="flex justify-center text-2xl font-extrabold">Trains</p>
        <div className="border-4">
          <div className="flex justify-center p-3 space-x-3">
            <p className="border-2 p-2">
              From :
              <input
                className="bg-slate-100 border-none p-2"
                type="text"
                placeholder="STSN"
                value={stations.from}
                onChange={handleFromChange}
              />
            </p>
            <p className="border-2 p-2">
              To :
              <input
                className="bg-slate-100 border-none p-2"
                type="text"
                placeholder="STSN"
                value={stations.to}
                onChange={handleToChange}
              />
            </p>
            <DatePicker seletedDate={date} setDate={setDate} />
          </div>
          <div className="flex justify-center items-center">
          <button className="bg-red-500" onClick={handleSearch}>
            Search
          </button>
        </div>
          <div>
            <p className="text-center">Available Trains:</p>
          </div>
        </div>
      </div>
      <div className="">
      {trains.length ? (
  <table className="border-2 m-2">
    <thead className="text-center p-3 border-2">
      <tr>
        <th></th>
        <th>Train No</th>
        <th>Train Name</th>
        <th>From</th>
        <th>Dep. Time</th>
        <th>To</th>
        <th>Arr. Time</th>
        <th>Duration</th>
      </tr>
    </thead>
    <tbody>
      {trains.map((train: any, index: number) => (
        <tr key={train?.train_base?.train_no}>
          <th>
          <p>{`${index + 1}`}</p>
          </th>
          <td className="text-center">
            <p className="">{train?.train_base?.train_no}</p>
          </td>
          <td className="pl-7">{` ${train?.train_base?.train_name}`}</td>
          <td className="text-center">{`${train?.train_base?.from_stn_name} (${train?.train_base?.from_stn_code})`}</td>
          <td className="text-center">{train?.train_base?.from_time}</td>
          <td className="text-center">{`${train?.train_base?.to_stn_name} (${train?.train_base?.to_stn_code})`}</td>
          <td className="text-center">{train?.train_base?.to_time}</td>
          <td className="text-center">{train?.train_base?.travel_time}</td>
        </tr>
      ))}
    </tbody>
  </table>
) : (
  <h1>No Data Available</h1>
)}
      </div>
    </>
  );
};

export default Page;
