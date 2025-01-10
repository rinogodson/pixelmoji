"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import EmojiPicker, { Emoji } from "emoji-picker-react";
function SelectionPage() {
  const [mode, setMode] = useState("emoji");
  const [gridWidth, setGridWidth] = useState(12);
  const [gridHeight, setGridHeight] = useState(12);
  const [bgEmoji, setBgEmoji] = useState(mode === "emoji" ? "⬜️" : ":101010:");
  const [showPicker, setShowPicker] = useState(false);
  const [showBgPicker, setShowBgPicker] = useState(false);

  const [copied, setCopied] = useState(false);

  const [currentEmoji, setCurrentEmoji] = useState(
    mode === "emoji" ? "👾" : ":000000:"
  );
  const [colorArray, setColorArray] = useState(
    new Array(gridHeight * gridWidth).fill(
      mode === "emoji" ? bgEmoji : ":101010:"
    )
  );

  React.useEffect(() => {
    const defaultBgEmoji = mode === "emoji" ? "⬜️" : ":101010:";
    const defaultEmoji = mode === "emoji" ? "👾" : ":000000:";
    setBgEmoji(defaultBgEmoji);
    setCurrentEmoji(defaultEmoji);
    setColorArray(new Array(gridHeight * gridWidth).fill(bgEmoji));
    console.log(mode, bgEmoji);
  }, [gridHeight, gridWidth, mode]);

  React.useEffect(()=>{
    setColorArray(new Array(gridHeight * gridWidth).fill(bgEmoji));
  }, [bgEmoji])

  const colors = [];

  let str = "";
  for (let i = 0; i <= 10; i++) {
    for (let j = 0; j <= 10; j++) {
      for (let k = 0; k <= 10; k++) {
        str = `:${("" + i).padStart(2, "0")}${("" + j).padStart(2, "0")}${(
          "" + k
        ).padStart(2, "0")}:`;
        colors.push(str);
      }
    }
  }

  const templates = [
    { name: "Pirate", emoji: "⛴️", bgEmoji: "🌊" },
    { name: "Fire", emoji: "🔥", bgEmoji: "🌳" },
    { name: "Snow", emoji: "🏂", bgEmoji: "❄️" },
    { name: "Beach", emoji: "🏄", bgEmoji: "🌊" },
    { name: "Swimming", emoji: "🏊🏽", bgEmoji: "🌊" },
  ];

  const formatColor = (color) => {
    let str = color.slice(1, 7);
    let newStr = "";
    str = str.split("").map((item, index) => {
      newStr += (index + 1) % 2 === 0 ? item + "." : item;
    });
    newStr = newStr.slice(0, -1);
    newStr = newStr.split(".");
    return {
      r: newStr[0] === "00" ? 0 : 25 * parseInt(newStr[0]),
      g: newStr[1] === "00" ? 0 : 25 * parseInt(newStr[1]),
      b: newStr[2] === "00" ? 0 : 25 * parseInt(newStr[2]),
    };
  };

  const handleChange = (index) => {
    console.log("mouse down");
    setColorArray((prevColorArray) =>
      prevColorArray.map((item, i) =>
        i === index ? (item === bgEmoji ? currentEmoji : bgEmoji) : item
      )
    );
  };

  return (
    <>
      <div className="bg"></div>
      <img src="./tag.svg" alt="" className="tag" />
      <div className="container">
        <div className="inputcontainer">
          <h1 className="title">PixMoji</h1>
          <div
            style={{
              textAlign: "center",
              cursor: "pointer",
              backgroundColor: mode === "emoji" ? "red" : "green",
            }}
            className="toggleColor"
            onClick={() => {
              setMode(mode === "emoji" ? "color" : "emoji");
            }}
          >
            {mode === "emoji" ? "Color Mode Off" : "Color Mode On"}
          </div>

          {mode === "emoji" ? (
            <>
              <div style={{ textAlign: "center" }}>
                <label>Templates</label>
                <select
                  className="select"
                  value={
                    templates.find(
                      (item) =>
                        item.emoji === currentEmoji && item.bgEmoji === bgEmoji
                    )
                      ? currentEmoji
                      : "custom"
                  }
                  onChange={(e) => {
                    const selectedTemplate = templates.find(
                      (item) => item.emoji === e.target.value
                    );
                    if (selectedTemplate) {
                      setCurrentEmoji(selectedTemplate.emoji);
                      setBgEmoji(selectedTemplate.bgEmoji);
                    } else {
                      setCurrentEmoji(e.target.value);
                      setBgEmoji(e.target.value);
                    }
                  }}
                >
                  <option value={currentEmoji}>select</option>
                  {templates.map((item, index) => (
                    <option key={index} value={item.emoji}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>

              <div style={{ display: "flex", gap: "20px" }}>
                <div style={{ textAlign: "center" }}>
                  <label>Brush</label>
                  <input
                    type="text"
                    value={currentEmoji}
                    onClick={() => {
                      setShowPicker(!showPicker);
                      setShowBgPicker(false);
                    }}
                    onChange={(e) => setCurrentEmoji(e.target.value)}
                    readOnly
                  />
                </div>
                <div style={{ textAlign: "center" }}>
                  <label>BG Fill</label>
                  <input
                    type="text"
                    value={bgEmoji}
                    onClick={() => {
                      setShowBgPicker(!showBgPicker);
                      setShowPicker(false);
                    }}
                    onChange={(e) => setBgEmoji(e.target.value)}
                    readOnly
                  />
                </div>
              </div>
            </>
          ) : (
            <>
              <div
                style={{
                  backgroundColor: `rgba(${formatColor(currentEmoji).r}, ${
                    formatColor(currentEmoji).g
                  }, ${formatColor(currentEmoji).b}, 1)`,
                  height: "100px",
                  width: "100px",
                  border: "3px solid #2b2b2b",
                  borderRadius: "10px",
                }}
              ></div>
              <div style={{ display: "flex", gap: "5px" }}>
                <div style={{ textAlign: "center" }}>
                  <label>Red</label>
                  <input
                    type="number"
                    style={{
                      height: "45px",
                      width: "65px",
                      padding: "0",
                      textAlign: "center",
                    }}
                    value={formatColor(currentEmoji).r / 25}
                    onChange={(e) => {
                      if (e.target.value != "0") {
                        if (e.target.value[0] === "0") {
                          e.target.value = e.target.value.slice(1);
                        }
                      }
                      if (e.target.value <= 10 && e.target.value >= 0) {
                        setCurrentEmoji((prev) => {
                          let value = e.target.value.padStart(2, "0");
                          let arr = prev.split("");
                          arr[1] = value[0];
                          arr[2] = value[1];
                          return arr.join("");
                        });
                      }
                    }}
                  />
                </div>
                <div style={{ textAlign: "center" }}>
                  <label>Green</label>
                  <input
                    type="number"
                    style={{
                      height: "45px",
                      width: "65px",
                      padding: "0",
                      textAlign: "center",
                    }}
                    value={formatColor(currentEmoji).g / 25}
                    onChange={(e) => {
                      if (e.target.value != "0") {
                        if (e.target.value[0] === "0") {
                          e.target.value = e.target.value.slice(1);
                        }
                      }
                      if (e.target.value <= 10 && e.target.value >= 0) {
                        setCurrentEmoji((prev) => {
                          let value = e.target.value.padStart(2, "0");
                          let arr = prev.split("");
                          arr[3] = value[0];
                          arr[4] = value[1];
                          return arr.join("");
                        });
                      }
                    }}
                  />
                </div>
                <div style={{ textAlign: "center" }}>
                  <label>Blue</label>
                  <input
                    type="number"
                    style={{
                      height: "45px",
                      width: "65px",
                      padding: "0",
                      textAlign: "center",
                    }}
                    value={formatColor(currentEmoji).b / 25}
                    onChange={(e) => {
                      if (e.target.value != "0") {
                        if (e.target.value[0] === "0") {
                          e.target.value = e.target.value.slice(1);
                        }
                      }
                      if (e.target.value <= 10 && e.target.value >= 0) {
                        setCurrentEmoji((prev) => {
                          let value = e.target.value.padStart(2, "0");
                          let arr = prev.split("");
                          arr[5] = value[0];
                          arr[6] = value[1];
                          return arr.join("");
                        });
                      }
                    }}
                  />
                </div>
              </div>
            </>
          )}
          <div
            style={{
              display: "flex",
              gap: "20px",
              flexDirection: "column",
              flexDirection: "row",
            }}
          >
            <div
              style={{
                textAlign: "center",
                display: "flex",
                gap: "5px",
                flexDirection: "column",
              }}
            >
              <label>Grid Size</label>
              <input
                type="text"
                value={gridWidth}
                style={{
                  width: "80px",
                  height: "50px",
                  textAlign: "center",
                  fontSize: "25px",
                }}
                readOnly
              />
              <input
                min={2}
                max={12}
                value={gridWidth}
                onChange={(e) => setGridWidth(e.target.value)}
                type="range"
                className="slider"
              />
            </div>
            <div
              style={{
                textAlign: "center",
                display: "flex",
                gap: "5px",
                flexDirection: "column",
              }}
            >
              <label>Grid Size</label>
              <input
                type="text"
                value={gridHeight}
                style={{
                  width: "80px",
                  height: "50px",
                  textAlign: "center",
                  fontSize: "25px",
                }}
                readOnly
              />
              <input
                min={2}
                max={16}
                value={gridHeight}
                onChange={(e) => setGridHeight(e.target.value)}
                type="range"
                className="slider"
              />
            </div>
          </div>
          {showPicker && (
            <motion.div
            initial={{opacity:0}}
            animate={{opacity:1}}
            transition={{duration:0.5}}
            className="emoji-back">
              <div onClick={() => setShowPicker(false)} className="closer"></div>
            <div className="emoji-content">
              <label style={{ fontFamily: "Mona Sans" }}>
                Brush Emoji
              </label>
              <EmojiPicker
                onEmojiClick={(emoji) => setCurrentEmoji(emoji.emoji)}
                searchPlaceholder=""
                open={showPicker}
                theme="dark"
                lazyLoadEmojis="true"
              />
            </div>
            </motion.div>
          )}
          {showBgPicker && (
            <motion.div
            initial={{opacity:0}}
            animate={{opacity:1}}
            transition={{duration:0.5}}
            className="emoji-back">
              <div onClick={() => setShowBgPicker(false)} className="closer"></div>
            <div className="emoji-content">
              <label style={{ fontFamily: "Mona Sans" }}>
                Background Emoji
              </label>
              <EmojiPicker
                onEmojiClick={(emoji) => setBgEmoji(emoji.emoji)}
                searchPlaceholder=""
                open={showBgPicker}
                theme="dark"
                lazyLoadEmojis="true"
              />
            </div>
            </motion.div>
          )}
          <div style={{ display: "flex", gap: "10px" }}>
            <button style={{backgroundColor:"#494949", color:"white"}} className="button"
            onClick={()=>setColorArray(new Array(gridHeight * gridWidth).fill(bgEmoji))}
            >Clear</button>
            <button
              className="button"
              onClick={() => {
                setCopied(true);
                navigator.clipboard.writeText(
                  colorArray
                    .map((item, index) =>
                      index % gridWidth === gridWidth - 1 ? item + "\n" : item
                    )
                    .join("")
                );
                setTimeout(() => {
                  setCopied(false);
                }, 2000);
              }}
            >
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            height: "100%",
            justifyContent: "space-between",
            flexDirection: "column",
          }}
        >
         {mode==="color" && <button style={{width:"fit-content", marginInline:"10px"}} onClick={()=>setBgEmoji(bgEmoji===":000000:" ? ":101010" : ":000000:")} className="button">
          Flip the background
          </button>}
          <div
            className={`emojiGrid`}
            style={{
              gridTemplateColumns: `repeat(${gridWidth}, 1fr)`,
              gridTemplateRows: `repeat(${gridHeight}, 1fr)`,
              aspectRatio: `${gridWidth} / ${gridHeight}`,
            }}
          >
            {colorArray.map((item, index) => (
              <div
                onMouseDown={() => handleChange(index)}
                className="item"
                style={{
                  backgroundColor:
                    mode === "emoji"
                      ? "#000"
                      : `rgba(${formatColor(item).r}, ${formatColor(item).g}, ${
                          formatColor(item).b
                        }, 1)`,
                }}
                key={index}
              >
                <span
                  style={{
                    opacity: mode === "emoji" ? 1 : 0,
                    width: "fit-content",
                    height: "fit-content",
                    pointerEvents: mode === "emoji" ? "all" : "none",
                  }}
                  className="itemSpan"
                >
                  {mode === "emoji" ? item : "⬜️"}
                </span>
              </div>
            ))}
          </div>
          <div className="instruction">
            <p>
              Create awesome emoji pixel art here and share it with the{" "}
              <a href="https://hackclub.slack.com/archives/C087VMU968N">
                #emoji-art
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default SelectionPage;
