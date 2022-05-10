import { AbiCoder } from "ethers/lib/utils";

const initialState = {
  loading: false,
  totalSupply: 0,
  totalSupplyDo: 0,
  totalSupplyRe: 0,
  totalSupplyMi: 0,
  totalSupplyFa: 0,
  totalSupplySol: 0,
  totalSupplyRa: 0,
  totalSupplySi: 0,
  cost: 0,
  error: false,
  errorMsg: "",
};
const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CHECK_DATA_REQUEST":
      return {
        ...state,
        loading: true,
        error: false,
        errorMsg: "",
      };
    case "CHECK_DATA_SUCCESS":
      return {
        ...state,
        loading: false,
        totalSupply: action.payload.totalSupply,
        totalSupplyDo: action.payload.totalSupplyDo,
        totalSupplyRe: action.payload.totalSupplyRe,
        totalSupplyMi: action.payload.totalSupplyMi,
        totalSupplyFa: action.payload.totalSupplyFa,
        totalSupplySol: action.payload.totalSupplySol,
        totalSupplyRa: action.payload.totalSupplyRa,
        totalSupplySi: action.payload.totalSupplySi,
        // cost: action.payload.cost,
        error: false,
        errorMsg: "",
      };
    case "CHECK_DATA_FAILED":
      return {
        ...initialState,
        loading: false,
        error: true,
        errorMsg: action.payload,
      };
    default:
      return state;
  }
};

export default dataReducer;
