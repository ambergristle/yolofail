import Markdown from "markdown-to-jsx";
import TermsOfService from './terms.md'

// container: { marginTop: "30px", marginBottom: "20px" },
// h5: { margin: "20px 0px 10px 0px" },
// p: { textAlign: "justify", marginBottom: "10px" },
// a: Link

export default function Legal() {
    return (
        <Markdown 
            option={{
                overrides: {}
            }}
        >
            {TermsOfService}
        </Markdown>
    )
}