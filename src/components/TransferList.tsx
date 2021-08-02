import {
  Table,
  TableCaption,
  Thead,
  Th,
  Td,
  Tr,
  Tbody,
  Button,
} from '@chakra-ui/react';

interface TransferListProps {
  transfers: any[];
  onApproveTransfer: (transferId: string) => void;
}

export const TransferList = ({
  transfers,
  onApproveTransfer,
}: TransferListProps) => {
  return (
    <Table variant="simple" mt={2}>
      <TableCaption>Transfer list</TableCaption>
      <Thead>
        <Tr>
          <Th>id</Th>
          <Th>amount</Th>
          <Th>to</Th>
          <Th>approvals</Th>
          <Th>sent</Th>
        </Tr>
      </Thead>
      <Tbody>
        {transfers.map((transfer) => (
          <Tr key={transfer.id}>
            <Td>{transfer.id}</Td>
            <Td>
              <span>{transfer.amount}</span>
              {!transfer.approved && (
                <Button
                  onClick={() => onApproveTransfer(transfer.id)}
                  size="xs"
                  colorScheme="blue"
                >
                  Approve
                </Button>
              )}
            </Td>
            <Td>{transfer.to}</Td>
            <Td>{transfer.approvals}</Td>
            <Td>{transfer.sent ? 'yes' : 'no'}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};
