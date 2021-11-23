import Link from "next/link";
import { useState } from "react";
import { Box, Typography, makeStyles } from "@material-ui/core";
import Feedback from "./Feedback";

// set spacing, style typography as link
const useStyles = makeStyles((theme) => ({
  footer: {
    padding: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  footerLink: {
    padding: "0px 5px",
    cursor: "pointer",
    "&:hover": { textDecoration: "underline" },
  },
}));

// link to legal, feedback (popup), about?, social?
const Footer = () => {
  const { footer, footerLink } = useStyles();

  const [show, setShow] = useState(false);

  const showForm = () => setShow(true);
  const hideForm = () => setShow(false);

  return (
    <Box className={footer} component="footer">
      <Link href={"/legal"} passHref>
        <Typography color="textSecondary" className={footerLink}>
          legal
        </Typography>
      </Link>
      <Box onClick={showForm}>
        <Typography color="textSecondary" className={footerLink}>
          feedback
        </Typography>
      </Box>
      <Feedback show={show} handleHide={hideForm} />
    </Box>
  );
};

export default Footer;
