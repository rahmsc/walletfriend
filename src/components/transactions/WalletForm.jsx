import { useState } from "react";
import SortTransactions from "./SortTransactions";
import styled from "styled-components";
import { getTransaction } from "../../hooks/apiTransactions";

const StyledDiv = styled.div`
  font-family: "Source Code Pro", monospace;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 10px;
  padding: 30px;
`;

const CentreDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 10px;
`;
const StyledLabel = styled.label`
  font-size: 25px;
  padding: 40px;
  line-height: 1.4rem;
  margin-bottom: 40px;
`;
const StyledInput = styled.input`
  font-family: "Source Code Pro", monospace;
  height: 50px;
  width: 550px;
  margin-top: 30px;
  margin-bottom: 30px;
  font-size: 20px;
  border-radius: 50px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;
const StyledButton = styled.button`
  font-family: "Source Code Pro", monospace;
  font-size: 20px;
  margin: 1em;
  padding: 0.25em 1em;
  border-radius: 50px;

  background-color: lightblue;
  border: 2px solid darkblue;
`;

export default function WalletForm() {
  const [walletAddress, setWalletAddress] = useState("");
  const [transactionData, setTransactionData] = useState(null);

  const handleInputChange = (event) => {
    setWalletAddress(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = await getTransaction(walletAddress);
      setTransactionData(data);
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSubmit(event);
    }
  };

  return (
    <StyledDiv>
      <CentreDiv>
        <form>
          <StyledLabel>Enter Wallet Address</StyledLabel>
          <div>
            <StyledInput
              type="text"
              value={walletAddress}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
            />
          </div>

          <StyledButton type="button" onClick={handleSubmit}>
            Submit
          </StyledButton>
        </form>
      </CentreDiv>

      {transactionData && (
        <SortTransactions
          walletAddress={walletAddress}
          data={transactionData}
        />
      )}
    </StyledDiv>
  );
}
