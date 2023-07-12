import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { getTransaction } from "../../hooks/apiTransactions";
import TransactionCard from "./TransactionCard";

export default function SortTransactions({ walletAddress }) {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const transactionData = await getTransaction(walletAddress);

        if (!transactionData || !transactionData.data.items) {
          console.log("No data available");
          setTransactions([]);
          setIsLoading(false);
          return;
        }

        const { items } = transactionData.data;
        console.log(items);

        const sortedTransactions = items.slice(0, 10).map((item) => {
          const { tx_hash, block_signed_at, log_events } = item;
          const transaction = { tx_hash, log_events: [] };

          if (log_events && Array.isArray(log_events)) {
            transaction.log_events = log_events
              .map((event) => {
                const {
                  sender_address: tokenAddress,
                  sender_name: tokenName,
                  sender_contract_ticker_symbol: tokenSymbol,
                  decoded,
                } = event;

                if (decoded) {
                  const params = decoded.params;
                  const decodedParams = {};
                  let paramName = "";
                  let paramValue = "";
                  let paramType = "";

                  params.forEach((param) => {
                    const { name, value, type } = param;
                    decodedParams[name] = value;
                    paramName = name;
                    paramValue = value;
                    paramType = type;
                  });

                  const { to, from } = decodedParams;

                  if (paramType === "bool") {
                    return {
                      tokenAddress,
                      tokenName,
                      timeStamp: block_signed_at,
                      trans: decodedParams,
                      paramName,
                      paramValue,
                    };
                  }

                  if (
                    (to && to.toLowerCase() === walletAddress.toLowerCase()) ||
                    (from && from.toLowerCase() === walletAddress.toLowerCase())
                  ) {
                    return {
                      tokenAddress,
                      tokenName,
                      tokenSymbol,
                      timeStamp: block_signed_at,
                      trans: decodedParams,
                      paramName,
                      paramValue,
                    };
                  }
                }

                return null; // Exclude transactions that don't match the condition
              })
              .filter(Boolean); // Remove null values from the array
          }

          console.log(transaction);
          return transaction;
        });

        setTransactions(sortedTransactions);
        setIsLoading(false);
      } catch (error) {
        console.log("Error fetching data:", error);
        setTransactions([]);
        setIsLoading(false);
      }
    };

    if (walletAddress) {
      fetchData();
    }
  }, [walletAddress]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!transactions || transactions.length === 0) {
    return <div>No transactions available</div>;
  }

  return (
    <div>
      {transactions.map((transaction) => (
        <TransactionCard key={transaction.tx_hash} transaction={transaction} />
      ))}
    </div>
  );
}

SortTransactions.propTypes = {
  walletAddress: PropTypes.string.isRequired,
};
