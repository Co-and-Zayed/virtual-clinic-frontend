import styles from "screens/VirtualClinicScreens/User Screens/Patient Screens/DashboardScreen/DashboardScreen.module.css";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "redux/rootReducer";
import JSZip from "jszip";
import { access } from "fs";
import { useFunctions } from "hooks/useFunctions";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  CURRENT_CALL_ACTION,
  LOCAL_STREAM,
  REMOTE_STREAM,
  RTC_CONNECTION,
} from "redux/VirtualClinicRedux/types";
import * as Firestore from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCySV6dNI8FeV1k6Y0tnfakvQxvYvfGcUI",
  authDomain: "el7a2ni---acl-project.firebaseapp.com",
  projectId: "el7a2ni---acl-project",
  storageBucket: "el7a2ni---acl-project.appspot.com",
  messagingSenderId: "198563552127",
  appId: "1:198563552127:web:d71e393daf15ab6855d84a",
  measurementId: "G-HF4NY9D0EB",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = Firestore.getFirestore(app);

const DashboardScreen = () => {
  const { userData } = useSelector((state: RootState) => state.userReducer);
  const { pc, localStream, remoteStream, currentAction } = useSelector(
    (state: RootState) => state.videoCallReducer
  );

  const [callInput, setCallInput] = useState<any>(null);
  const [callInputValue, setCallInputValue] = useState<any>(null);
  const [webcamVideo, setWebcamVideo] = useState<any>(null);
  const [remoteVideo, setRemoteVideo] = useState<any>(null);
  const dispatch: any = useDispatch();

  enum CallAction {
    START_WEB_CAM = "START_WEB_CAM",
    CALL = "CALL",
    ANSWER = "ANSWER",
    HANGUP = "HANGUP",
  }

  useEffect(() => {
    // init();
    resetRedux();
  }, []);

  const init = async () => {
    if (pc == null) {
      const servers = {
        iceServers: [
          {
            urls: [
              "stun:stun1.l.google.com:19302",
              "stun:stun2.l.google.com:19302",
            ],
          },
        ],
        iceCandidatePoolSize: 10,
      };
      await dispatch({
        type: RTC_CONNECTION,
        payload: new RTCPeerConnection(servers),
      });
      await dispatch({
        type: LOCAL_STREAM,
        payload: null,
      });
      await dispatch({
        type: REMOTE_STREAM,
        payload: null,
      });
      setCallInput(document.getElementById("callInput") as HTMLInputElement);
      setWebcamVideo(
        document.getElementById("webcamVideo") as HTMLVideoElement
      );
      setRemoteVideo(
        document.getElementById("remoteVideo") as HTMLVideoElement
      );
    }
  };

  const printRedux = (label?: any) => {
    console.log(label ?? "");
    console.log("PC");
    console.log(pc);
    console.log("localStream");
    console.log(localStream);
    console.log("remoteStream");
    console.log(remoteStream);

    console.log("Firestore:", Firestore ?? "");
    console.log("Collection:", "calls");
    console.log("Document ID:", callInput?.value ?? "");
  };

  useEffect(() => {
    printRedux("SOME VALUE CHANGED");
  }, [pc, localStream, remoteStream]);

  const resetRedux = async () => {
    await dispatch({
      type: RTC_CONNECTION,
      payload: null,
    });
    await dispatch({
      type: LOCAL_STREAM,
      payload: null,
    });
    await dispatch({
      type: REMOTE_STREAM,
      payload: null,
    });
    await dispatch({
      type: CURRENT_CALL_ACTION,
      payload: null,
    });
  };

  useEffect(() => {
    switch (currentAction) {
      case CallAction.START_WEB_CAM:
        console.log("START WEBCAM");
        startWebcam();
        break;
      case CallAction.CALL:
        console.log("CALL");
        break;
      case CallAction.ANSWER:
        console.log("ANSWER");
        break;
      case CallAction.HANGUP:
        console.log("HANGUP");
        break;
      default:
        console.log("DEFAULT");
        break;
    }
  }, [currentAction]);

  const startWebcam = async () => {
    // Push tracks from local stream to peer connection
    if (localStream) {
      localStream?.getTracks().forEach((track: any) => {
        pc.addTrack(track, localStream);
      });
    }

    // Pull tracks from remote stream, add to video stream
    pc.ontrack = (event: any) => {
      event.streams[0].getTracks().forEach((track: any) => {
        remoteStream.addTrack(track);
      });
    };

    webcamVideo.srcObject = localStream;
    remoteVideo.srcObject = remoteStream;
  };

  const handleStartWebcam = async () => {
    console.log("START WEBCAM CLICK");
    // 1. Setup media sources
    await dispatch({
      type: LOCAL_STREAM,
      payload: await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      }),
    });
    await dispatch({
      type: REMOTE_STREAM,
      payload: new MediaStream(),
    });
    await dispatch({
      type: CURRENT_CALL_ACTION,
      payload: CallAction.START_WEB_CAM,
    });
  };

  const handleCallClick = async () => {
    console.log("START CALL CLICK");

    // Reference Firestore Collection
    const callDoc = Firestore.doc(Firestore.collection(firestore, "calls"));
    const offerCandidates = Firestore.collection(callDoc, "offerCandidates");
    const answerCandidates = Firestore.collection(callDoc, "answerCandidates");

    // Get candidates for caller, save to db
    setCallInputValue(callDoc.id);
    pc.onicecandidate = (event: any) => {
      event.candidate &&
        Firestore.addDoc(offerCandidates, event.candidate.toJSON());
    };

    // Create an offer
    const offerDescription = await pc.createOffer();
    await pc.setLocalDescription(offerDescription);

    const offer = {
      sdp: offerDescription.sdp,
      type: offerDescription.type,
    };

    await Firestore.setDoc(callDoc, { offer });

    // Listen for remote answer
    Firestore.onSnapshot(callDoc, (snapshot: any) => {
      const data = snapshot.data();
      if (!pc.currentRemoteDescription && data?.answer) {
        const answerDescription = new RTCSessionDescription(data.answer);
        pc.setRemoteDescription(answerDescription);
      }
    });

    // When answered, add candidate to peer connection
    Firestore.onSnapshot(answerCandidates, (snapshot: any) => {
      snapshot.docChanges().forEach((change: any) => {
        if (change.type === "added") {
          const candidate = new RTCIceCandidate(change.doc.data());
          pc.addIceCandidate(candidate);
        }
      });
    });
  };

  useEffect(() => {
    console.log("CALL INPUT VALUE CHANGED");
    console.log(callInputValue);
  }, [callInputValue]);

  const handleAnswerClick = async () => {
    console.log("ANSWER CALL CLICK");

    const callId = callInputValue;
    const callDoc = Firestore.doc(firestore, "calls", callId);

    const answerCandidates = Firestore.collection(callDoc, "answerCandidates");
    const offerCandidates = Firestore.collection(callDoc, "offerCandidates");

    pc.onicecandidate = (event: any) => {
      event.candidate &&
        Firestore.addDoc(answerCandidates, event.candidate.toJSON());
    };

    const callData = (await Firestore.getDoc(callDoc)).data();

    const offerDescription = callData?.offer;
    await pc.setRemoteDescription(new RTCSessionDescription(offerDescription));

    const answerDescription = await pc.createAnswer();
    await pc.setLocalDescription(answerDescription);

    const answer = {
      type: answerDescription.type,
      sdp: answerDescription.sdp,
    };

    await Firestore.updateDoc(callDoc, { answer });

    Firestore.onSnapshot(offerCandidates, (snapshot: any) => {
      snapshot.docChanges().forEach((change: any) => {
        console.log(change);
        if (change.type === "added") {
          let data = change.doc.data();
          pc.addIceCandidate(new RTCIceCandidate(data));
        }
      });
    });
  };

  const handleHangupClick = () => {
    console.log("HANGUP CALL CLICK");
    // Close the connection
    pc.close();

    // Stop the local stream
    if (localStream) {
      localStream?.getTracks().forEach((track: any) => track.stop());
    }

    // Stop the remote stream
    if (remoteStream) {
      remoteStream?.getTracks().forEach((track: any) => track.stop());
    }

    // Reset Redux states
    resetRedux();

    // Optional: Redirect or perform other actions after hanging up
  };

  return (
    <div
      className={`ml-12 mt-12 w-full flex flex-col items-start justify-center`}
    >
      <h1 className="pageHeading">Create or Join a Meeting</h1>
      <div className="videos">
        <span>
          <h3>Local</h3>
          <video id="webcamVideo" autoPlay playsInline></video>
        </span>
        <span>
          <h3>Remote</h3>
          <video id="remoteVideo" autoPlay playsInline></video>
        </span>
      </div>
      <div onClick={init}>START APP</div>
      <div id="webcamButton" onClick={handleStartWebcam}>
        Start webcam
      </div>
      <h2>Create a new Call</h2>
      <div id="webcamButton" onClick={handleCallClick}>
        Call
      </div>
      <h2>Join a Call</h2>

      <input
        id="callInput"
        value={callInputValue}
        onChange={(e: any) => setCallInputValue(e.target.value)}
      />
      <div id="answerButton" onClick={handleAnswerClick}>
        Answer
      </div>
      <div id="hangup" onClick={handleHangupClick}>
        Hangup
      </div>
    </div>
  );
};

export default DashboardScreen;
