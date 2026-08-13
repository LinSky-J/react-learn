// React中获取DOM

import { useRef } from "react"

// 1. useRef生成ref对象 绑定到dom标签身上

// 2. dom可用时，ref.current获取dom
// 渲染完毕之后dom生成之后才可用

function DomRefDemo () {
  const inputRef = useRef(null)
  const showDom = () => {
    console.dir(inputRef.current)
  }
  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h2>React 中获取 DOM (useRef) 示例</h2>
      <hr />
      <input type="text" ref={inputRef} placeholder="点击按钮获取此 DOM 节点..." style={{ padding: '6px 12px', marginRight: '10px' }} />
      <button onClick={showDom} style={{ padding: '6px 12px', cursor: 'pointer' }}>获取dom</button>
    </div>
  )
}

export default DomRefDemo
