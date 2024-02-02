import Markdown, { type MarkdownToJSX } from 'markdown-to-jsx';

import termsOfService from './terms.md';

/** @todo flesh out styling */
const options: MarkdownToJSX.Options = {
  overrides: {
    h4: (props) => <h4 {...props} className="mb-1 mt-2 scroll-m-20 text-xl font-semibold tracking-tight" />,
    p: (props) => <p {...props} className="mb-1 text-justify text-muted-foreground" />,
    a: (props) => <a {...props} className="underline-offset-4 hover:underline" />,
  },
};

const Legal = () => {
  return (
    <main className="pt-10">
      <Markdown options={options}>
        {termsOfService}
      </Markdown>
    </main>
  );
};

export default Legal;
