//项目的入口，从这里开始运行

//React必要的两个核心包
import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import App from './App';

//把App根组件节点渲染到ID为ROOT的dom节点上
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
