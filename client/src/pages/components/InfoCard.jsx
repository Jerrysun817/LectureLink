import styles from "./InfoCard.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { GrLike } from "react-icons/gr";
import Button from "react-bootstrap/Button";
import { Card } from "react-bootstrap";
import { auth } from "../../../firebase/config.js";
import profilePic from "../../../assets/default-pfp.png";
import { addLike } from "../../api/userApi.js";
import emailjs from "@emailjs/browser";

export const InfoCard = ({
  name,
  pronouns,
  major,
  courses = [],
  imageUrl,
  openPopup,
  likedEmail,
}) => {
  const likeProfile = async () => {
    try {
      const response = await addLike({
        cur_email: auth?.currentUser?.email,
        liked_email: likedEmail,
        _id: auth.currentUser?.uid,
      });

      if (response.status === 304) {
        alert("You have already liked this user!");
      } else if (response.status === 200) {
        alert("You have successfully matched with this user!");
        console.log(response);
        Promise.all([
          emailjs.send(
            "service_3amt6v9",
            "template_5wxsx7z",
            {
              liked_email: response.data.matched_pair[0].cur_email,
              liker_email: response.data.matched_pair[1].liked_email,
              liker_name: response.data.matched_pair[1].liked_student_name,
            },
            "-QmFSgsRfPaEkn-oU"
          ),
          emailjs.send(
            "service_3amt6v9",
            "template_5wxsx7z",
            {
              liked_email: response.data.matched_pair[1].liked_email,
              liker_email: response.data.matched_pair[0].cur_email,
              liker_name: response.data.matched_pair[0].cur_student_name,
            },
            "-QmFSgsRfPaEkn-oU"
          ),
        ])
          .then((response) => {
            alert("Email successfully sent!", response.status, response.text);
          })
          .catch((error) => {
            console.error("Error sending emails:", error);
          });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Card className={styles.card}>
      <div className="d-flex justify-content-between ">
        <Button variant="">
          <FontAwesomeIcon
            icon={faArrowUp}
            className={styles.icon}
            onClick={openPopup}
          />
        </Button>
        <Button
          variant=""
          onClick={() => {
            likeProfile();
          }}
        >
          <GrLike className={styles.icon} />
        </Button>
      </div>
      <Card.Title className="d-flex flex-row justify-content-around align-items-center ">
        <img
          src={imageUrl ? imageUrl : profilePic}
          alt="profile picture"
          style={{ width: "100px", height: "100px", borderRadius: "50%" }}
        />
        {
          <div className="d-flex flex-column">
            <h2>{`${name} (${pronouns})`}</h2>
            <h5>{`${major}`}</h5>
          </div>
        }
      </Card.Title>
      <Card.Body
        style={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <div className={styles.courses}>
          {courses.map((course, index) => (
            <Button key={index} disabled>
              {course}
            </Button>
          ))}
        </div>
      </Card.Body>
    </Card>
  );
};
