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
        `https://indian-railway-api.cyclic.app/trains/betweenStations/?from=${stations?.from}&to=${stations?.to}`
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
     <div className="p-6 lg:mx-auto lg:max-w-screen-lg">
        <p className="text-center text-2xl font-semibold p-2">D R C T C</p>
        <div className="border-4 p-5 rounded-md">
          <div className="flex flex-col lg:flex-row justify-center p-3 space-y-3 lg:space-y-0 lg:space-x-3 rounded-md">
            <div className="flex-grow lg:w-1/3">
              <label className="block mb-2">From:</label>
              <input
                className="w-full bg-red-100 border-none p-2 rounded-md"
                type="text"
                placeholder="STSN"
                value={stations.from}
                onChange={handleFromChange}
              />
            </div>
            <div className="flex-grow lg:w-1/3">
              <label className="block mb-2">To:</label>
              <input
                className="w-full bg-red-100 border-none p-2 rounded-md"
                type="text"
                placeholder="STSN"
                value={stations.to}
                onChange={handleToChange}
              />
            </div>
            <div className="">
              <DatePicker selectedDate={date} setDate={setDate} />
            </div>
          </div>
          <div className="flex justify-center items-center">
            <button className="bg-red-500 px-4 py-2 rounded-lg" onClick={handleSearch}>
              Search
            </button>
          </div>
        </div>
      </div>

      <div className="lg:mx-auto lg:max-w-screen-lg">
  <div>
    <p className="text-center text-2xl font-bold mb-4">Available Trains:</p>
  </div>
  {trains.length ? (
    <div className="overflow-x-auto px-4 lg:px-7">
      <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-md">
        <thead className="bg-red-200 text-center text-sm">
          <tr>
            <th className="py-2"></th>
            <th className="py-2">Train No</th>
            <th className="py-2">Train Name</th>
            <th className="py-2">From</th>
            <th className="py-2">Dep. Time</th>
            <th className="py-2">To</th>
            <th className="py-2">Arr. Time</th>
            <th className="py-2">Duration</th>
          </tr>
        </thead>
        <tbody className="text-center text-sm">
          {trains.map((train: any, index: number) => (
            <tr key={train?.train_base?.train_no} className={index % 2 === 0 ? 'bg-red-100' : 'bg-white'}>
              <td className="py-2">
                <p>{`${index + 1}`}</p>
              </td>
              <td className="py-2">
                <p className="">{train?.train_base?.train_no}</p>
              </td>
              <td className="py-2">{` ${train?.train_base?.train_name}`}</td>
              <td className="py-2">{`${train?.train_base?.from_stn_name} (${train?.train_base?.from_stn_code})`}</td>
              <td className="py-2">{train?.train_base?.from_time}</td>
              <td className="py-2">{`${train?.train_base?.to_stn_name} (${train?.train_base?.to_stn_code})`}</td>
              <td className="py-2">{train?.train_base?.to_time}</td>
              <td className="py-2">{train?.train_base?.travel_time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ) : (
    <>
    <h1 className="text-center text-lg font-semibold mt-16">Please Enter station code</h1>
    <p className="text-center text-xl mt-9 text-red-600 font-extrabold">make sure you enter correct station code</p>
    </>
  )}
</div>

    </>
  );
};

export default Page;
