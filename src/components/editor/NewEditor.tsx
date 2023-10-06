import { highlight, languages } from 'prismjs'
// import loadLanguages from 'prismjs/components/'
import 'prismjs/components/prism-clike'
import 'prismjs/components/prism-java'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-python'
import 'prismjs/components/prism-tsx'
import 'prismjs/components/prism-typescript'
import 'prismjs/themes/prism-tomorrow.css' // Example style, you can use another
import { useState } from 'react'
import Editor from 'react-simple-code-editor'

export function NewEditor () {
  const exampleCode = '//Example code:\nfunction add(a, b) {\n  return a + b;\n}'
  const [code, setCode] = useState(exampleCode)

  const codeLanguages: string[] = [
    'tsx',
    'jsx',
    'typescript',
    'javascript',
    'java',
    'python'
  ]

  const [codeLanguage, setCodeLanguage] = useState(codeLanguages[3])
  return (
    <div>
      <select
        defaultValue={codeLanguage}
        onChange={e => {
          const index: number = codeLanguages.findIndex(lang => lang === e.target.value)
          setCodeLanguage(codeLanguages[index])
        }
        }>
        {
          codeLanguages.map((lang, index) => (
            <option key={index} value={lang}>
              {lang}
            </option>
          ))
        }
      </select>
      <Editor
        value={code}
        onValueChange={newCode => setCode(newCode)}
        highlight={newCode => {
          return highlight(newCode, languages[codeLanguage], codeLanguage)
        }}
        padding={10}
        style={{
          backgroundColor: 'black',
          borderRadius: 10,
          color: 'white',
          fontFamily: '"Fira code", "Fira Mono", monospace',
          fontSize: 16
        }}
        />
    </div>
  )
}
