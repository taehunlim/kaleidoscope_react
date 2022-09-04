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
  height: 100%;
  width: 100%;
  padding: 30px;
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;

  height: 100%;
  width: 100%;
`;

export default Templates;