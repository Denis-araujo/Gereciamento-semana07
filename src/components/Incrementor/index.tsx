import { Plus as PlusIcon } from "@styled-icons/boxicons-regular/Plus";
import { Subtract as SubtractIcon } from "@styled-icons/remix-fill/Subtract";

import { Wrapper, IconWrapper, Quantity } from "./styles";

type IncrementorProps = {
  id: number;
  quantity: number;
  increaseValue: () => void;
  decrementValue: () => void;
};

const Incrementor = ({ id, quantity, increaseValue, decrementValue }: IncrementorProps) => (
  <Wrapper>
    <IconWrapper onClick={decrementValue}>
      <SubtractIcon aria-label="Subtract item" />
    </IconWrapper>

    <Quantity>{quantity}</Quantity>

    <IconWrapper onClick={increaseValue}>
      <PlusIcon aria-label="Add item" />
    </IconWrapper>
  </Wrapper>
);

export default Incrementor;
