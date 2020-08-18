import React from 'react';
import Highlight, { defaultProps } from "prism-react-renderer"

interface Props {
  code: string
  language: string
}


const Basic = ({ code, language }: Props) => (
  <Highlight {...defaultProps} code={code} language={language}>
    {({ className, tokens, getLineProps, getTokenProps }:any) => (
      <pre className={"prism " + className}>
        {tokens.map((line, i) => (
          <div {...getLineProps({ line, key: i })} style={{}}>
            {line.map((token, key) => (
              <span {...getTokenProps({ token, key })} style={{}} />
            ))}
          </div>
        ))}
      </pre>
    )}
  </Highlight>
)

export default Basic;