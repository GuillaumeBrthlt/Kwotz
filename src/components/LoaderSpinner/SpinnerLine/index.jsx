import { css } from "@emotion/react";




function SpinnerLine() {
  
  const override = css`
  display: block;
  margin: auto;
`;
  return (
    <div>
      <PropagateLoader color={'#fff'} css={override} />
    </div>
  );
}

export default SpinnerLine;