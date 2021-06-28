import Markdown from "markdown-to-jsx";
import { Container, Typography, Link, makeStyles } from "@material-ui/core";

import termsOfService from "../public/terms-of-service.md";

// add spacing between header/footer, define override styling
const useStyles = makeStyles((theme) => ({
  container: { marginTop: "30px", marginBottom: "20px" },
  h5: { margin: "20px 0px 10px 0px" },
  p: { textAlign: "justify", marginBottom: "10px" },
}));

// render terms of service .md
const Legal = () => {
  const { container, h5, p } = useStyles();

  // override default tag assignments, use components to set styling
  const options = {
    overrides: {
      h5: (props) => (
        <Typography color="primary" variant="h5" {...props} className={h5} />
      ),
      p: (props) => <Typography {...props} className={p} />,
      a: (props) => <Link display="inline" color="primary" {...props} />,
    },
  };

  return (
    <Container maxWidth="md" className={container} component="main">
      <Markdown options={options}>{termsOfService}</Markdown>
    </Container>
  );
};

export default Legal;
