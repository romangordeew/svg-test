import * as React from "react";
import * as d3 from "d3";
import * as d3Scale from "d3-scale";
import { saveAs } from "file-saver";
import Button from "react-bootstrap/Button";
import { ReactComponent as YourSvg } from "./test.svg";

export const getSVGString = (svgNode) => {
  svgNode.setAttribute("xlink", "http://www.w3.org/1999/xlink");

  const getCSSStyles = (parentElement) => {
    let selectorTextArr = [];

    selectorTextArr.push("#" + parentElement.id);
  };

  let cssStyleText = getCSSStyles(svgNode);

  let serializer = new XMLSerializer();
  const svgString = serializer.serializeToString(svgNode);

  return svgString;
};

export const svgString2Image = (svgString, width, height, format, callback) => {
  let fmt = format ? format : "png";

  let imgSrc =
    "data:image/svg+xml;base64" + btoa(unescape(encodeURIComponent(svgString)));
};

const Circles = () => {
  const myCanvas = React.useRef(null);

  const onClickHandler = () => {
    console.log("Click");

    const svg = d3.select("svg");
    const svgString = getSVGString(svg.node());

    let context = myCanvas.current.getContext("2d");
    console.log(context);

    const width = 600;
    const height = 300;
    myCanvas.current.width = 600;
    myCanvas.current.height = 300;
    let imgsrc =
      "data:image/svg+xml;base64," +
      btoa(unescape(encodeURIComponent(svgString)));
    console.log(imgsrc);

    let image = new Image();
    image.onload = () => {
      console.log("image loaded");
      context.clearRect(0, 0, width, height);
      context.fillStyle = "white";
      context.fillRect(0, 0, width, height);
      context.drawImage(image, 0, 0, width, height);

      myCanvas.current.toBlob((blob: any) => {
        let filesize = Math.round(blob.length / 1024) + "KB";
        saveAs(blob, "D3PNG.png");
      });
    };

    image.src = imgsrc;
  };

  return (
    <div className="circles">
      <YourSvg />
      <canvas id="myCanvas" width="300" height="200" ref={myCanvas} />

      <Button onClick={onClickHandler}>foo</Button>
    </div>
  );
};

export default Circles;
