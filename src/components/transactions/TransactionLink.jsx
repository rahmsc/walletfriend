// import styled from "styled-components";
// import { tx_hash } from "../transactions/SortTransactions";

// const TransactionHash = styled.a`
//   color: black;
//   text-decoration: none;
//   cursor: pointer;
// `;

// const formatTransactionHash = (tx_hash) => {
//   const truncatedHash =
//     tx_hash.substring(0, 4) + "..." + tx_hash.substring(tx_hash.length - 4);
//   return truncatedHash;
// };

// const TransactionLink = ({ tx_hash }) => {
//   const url = `https://etherscan.io/tx/${tx_hash}`;
//   const truncatedHash = formatTransactionHash(tx_hash);

//   const handleClick = () => {
//     window.open(url, "_blank");
//   };

//   return (
//     <TransactionHash onClick={handleClick}>{truncatedHash}</TransactionHash>
//   );
// };

// export default TransactionLink;
