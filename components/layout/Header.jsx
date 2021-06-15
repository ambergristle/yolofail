import Link from "next/link";
import { Box, Typography, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  logoLink: { cursor: "pointer" },
}));

const Header = () => {
  const { header, logoLink } = useStyles();

  return (
    <Box className={header} component="header">
      <Link href={"/"} passHref>
        <Typography variant="h3" color="primary" className={logoLink}>
          yolofail
        </Typography>
      </Link>
    </Box>
  );
};

export default Header;
