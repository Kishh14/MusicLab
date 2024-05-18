import { driver } from "driver.js";
import "driver.js/dist/driver.css";

// The initial guide
export const InitialTour = () => {
  return driver({
    showProgress: true,
    steps: [
      {
        element: "#add-room-button",
        popover: {
          description:
            "Create your own room (You can also make it private 🔐😄)",
        },
      },
      {
        element: "#invite-button",
        popover: {
          description:
            "Invite your people to your room using the invitation link in the settings 🔗",
        },
      },
      {
        element: "#mic-button",
        popover: {
          description:
            "You can communicate with others in your room using microphone 🎙️",
        },
      },
      {
        element: "#chat-button",
        popover: {
          description: "You can also chat with your room members 💬",
        },
      },
      {
        popover: {
          title: "That was it",
          description:
            "<img src='https://media1.tenor.com/m/wqhIG8O_qtkAAAAC/tkthao219-brown.gif' style='height: 202.5px; width: 270px;' /><span style='font-size: 15px; display: block; margin-top: 10px; text-align: center;'>Enjoy with your homies!</span>",
        },
      },
    ],
  });
};

// Guide to play DrumKit
export const howToPlayDrumKit = () => {
  return driver({
    showProgress: true,
    steps: [
      {
        element: "#drum-activate-button",
        popover: {
          description:
            "Activate the DrumKit to start DhupChik DhupChik (I mean the beats 😁)!",
        },
      },
      {
        element: "#rideCymbalLeft",
        popover: {
          description: "Play this Ride Cymbal (Press A)",
        },
      },
      {
        element: "#rideCymbalRight",
        popover: {
          description: "Play this Ride Cymbal (Press L)",
        },
      },
      {
        element: "#tomDrumLeft",
        popover: {
          description: "Play this TomDrum (Press S)",
        },
      },
      {
        element: "#tomDrumRight",
        popover: {
          description: "Play this TomDrum (Press K)",
        },
      },
      {
        element: "#highHat",
        popover: {
          description: "Play this HighHat (Press M)",
        },
      },
      {
        element: "#highHatRight",
        popover: {
          description: "Play this HighHat (Press Z)",
        },
      },
      {
        element: "#bassDrum",
        popover: {
          description: "Play this BassDrum (Press B)",
        },
      },
      {
        element: "#snareDrumLeft",
        popover: {
          description: "Play this SnareDrum (Press X)",
        },
      },
      {
        element: "#snareDrumRight",
        popover: {
          description: "Play this SnareDrum (Press N)",
        },
      },
      {
        popover: {
          title: "Ta Da, That's it!",
          description:
            "<img src='https://media.tenor.com/o-Vi26CbkUUAAAAi/tkthao219-bubududu.gif' style='height: 202.5px; width: 270px;' /><span style='font-size: 15px; display: block; margin-top: 10px; text-align: center;'>Practice different different beats, record it and share it with your loved ones</span>",
        },
      },
    ],
  });
};

// Guide user on how to play piano
export const howToPlayPianoTour = () => {
  return driver({
    showProgress: true,
    steps: [
      {
        element: "#activate-button",
        popover: {
          title: "Activate the piano",
        },
      },
      {
        element: "#piano-2-note",
        popover: {
          title: "Play the notes of your choice",
          description:
            "Press the labeled key on your keyboard or click the piano key",
        },
      },
      {
        popover: {
          title: "That's it, You are an Expert now! 🤪",
          description:
            "Try to play the Happy Birthday Song (tour is available in the help icon)!",
        },
      },
    ],
  });
};

// Guide user to play Happy Birthday Song
export const playHBDSongInPiano = () => {
  return driver({
    showProgress: true,
    steps: [
      {
        popover: {
          title: "Let's play Happy Birthday Song with Piano",
          description:
            "Activate the piano before hand and follow along the guide to play the song! 👍",
        },
      },
      {
        element: "#piano-q-note",
        popover: {
          title: "Play Q note",
          description: "Click on the key or press Q on your keyboard",
        },
      },
      {
        element: "#piano-q-note",
        popover: {
          title: "Play Q note again",
          description: "Click on the key or press Q on your keyboard",
        },
      },
      {
        element: "#piano-w-note",
        popover: {
          title: "Now, Play W note",
          description: "Click on the key or press W on your keyboard",
        },
      },
      {
        element: "#piano-q-note",
        popover: {
          title: "Play Q note one more time",
          description: "Click on the key or press Q on your keyboard",
        },
      },
      {
        element: "#piano-r-note",
        popover: {
          title: "Play R note",
          description: "Click on the key or press R on your keyboard",
        },
      },
      {
        element: "#piano-e-note",
        popover: {
          title: "Play the E note",
          description: "Click on the key or press E on your keyboard",
        },
      },
      {
        element: "#piano-q-note",
        popover: {
          title: "Play Q note",
          description: "Click on the key or press Q on your keyboard",
        },
      },
      {
        element: "#piano-q-note",
        popover: {
          title: "Play Q note again",
          description: "Click on the key or press Q on your keyboard",
        },
      },
      {
        element: "#piano-i-note",
        popover: {
          title: "Play I note",
          description: "Click on the key or press I on your keyboard",
        },
      },
      {
        element: "#piano-t-note",
        popover: {
          title: "Play T note",
          description: "Click on the key or press T on your keyboard",
        },
      },
      {
        element: "#piano-r-note",
        popover: {
          title: "Play R note",
          description: "Click on the key or press R on your keyboard",
        },
      },
      {
        element: "#piano-e-note",
        popover: {
          title: "Play E note",
          description: "Click on the key or press E on your keyboard",
        },
      },
      {
        element: "#piano-w-note",
        popover: {
          title: "Play W note",
          description: "Click on the key or press W on your keyboard",
        },
      },
      {
        element: "#piano-7-note",
        popover: {
          title: "Play 7 note",
          description: "Click on the key or press 7 on your keyboard",
        },
      },
      {
        element: "#piano-7-note",
        popover: {
          title: "Play 7 note again",
          description: "Click on the key or press 7 on your keyboard",
        },
      },
      {
        element: "#piano-r-note",
        popover: {
          title: "Play R note",
          description: "Click on the key or press R on your keyboard",
        },
      },
      {
        element: "#piano-t-note",
        popover: {
          title: "Play T note",
          description: "Click on the key or press T on your keyboard",
        },
      },
      {
        element: "#piano-r-note",
        popover: {
          title: "Play R note",
          description: "Click on the key or press R on your keyboard",
        },
      },
      {
        popover: {
          title: "Ta Da, That's it!",
          description:
            "<img src='https://media.tenor.com/XbXW81Nb7XMAAAAi/clapping-yay.gif' style='height: 202.5px; width: 270px;' /><span style='font-size: 15px; display: block; margin-top: 10px; text-align: center;'>Practice the same keys, record it and share it with your loved ones</span>",
        },
      },
    ],
  });
};
