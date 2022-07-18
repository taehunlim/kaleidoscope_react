import React, {useRef, useEffect} from 'react';
import styled from "@emotion/styled";

function Kaleidoscope({img}) {
    const ref = useRef(null);
    const imgRef = useRef(null);

    function rgbToHex(r, g, b) {
        if (r > 255 || g > 255 || b > 255)
            throw "Invalid color component";
        return ((r << 16) | (g << 8) | b).toString(16);
    };

    function getColorFromImg(img, hexes) {
        img.onload = () => {
            const canvas = document.createElement("canvas"),
                ctx = canvas.getContext("2d");
            canvas.width = img.width;
            canvas.height = img.height;

            ctx.drawImage(img, 0, 0);
            const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const data = imgData.data;

            const center_start = (Math.floor(canvas.height / 2) * canvas.width - 1);
            const center_end = center_start + canvas.width;
            const centerPixel = data.slice(center_start * 4, center_end * 4),
                centerPixelLength = centerPixel.length;

            // center hex
            let hexArr = [];
            for (let i = 0; i < centerPixelLength; i += 4) {
                const r = centerPixel[i],
                    g = centerPixel[i + 1],
                    b = centerPixel[i + 2],
                    a = centerPixel[i + 3] / 255;

                const hex = "#" + ("000000" + rgbToHex(r, g, b)).slice(-6);
                hexArr.push(hex);
            };

            return hexes(hexArr);
        }
    };

    function drawKaleidoscope(image, canvas, hexes) {
        const canvasSize = (image.width + image.width * 0.5) * 2;

        canvas.width = canvasSize;
        canvas.height = canvasSize;
        canvas.style.filter = "blur(1px)";
        image.style.marginLeft = `${image.width / 12.8}px`;

        // const dpr = window.devicePixelRatio;

        const canvasDiameter = canvas.width,
            canvasRadius = canvasDiameter / 2;

        const kaleidoscopeHeight = image.width,
            kaleidoscopeWidth = kaleidoscopeHeight / 16 * 9;

        const sides = 32;
        const radius = canvasSize / 2.11;

        const PI2 = Math.PI * 2;
        const angle = PI2 / sides;

        const ctx = canvas.getContext("2d");
        ctx.translate(canvasRadius, canvasRadius);

        for (let i = 0; i < sides; i++) {
            const x = (radius) * Math.cos(angle * i);
            const y = (radius) * Math.sin(angle * i);

            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(((360 / sides) * i + 90) * Math.PI / 180);
            ctx.beginPath();

            hexes.forEach((color, index) => {
                ctx.lineWidth = 0.5;
                if (index + 1 >= 196) {
                    ctx.lineWidth = 0.25;
                }

                ctx.strokeStyle = color;
                ctx.strokeRect((-kaleidoscopeWidth / 2), index, kaleidoscopeWidth, kaleidoscopeHeight - index);
            });

            ctx.fill();
            ctx.closePath();
            ctx.restore();
        }

        ctx.restore();
    };

    useEffect(() => {
        const canvas = ref.current;
        const image = imgRef.current;

        if (canvas && image) {
            getColorFromImg(image, hexes => {
                drawKaleidoscope(image, canvas, hexes);
            });
        }
    });

    return (
        <Wrapper>
            <StyledImg
                ref={imgRef}
                src={img}
                width={300}
            />
            <canvas ref={ref}/>
        </Wrapper>
    );
}

const Wrapper = styled.div`
  position: relative;
`;

const StyledImg = styled.img`
  z-index: 1;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto 18px;
`;

export default Kaleidoscope;