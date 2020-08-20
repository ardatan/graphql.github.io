import React from 'react';
import Highlight, { defaultProps } from "prism-react-renderer";
import Prism from './Prism';

interface Props {
  code: string
  language: string
}

const Basic = ({ code, language }: Props) => (
  <Highlight theme={undefined} {...defaultProps} code={code} language={language} Prism={Prism}>
    {({ className, tokens, getLineProps, getTokenProps }:any) => (
      <pre className={"prism " + className}>
        {tokens.map((line, i) => {
        if (line.length === 1 && line[0].content === '') {
          line[0].content = ' ';
        }
        return(
          <div {...getLineProps({ line, key: i })} style={{}}>
            {line.map((token, key) => (
              <span {...getTokenProps({ token, key })} style={{}} />
            ))}
          </div>
        )})}
      </pre>
    )}
  </Highlight>
)

export default Basic;