import styled from "styled-components";
import Header from "../components/Header";
import WalletForm from "../components/transactions/WalletForm";

const GradientBackground = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: linear-gradient(135deg, #c2b280, #f2f2f2);
`;

function Home() {
  return (
    <>
      <GradientBackground>
        <Header />
        <WalletForm />
      </GradientBackground>
    </>
  );
}

export default Home;
