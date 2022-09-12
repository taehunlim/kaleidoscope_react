import React, {ReactNode, useRef} from 'react';
import styled from '@emotion/styled';
import Button from "../Button";

interface Props {
    children: ReactNode;
}

function Templates({children}: Props) {

    const ref = useRef(null);
    const anchorRef = useRef(null);

    function handleUpload() {
        if(ref.current) {
            const input = ref.current as HTMLInputElement;
            input.click();
        }
    }

    function handleImage(files: FileList) {
        const filename = files[0].name;
        const blob = new Blob([files[0]]);
        const url = URL.createObjectURL(blob);

        if(anchorRef.current) {
            const anchor = anchorRef.current as HTMLAnchorElement;

            anchor.href = url;
            anchor.download = filename;
            anchor.click();
        }
    }


    return (
        <Container>
            <StyledButton onClick={handleUpload}>⇪</StyledButton>
            <Input ref={ref} type="file" onChange={({target}) => handleImage(target.files!)}/>
            <a ref={anchorRef} download />
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

const StyledButton = styled(Button)`
  position: absolute;
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;

  height: 100%;
  width: 100%;
`;

const Input = styled.input`
  display: none;
`;


export default Templates;