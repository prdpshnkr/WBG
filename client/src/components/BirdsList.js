// import React, { PureComponent } from "react";
// import "./BirdsList.css";
// import AsyncSelect from "react-select/async";
// import BirdContext from "../context/BirdContext";

// export class BirdsList extends PureComponent {
//   state = {
//     selectedBird: [],
//   };

//   onChange = (selectedBird) => {
//     this.setState({
//       selectedBird: selectedBird || [],
//     });
//   };

//   loadOptions = async (inputText, callback) => {
//     const response = await fetch(
//       `http://localhost:3004/birds?comName_like=${inputText}`
//     );
//     const json = await response.json();

//     callback(
//       json.map((i) => ({
//         label: i.comName,
//         value: i.sciName,
//       }))
//     );
//   };

//   render() {
//     const { bird, setBird } = this.context;
//     return (
//       <div className="users">
//         <AsyncSelect
//           value={this.state.selectedBird}
//           onChange={this.onChange}
//           onSelect={setBird}
//           placeholder={"Search and select bird"}
//           loadOptions={this.loadOptions}
//         />
//       </div>
//     );
//   }
// }

// BirdsList.contextType = BirdContext;

// export default BirdsList;

import React, { useState } from "react";
import "./BirdsList.css";
import AsyncSelect from "react-select/async";

const BirdsList = () => {
  const [selectedBird, setSelectedBird] = useState("");

  const onChange = (bird) => {
    setSelectedBird(bird);
  };

  const loadOptions = async (inputText, callback) => {
    const response = await fetch(
      `http://localhost:3004/birds?comName_like=${inputText}`
    );
    const json = await response.json();

    callback(
      json.map((i) => ({
        label: i.comName,
        value: i.sciName,
      }))
    );
  };

  return (
    <div className="users">
      <AsyncSelect
        value={selectedBird}
        onChange={onChange}
        placeholder={"Search and select bird"}
        loadOptions={loadOptions}
      />
    </div>
  );
};

export default BirdsList;
