
import { ButtonLoad } from "./Button.styled.js";

const Button = ({ onClick }) => {
  return (
    <div>
      <ButtonLoad type="button" onClick={onClick}>
        Load more
      </ButtonLoad>
    </div>
  );
};

export default Button;