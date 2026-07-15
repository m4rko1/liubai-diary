export const SITE = {
  title: '留白日记',
  description: '关于创造、技术与日常生活的个人笔记。',
  author: '林默',
  email: 'hello@example.com',
  location: 'Shanghai, China',
};

export const formatDate = (date: Date) =>
  new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
