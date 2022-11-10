import React, {useState, useEffect} from "react";
import "./index.css";
import clap from "./samples/Heater-6.mp3"; import openh from "./samples/Dsc_Oh.mp3";
import kickhat from "./samples/Kick_n_Hat.mp3"; import kick from "./samples/RP4_KICK_1.mp3";
import closedh from "./samples/Cev_H2.mp3"; import snare from "./samples/Brk_Snr.mp3";
import side from "./samples/side_stick_1.mp3"; import kick2 from "./samples/punchy_kick_1.mp3"; 
import electro from "./samples/24[kb]bonger-kick.wav.mp3";

// I know this is not best practice but for a static site where I'm not reusing components
// I decided to structure it mostly in this file and render to the DOM on index.js!

// sounds is a list of lists, and each sub-list has objects describing the button props
// structure is so that each object can be neatly read into rows

const sounds = [
  [
  {button: 'q', id: 'clap', src: clap, descrip: 'Clap'},
  {button: 'w', id: 'open-hh', src: openh, descrip: 'Open Hat'},
  {button: 'e', id: 'kick-hat', src: kickhat, descrip: 'Kick w/ hat'}
],
  [
  {button: 'a', id: 'kick', src: kick, descrip: 'Kick'},
  {button: 's', id: 'closed-h', src: closedh, descrip: 'Closed Hat'},
  {button: 'd', id: 'snare', src: snare, descrip: 'Snare'},
],
  [
  {button: 'z', id: 'side', src: side, descrip: 'Side Stick'},
  {button: 'x', id: 'kick2', src: kick2, descrip: 'Kick 2'},
  {button: 'c', id: 'electrokick', src: electro, descrip: 'Electro Kick'},
]
]


function Display(props) {
  
  return(
  <div id="display" className="display"> {props.displayInfo}</div>
  )}

// function to actually create each drum pad entity

function DrumsRow(props) {
  
  const playAudio = props => {
    const audioToPlay = new Audio(props.src);
    audioToPlay.volume = 0.2;
    audioToPlay.play();
    props.setter(props.descrip)
  };
  const handleKey = (e)=>{
    if (e.key === props.button){
    playAudio(props);
  }};

  return (
    <div className="drum-pad" id={props.id} onClick={() => playAudio(props)} 
    onKeyDown={useEffect(()=> {
      window.addEventListener('keydown', handleKey, true)
      },[])} >
      
        {props.button} <br/> {props.descrip} 
        <audio src={props.src} id={props.button} />
      
    </div>
  );
}

// Functions for rows

function Rows(props) {
  let rowNum = props.rowNum;
  let ind = rowNum - 1; let rowId = "row" + rowNum;
  const mapped = sounds[ind].map(sound => (
    <DrumsRow 
    src={sound.src} id={sound.id} key={sound.id} 
    button={sound.button} descrip={sound.descrip} setter={props.setter}
    />
  ));
  
  return <div className={rowId}>{mapped}</div>;
}

export function App() {
  const [displayInfo, setDisplayInfo] = useState("")

  return (
<>
  <div id="drum-machine">
    <Rows rowNum={1} setter={setDisplayInfo} />
    <Rows rowNum={2} setter={setDisplayInfo} />
    <Rows rowNum={3} setter={setDisplayInfo} />
  </div>
  <Display displayInfo={displayInfo} />
</>
)}