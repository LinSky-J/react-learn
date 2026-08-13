// ==========================================
// React Bilibili/社交风格评论区页面 (Comment Section Demo)
// 功能特点：
// 1. 使用 useState 管理评论列表状态与输入框状态
// 2. 当前登录用户定义 (currentUser)
// 3. 【核心条件渲染】：只能删除自己发布的评论 (comment.user.id === currentUser.id)
// 4. 支持点赞 / 动态发布评论 / 用户身份切换测试
// ==========================================

import React, { useState } from 'react';
import _ from 'lodash';
import './index.css';
import avatarCurrent from './avatar_current.jpg';
import avatarOther from './avatar_1.jpg';

// 初始默认评论列表数据（模仿参考图内容）
const initialComments = [
  {
    rpid: 1001,
    user: {
      id: 101, // 当前用户 ID
      name: '放手-青鸟',
      avatar: avatarCurrent,
      level: 'LV6'
    },
    content: 'react18 用js。。。还有创建项目用crap，说实话不像2023年的视频，生态很多都不适配了，但总归是18的视频还是有参考的',
    ctime: '2023-10-24 22:20',
    like: 38,
    isLike: false
  },
  {
    rpid: 1002,
    user: {
      id: 102, // 其它用户 ID
      name: '中兰蓝',
      avatar: avatarOther,
      level: 'LV4'
    },
    content: '记账本那个有些静态资源没有的，可以复制我的 git clone https://gitee.com/zuixihuanxingnai/react---bookkeeping.git',
    ctime: '2026-01-02 14:21',
    like: 13,
    isLike: false
  },
  {
    rpid: 1003,
    user: {
      id: 103, // 其它用户 ID
      name: '今宵酒醒何处-c',
      avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Felix',
      level: 'LV6'
    },
    content: '主后端的，新公司活少，抽空看看React，视频全程开弹幕，叽叽歪歪的人太多了，讲一个东西就有人跳出来讲Vue，都是搬砖工具，框架有相似之处是好事，学起来方便。只能说这些人班是没上的，懂哥是要当的。',
    ctime: '2024-08-07 09:33',
    like: 94,
    isLike: false
  }
];

// 导航 Tab 列表数据 (包含 type 与 text)
const tabs = [
  { type: 'hot', text: '最热' },
  { type: 'time', text: '最新' }
];

