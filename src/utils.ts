import Web3 from 'web3';
import detectEthereumProvider from '@metamask/detect-provider';

import Wallet from './contracts/Wallet.json';

export const getWeb3: () => Promise<Web3> = () =>
  new Promise(async (resolve, reject) => {
    const provider: any = await detectEthereumProvider();

    if (provider) {
      await provider.request({ method: 'eth_requestAccounts' });

      try {
        const web3 = new Web3((window as any).ethereum);

        resolve(web3);
      } catch (error) {
        reject(error);
      }
    } else {
      reject('Install Metamask');
    }
  });

// export const getWeb3 = () => {
//   return new Promise<Web3>((resolve, reject) => {
//     window.addEventListener('load', async () => {
//       const { ethereum, web3 } = window as any;
//       if (ethereum) {
//         const _web3 = new Web3(ethereum);
//         try {
//           await ethereum.enable();
//           resolve(_web3);
//         } catch (error) {
//           reject(error);
//         }
//       } else if (web3) {
//         resolve(web3);
//       } else {
//         reject('Must install Metamask');
//       }
//     });
//   });
//   // return new Web3('http://localhost:9545');
// };

export const getWallet = async (web3: Web3) => {
  const networkId = await web3.eth.net.getId();
  const contractDeployment = (Wallet.networks as any)[networkId];
  return new web3.eth.Contract(Wallet.abi as any, contractDeployment?.address);
};
