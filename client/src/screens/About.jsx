import React from "react";
import { Container } from "react-bootstrap";
import Meta from "../components/Meta";

const About = () => {
  return (
    <>
      <Meta
        title={`WD | About the Developer`}
        description={`Learn More about the developer`}
      />
      <Container fluid className="aboutMe">
        <img src="/images/headshot.jpg" alt="profile pic" />
        <div>
          <p className="storyText">
            <span
              className="navbar-signature gradient-text"
              style={{ fontSize: "2.25rem" }}
            >
              Austin Howard
            </span>{" "}
            is a proactive junior software developer with a passion for code and
            solid background of superior performance in foundational roles. He
            is a diligent, self-directed learner with more than 4 years of
            personal study, as well as instruction at professional educational
            institutions. Austin is proficient with several full-stack
            languages, frameworks, and libraries. He is also experienced in the
            day-to-day operations of businesses and the importance of each role
            within an organization.
          </p>
          <p className="storyText">
            From Early on in Austin's youth, technology seemed to come easy to
            him. Much like most people who pursue tech as a field. Austin had a
            constant yearning to consume technology. One of Austin's very first
            memories for technology came early about the first grade. The class
            was having a show-and-tell and a classmate had brought a computer
            game for the class to play on the teachers computer. The teacher had
            difficulty with the installation of the game, all until Austin gave
            it a shot, he was able to install the game and the class was able to
            enjoy the content. However it didnt dawn on Austin just what
            something like this meant until later in life.
          </p>
          <p className="storyText">
            Growing up in Southeast Appalachia, public education did what public
            education does best. It trained Austin to work long monotonous hours
            with the intent to either work in a factory or work in a coal mine.
            from the very beginning Austin knew that he would not be taking this
            kind of path in life. However it wasnt until he was in 8th grade
            that he knew what he wanted to do exactly with his life.
          </p>
          <p className="storyText">
            8th Grade brought Austin an amazing opportunity with schooling, it
            was then on the very last few weeks of 8th grade that the high
            school was partnering with the local community college to offer a
            course to grades 9-12, the course was known as Project-Lead-The-Way
            or PLTW, in its design it was to offer students a glance into the
            wonderful world of engineering by exposing prospective students to
            different fields of study. Such areas included CAD, Architecture and
            Electrical engineering. Austin fell in love with Electrical
            Engineering. Finally the world seemed a lot clearer. Austin began to
            devour these courses, so much so that his only reason for wanting to
            go to school was to atend these courses. From there it seemed like
            the future was known and Austin had a motto for his life. "To build
            a better future, we must create today." However life had its other
            plans.
          </p>
          <p className="storyText">
            It was in high school that Austin met the love of his life, His
            wife. Many things would change in that time, and ultimately it would
            lead to the point where it was unfeasible to pursue an Electrical
            Engineering Degree. In fact, it would seem that Austin would fall
            back into the mold that so many did, as he entered General
            non-skilled labor positions. Though this would turn to be a blessing
            in disguise. One fate-filled day while working an over-night
            position at Wal-Mart. Austin overheard a couple coworkers talking
            about playing Dungeons and Dragons. The idea of D&D intrigued
            Austin. After all, as an avid gamer RPG's where among the most
            favored. it was here with this group of rag-tag co-workers looking
            for a release from the work week. That Austin would discover the
            next step in his life.
          </p>
          <p className="storyText">
            As it would stand, running up to Dragons is likely the quickest way
            to die in D&D. It became a running joke of how long Austin's
            characters would last but it was in this flurry of mistakes that
            Austin noticed something. character creation, is a long tedious
            process to do on paper... An idea was hatched to create a character
            creator program that would speed up the process. From that idea came
            the realization that Software Development would be an amazing field
            to pursue. The concept was nearly the same as what had been thought
            earlier in Austins life "To build a better future, we must create
            today." The process of automation through software. Make life better
            by automating away the tediousness of life's problems.
          </p>
          <p className="storyText">
            From there Austin began to do a lot of research and self-teaching
            for Software Development starting with the book, "Python For The
            Absolute Begginer" and coming to a head of where Austin is now. With
            a combined knowledge from professional institutions, and
            self-learning. Austin wants to change the world through code.
            Automating processes and parts of life to make living easier.
          </p>
        </div>
      </Container>
    </>
  );
};

export default About;
