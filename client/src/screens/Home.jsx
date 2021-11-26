import React from "react";
//importing typewriter-effect
import Typewriter from "typewriter-effect";
import { Row } from "react-bootstrap";

const Home = () => {
  return (
    <div className="typeWriterContainer">
      <div className="typeWriterParent">
        <p className="typeWriterIntro">Hi, I am Austin Howard,</p>
        <Typewriter
          onInit={(typewriter) => {
            typewriter
              .typeString("a Father.")
              .pauseFor(1000)
              .deleteAll()

              .typeString("a Husband.")
              .pauseFor(1000)
              .deleteAll()

              .typeString("a Singer.")
              .pauseFor(1000)
              .deleteAll()

              .typeString("a Visionary.")
              .pauseFor(1000)
              .deleteAll()

              .typeString("a Software Developer!")

              .start();
          }}
        />
      </div>
      <Row></Row>
    </div>
  );
};

export default Home;
