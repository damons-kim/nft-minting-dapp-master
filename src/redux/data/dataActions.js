// log
import store from "../store";

const fetchDataRequest = () => {
  return {
    type: "CHECK_DATA_REQUEST",
  };
};

const fetchDataSuccess = (payload) => {
  return {
    type: "CHECK_DATA_SUCCESS",
    payload: payload,
  };
};

const fetchDataFailed = (payload) => {
  return {
    type: "CHECK_DATA_FAILED",
    payload: payload,
  };
};

export const fetchData = () => {
  return async (dispatch) => {
    dispatch(fetchDataRequest());
    try {
      let totalSupply = await store
        .getState()
        .blockchain.smartContract.methods.getMintCountForMaestro()
        .call();
        
      // let cost = await store
      //   .getState()
      //   .blockchain.smartContract.methods.cost()
      //   .call();
      let totalSupplyDo = await store
        .getState()
        .blockchain.smartContract.methods.getMintCountForOthers(0)
        .call();

      let totalSupplyRe = await store
      .getState()
      .blockchain.smartContract.methods.getMintCountForOthers(1)
      .call();

      let totalSupplyMi = await store
      .getState()
      .blockchain.smartContract.methods.getMintCountForOthers(2)
      .call();

      let totalSupplyFa = await store
      .getState()
      .blockchain.smartContract.methods.getMintCountForOthers(3)
      .call();

      let totalSupplySol = await store
      .getState()
      .blockchain.smartContract.methods.getMintCountForOthers(4)
      .call();

      let totalSupplyRa = await store
      .getState()
      .blockchain.smartContract.methods.getMintCountForOthers(5)
      .call();

      let totalSupplySi = await store
      .getState()
      .blockchain.smartContract.methods.getMintCountForOthers(6)
      .call();


      dispatch(
        fetchDataSuccess({
          totalSupply,
          totalSupplyDo,
          totalSupplyRe,
          totalSupplyMi,
          totalSupplyFa,
          totalSupplySol,
          totalSupplyRa,
          totalSupplySi,
          // cost,
        })
      );
    } catch (err) {
      console.log(err);
      dispatch(fetchDataFailed("Could not load data from contract."));
    }
  };
};
