import React, {ReactNode} from 'react';
import styled from '@emotion/styled';

interface Props {
    children: ReactNode
}

function Templates({children}: Props) {
    return (
        <Wrapper>
            {children}
        </Wrapper>
    );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export default Templates;