import React, {ReactNode} from 'react';
import styled from '@emotion/styled';

interface Props {
    children: ReactNode
}

function Templates({children}: Props) {
    return (
        <Container>
            <Wrapper>
                {children}
            </Wrapper>
        </Container>
    );
}

const Container = styled.div`
  background-color: #1d1d1d;
`;

const Wrapper = styled.div`
  position: relative;

  display: flex;
  justify-content: center;

  height: 100%;
  width: 100%;


  margin: 0 50px;
`;

export default Templates;