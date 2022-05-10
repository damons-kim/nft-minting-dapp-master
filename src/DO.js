import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { connect } from "./redux/blockchain/blockchainActions";
import { fetchData } from "./redux/data/dataActions";
import * as s from "./styles/globalStyles";
import styled from "styled-components";
import Web3 from "web3";
import "rsuite/styles/index.less";
import "rsuite/dist/rsuite.min.css";
import { Notification, toaster } from "rsuite";
import { Loader } from "rsuite";

const truncate = (input, len) =>
  input.length > len ? `${input.substring(0, len)}...` : input;

export const StyledButton = styled.button`
  font-family: "MonumentExtended";
  padding: 10px;
  font-size: 1rem;
  border-radius: 6px;
  border: none;
  background-color: black;
  padding: 10px;
  letter-spacing: 2px;
  font-weight: bold;
  color: white;
  width: 270px;
  height: 50px;
  cursor: pointer;
  box-shadow: 0px 6px 0px -2px black;
  -webkit-box-shadow: 0px 6px 0px -2px black;
  -moz-box-shadow: 0px 6px 0px -2px black;
  :active {
    box-shadow: none;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
  }
  :hover {
    color: silver;
  }
  @media (max-width: 565px) {
    width: 200px;
    height: 50px;
    font-size: 0.75rem;
  }
`;

export const CTNButton = styled.button`
  font-family: "coder";
  padding: 10px;
  font-size: 1rem;
  border-radius: 6px;
  border: none;
  background-color: black;
  padding: 10px;
  letter-spacing: 2px;
  font-weight: bold;
  color: white;
  width: 270px;
  height: 50px;
  cursor: pointer;
  box-shadow: 0px 6px 0px -2px black;
  -webkit-box-shadow: 0px 6px 0px -2px black;
  -moz-box-shadow: 0px 6px 0px -2px black;
  :active {
    box-shadow: none;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
  }
  :hover {
    color: silver;
  }
  @media (max-width: 565px) {
    width: 200px;
    height: 50px;
    font-size: 0.75rem;
  }
`;

export const Maxbtn = styled.button`
  font-family: "coder";
  font-size: 0.75rem;
  border-radius: 10px;
  background-color: #f48c2c;
  font-weight: bold;
  color: white;
  width: 80px;
  height: 30px;
  cursor: pointer;
  letter-spacing: 2px;
  :hover {
    color: black;
  }
  @media (max-width: 565px) {
    width: 200px;
    height: 50px;
    font-size: 0.75rem;
  }
`;

export const StyledRoundButton = styled.button`
  padding: 10px;
  border-radius: 10px;
  border: none;
  background-color: transparent;
  padding: 10px;
  font-weight: bold;
  font-size: 30px;
  color: white;
  width: 40px;
  height: 40px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  :active {
    box-shadow: none;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
  }
  :hover {
    color: silver;
  }
`;

export const LogoDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: center;
  gap: 10%;
  width: 300px;
`;

export const ResponsiveWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: stretched;
  align-items: center;
  margin: auto;
  width: 70%;
  border: 2px solid none;
  border-radius: 40px;
  // background: linear-gradient(
  //   90deg,
  //   rgba(135, 142, 20, 1) 10%,
  //   rgba(0, 125, 223, 1) 93%
  // );
  @media (min-width: 767px) {
    flex-direction: row;
  }
`;

export const ResponsiveWrapperHeader = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-height: 80px;
  padding: 10px;
  background-color: black;
  @media (min-width: 767px) {
    flex-direction: row;
  }
  @media (max-width: 565px) {
    max-height: 220px;
  }
`;

export const StyledLogo = styled.img`
  display: inline;
  width: 200px;
  @media (max-width: 767px) {
    width: 150px;
  }
  transition: width 0.5s;
  transition: height 0.5s;
`;

export const StyledImg = styled.img`
  width: 450px;
  border-radius: 5px;
  @media (min-width: 900px) {
    width: 450px;
  }
  @media (min-width: 1000px) {
    width: 450px;
  }
  transition: width 0.5s;
  @media (max-width: 565px) {
    width: 200px;
  }
`;

export const Styledroad = styled.img`
  width: 100%;
  border-radius: 5px;
  transition: width 0.5s;
