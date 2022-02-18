// import React, { PureComponent } from "react";
// import "./BirdsList.css";
// import AsyncSelect from "react-select/async";

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

import React, { useState, useContext } from "react";
import AsyncSelect from "react-select/async";
import BirdContext from "../context/BirdContext";

const BirdsList = () => {
  const { setBird } = useContext(BirdContext);

  const [selectedBird, setSelectedBird] = useState("");

  const onChange = (bird) => {
    setSelectedBird(bird);
    setBird(bird);
  };

  const loadOptions = async (inputText, callback) => {
    const response = await fetch(
      `http://localhost:3004/birds?comName_like=${inputText}`
    );
    const json = await response.json();

    callback(
      json.map((i) => ({
        label: i.comName,
        sciName: i.sciName,
        speciesCode: i.speciesCode,
        category: i.category,
        taxonOrder: i.taxonOrder,
        bandingCodes: i.bandingCodes,
        comNameCodes: i.comNameCodes,
        sciNameCodes: i.sciNameCodes,
        order: i.order,
        familyCode: i.familyCode,
        familyComName: i.familyComName,
        familySciName: i.familySciName,
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
      <div></div>
    </div>
  );
};

export default BirdsList;
