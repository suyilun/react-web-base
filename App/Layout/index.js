import AdminLayout from './AdminLayout';
import IndexLayout from './IndexLayout';

require('./AppLayout.less');

// export default { AdminLayout, IndexLayout };
module.exports = { AdminLayout, IndexLayout };
// export default bar => module.default.bar
// 使用 import bar from 'bar'  意思为 bar.js 的default属性
// 而module.exports ={bar} 则表示 export.bar
// 需要使用import {bar} from 'bar.js'
