import React from "react";
import reactCSS from "reactcss";
import { SketchPicker } from "react-color";
interface IColor {
  r: string;
  g: string;
  b: string;
  a: string;
}
interface IColorModal {
  displayColorPicker: boolean;
  color: IColor;
}

const SketchExample: React.FC<IColorModal> = (props: IColorModal) => {
  var [displayPicker, setDisplayPicker] = React.useState(
    props.displayColorPicker
  );
  var [colors, setColor] = React.useState(props.color);
  const styles = reactCSS({
    default: {
      color: {
        width: "36px",
        height: "14px",
        borderRadius: "2px",
        background: `rgba(${colors.r}, ${colors.g}, ${colors.b}, ${colors.a})`
      },
      swatch: {
        padding: "5px",
        background: "#fff",
        borderRadius: "1px",
        boxShadow: "0 0 0 1px rgba(0,0,0,.1)",
        display: "inline-block",
        cursor: "pointer"
      },
      popover: {
        position: "absolute" as "absolute"
      },
      cover: {
        position: "fixed" as "fixed",
        top: "0px",
        right: "0px",
        bottom: "0px",
        left: "0px"
      }
    }
  });

  const handleClick = () => {
    setDisplayPicker(!displayPicker);
    console.log(displayPicker);
  };

  const handleClose = () => {
    setDisplayPicker(!displayPicker);
  };
  const handleChange = (e: any) => {
    setColor(e.rgb);
  };

  return (
    <div>
      <div style={styles.swatch} onClick={handleClick}>
        <div style={styles.color} />
      </div>

      {displayPicker ? (
        <div onClick={handleClose}>
          <SketchPicker {...colors} onChange={handleChange} />
        </div>
      ) : null}
    </div>
  );
};

export default SketchExample;
