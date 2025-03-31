import React from "react";
import tick from "../assets/tick.png";
import delete_icon from "../assets/delete_icon.png";
import not_tick from "../assets/not_tick.png"


const Todobox = ({text,id,isComplete,deleteTodo,toggle}) => {

  return (
    <div className="flex items-center my-3 gap2">


      <div onClick={()=>{toggle(id)}} className="flex flex-1 items-center cursor-pointer">

      {/* cond haigi hai ki je task complete hai tnn tick aauga if not then not tick aauga */}
        <img src={isComplete ? tick: not_tick} alt="" className="w-6" />

      {/* condition lgi hai ki je complete haiga task tnn center ch line cut hougi jehri rep krugi ki task complete haiga */}
        <p className={`ml-3 text-[17px] text-lg text-slate-600 decoration-slate-500 ${isComplete ? "line-through": ""}`}>{text}</p>
      </div>


      <img onClick={()=> {deleteTodo(id)}} src={delete_icon} alt="" className="w-5 cursor-pointer" />
    </div>
  );
};

export default Todobox;
