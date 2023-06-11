// import {createContext, Dispatch, SetStateAction, useState} from "react";
//
// export type IMetadataContext = {
//     canonicalUrl: string | null,
//     setCanonicalUrl: Dispatch<SetStateAction<string | null>>
// }
//
// export const MetadataContext = createContext<IMetadataContext>(null);
//
// function MetadataContextProvider({children}) {
//     const [canonicalUrl, setCanonicalUrl] = useState(null);
//
//     return (
//         <MetadataContext.Provider value={{canonicalUrl, setCanonicalUrl} as IMetadataContext}>
//             {children}
//         </MetadataContext.Provider>
//     );
// }
//
// export default MetadataContextProvider;