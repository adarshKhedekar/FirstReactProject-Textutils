import React, { useState, useRef, useEffect } from 'react'
import Navbar from "./Navbar";
import "../index.css";


export default function Textarea(props) {
  const [text, setText] = useState("");
  const [mode, setMode] = useState("dark");
  const [textColor, setTextColor] = useState("black");
  const [theme, setTheme] = useState("brown");
  const [timer, setTimer] = useState('00:00:00');
  const [start, setStart] = useState(false);
  const [end, setEnd] = useState(false);
  const [arrStart, setArr] = useState(false);
  const [heading, setHeading] = useState("Click on Start");
  const [finalMsg, setFinalMsg] = useState("");

  const words = "now is the winter of our discontent Made glorious summer by this sun of York And all the clouds that lourd upon our house In the deep bosom of the ocean buried Now are our brows bound with victorious wreaths Our bruised arms hung up for monuments Our stern alarums changed to merry meetings  Our dreadful marches to delightful measures. Grim-visaged war hath smoothd his wrinkled front";
  function reset(){
      clearTimer(getDeadTime());
      setStart(false);
      setEnd(false);
      setArr(false);
      setHeading("Click on Start");
      setFinalMsg("");
      setText("");
  }
  function handleLoClick() {
    let newText = text.toLowerCase();
    setText(newText);
  }
  function handleUpClick() {
    let newText = text.toUpperCase();
    setText(newText);
  }

  function handleChange(event) {
    setText(event.target.value);
  }

  function handleClearClick() {
    setText("");
  }
  function handleSelectClick() {
    var newText = document.getElementById("exampleFormControlTextarea1");
    newText.select();
    navigator.clipboard.writeText(newText.value);
  }
  function handleDarkMode() {
    if (mode === "dark") {
      setMode("light");
      document.body.style.backgroundColor = "black";
      setTextColor("white");
    } else {
      setMode("dark");
      document.body.style.backgroundColor = "white";
      setTextColor("black");
    }
  }
  function handleLiColor(event) {
    if (theme === "brown") {
      setTheme("blue");
      document.body.style.backgroundColor = "#E7AB79";
      setTextColor("black");
    } else {
      setTheme("brown");
      document.body.style.backgroundColor = "#D3EBCD";
      setTextColor("black");
    }
  }
  function Count(a){
    let cnt = 0;
    for(let i=0;i<a.length;i++){
      if(a[i] !== " "){
        cnt++;
      }
    }
    return cnt;
  }
    const Ref = useRef(null);  
  
    const getTimeRemaining = (e) => {
        const total = Date.parse(e) - Date.parse(new Date());
        const seconds = Math.floor((total / 1000) % 60);
        return {
            total, seconds
        };
    }
  
  
    const startTimer = (e) => {
        let { total, seconds } 
                    = getTimeRemaining(e);
        if (total >= 0) {
  
            setTimer(
                '00:00:' + (seconds > 9 ? seconds : '0' + seconds)
            )
        }else{
          setHeading("Click on Reset");
          setStart(false);
          setEnd(true);
          setArr(false);
          let wordtyped = document.getElementById('exampleFormControlTextarea1').value;
          // console.log(wordtyped);
          // // console.log(wordCount);
          let wordCount = WordCounter(wordtyped);
          
          let accuracy = calAccuracy(wordtyped, wordCount, words);
          setFinalMsg("Your typing speed is " + wordCount + " wpm with " + accuracy + "% accuracy");
          // reset();
        }
    }
    
    function WordCounter(str){
      return (str.split(/\s+/).length);
    }
    function calAccuracy(text,wordtyped, word){
      let word1 = text.split(/\s+/);
      let word2 = word.split(/\s+/);
      let cnt = 0;

      word1.forEach(function(item,index){
        if(item === word2[index]){
          cnt++
        }
      })
      // console.log(wordtyped);
      // console.log(cnt);
      // console.log(word1);
      // console.log(word2);
      return Math.floor((cnt/wordtyped) * 100);

    }
  
  
    const clearTimer = (e) => {
     
        setTimer('00:00:60');
  
        if (Ref.current) clearInterval(Ref.current);
        const id = setInterval(() => {
            startTimer(e);
        }, 1000)
        Ref.current = id;
    }
  
    const getDeadTime = () => {
        let deadline = new Date();
  
        deadline.setSeconds(deadline.getSeconds() + 61);
        return deadline;
    }
  
    useEffect(() => {
        clearTimer(getDeadTime());
    }, []);
    
    function onClickReset(){
      setStart(true);
      if(start === true){
        clearTimer(getDeadTime());
      }
    }
    function handleStart(){
      clearTimer(getDeadTime());
      setText("");
      setHeading("Type the following Text");
      setArr(true);
      setEnd(false);
      // setStart(true);
    }
  
  return (
    <>
      <Navbar title="Textutils" aboutText="Test Typing Speed" Navmode={mode} />
      {(start === true) ? <h2 align="center" style={{ color: `${textColor}` }} className={`${props.TThide}`}>{timer}</h2> : ""}
      
      <div className="container my-3">
        <h1 align="center" style={{ color: `${textColor}` }}>{props.title}</h1>
        <h5 align="center" className={`${props.TThide}`} style={{ color: `${textColor}` }}>{heading}</h5>
        {(arrStart === true) ? <div className="container">
        <h6 align="center" className={`${props.TThide}`} style={{ color: `${textColor}` }}>{words}</h6>
        </div>: ""}
        {(end === true) ? <h2 align="center" style={{ color: `${textColor}` }} className={`${props.TThide}`}>{finalMsg}</h2> : ""}
        <div className="form-group">
          <textarea
            value={text}
            placeholder="Enter Your Text here"
            onChange={handleChange}
            onClick={onClickReset}
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="8"
          ></textarea>
          <button
            type="button"
            onClick={handleUpClick}
            className={`btn btn-${mode} my-2 ${props.visibility}`}
          >
            toUpperCase
          </button>
          <button
            type="button"
            onClick={handleLoClick}
            className={`btn btn-${mode} my-2 mx-2 ${props.visibility}`}
          >
            toLowerCase
          </button>
          <button
            type="button"
            onClick={handleClearClick}
            className={`btn btn-${mode} my-2 ${props.visibility}`}
          >
            ClearText
          </button>
          <button
            type="button"
            onClick={handleSelectClick}
            className={`btn btn-${mode} my-2 mx-2 ${props.visibility}`}
          >
            copyText
          </button>
          <button
            type="button"
            onClick={handleStart}
            className={`btn btn-${mode} my-2 ${props.TThide}`}
          >
            Start
        </button>
          <button
            type="button"
            onClick={reset}
            className={`btn btn-${mode} my-2 mx-2 ${props.TThide}`}
          >
            Reset
        </button>
          <button
            type="button"
            onClick={handleDarkMode}
            className={`btn btn-${mode} my-2`}
          >
            {mode}Mode
          </button>
          <div className="customBtn">
            <button type="button" className={`btn btn-${mode} my-2 mx-2`}>
              Themes
            </button>
            <ul className="customUl">
              <li className="customLi" value="brown" onClick={handleLiColor}>
                -
              </li>
              <li className="customLi" value="blue" onClick={handleLiColor}>
                -
              </li>
            </ul>
          </div>
        </div>
        <br></br><br></br>
          <h5 class={`${props.visibility}`}style={{ color: `${textColor}` }}>Text Preview</h5>
          <p class={`${props.visibility}`}style={{ color: `${textColor}` }}>
            Word Count: {text.split(/\s+/).filter((element)=>{return element.length !== 0}).length} Character Count: {Count(text)}
          </p>
          <h5 class={`${props.visibility}`}style={{ color: `${textColor}` }}>Text Summary</h5>
          <p class={`${props.visibility}`}style={{ color: `${textColor}` }}>{text}</p>
      </div>
    </>
  );
}


Textarea.defaultProps  = {
  title: 'Enter text to analyze below',
}