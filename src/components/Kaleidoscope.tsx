import React, { useRef, useEffect, MouseEventHandler } from "react";
import styled from "@emotion/styled";

interface KaleidoscopeProps {
  img: string;
  size?: number;
  blur?: number;
  onClick?: MouseEventHandler<HTMLImageElement>;
}

type HexCallback = (hexes: HexType[]) => void;

type HexType = string;

function Kaleidoscope({ img, size, blur = 1, onClick }: KaleidoscopeProps) {
  const vh = window.innerHeight;
  const vw = window.innerWidth;

  const min = Math.min(...[vh, vw]);

  const imageSize = (min - 30 * 4 - 50) / 3;
  const defaultImageWidth = imageSize > 300 ? 300 : imageSize;
  const imageWidth = size || defaultImageWidth;
  const imageHeight = (imageWidth / 16) * 9;

  const ref = useRef(null);
  const imgRef = useRef(null);

  function rgbToHex(r: number, g: number, b: number) {
    if (r > 255 || g > 255 || b > 255) throw "Invalid color component";
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }

  function getColorFromImg(img: HTMLImageElement, hexes: HexCallback) {
    img.onload = () => {
      const canvas = document.createElement("canvas"),
        ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
      canvas.width = img.width;
      canvas.height = img.height;

      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imgData.data;

      const center_start = (Math.floor(canvas.height / 2) - 1) * canvas.width;
      const center_end = center_start + canvas.width - 1;

      const begin = center_start * 4;
      const end = center_end * 4 + 3;
      const centerPixel = data.slice(begin, end),
        centerPixelLength = centerPixel.length;

      // center hex
      let hexArr: HexType[] = [];
      for (let i = 0; i < centerPixelLength; i += 4) {
        const r = centerPixel[i],
          g = centerPixel[i + 1],
          b = centerPixel[i + 2];
        // a = centerPixel[i + 3] / 255;

        hexArr.push(rgbToHex(r, g, b));
      }

      return hexes(hexArr);
    };
  }

  function drawKaleidoscope(
    image: HTMLImageElement,
    canvas: HTMLCanvasElement,
    hexes: HexType[]
  ) {
    const canvasSize = (image.width + image.width * 0.5) * 2;

    canvas.width = canvasSize;
    canvas.height = canvasSize;
    canvas.style.filter = `blur(${blur}px)`;
    image.style.marginLeft = `${image.width / 12.8}px`;

    // const dpr = window.devicePixelRatio;

    const canvasDiameter = canvas.width,
      canvasRadius = canvasDiameter / 2;

    const kaleidoscopeHeight = image.width,
      kaleidoscopeWidth = (kaleidoscopeHeight / 16) * 9;

    const sides = 32;
    // const radius = canvasSize / 2.11;
    const radius = -canvasSize / 7.11;
    hexes.reverse();

    const PI2 = Math.PI * 2;
    const angle = PI2 / sides;

    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    ctx.translate(canvasRadius, canvasRadius);

    for (let i = 0; i < sides; i++) {
      const timer = setTimeout(() => {
        const x = radius * Math.cos(angle * i);
        const y = radius * Math.sin(angle * i);

        ctx.save();
        ctx.translate(x, y);
        ctx.rotate((((360 / sides) * i + 90) * Math.PI) / 180);
        ctx.beginPath();

        hexes.forEach((color, index) => {
          ctx.lineWidth = 0.25;
          if (index + 1 >= 100) {
            ctx.lineWidth = 0.5;
          }

          ctx.strokeStyle = color;
          ctx.strokeRect(
            -kaleidoscopeWidth / 2,
            index,
            kaleidoscopeWidth,
            kaleidoscopeHeight - index
          );
        });

        ctx.fill();
        ctx.closePath();
        ctx.restore();
      }, 20 * i);

      if (imgRef.current) {
        const image = imgRef.current as HTMLImageElement;
        image.addEventListener("load", () => {
          clearTimeout(timer);
        });
      }
    }
  }

  useEffect(() => {
    const canvas = ref.current;
    const image = imgRef.current;

    if (canvas && image) {
      getColorFromImg(image, (hexes) => {
        drawKaleidoscope(image, canvas, hexes);
      });
    }
  }, []);

  return (
    <Wrapper>
      <StyledImg
        ref={imgRef}
        src={img}
        width={imageWidth}
        height={imageHeight}
        onClick={onClick}
      />
      <canvas ref={ref} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
  align-self: center;
`;

const StyledImg = styled.img`
  z-index: 1;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto 18px;
  cursor: pointer;
  transition: 0.3s;

  :hover {
    transform: scale(1.1);
  }
`;

export default Kaleidoscope;