function CommentDemo() {
  // ------------------------------------------
  // 1. 定义当前登录用户 State (模拟已登录的用户)
  // ------------------------------------------
  const [currentUser, setCurrentUser] = useState({
    id: 101,
    name: '放手-青鸟',
    avatar: avatarCurrent,
    level: 'LV6'
  });

  // ------------------------------------------
  // 2. 评论列表状态 (useState 数组)
  // ------------------------------------------
  const [comments, setComments] = useState(initialComments);

  // ------------------------------------------
  // 3. 发送评论输入框文本状态
  // ------------------------------------------
  const [inputText, setInputText] = useState('');

  // ------------------------------------------
  // 4. 排序 Tab 类型状态 ('hot': 最热 | 'time': 最新)
  // ------------------------------------------
  const [type, setType] = useState('hot');

  // 切换 Tab 点击处理函数
  const handleTabChange = (type) => {
    setType(type);
  };

  // 使用 lodash 的 orderBy 方法根据当前 type 动态计算排序后的评论列表
  // type === 'hot' 按点赞数 'like' 降序 ('desc')
  // type === 'time' 按发布时间戳 'rpid' 降序 ('desc')
  const displayComments = _.orderBy(
    comments,
    type === 'hot' ? 'like' : 'rpid',
    'desc'
  );

  // ------------------------------------------
  // 删除评论处理函数
  // 遵循 useState 状态不可变原则，使用 filter 产生新数组
  // ------------------------------------------
  const handleDelete = (rpid) => {
    // 过滤掉匹配 rpid 的评论
    setComments(comments.filter(item => item.rpid !== rpid));
  };

  // ------------------------------------------
  // 发布评论处理函数
  // ------------------------------------------
  const handlePublish = () => {
    if (!inputText.trim()) {
      alert('请输入评论内容');
      return;
    }

    // 构造一条全新的评论对象
    const newComment = {
      rpid: Date.now(), // 用时间戳作为唯一ID
      user: { ...currentUser },
      content: inputText,
      ctime: new Date().toLocaleString(),
      like: 0,
      isLike: false
    };

    // 将新评论置顶插入列表
    setComments([newComment, ...comments]);
    // 清空输入框
    setInputText('');
  };

  // ------------------------------------------
  // 点赞 / 取消点赞处理函数
  // ------------------------------------------
  const handleLike = (rpid) => {
    setComments(
      comments.map(item => {
        if (item.rpid === rpid) {
          return {
            ...item,
            like: item.isLike ? item.like - 1 : item.like + 1,
            isLike: !item.isLike
          };
        }
        return item;
      })
    );
  };

  // 快捷切换登录身份（方便测试权限制约束）
  const toggleUserIdentity = (userId) => {
    if (userId === 101) {
      setCurrentUser({
        id: 101,
        name: '放手-青鸟',
        avatar: avatarCurrent,
        level: 'LV6'
      });
    } else {
      setCurrentUser({
        id: 102,
        name: '中兰蓝',
        avatar: avatarOther,
        level: 'LV4'
      });
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '30px auto', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', color: '#222' }}>
      
      {/* 顶部体验测试控制条 */}
      <div style={{ backgroundColor: '#fffbe6', border: '1px solid #ffe58f', padding: '12px 16px', borderRadius: '8px', marginBottom: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <span>⚙️ <strong>当前登录身份测试：</strong> </span>
          <span style={{ color: '#ff6699', fontWeight: 'bold' }}>{currentUser.name} (ID: {currentUser.id})</span>
        </div>
        <div>
          <button 
            onClick={() => toggleUserIdentity(101)}
            style={{ padding: '4px 12px', marginRight: '8px', borderRadius: '4px', border: '1px solid #ff6699', background: currentUser.id === 101 ? '#ff6699' : '#fff', color: currentUser.id === 101 ? '#fff' : '#ff6699', cursor: 'pointer' }}>
            切为: 放手-青鸟 (ID:101)
          </button>
          <button 
            onClick={() => toggleUserIdentity(102)}
            style={{ padding: '4px 12px', borderRadius: '4px', border: '1px solid #1890ff', background: currentUser.id === 102 ? '#1890ff' : '#fff', color: currentUser.id === 102 ? '#fff' : '#1890ff', cursor: 'pointer' }}>
            切为: 中兰蓝 (ID:102)
          </button>
        </div>
      </div>

      {/* 评论头部：评论数量与【最热 | 最新】排序选项（完全还原截图组件） */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '30px', marginBottom: '20px' }}>
        {/* 左侧：标题与总数 */}
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
          <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#222' }}>评论</span>
          <span style={{ fontSize: '14px', color: '#9499a0' }}>{comments.length}</span>
        </div>

        {/* 右侧：循环渲染 tabs 数组标签，匹配 type===item.type 设置高亮类名 active */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px' }}>
          {tabs.map((item, index) => (
            <React.Fragment key={item.type}>
              <span
                onClick={() => handleTabChange(item.type)}
                className={type === item.type ? 'nav-item active' : 'nav-item'}>
                {item.text}
              </span>
              {/* 分隔符 '|' */}
              {index < tabs.length - 1 && <span style={{ color: '#e3e5e7' }}>|</span>}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* 发表评论输入框 */}
      <div style={{ display: 'flex', gap: '16px', marginBottom: '30px' }}>
        <img 
          src={currentUser.avatar} 
          alt={currentUser.name} 
          style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }} 
        />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="发一条友善的评论吧..."
            rows={3}
            style={{ width: '100%', padding: '10px 14px', borderRadius: '6px', border: '1px solid #e3e5e7', outline: 'none', resize: 'vertical', fontSize: '14px' }}
          />
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button
              onClick={handlePublish}
              style={{ backgroundColor: '#00aeec', color: '#fff', border: 'none', padding: '8px 24px', borderRadius: '6px', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer' }}>
              发布评论
            </button>
          </div>
        </div>
      </div>

      <hr style={{ border: 'none', borderTop: '1px solid #e3e5e7', margin: '20px 0' }} />

      {/* 评论列表区域（根据 sortType 动态渲染 displayComments） */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {displayComments.map((item) => (
          <div key={item.rpid} style={{ display: 'flex', gap: '16px' }}>
            {/* 头像 */}
            <img 
              src={item.user.avatar} 
              alt={item.user.name} 
              style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }} 
            />

            {/* 主体内容 */}
            <div style={{ flex: 1 }}>
              {/* 用户名与等级勋章 */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <span style={{ fontSize: '14px', fontWeight: 'bold', color: item.user.id === currentUser.id ? '#ff6699' : '#61666d' }}>
                  {item.user.name}
                </span>
                <span style={{ fontSize: '10px', color: '#ff6699', border: '1px solid #ff6699', padding: '0 4px', borderRadius: '3px', fontWeight: 'bold' }}>
                  {item.user.level}
                </span>
              </div>

              {/* 评论正文 */}
              <p style={{ fontSize: '15px', color: '#18191c', lineHeight: '1.6', margin: '0 0 10px 0', whiteSpace: 'pre-line' }}>
                {item.content}
              </p>

              {/* 底部信息栏：发布时间、点赞、踩、回复、以及【删除】按钮 */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px', fontSize: '13px', color: '#9499a0' }}>
                <span>{item.ctime}</span>

                {/* 点赞 */}
                <span 
                  onClick={() => handleLike(item.rpid)} 
                  style={{ cursor: 'pointer', color: item.isLike ? '#00aeec' : '#9499a0', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  👍 {item.like > 0 ? item.like : '点赞'}
                </span>

                {/* 踩 */}
                <span style={{ cursor: 'pointer' }}>👎</span>

                {/* 回复 */}
                <span style={{ cursor: 'pointer' }}>回复</span>

                {/* ========================================================== */}
                {/* 核心需求：只能删除自己发布的评论 (item.user.id === currentUser.id) */}
                {/* 条件渲染判断：只有发布者 ID 与 当前登录用户 ID 一致时才渲染删除按钮 */}
                {/* ========================================================== */}
                {item.user.id === currentUser.id && (
                  <button
                    onClick={() => handleDelete(item.rpid)}
                    style={{ background: 'none', border: 'none', color: '#f5222d', cursor: 'pointer', fontSize: '13px', padding: 0 }}>
                    删除
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CommentDemo;
