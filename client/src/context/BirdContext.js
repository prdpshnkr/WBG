import { createContext } from "react";

const BirdContext = createContext({});

export default BirdContext;

// export const BirdProvider = () => {
// //   const [bird, setBird] = useState("");

//   return (
//     <BirdContext.Provider
//       value={{
//         bird,
//         setBird,
//       }}
//     >
//       {this.props.children}
//     </BirdContext.Provider>
//   );
// };

// export default BirdContext;
