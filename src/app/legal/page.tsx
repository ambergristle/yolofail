import Markdown, { type MarkdownToJSX } from 'markdown-to-jsx';
import termsOfService from './terms.md';

// container: { marginTop: "30px", marginBottom: "20px" },
// h5: { margin: "20px 0px 10px 0px" },
// p: { textAlign: "justify", marginBottom: "10px" },
// a: Link

const options: MarkdownToJSX.Options = {
  overrides: {
    h4: (props) => <h4 {...props} className="scroll-m-20 text-xl font-semibold tracking-tight" />,
    p: (props) => <p {...props} className="text-justify" />,
    a: (props) => <a {...props} className="underline-offset-4 hover:underline" />,
  },
};

const Legal = () => {
  return (
    <main className="container">
      <Markdown options={options}>
        {termsOfService}
      </Markdown>
    </main>
  );
};

export default Legal;
