import { useState } from "react";

import styled from "@emotion/styled";
import { Link, useParams } from "react-router-dom";

import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client";
import "./../styles/BuyDetail.css";

import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

const BuyDetail = () => {
  const GET_BUY_OFFERS_QUERY = gql`
    query GetBuyOffers($buyOfferId: Int!) {
      buy_offers(where: { buyOfferId: { _eq: $buyOfferId } }) {
        user_id
        price
        buyOfferId
        industry
        offer_type
        headline
        offer_details
        languages
        rate_type
        qualifications
      }
      users(where: { buy_offers: { buyOfferId: { _eq: $buyOfferId } } }) {
        email
        first_name
        picture
        email
        last_name
        linked_in
      }
    }
  `;

  const [visible, setVisible] = useState("false");

  const { buyOfferId } = useParams();

  var num = Number(buyOfferId);

  const { loading, error, data } = useQuery(GET_BUY_OFFERS_QUERY, {
    fetchPolicy: "cache-and-network",

    variables: { buyOfferId: num },
    onCompleted: () => {
      setVisible("true");
    },
  });

  /* const userId = user.sub;

 
  const {loading:user_loading, error:user_error, data:user_data } =  useQuery(GET_USERS, {
    variables: {userId},
    
  });  */

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  /* if(user_loading) return 'Loading...';
if(user_error) return `Error! ${user_error.message}`;  

 */

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Pre-communication with the seller is very important prior to reserving a
      request with him or her!
    </Tooltip>
  );

  let linky = "https://" + data.users[0].linked_in;
  console.log("here is link", linky);

  let linky2 = "https://www.nekohit.com";

  return visible === "true" && data ? (
    <div className="grid">
      <div id="banner_sellDetail">
        <h1 className="h1">Begin your transaction now</h1>
      </div>
      <div id="section1_buyDetail">
        <TrackDetails id="trackDetails_buyDetail">
          <h2>Order Summary </h2>
          You selected to sell:{" "}
          <DetailRow id="DetailRow">
            <b class="bold"> {data.buy_offers[0].headline} </b>
          </DetailRow>
          <DetailRow id="DetailRow">
            Buyer:{" "}
            <b class="bold">
              {" "}
              {data.users[0].first_name} {data.users[0].last_name}{" "}
            </b>
          </DetailRow>
          <DetailRow id="DetailRow">
            Offer Type (data/ consulting):{" "}
            <b class="bold"> {data.buy_offers[0].offer_type} </b>
          </DetailRow>
          <DetailRow id="DetailRow">
            Industry:<b class="bold"> {data.buy_offers[0].industry} </b>
          </DetailRow>
          <DetailRow id="DetailRow">
            Price: $<b class="bold"> {data.buy_offers[0].price} </b>
          </DetailRow>
          <DetailRow id="DetailRow">
            {" "}
            Rate type (hourly/ flat rate):{" "}
            <b class="bold"> {data.buy_offers[0].rate_type} </b>
          </DetailRow>
        </TrackDetails>
      </div>

      <div id="picture_area_buyDetail">
        <CoverImage
          id="coverImage_buyDetail"
          src={data.users[0].picture}
          alt=""
        />
        <DetailItem id="messageButton_buy">
          <StyledLink to={`/InputForm`}>
            <OverlayTrigger
              placement="right"
              delay={{ show: 250, hide: 400 }}
              overlay={renderTooltip}
            >
              <button id="convoButton" color="pink" size="large">
                Begin a conversation with {data.users[0].first_name}
              </button>
            </OverlayTrigger>
            ,
          </StyledLink>
        </DetailItem>
      </div>

      <div id="section3_buyDetail">
        <DetailRow id="DetailRow">
          <h2>
            Please set up your transaction using the Nekohit escrow system.
          </h2>
        </DetailRow>
        <DetailRow id="DetailRow">
          <p>
            {" "}
            As DDR is not responsible to enforce the quality or terms of the
            transaction, it is important that you confirm the terms with the
            seller before you into the transaction. For more information on how
            escrow works, please see our FAQ{" "}
            <StyledLink id="linky" to={`/About`}>
              {" "}
              here.{" "}
            </StyledLink>
          </p>
        </DetailRow>
      </div>

      <div id="section4_buyDetail">
        <DetailRow id="DetailRow">
          <a href={linky2} target="_blank" rel="noopener noreferrer">
            <button color="pink" size="large">
              Set up an escrow payment receipt with Nekohit now
            </button>
          </a>
        </DetailRow>

        <DetailRow>
          <Link
            to={{
              pathname: `/`,
            }}
          >
            <Button id="backButton"> Go back</Button>
          </Link>
        </DetailRow>
      </div>
    </div>
  ) : (
    ""
  );
};

export default BuyDetail;

/** Track detail styled components */
const CoverImage = styled.img({
  objectFit: "cover",
  maxHeight: 400,
  borderRadius: 4,
  marginBottom: 30,
});

const StyledLink = styled(Link)({
  textDecoration: "none",
  color: "white",
});

const TrackDetails = styled.div({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",

  padding: 20,
  borderRadius: 4,
  marginBottom: 30,
  border: "solid 1px silver",
  backgroundColor: "silver",
  h1: {
    width: "100%",
    textAlign: "center",
    marginBottom: 5,
  },
  h4: {
    fontSize: "1.2em",
    marginBottom: 5,
    color: "black",
  },
});

const DetailRow = styled.div({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
  paddingBottom: 20,
  marginBottom: 20,
  borderBottom: "solid 1px lightgrey",
});

const DetailItem = styled.div({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-between",
  color: "grey",
  alignSelf: "center",
});
