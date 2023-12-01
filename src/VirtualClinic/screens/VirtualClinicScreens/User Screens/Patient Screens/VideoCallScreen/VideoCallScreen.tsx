import styles from "VirtualClinic/screens/VirtualClinicScreens/User Screens/Patient Screens/VideoCallScreen/VideoCallScreen.module.css";
import { useNav } from "VirtualClinic/hooks/useNav";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "VirtualClinic/redux/rootReducer";
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
} from "VirtualClinic/redux/VirtualClinicRedux/types";
import * as Firestore from "firebase/firestore";
import { set } from "mongoose";
import firebaseConfig from "firebaseConfig";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = Firestore.getFirestore(app);

const VideoCallScreen = () => {
  const { userData } = useSelector((state: RootState) => state.userReducer);
  const { pc, localStream, remoteStream, currentAction } = useSelector(
    (state: RootState) => state.videoCallReducer
  );

  const [isAnswering, setIsAnswering] = useState<boolean>(false);
  const [callInput, setCallInput] = useState<any>(null);
  const [callInputValue, setCallInputValue] = useState<any>(null);

  const [roomCode, setRoomCode] = useState<any>(null);
  const [webcamVideo, setWebcamVideo] = useState<any>(null);
  const [remoteVideo, setRemoteVideo] = useState<any>(null);
  const dispatch: any = useDispatch();

  enum CallAction {
    INIT = "INIT",
    START_WEB_CAM = "START_WEB_CAM",
    ANSWER = "ANSWER",
  }

  useEffect(() => {
    // init();
    // change color of body to var(--dark-green)
    document.body.style.backgroundColor = "var(--dark-green)";
    resetRedux();

    return () => {
      document.body.style.backgroundColor = "";
      setIsAnswering(false);
    };
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
      await dispatch({
        type: CURRENT_CALL_ACTION,
        payload: CallAction.INIT,
      });
    }
  };

  const printRedux = (label?: any) => {};

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
      case CallAction.INIT:
        handleStartWebcam();
        break;
      case CallAction.START_WEB_CAM:
        startWebcam();
        break;
      case CallAction.ANSWER:
        handleAnswerClick(roomCode);
        break;
      default:
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

    if (isAnswering) {
      await dispatch({
        type: CURRENT_CALL_ACTION,
        payload: CallAction.ANSWER,
      });
    } else {
      await handleCallClick();
    }
  };

  const handleStartWebcam = async () => {
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
    // Reference Firestore Collection
    const callDoc = Firestore.doc(Firestore.collection(firestore, "calls"));
    const offerCandidates = Firestore.collection(callDoc, "offerCandidates");
    const answerCandidates = Firestore.collection(callDoc, "answerCandidates");

    // Get candidates for caller, save to db
    setCallInputValue(callDoc.id);
    if (!isAnswering) {
      setRoomCode(callDoc.id);
    }
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

  useEffect(() => {}, [callInputValue]);

  useEffect(() => {}, [roomCode]);

  const handleAnswerClick = async (callId: any) => {
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
        if (change.type === "added") {
          let data = change.doc.data();
          pc.addIceCandidate(new RTCIceCandidate(data));
        }
      });
    });
  };

  const handleHangupClick = () => {
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

  const handleJoinClick = async () => {
    setIsAnswering(true);
    await init();
  };

  return (
    <div className="w-full h-full relative">
      <div
        style={{ visibility: currentAction == null ? "visible" : "hidden" }}
        className="w-full h-full absolute flex flex-col items-center justify-center"
      >
        <div
          className="mb-5 cursor-pointer"
          onClick={init}
          style={{ color: "white" }}
        >
          CREATE A MEETING
        </div>
        <div className="mb-5" style={{ color: "white" }}>
          or
        </div>
        <input
          id="callInput"
          className="mb-2"
          value={roomCode}
          onChange={(e: any) => {
            // setCallInputValue(e.target.value);
            setRoomCode(e.target.value);
          }}
        />
        <div
          onClick={handleJoinClick}
          className="cursor-pointer"
          style={{ color: "white" }}
        >
          JOIN
        </div>
      </div>
      <div
        style={{ visibility: currentAction != null ? "visible" : "hidden" }}
        className={`p-10 pt-8 w-full flex flex-col items-center justify-center`}
      >
        {/* <h1 className="pageHeading">Create or Join a Meeting</h1> */}
        <div className="w-3/4 flex gap-x-12 justify-center items-center">
          <div className={`flex flex-col items-center gap-y-6`}>
            <span>
              <video
                className={`${styles.videoContainer}`}
                id="webcamVideo"
                autoPlay
                playsInline
              ></video>
            </span>
            <span>
              <video
                className={`${styles.videoContainer}`}
                id="remoteVideo"
                autoPlay
                playsInline
              ></video>
            </span>
          </div>
          <div className="h-full flex flex-col items-center justify-center">
            <div
              id="hangup"
              style={{ color: "white" }}
              className="cursor-pointer"
              onClick={handleHangupClick}
            >
              Hangup
            </div>
            <div style={{ color: "white" }}>{roomCode}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCallScreen;
