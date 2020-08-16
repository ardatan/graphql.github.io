// @ts-nocheck
import React from 'react';
import Prism from 'prismjs';

const graphqlComment = {
  pattern: /#.*/,
  greedy: true
};

const graphqlCommon = {
  string: {
    pattern: /"(?:\\.|[^\\"])*"/,
    greedy: true
  },
  number: /(?:\B-|\b)\d+(?:\.\d+)?(?:[eE][+-]?\d+)?\b/,
  boolean: /\b(?:true|false)\b/,
  variable: {
    pattern: /\$[a-z_]\w*/i,
    greedy: true
  },
  operator: /!|=|\.{3}/,
  punctuation: /[!(){|}[\]:=,]/
};

const graphqlDirective = {
  pattern: /@[a-z_]\w*(\([\w\W]*?\))?/i,
  inside: {
    function: /@[a-z_]\w*/i,
    args: {
      pattern: /\([\w\W]*?\)/,
      inside: {
        arg: /[a-z_]\w*(?=\s*:)/i,
        ...graphqlCommon
      }
    }
  }
};

Prism.languages.graphql = {
  comment: graphqlComment,
  'schema-def': {
    pattern: /\bschema\b[^{]*{[^{}]*}/,
    inside: {
      comment: graphqlComment,
      keyword: /\bschema\b|[a-zA-Z_]\w*(?=\s*:)/,
      'type-name': {
        pattern: /(:[\s\[]*)[a-z_]\w*/i,
        lookbehind: true
      },
      directive: graphqlDirective,
      punctuation: graphqlCommon.punctuation
    }
  },
  'union-def': {
    pattern: /\bunion\b[^=]+=\s*[a-zA-Z_]\w*(?:\s*\|\s*[a-zA-Z_]\w*)*/,
    inside: {
      comment: graphqlComment,
      keyword: /\bunion\b/,
      'type-name': {
        pattern: /([=|]\s*)[a-z_]\w*/i,
        lookbehind: true
      },
      directive: graphqlDirective,
      punctuation: graphqlCommon.punctuation
    }
  },
  'type-def': {
    pattern: /\b(?:type|interface|input|enum)\b[\w\W]+?{(?:[^{}]*|[^{}]*{[^{}]*}[^{}]*|[^{}]*{[^{}]*[^{}]*{[^{}]*}[^{}]*}[^{}]*)}/,
    inside: {
      comment: graphqlComment,
      fields: {
        pattern: /{(?:[^{}]*|[^{}]*{[^{}]*}[^{}]*|[^{}]*{[^{}]*[^{}]*{[^{}]*}[^{}]*}[^{}]*)}/,
        inside: {
          comment: graphqlComment,
          argDefs: {
            pattern: /\([\w\W]*?\)/,
            inside: {
              comment: graphqlComment,
              'attr-name': /[a-z_]\w*(?=\s*:)/i,
              'type-name': {
                pattern: /(:[\s\[]*)[a-z_]\w*/i,
                lookbehind: true
              },
              directive: graphqlDirective,
              ...graphqlCommon
            }
          },
          directive: graphqlDirective,
          'attr-name': {
            pattern: /[a-z_]\w*(?=\s*[:\(])/i,
            greedy: true,
          },
          'type-name': {
            pattern: /(:[\s\[]*)[a-z_]\w*/i,
            lookbehind: true
          },
          punctuation: /[!{}\[\]:=,]/,
        }
      },
      keyword: /\b(?:type|interface|implements|input|enum)\b/,
      directive: graphqlDirective,
      ...graphqlCommon,

      // 'type-name': /[a-z_]\w*/i,
    }
  },
  // string: /"(?:\\.|[^\\"])*"/,
  // number: /(?:\B-|\b)\d+(?:\.\d+)?(?:[eE][+-]?\d+)?\b/,
  // boolean: /\b(?:true|false)\b/,
  // variable: /\$[a-z_]\w*/i,
  // directive: {
  //   pattern: /@[a-z_]\w*/i,
  //   alias: 'function'
  // },
  directive: graphqlDirective,
  'attr-name': /[a-z_]\w*(?=\s*:)/i,
  'keyword': [
    {
      pattern: /(fragment\s+(?!on)[a-z_]\w*\s+|\.\.\.\s*)on\b/,
      lookbehind: true
    },
    /\b(?:query|mutation|subscription|fragment|extend|scalar)\b/
  ],
  ...graphqlCommon,
  // 'operator': /!|=|\.{3}/,
  // 'punctuation': /[!(){}\[\]:=,]/,
  // comment: /#.*/,
  // 'enum': /[a-z_]\w*/i
};

Prism.languages.json = {
  'attr-name': {
    pattern: /"(?:\\.|[^\\"])*"(?=\s*:)/i,
    greedy: true
  },
  string: {
    pattern: /"(?:\\.|[^\\"])*"/,
    greedy: true
  },
  boolean: /\b(?:true|false)\b/,
  keyword: /\bnull\b/,
  number: /(?:\B-|\b)\d+(?:\.\d+)?(?:[eE][+-]?\d+)?\b/,
  punctuation: /[{}[\],:]/,
};



export default function PrismComponent(props) {
  const lines = [];
  if (props.line) {
    props.line.split(',').forEach(range => {
      const parts = range.split('-');
      if (parts.length === 1) {
        lines.push(parts[0].trim());
      } else {
        const start = parseInt(parts[0].trim(), 10);
        const end = parseInt(parts[1].trim(), 10);
        for (let ii = start; ii <= end; ii++) {
          lines.push(ii);
        }
      }
    });
  }


  const language = props.language;
  const grammar = Prism.languages[language] || Prism.languages['javascript'];

  return (
    <pre className={'prism language-' + language}>
      {reactify(props.children, grammar)}
      {lines.map(function(line, ii) {
        return (
          <div
            className="line-highlight"
            key={ii}
            style={{height: 21, top: 17 * (line - 1)}}
          />
        );
      })}
    </pre>
  );
}



const reactify = function(o, language, parent, key) {
  if (typeof o == 'string') {
    return o;
  }

  if (Prism.util.type(o) === 'Array') {
    return o.map(function(element, i) {
      return reactify(element, language, o, i);
    });
  }
}