import PropTypes from "prop-types";
import styled from "styled-components";

const CardContainer = styled.div`
  font-family: "Source Code Pro", monospace;
  background-color: lightblue;
  font-size: 20px;
  border-radius: 10px;
  padding: 20px;
  margin: 50px 50px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: left;
  object-fit: contain;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const TransactionHash = styled.div`
  display: flex;
  flex-wrap: wrap;
  font-weight: bold;
  margin-bottom: 8px;
`;

const StyledDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CentreDiv = styled.div`
  padding: 50px;
  display: flex;
  justify-content: center;
`;

const LogEventsContainer = styled.div``;

const LogEventItem = styled.div`
  margin-top: 8px;
`;

const TransactionBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 20px;
`;

const formatAmount = (amount) => {
  if (typeof amount !== "string") {
    return ""; // Return an empty string or handle the error case as needed
  }
  let formattedAmount;

  if (amount.length >= 6 && amount.length <= 10) {
    formattedAmount = (amount / 10 ** 6).toFixed(2);
  } else {
    // Perform a different equation or formatting logic here
    // based on the length of the amount
    formattedAmount = (amount / 10 ** 8).toFixed(2);
  }

  return formattedAmount;
};

const TransactionCard = ({ transaction }) => {
  const { tx_hash, log_events } = transaction;

  function formatToLocalTime(block_signed_at) {
    if (block_signed_at) {
      const date = new Date(block_signed_at);
      const formattedDate = date.toLocaleString();
      return formattedDate;
    }
    return "";
  }

  return (
    <>
      <CardContainer>
        <TransactionHash>
          Transaction Hash:{" "}
          <a href={`https://etherscan.io/tx/${tx_hash}`}>{tx_hash}</a>
          <div>{formatToLocalTime(transaction.block_signed_at)}</div>
        </TransactionHash>

        <LogEventsContainer>
          {log_events?.map((logEvent, index) => (
            <LogEventItem key={index}>
              <StyledDiv>
                <div>
                  Token Name:{" "}
                  <a
                    href={`https://etherscan.io/token/${logEvent.tokenAddress}`}
                  >
                    {logEvent.tokenName}
                  </a>{" "}
                  ({logEvent.tokenSymbol})
                </div>
                <div>Time Stamp: {formatToLocalTime(logEvent.timeStamp)}</div>
              </StyledDiv>

              {logEvent.paramName === "value" ? (
                <>
                  <CentreDiv>
                    <strong>Value: </strong> {formatAmount(logEvent.paramValue)}{" "}
                    {logEvent.tokenSymbol}
                  </CentreDiv>
                  <TransactionBox>
                    <div>
                      <strong>From:</strong>{" "}
                      <a
                        href={`https://etherscan.io/address/${logEvent.trans.from}`}
                      >
                        {" "}
                        {logEvent.trans.from}{" "}
                      </a>
                    </div>
                    <div>
                      <strong>To:</strong>{" "}
                      <a
                        href={`https://etherscan.io/address/${logEvent.trans.to}`}
                      >
                        {" "}
                        {logEvent.trans.to}
                      </a>
                    </div>
                  </TransactionBox>
                </>
              ) : logEvent.paramName === "tokenId" ? (
                <>
                  <CentreDiv>
                    <strong>Token ID: </strong>{" "}
                    <a
                      href={`https://etherscan.io/token/${logEvent.tokenAddress}?a=${logEvent.paramValue}`}
                    >
                      {logEvent.paramValue}
                    </a>
                  </CentreDiv>
                  <TransactionBox>
                    <div>
                      <strong>From:</strong>
                      <a
                        href={`https://etherscan.io/address/${logEvent.trans.from}`}
                      >
                        {" "}
                        {logEvent.trans.from}{" "}
                      </a>
                    </div>
                    <div>
                      <strong>To:</strong>{" "}
                      <a
                        href={`https://etherscan.io/address/${logEvent.trans.to}`}
                      >
                        {" "}
                        {logEvent.trans.to}{" "}
                      </a>
                    </div>
                  </TransactionBox>
                </>
              ) : (
                <CentreDiv>
                  <strong>Approval from Contract: </strong>{" "}
                  <a
                    href={`https://etherscan.io/address/${logEvent.tokenAddress}`}
                  >
                    {logEvent.tokenAddress}
                  </a>
                </CentreDiv>
              )}
            </LogEventItem>
          ))}
          {!log_events && <div>No log events available</div>}
        </LogEventsContainer>
      </CardContainer>
    </>
  );
};

TransactionCard.propTypes = {
  transaction: PropTypes.shape({
    tx_hash: PropTypes.string.isRequired,
    log_events: PropTypes.arrayOf(
      PropTypes.shape({
        timeStamp: PropTypes.string.isRequired,
        tokenAddress: PropTypes.string.isRequired,
        tokenName: PropTypes.string.isRequired,
        tokenSymbol: PropTypes.string,
        trans: PropTypes.object.isRequired,
      })
    ).isRequired,
    block_signed_at: PropTypes.string, // Add prop type for block_signed_at
  }).isRequired,
};

export default TransactionCard;
