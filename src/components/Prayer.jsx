/* eslint-disable react/prop-types */
const Prayer = ({ name, time, image }) => {
  return (
    <div>
      <div className=" flex flex-col justify-center rounded-lg ">
        <div className="w-full">
          <div className=" w-auto h-auto flex justify-between flex-col  mt-3 mr-7 bg-slate-300 text-gray-900 items-center p-3 rounded-2xl">
              <img src={image} className="rounded-lg h-36 w-[350px] " alt="" />
              <h2 className="text-center text-2xl p-15 m-3"> {name} </h2>
              <p className="text-xl text-center  "> {time}</p>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Prayer;
