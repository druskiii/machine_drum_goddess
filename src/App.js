import React from 'react';
import './App.css';

const soundHeat1 = [
  { keyCode: 81,
    keyTrigger: 'Q',
    id: 'Heater 1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'},
  { keyCode: 87,
    keyTrigger: 'W',
    id: 'Heater 2',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'},
  { keyCode: 69,
    keyTrigger: 'E',
    id: 'Heater 3',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'},
  { keyCode: 65,
    keyTrigger: 'A',
    id: 'Side Stick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3'},
  { keyCode: 83,
    keyTrigger: 'S',
    id: 'Clap',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'},
  { keyCode: 68,
    keyTrigger: 'D',
    id: 'Open HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'},
  { keyCode: 90,
    keyTrigger: 'Z',
    id: 'Kick-n-Hat',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'},
  { keyCode: 88,
    keyTrigger: 'X',
    id: 'Snare',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3'},
  { keyCode: 67,
    keyTrigger: 'C',
    id: 'Closed HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'}
];

const soundHeat2 = [
  { keyCode: 81,
    keyTrigger: 'Q',
    id: 'Chord 1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3'
  },
  { keyCode: 87,
    keyTrigger: 'W',
    id: 'Chord 2',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3'
  },
  { keyCode: 69,
    keyTrigger: 'E',
    id: 'Chord 3',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3'
  },
  { keyCode: 65,
    keyTrigger: 'A',
    id: 'Shaker',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3'
  },
  { keyCode: 83,
    keyTrigger: 'S',
    id: 'Open HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3'
  },
  { keyCode: 68,
    keyTrigger: 'D',
    id: 'Closed HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3'
  },
  { keyCode: 90,
    keyTrigger: 'Z',
    id: 'Punchy Kick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3'
  },
  { keyCode: 88,
    keyTrigger: 'X',
    id: 'Side Stick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3'
  },
  { keyCode: 67,
    keyTrigger: 'C',
    id: 'Snare',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3'
  }
];

const soundNames = {
  heaterKit: "Heater Kit",
  smoothPianoKit: "Smooth Piano Kit"
}

const soundGroups = {
  heaterKit: soundHeat1,
  smoothPianoKit: soundHeat2
}

const KeyboardKey = ({ play, sound: { id, keyTrigger, url, keyCode } }) => {
  
  const handleKeydown = (event) => {
    if(event.keyCode === keyCode){
      play(keyTrigger, id)
    }
  }
  
  React.useEffect(() => {
    document.addEventListener("keydown", handleKeydown)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  return  (
  <button id={keyCode} className="drum-pad" onClick={() => play(keyTrigger, id)}>
      <audio className="clip" id={keyTrigger} src={url} />
      {keyTrigger}
    </button>
  )
}

const Keyboard = ({ play, sounds }) => (
  <div className="keyboard">
    {sounds.map((sound) => <KeyboardKey play={play} sound={sound} />)}
  </div>
)

const DrumControl = ({ name, changeSoundHeater }) => (
  <div className="controller">
    <h2 id="display">{name}</h2>
    <button onClick={changeSoundHeater}>That New Heat</button>
  </div>
)

const App = () => {
  const [soundName, setSoundName] = React.useState("");
  const [soundType, setSoundType] = React.useState("heaterKit");
  const [sounds, setSounds] = React.useState(soundGroups[soundType])
  
  const play = (key, sound) => {
    setSoundName(sound)
    const audio = document.getElementById(key)
    audio.currentTime = 0;
    audio.play()
  }
  
  const changeSoundHeater = () => {
    setSoundName("");
    if(soundType === "heaterKit"){
      setSoundType("smoothPianoKit")
      setSounds(soundGroups.smoothPianoKit)
    } else {
      setSoundType("heaterKit")
      setSounds(soundGroups.heaterKit)
    }
  }
  
  return (
    <div id="drum-machine" class="parent">
      <div id="wrapper">
        <div className="row">
          <div className="column">
            <ul>
              <li>Goddess</li>
              <li>Drum<span className="blink">_</span></li>
            </ul>
          </div>
          <div className="column">
          <i class="fa fa-terminal fa-2x" aria-hidden="true"><span id="sound-text"> Crank That</span></i>
          </div>
        </div>
        
        <Keyboard play={play} sounds={sounds}/>
        <DrumControl name={soundName || soundNames[soundType]} changeSoundHeater={changeSoundHeater} />
      </div>
    </div>)
}

export default App;