`;

export const StyledImgSmall = styled.img`
  width: 220px;
  height: 220px;
  border-radius: 5px;
  @media (min-width: 900px) {
    width: 220px;
    height: 220px;
  }
  @media (min-width: 1000px) {
    width: 220px;
    height: 220px;
  }
  transition: width 0.5s;
  @media (max-width: 565px) {
    width: 200px;
  }
`;

export const StyledLink = styled.a`
  color: var(--secondary);
  text-decoration: none;
`;

export const WalletBox = styled.div`
  text-decoration: none;
  border-radius: 10px;
  border: 2px solid white;
  background-color: transparent;
  //padding: 10px;
  font-weight: bold;
  font-size: 15px;
  width: 180px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 4px 0px -2px white;
  -webkit-box-shadow: 0px 4px 0px -2px white;
  -moz-box-shadow: 0px 4px 0px -2px white;
  @media (max-width: 565px) {
    margin-top: 20px;
  
`;

function Do() {
  const dispatch = useDispatch();
  const blockchain = useSelector((state) => state.blockchain);
  const data = useSelector((state) => state.data);
  const [walletAddress, setAddress] = useState("Not Connected");
  const [claimingNft, setClaimingNft] = useState(false);
  const [feedback, setFeedback] = useState(``);
  const [tokens, settokens] = useState(1);
  const [brd, setbrd] = useState("2px solid #FFFFFF");
  const [bxsh, setbxsh] = useState("0px 0px 3px 0px #FFFFFF");
  const [DOT, setDOT] = useState("red");
  const [type, setType] = React.useState("info");
  const [placement, setPlacement] = React.useState("topStart");
  const errmessage = (
    <Notification type={"error"} header={"error"} closable>
      Sorry, something went wrong please try again later.
    </Notification>
  );
  const txmessage = (
    <Notification type={"success"} header={"success"} closable>
      Congrats, Mint Was successfull.
    </Notification>
  );
  const mntmessage = (
    <Notification type={"info"} header={"success"} closable>
      <Loader /> Minting in Progress....
    </Notification>
  );
  const [CONFIG, SET_CONFIG] = useState({
    CONTRACT_ADDRESS: "",
    SCAN_LINK: "",
    NETWORK: {
      NAME: "",
      SYMBOL: "",
      ID: 0,
    },
    NFT_NAME: "",
    SYMBOL: "",
    eachMaxMintCountForOthers: 1,
    DISPLAY_COST_Others: 0,
    WL_Display: 0,
    GAS_LIMIT: 0,
    MAX_PER_TX: 0,
    MARKETPLACE: "",
    MARKETPLACE_LINK: "",
    Telegram: "",
    Discord: "",
    Twitter: "",
    SHOW_BACKGROUND: false,
    mintForOthers: "",
  });

  const claimNFTs = () => {
    let cost = CONFIG.DISPLAY_COST_Others * tokens;
    let price = Web3.utils.toWei(cost.toString(), "ether");
    let gasLimit = CONFIG.GAS_LIMIT;
    let totalGasLimit = String(gasLimit);
    console.log("Cost: ", price);
    console.log("Gas limit: ", totalGasLimit);
    setFeedback(`Minting your ${CONFIG.NFT_NAME}...`);
    setClaimingNft(true);
    setbrd("2px solid yellow");
    setbxsh("0px 0px 3px 0px yellow");
    toaster.push(mntmessage, { placement });
    blockchain.smartContract.methods
      .mintForOthers(0, tokens)
      .send({
        gasLimit: String(totalGasLimit),
        to: CONFIG.CONTRACT_ADDRESS,
        from: blockchain.account,
        value: price,
      })
      .once("error", (err) => {
        console.log(err);
        setFeedback("Sorry, something went wrong please try again later.");
        setClaimingNft(false);
        toaster.push(errmessage, { placement });
        setbrd("2px solid red");
        setbxsh("0px 0px 3px 0px red");
      })
      .then((receipt) => {
        console.log(receipt);
        setFeedback(
          `WOW, the ${CONFIG.NFT_NAME} is yours! go visit Opensea.io to view it.`
        );
        toaster.push(txmessage, { placement });
        setbrd("2px solid green");
        setbxsh("0px 0px 3px 0px green");
        setClaimingNft(false);
        dispatch(fetchData(blockchain.account));
      });
  };

  const getData = () => {
    if (blockchain.account !== "" && blockchain.smartContract !== null) {
      dispatch(fetchData(blockchain.account));
      setAddress(
        blockchain.account.substring(0, 5) +
          "..." +
          blockchain.account.substring(38, 42)
      );
      setDOT("green");
    }
  };

  const getConfig = async () => {
    const configResponse = await fetch("/config/config.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const config = await configResponse.json();
    SET_CONFIG(config);
  };

  useEffect(() => {
    getConfig();
  }, []);

  useEffect(() => {
    getData();
  }, [blockchain.account]);

  return (
    <>
      <s.Screen>
        <s.Container
          flex={1}
          // ai={"center"}
          style={{ backgroundColor: "black" }}
          image={CONFIG.SHOW_BACKGROUND ? "/config/images/bg.png" : null}
        >
          <s.Container flex={1} jc={"center"} ai={"center"}>
            <s.TextTitle>DO</s.TextTitle>
          </s.Container>

          <ResponsiveWrapper flex={1} style={{ padding: 24 }} test>
            {/* <s.SpacerSmall /> */}
            <s.Container flex={1} jc={"center"} ai={"center"}>
              {Number(data.totalSupplyDo) >= CONFIG.eachMaxMintCountForOthers ? (
                <>
                  <s.TextSub
                    style={{
                      textAlign: "center",
                      color: "var(--accent-text)",
                      fontFamily: "MonumentExtended",
                    }}
                  >
                    The sale has ended.
                  </s.TextSub>
                  <s.TextDescription
                    style={{
                      textAlign: "center",
                      color: "var(--accent-text)",
                      fontSize: "30px",
                      fontFamily: "MonumentExtended",
                    }}
                  >
                    You can still find {CONFIG.NFT_NAME} on
                  </s.TextDescription>
                  <StyledLink target={"_blank"} href={CONFIG.MARKETPLACE_LINK}>
                    {CONFIG.MARKETPLACE}
                  </StyledLink>
                </>
              ) : (
                <>
                  <s.TextSub
                    style={{
                      textAlign: "center",
                      color: "var(--accent-text)",
                      fontFamily: "MonumentExtended",
                    }}
                  >
                    {data.totalSupplyDo} | {CONFIG.eachMaxMintCountForOthers}
                  </s.TextSub>
                  {blockchain.account === "" ||
                  blockchain.smartContract === null ? (
                    <>
                      <s.Container ai={"center"} jc={"center"}>
                        {/* <CTNButton
                        onClick={(e) => {
                          e.preventDefault();
                          dispatch(connect());
                          getData();
                        }}
                      >
                        CONNECT Wallet
                        <img
                          style={{ width: 30, paddingLeft: 10 }}
                          src={"/config/images/mm.svg"}
                        />
                      </CTNButton> */}
                        {blockchain.errorMsg !== "" ? (
                          <>
                            <s.TextDescription
                              style={{
                                textAlign: "center",
                                color: "var(--accent-text)",
                                fontFamily: "MonumentExtended",
                              }}
                            >
                              {blockchain.errorMsg}
                            </s.TextDescription>
                          </>
                        ) : null}
                      </s.Container>
                    </>
                  ) : (
                    <>
                      {/* <s.TextTotal style={{ color: "black" }}>
                        Total&emsp;&emsp;&emsp;&emsp;&emsp;
                        {(CONFIG.DISPLAY_COST_Others * tokens)
                          .toString()
                          .substring(0, 6)}{" "}
                        {CONFIG.NETWORK.SYMBOL}
                      </s.TextTotal> */}
                      <s.Container ai={"center"} jc={"center"} fd={"column"}>
                        <StyledButton
                          disabled={claimingNft ? 1 : 0}
                          onClick={(e) => {
                            e.preventDefault();
                            claimNFTs();
                            getData();
                          }}
                        >
                          {claimingNft ? (
                            <Loader speed="fast" content="Minting..." />
                          ) : (
                            "MINT"
                          )}
                        </StyledButton>
                      </s.Container>
                      <s.TextSubTitle style={{ fontSize: 15 }}>
                        Max {CONFIG.MAX_PER_TX} Per Address
                      </s.TextSubTitle>
                      <s.TextSubTitle
                        style={{ textAlign: "center", fontSize: "1rem" }}
                      >
                        {feedback}
                      </s.TextSubTitle>
                    </>
                  )}
                </>
              )}
            </s.Container>

            {/* <StyledImg src={"/config/images/Do.gif"} alt="image" /> */}
          </ResponsiveWrapper>
        </s.Container>
      </s.Screen>
    </>
  );
}

export default Do;
