import EventBinding from './EventBinding';
import ComponentDemo from './ComponentDemo';

// App->index.js->public/index.html(root)
const count = 100

function getName() {
  return 'jack'
}

const list = [
  { id: 1001, name1: 'vue' },
  { id: 1002, name1: 'React' },
  { id: 1003, name1: 'Angular' }
]

// 【基础条件渲染】1. 定义条件控制变量标志
const isLogin = true

// 【复杂条件渲染】1. 定义类型控制变量 (1, 2, 3 代表三种不同的情况)
const type = 2 // 1: 单图模式, 2: 双图模式, 3: 三图模式

// 【复杂条件渲染】2. 自定义函数结合 if-else，根据不同的条件返回不同的 JSX 结构
function getArticleJSX() {
  if (type === 1) {
    return <div>单图文章模式</div>
  } else if (type === 2) {
    return <div>双图文章模式</div>
  }
}

function App() {
  return (
    <div className="App">
      {/* 1. 渲染 React 组件调用示例 */}
      <ComponentDemo />
      <hr />
      {/* 2. 渲染 React 事件绑定组件示例 */}
      <EventBinding />
    </div>
  );
}

export default App;
