import SafeServiceClient from '@safe-global/safe-service-client';
import React, { useEffect, useState } from 'react'
import { TransactioUtils as TransactionUtils } from '../../utils/TransactionUtils';

function ReviewTransactions() {

  // initialize list of pending transactions
    const [pendingTransactions, setPendingTransactions] = useState<any[]>([]);
    
    // get safe address from local storage
    const safeAddress = localStorage.getItem('safeAddress') || '';

    useEffect(() => {

        async function getPendingTransactions() {
            const txServiceUrl = 'https://safe-transaction-goerli.safe.global'
            const ethAdapter = await TransactionUtils.getEthAdapter(false)
            const safeService = new SafeServiceClient({ txServiceUrl, ethAdapter })
            const pendingTransactionsResults = (await safeService.getPendingTransactions(safeAddress)).results
            setPendingTransactions(pendingTransactionsResults);
          }
      
          getPendingTransactions()
    }, [])

    const confirmTransacton = async (event: React.MouseEvent<HTMLButtonElement>, transactionHash: string) => {
        event.preventDefault();
        const response = await TransactionUtils.confirmTransaction(safeAddress, transactionHash)
        console.log(response);
    }

    const executeTransaction = async (event: React.MouseEvent<HTMLButtonElement>, transactionHash: string) => {
        event.preventDefault();
        const response = await TransactionUtils.executeTransaction(safeAddress, transactionHash)
        console.log(response);
    }
    
  return (
    <div>
        Pending Transactions

        <table className="table table-striped overflow-auto">
            <thead>
            <tr>
                <th>Hash</th>
                <th>Destination</th>
                <th>Amount</th>
                <th>Timestamp</th>
                <th>Action</th>
            </tr>
            </thead>
            <tbody>
            {pendingTransactions.map((transaction) => (
                <tr key={transaction.hash}>
                    <td>
                        <a href={`https://safe-transaction-goerli.safe.global/api/v1/multisig-transactions/${transaction.hash}`} 
                            target="_blank" rel="noreferrer">
                            {transaction.hash}
                        </a>
                    </td>
                    <td>{transaction.to}</td>
                    <td>{transaction.value}</td>
                    <td>{transaction.timestamp}</td>
                    <td>
                        <button className="btn btn-primary btn-success my-2" 
                        onClick={(event)=>confirmTransacton(event, transaction.hash)}>Confirm</button>

                        {
                            transaction.confirmationsRequired === transaction.confirmations.length &&
                            <button className="btn btn-primary btn-success my-2" 
                                onClick={(event)=>executeTransaction(event, transaction.hash)}>
                                    Execute
                            </button>
                        }
                    </td>
                </tr>
            ))}
            </tbody>
        </table>

    </div>
  )
}

export default ReviewTransactions