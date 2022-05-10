import "./App.css";
import MAESTRO from "./Maestro";
import MintDO from "./DO";
import MintRE from "./RE";
// import MintMI from "./MI";
// import MintFA from "./FA";
// import MintSOL from "./SOL";
// import MintRA from "./RA";
// import MintSI from "./SI";

import Maestro from "./gif/Maestro.gif";
import DO from "./gif/DO.gif";
import RE from "./gif/RE.gif";
import MI from "./gif/MI.gif";
import FA from "./gif/FA.gif";
import SOL from "./gif/SOL.gif";
import RA from "./gif/RA.gif";
import SI from "./gif/SI.gif";

import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "./redux/blockchain/blockchainActions";
import { fetchData } from "./redux/data/dataActions";
import * as s from "./styles/globalStyles";
import styled from "styled-components";
import Web3 from "web3";
import "rsuite/styles/index.less";
import "rsuite/dist/rsuite.min.css";
import { Panel, PanelGroup } from "rsuite";
import { Carousel } from "rsuite";
import { Notification, toaster } from "rsuite";
import { Loader } from "rsuite";
import { Badge } from "rsuite";

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
  font-family: "MonumentExtended";
  padding: 10px;
  font-size: 0.9rem;
  border: none;
  background-color: black;
  padding: 10px;

  letter-spacing: -0px;
  font-weight: bold;
  color: white;
  width: 200px;
  height: 40px;

  border: 1px solid #ffffff;
  cursor: pointer;
  :active {
    box-shadow: none;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
  }
  :hover {
    // color: silver;
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

export default function App() {
  const [activeIndex, setActiveIndex] = useState(0);

  const tabClickHandler = (index: React.SetStateAction<number>) => {
    setActiveIndex(index);
  };

  const tabContArr = [
    {
      tabTitle: (
        <li
          className={activeIndex === 0 ? "is-active" : "is-disable"}
          onClick={() => tabClickHandler(0)}
        >
          MAESTRO{" "}
        </li>
      ),
      tabCont: (
        <div className="content">
          <div className="content-1">
            <MAESTRO />
          </div>
          <div className="gif-sec">
            <StyledImg className="gif" src={Maestro} alt="gif" />
          </div>
        </div>
      ),
    },
    {
      tabTitle: (
        <li
          className={activeIndex === 1 ? "is-active" : "is-disable"}
          onClick={() => tabClickHandler(1)}
        >
          DO{" "}
        </li>
      ),
      tabCont: (
        <div className="content">
          <div className="content-1">
            <MintDO />
          </div>
          <div className="gif-sec">
            <StyledImg className="gif" src={DO} alt="gif" />
          </div>
        </div>
      ),
    },
    {
      tabTitle: (
        <li
          className={activeIndex === 2 ? "is-active" : "is-disable"}
          onClick={() => tabClickHandler(2)}
        >
          RE{" "}
        </li>
      ),
      tabCont: (
        <div className="content">
          <div className="content-1">
            <MintRE />
          </div>

          <div className="gif-sec">
            <StyledImg className="gif" src={RE} alt="gif" />
            {/* <h1 className="gif-soon-text">MINT SOON</h1> */}
          </div>
        </div>
      ),
    },
    {
      tabTitle: (
        <li
          className={activeIndex === 3 ? "is-active" : "is-disable"}
          onClick={() => tabClickHandler(3)}
        >
          MI{" "}
        </li>
      ),
      tabCont: (
        <div className="content">
          <div className="content-1">{/* <MintMI /> */}</div>

          <div className="gif-sec">
            <StyledImg className="gif-soon" src={MI} alt="gif" />
            <h1 className="gif-soon-text">MINT SOON</h1>
          </div>
        </div>
      ),
    },
    {
      tabTitle: (
        <li
          className={activeIndex === 4 ? "is-active" : "is-disable"}
          onClick={() => tabClickHandler(4)}
        >
          FA{" "}
        </li>
      ),
      tabCont: (
        <div className="content">
          <div className="content-1">{/* <MintFA /> */}</div>

          <div className="gif-sec">
            <StyledImg className="gif-soon" src={FA} alt="gif" />
            <h1 className="gif-soon-text">MINT SOON</h1>
          </div>
        </div>
      ),
    },
    {
      tabTitle: (
        <li
          className={activeIndex === 5 ? "is-active" : "is-disable"}
          onClick={() => tabClickHandler(5)}
        >
          SOL{" "}
        </li>
      ),
      tabCont: (
        <div className="content">
          <div className="content-1">{/* <MintSOL /> */}</div>

          <div className="gif-sec">
            <StyledImg className="gif-soon" src={SOL} alt="gif" />
            <h1 className="gif-soon-text">MINT SOON</h1>
          </div>
        </div>
      ),
    },
    {
      tabTitle: (
        <li
          className={activeIndex === 6 ? "is-active" : "is-disable"}
          onClick={() => tabClickHandler(6)}
        >
          RA{" "}
        </li>
      ),
      tabCont: (
        <div className="content">
          <div className="content-1">{/* <MintRA /> */}</div>
          <div className="gif-sec">
            <StyledImg className="gif-soon" src={RA} alt="gif" />
            <h1 className="gif-soon-text">MINT SOON</h1>
          </div>
        </div>
      ),
    },
    {
      tabTitle: (
        <li
          className={activeIndex === 7 ? "is-active" : "is-disable"}
          onClick={() => tabClickHandler(7)}
        >
          SI{" "}
        </li>
      ),
      tabCont: (
        <div className="content">
          <div className="content-1">{/* <MintSI /> */}</div>

          <div className="gif-sec">
            <StyledImg className="gif-soon" src={SI} alt="gif" />
            <h1 className="gif-soon-text">MINT SOON</h1>
          </div>
        </div>
      ),
    },
  ];

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
    maxMintCountForMaestro: 1,
    DISPLAY_COST_Maestro: 0,
    WL_Display: 0,
    GAS_LIMIT: 0,
    MAX_PER_TX: 0,
    MARKETPLACE: "",
    MARKETPLACE_LINK: "",
    Telegram: "",
    Discord: "",
    Twitter: "",
    SHOW_BACKGROUND: false,
  });
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
    <div className="all">
      <s.Container
        flex={1}
        // ai={"center"}
        style={{ backgroundColor: "black" }}
        image={CONFIG.SHOW_BACKGROUND ? "/config/images/bg.png" : null}
      >
        <ResponsiveWrapperHeader>
          <LogoDiv>
            <a href="#" target={"_blank"}>
              <StyledLogo alt={"logo"} src={"/config/images/logo.png"} />
            </a>
          </LogoDiv>

          <s.HeaderDiv>
            {blockchain.account === "" || blockchain.smartContract === null ? (
              <>
                <s.Container ai={"center"} jc={"center"}>
                  <s.SpacerSmall />
                  <CTNButton
                    className="Mint"
                    onClick={(e) => {
                      e.preventDefault();
                      dispatch(connect());
                      getData();
                    }}
                  >
                    Connect Wallet
                  </CTNButton>
                </s.Container>
              </>
            ) : (
              <>
                <s.Container ai={"center"} jc={"center"}>
                  <s.SpacerSmall />
                  <CTNButton
                    onClick={(e) => {
                      e.preventDefault();
                      dispatch(connect());
                      getData();
                    }}
                  >
                    {walletAddress}
                  </CTNButton>
                </s.Container>
              </>
            )}
            {/* <WalletBox>
              {blockchain.account !== "" ? (
                <>
                  <s.TextSubTitle style={{ fontSize: "1rem", color: "white" }}>
                    <Badge color={DOT} /> {walletAddress}
                  </s.TextSubTitle>
                </>
              ) : null}
            </WalletBox> */}
          </s.HeaderDiv>
        </ResponsiveWrapperHeader>
        <s.SpacerLarge />
      </s.Container>
      <h1 className="Title">XENEXIS NFTs MINT</h1>
      <ul className="tabs" style={{ paddingLeft: "0px" }}>
        {tabContArr.map((section, index) => {
          return section.tabTitle;
        })}
      </ul>
      {blockchain.account === "" || blockchain.smartContract === null ? (
        <>
          <s.SpacerLarge />
          <s.SpacerLarge />
          <s.SpacerLarge />
          <s.SpacerLarge />
          <s.SpacerLarge />
          <s.SpacerLarge />
          <s.TextSub
            style={{
              textAlign: "center",
              color: "#FF6060",
              fontSize: "20px",
              fontFamily: "MonumentExtended",
            }}
          >
            Your wallet has not been connected.<br />Please connect your wallet.
          </s.TextSub>
          <s.Container ai={"center"} jc={"center"}>
            <s.SpacerSmall />
            <CTNButton
              className="Mint"
              onClick={(e) => {
                e.preventDefault();
                dispatch(connect());
                getData();
              }}
            >
              Connect Wallet
            </CTNButton>
          </s.Container>
        </>
      ) : (
      <>
      <div>{tabContArr[activeIndex].tabCont}</div>
      </> 
      )}
    </div>
  );
}

{/* {blockchain.getWhitelistedForMaestro === 0 ? (
        <div>{tabContArr[activeIndex].tabCont}</div>
      ) : 
      <>
      <s.SpacerLarge />
      <s.SpacerLarge />
      <s.SpacerLarge />
      <s.SpacerLarge />
      <s.SpacerLarge />
      <s.SpacerLarge />
      <s.TextSub
      style={{
        textAlign: "center",
        color: "#FF6060",
        fontSize: "20px",
        fontFamily: "MonumentExtended",
      }}
    >
      You are not Whitelisted
    </s.TextSub>  */}
    // </>}