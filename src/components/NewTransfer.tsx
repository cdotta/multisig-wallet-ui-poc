import {
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';

export interface TransferFormValues {
  amount: number;
  to: string;
}

interface NewTransferProps {
  onSubmit: (values: TransferFormValues) => void;
}

export const NewTransfer = ({ onSubmit }: NewTransferProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      amount: '',
      to: '',
    },
  });

  return (
    <div>
      <Heading as="h2" size="md">
        Create Transfer
      </Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl id="amount" isRequired isInvalid={!!errors.amount}>
          <FormLabel>Amount</FormLabel>
          <Input
            type="number"
            {...register('amount', { required: true, valueAsNumber: true })}
          />
        </FormControl>
        <FormControl id="to" isRequired isInvalid={!!errors.to}>
          <FormLabel>To</FormLabel>
          <Input type="text" {...register('to', { required: true })} />
        </FormControl>
        <Button mt={2} type="submit" colorScheme="blue">
          Create
        </Button>
      </form>
    </div>
  );
};
