import styled from "styled-components";

const StyledH1 = styled.h1`
  font-family: "Source Code Pro", monospace;
  justify-content: center;
  align-content: center;
  text-align: center;
  font-size: 50px;
  letter-spacing: 1.5rem;
`;
const StyledH2 = styled.h2`
  font-family: "Source Code Pro", monospace;
  justify-content: center;
  align-content: center;
  text-align: center;
  font-size: 25px;
  font-weight: lighter;
  letter-spacing: 0.5rem;
  margin: 0px 200px;
`;

function Header() {
  return (
    <>
      <StyledH1>Wallet Friend</StyledH1>
      <StyledH2>
        Search the 10 last transactions from your favourite blockchain users{" "}
      </StyledH2>
      ;
    </>
  );
}

export default Header;
