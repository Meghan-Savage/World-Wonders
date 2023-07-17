import React, { useState } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "@fortawesome/fontawesome-free/css/all.css";

import { faGithub } from "@fortawesome/free-brands-svg-icons/faGithub";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Tooltip,
} from "@material-tailwind/react";
import Tilt from "react-parallax-tilt";

const AboutUs = () => {
  library.add(fab, faGithub);

  const [isMegHovered, setIsMegHovered] = useState(false);
  const [isDomHovered, setIsDomHovered] = useState(false);
  const [isDengHovered, setIsDengHovered] = useState(false);

  const cardStyle = {
    transition: "transform 0.3s ease",
    transform: "translate(0, 0)",
    background: "linear-gradient(to right, #FFCC80, #FFE0B2)",
    color: "#FFFFFF",
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
  };
  const noStyle = {
    transition: "transform 0.3s ease",
    transform: "translate(0, 0)",
    background: "none",
    color: "#FFFFFF",
    boxShadow: "none",
  };

  return (
    <div className="flex justify-center gap-6  bg-gradient-to-t from-orange-500 to-orange-100">
      <Tilt
        className="w-96"
        tiltMaxAngleX={10}
        tiltMaxAngleY={10}
        perspective={1000}
        scale={1.02}
      >
        <Card
          className="parallax-tilt bg-gradient-to-r from-orange-500 to-orange-100"
          style={isMegHovered ? cardStyle : noStyle}
          onMouseEnter={() => setIsMegHovered(true)}
          onMouseLeave={() => setIsMegHovered(false)}
        >
          <CardHeader floated={false} className="h-80">
            <img src="/profile/ms.png" alt="profile-picture" />
          </CardHeader>
          <CardBody className="text-center">
            <Typography variant="h4" color="blue-gray" className="mb-2">
              Meghan Savage
              <Typography
                color="blue"
                className="font-bold text-xl"
                textGradient
              >
                FrontEnd Specialist / Full-Stack
              </Typography>
              <p className="text-sm">
                I am a fast-learning full-stack developer proficient in the MERN
                tech stack and ThreeJS, JavaScript, and various frameworks. With
                a keen aptitude for quickly grasping new technologies, I excel
                at developing efficient, scalable, and user-friendly solutions.
                I am driven by a passion for continuous learning, always seeking
                to expand my knowledge and stay up-to-date with the latest
                industry trends.
              </p>
            </Typography>
          </CardBody>
          <CardFooter className="flex justify-center gap-7 pt-2">
            <Tooltip content="LinkedIn">
              <Typography
                as="a"
                href="https://www.linkedin.com/in/meghan-a-savage/"
                variant="lead"
                color="blue"
                textGradient
              >
                <i className="fab fa-linkedin text-4xl " />
              </Typography>
            </Tooltip>
          </CardFooter>
        </Card>
      </Tilt>
      <Tilt
        className="w-96"
        tiltMaxAngleX={10}
        tiltMaxAngleY={10}
        perspective={1000}
        scale={1.02}
      >
        <Card
          className="parallax-tilt"
          style={isDomHovered ? cardStyle : noStyle}
          onMouseEnter={() => setIsDomHovered(true)}
          onMouseLeave={() => setIsDomHovered(false)}
        >
          <CardHeader floated={false} className="h-80">
            <img src="/profile/dom1.jpg" alt="profile-picture" />
          </CardHeader>
          <CardBody className="text-center">
            <Typography variant="h4" color="blue-gray" className="mb-2">
              Dom Anyanga
              <Typography
                color="blue"
                className="font-bold text-xl"
                textGradient
              >
                Full-Stack Web Developer
              </Typography>
              <p className="text-sm">
                Experienced heavy-duty technician who successfully completed a
                6-month rigorous 6-month project-based training focusing on MERN
                stack development. Eagerly pursuing a career as a Full Stack
                Developer to apply my newfound expertise in developing scalable
                web applications, combining technical proficiency, a strong work
                ethic, and a commitment to delivering results.
              </p>
            </Typography>
          </CardBody>
          <CardFooter className="flex justify-center gap-7 pt-2">
            <Tooltip content="LinkedIn">
              <Typography
                as="a"
                href="https://www.linkedin.com/in/dominic-anyanga-2a5b3527b/"
                variant="lead"
                color="blue"
                textGradient
              >
                <i className="fab fa-linkedin text-4xl" />
              </Typography>
            </Tooltip>
          </CardFooter>
        </Card>
      </Tilt>
      <Tilt
        className="w-96"
        tiltMaxAngleX={10}
        tiltMaxAngleY={10}
        perspective={1000}
        scale={1.02}
      >
        <Card
          className="parallax-tilt"
          style={isDengHovered ? cardStyle : noStyle}
          onMouseEnter={() => setIsDengHovered(true)}
          onMouseLeave={() => setIsDengHovered(false)}
        >
          <CardHeader floated={false} className="h-80">
            <img
              src="/profile/IMG_1436.jpg"
              alt="profile-picture"
              style={{ objectFit: "cover", width: "100%", height: "100%" }}
            />
          </CardHeader>

          <CardBody className="text-center">
            <Typography variant="h4" color="blue-gray" className="mb-2">
              Deng Benjamin
              <Typography
                color="blue"
                className="font-bold text-xl"
                textGradient
              >
                Full-Stack Web Developer
              </Typography>
              <p className="text-sm">
                As someone who works on all aspects of building software, from
                the database to the server to the user interface, I really enjoy
                what I do. Paying close attention to the small details is
                extremely important to me, and I strive to write efficient and
                organized code. I have a strong passion for creating
                applications that work smoothly and provide an outstanding
                experience to the users.
              </p>
            </Typography>
          </CardBody>
          <CardFooter className="flex justify-center gap-7 pt-2">
            <Tooltip content="LinkedIn">
              <Typography
                as="a"
                href="https://www.linkedin.com/in/deng-benjamin-57a735240/"
                variant="lead"
                color="blue"
                textGradient
              >
                <i className="fab fa-linkedin text-4xl" />
              </Typography>
            </Tooltip>
          </CardFooter>
        </Card>
      </Tilt>
    </div>
  );
};

export default AboutUs;
