import { Highlight, themes } from 'prism-react-renderer'

interface EditorProps {
  language: any
  children: any
}

export function Editor ({ language, children }: EditorProps) {
  return (
    <Highlight
      {...Highlight}
      theme={themes.dracula}
      language={language}
      code={children}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
      <pre style={style}>
        {tokens.map((line, i) => (
          <div key={i} {...getLineProps({ line })}>
            <span>{i + 1}</span>
            {line.map((token, key) => (
              <span key={key} {...getTokenProps({ token })} />
            ))}
          </div>
        ))}
      </pre>
        )}
    </Highlight>
  )
}
