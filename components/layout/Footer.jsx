import Link from "next/link";
import { Box, Typography, makeStyles } from "@material-ui/core";

// set spacing, style typography as link
const useStyles = makeStyles((theme) => ({
  footer: {
    padding: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  footerLink: {
    cursor: "pointer",
    "&:hover": { textDecoration: "underline" },
  },
}));

// link to legal, about?, social?
const Footer = () => {
  const { footer, footerLink } = useStyles();

  return (
    <Box className={footer} component="footer">
      <Link href={"/legal"} passHref>
        <Typography color="textSecondary" className={footerLink}>
          legal
        </Typography>
      </Link>
    </Box>
  );
};

export default Footer;
