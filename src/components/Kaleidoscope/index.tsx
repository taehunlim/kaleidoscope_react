import React, { useRef, useEffect, MouseEventHandler } from "react";

import styledComponent from "./style";

const { Wrapper, StyledImg } = styledComponent;

interface KaleidoscopeProps {
  img: string;
  size?: number;
  blur?: number;
  onClick?: MouseEventHandler<HTMLImageElement>;
}

type HexCallback = (hexes: HexType[]) => void;

type HexType = string;

interface ColorOfWidthProps {
  [key: number]: HexType[];
}

type GetModeReduceProps = {
  [key: string]: number;
};

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

      // //get midline color
      // const center_start = (Math.floor(canvas.height / 2) - 1) * canvas.width;
      // const center_end = center_start + canvas.width - 1;

      // const begin = center_start * 4;
      // const end = center_end * 4 + 3;
      // const centerPixel = data.slice(begin, end),
      //   centerPixelLength = centerPixel.length;

      // let hexArr: HexType[] = [];
      // for (let i = 0; i < centerPixelLength; i += 4) {
      //   const r = centerPixel[i],
      //     g = centerPixel[i + 1],
      //     b = centerPixel[i + 2];
      //   // a = centerPixel[i + 3] / 255;

      //   hexArr.push(rgbToHex(r, g, b));
      // }

      function getAverageColor() {
        const colorOfWidth: ColorOfWidthProps = {};
        let width = 0;
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i],
            g = data[i + 1],
            b = data[i + 2];

          const rgbIndex = i / 4;

          width = rgbIndex % img.width;

          colorOfWidth[width] = colorOfWidth[width]
            ? [...colorOfWidth[width], rgbToHex(r, g, b)]
            : [rgbToHex(r, g, b)];
        }

        function getHexArray() {
          const hexArr: HexType[] = [];

          Object.values(colorOfWidth).map((colorArr) => {
            const firsts = [];
            const secondes = [];
            const thirds = [];
            const fourths = [];
            const fifths = [];
            const sixths = [];

            for (let i = 0; i < colorArr.length; i += 1) {
              firsts.push(colorArr[i][1]);
              secondes.push(colorArr[i][2]);
              thirds.push(colorArr[i][3]);
              fourths.push(colorArr[i][4]);
              fifths.push(colorArr[i][5]);
              sixths.push(colorArr[i][6]);
            }

            const colorCode =
              "#" +
              getMode(firsts) +
              getMode(secondes) +
              getMode(thirds) +
              getMode(fourths) +
              getMode(fifths) +
              getMode(sixths);

            return hexArr.push(colorCode);
          });

          return hexArr;
        }

        return getHexArray();
      }

      function getMode(array: string[]) {
        const counts = array.reduce<GetModeReduceProps>((pv, cv) => {
          pv[cv] = (pv[cv] || 0) + 1;
          return pv;
        }, {});

        const keys = Object.keys(counts);

        let mode = keys[0];
        keys.forEach((val) => {
          if (counts[val] > counts[mode]) {
            mode = val;
          }
        });

        return mode;
      }

      const hexArr = getAverageColor();

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

export default Kaleidoscope;
