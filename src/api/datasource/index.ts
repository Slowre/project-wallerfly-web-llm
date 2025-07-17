import DataRepoImpl from "../impl/repo/DataRepoImpl"

import LocalStorage from "../impl/ds/LocalStorage"

const LS = LocalStorage.getInstance()
const DataRepo = new DataRepoImpl(LS)
export default DataRepo