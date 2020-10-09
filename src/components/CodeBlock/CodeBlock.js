import React, { useRef, useEffect, useState } from "react"
import { parse } from "parse-numeric-range"
import Highlight, { defaultProps } from "prism-react-renderer"
import theme from "prism-react-renderer/themes/vsDark"
import Clipboard from "clipboard"
import classes from "./CodeBlock.module.css"

const delay = duration => new Promise(resolve => setTimeout(resolve, duration))

/**
 * Source https://github.com/github/linguist/blob/master/lib/linguist/languages.yml
 */
const languageColors = (_lang) => {
  switch (_lang) {
    case 'js':
    case 'javascript':
      return {
        backgroundColor: '#f1e05a',
        color: 'black'
      }

    case 'css':
      return {
        backgroundColor: '#563d7c',
        color: 'white'
      }

      case 'html':
      return {
        backgroundColor: '#e34c26',
        color: 'white'
      }
  
      case "diff":
        return {
          backgroundColor: "#ccffcc",
          color: "black",
        }
    default:
      return {
        backgroundColor: '#b8b8b8',
        color: 'black'
      }
  }
}

export default function CodeBlock({ children }) {
  const copyBtn = useRef(null)
  const [copied, setCopied] = useState(false)
  const theCode = children.props.children.trim()

  useEffect(() => {
    if (copyBtn.current) {
      var clipboard = new Clipboard(copyBtn.current, {
        text: trigger => theCode,
      })

      return () => {
        clipboard.destroy()
      }
    }
  }, [theCode])

  const copyClicked = async e => {
    setCopied(true)

    await delay(1000)

    setCopied(false)
  }

  const className = children.props.className || ""
  const matches = className.match(/language-(?<lang>.*)/)
  const lang = matches && matches.groups && matches.groups.lang
  ? matches.groups.lang
  : ""
  const linesToHighlight = children.props["highlight"]
    ? parse(children.props["highlight"])
    : []

  return (
    <div className={`${classes.wrapper} rounded`}>
      {children.props["title"] && <div className="text-blue-300 opacity-50 p-4 border-b border-blue-900 border-solid">{children.props["title"]}</div>}
      <div className={`relative pt-8`}>
      <span style={{ ...languageColors(lang) }} className={`${classes.languageBadge} top-0 absolute px-2 py-1 rounded-bl-sm rounded-br-sm text-xs uppercase`}>{lang?lang:'TEXT'}</span>
      <button
        className={`${classes.copyButton} text-xs`}
        onClick={copyClicked}
        ref={copyBtn}
        disabled={copied}
      >
        {copied ? "Copied" : "Copy"}
      </button>
      <div className="gatsby-highlight">
        <Highlight
          {...defaultProps}
          theme={theme}
          code={theCode}
          language={
            lang
          }
        >
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre className={className} style={style}>
              {tokens.map((line, i) => {
                const lineProps = getLineProps({ line, key: i })
                if (linesToHighlight.includes(i + 1)) {
                  lineProps.className = `${lineProps.className} highlight-line`
                }
                return (
                  <div {...lineProps}>
                    {children.props["numbers"] && <span className="select-none pr-3 opacity-50 text-right">{i + 1}</span>}
                    {line.map((token, key) => (
                      <span {...getTokenProps({ token, key })} />
                    ))}
                  </div>
                )
              })}
            </pre>
          )}
        </Highlight>
      </div>
    </div>
    </div>
  )
}
