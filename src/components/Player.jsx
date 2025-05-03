import { useState } from "react";

export default function Player({ name, symbol,isActive,onChangeName }) {

  // This State is used for handling edit btn click and chnaging edit to save and vice versa
  const [isEditing, setisEditing] = useState(false);



  // This state is used for setting the name when save btn is clicked
  const [playername,setplayername] = useState(name)

  function handleEditClick() {
    setisEditing(()=>!isEditing);
    onChangeName(symbol, playername)
  }

  function handleChange(event){
    //console.log(event.target.value)
    setplayername(event.target.value)

  }

  return (
    <li className={isActive?'active':undefined}>
      <span className="player">
        {isEditing ? (
          <>
           <input type="text" value={playername} onChange={handleChange} />
           </>
        ) : (
          <>
            <span className="player-name">{playername}</span>
            <span className="player-symbol">{symbol}</span>
          </>
        )}
      </span>
      <button onClick={handleEditClick}>{isEditing?("Save"):("Edit")}</button>
    </li>
  );
}
