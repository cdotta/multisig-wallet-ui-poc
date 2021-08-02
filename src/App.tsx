import { useState, useEffect } from 'react';
import { Box } from '@chakra-ui/react';

import { getWeb3, getWallet } from './utils';
import Web3 from 'web3';
import { NewTransfer, TransferFormValues } from './components/NewTransfer';
import { TransferList } from './components/TransferList';
import { useCallback } from 'react';

function App() {
  const [web3, setWeb3] = useState<Web3>();
  const [accounts, setAccounts] = useState<string[]>([]);
  const [wallet, setWallet] = useState<any>();
  const [approvers, setApprovers] = useState<string[]>([]);
  const [quorum, setQuorum] = useState<number>();
  const [transfers, setTransfers] = useState<any[]>([]);

  const loadTransfers = useCallback(async (_wallet, account) => {
    const _transfers = (await _wallet.methods.getTransfers().call()) || [];
    const enrichedTransfers = await Promise.all(
      _transfers.map(async (transfer: any) => {
        const approved = await _wallet.methods
          .approvals(account, transfer.id)
          .call();
        return { ...transfer, approved };
      }),
    );
    setTransfers(enrichedTransfers);
  }, []);

  useEffect(() => {
    const init = async () => {
      const _web3 = await getWeb3();
      const _accounts = await _web3.eth.getAccounts();
      const _wallet = await getWallet(_web3);
      const _approvers = await _wallet.methods.getApprovers().call();
      const _quorum = await _wallet.methods.quorum().call();
      await loadTransfers(_wallet, _accounts[0]);
      setWeb3(_web3);
      setAccounts(_accounts);
      setWallet(_wallet);
      setApprovers(_approvers);
      setQuorum(_quorum);
    };
    init();
  }, [loadTransfers]);

  const handleSubmit = async (values: TransferFormValues) => {
    await wallet.methods
      .createTransfer(values.amount, values.to)
      .send({ from: accounts[0] });
    const _transfers = await wallet.methods.getTransfers().call();
    setTransfers(_transfers);
  };

  const approveTransfer = async (transferId: string) => {
    await wallet.methods
      .approveTransfer(transferId)
      .send({ from: accounts[0] });
    await loadTransfers(wallet, accounts[0]);
  };

  if (!web3 || !accounts || !wallet) {
    return <div>Loading!!</div>;
  }

  return (
    <Box p={3}>
      <p>Approvers: {approvers.join(', ')}</p>
      <p>Quorum: {quorum}</p>
      <NewTransfer onSubmit={handleSubmit}></NewTransfer>
      <TransferList
        transfers={transfers}
        onApproveTransfer={approveTransfer}
      ></TransferList>
    </Box>
  );
}

export default App;
