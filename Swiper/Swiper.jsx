// 引入库
import React, { Component, createRef } from 'react';
// 引入样式
import './Swiper.less';

// 定义组件
export default class Swiper extends Component {
	// 构造函数
	constructor(props) {
		super(props);
		// 状态
		this.state = {
			num: 0
		}
		// 循环定时器句柄
		this.timebar = null;
		// 创建ref
		this.container = createRef();
		// 节流器
		this.animate = false;
	}
	// 获取索引值方法
	getIndex(len) {
		// 如果len为0
		if (len === 0) {
			return 0
		}
		// 对长度取余
		return this.state.num % len;
	}
	// 根据图片的个数，创建按钮
	createBtns() {
		// 创建按钮
		return this.props.urls.map((url, index) => (
			<span 
				key={index} 
				onClick={e => this.toggle(index)} 
				className={this.getIndex(this.props.urls.length) === index ? 'choose' : ''}
			></span>
		))
	}
	// 切换索引值
	toggle(num) {
		// 如果动画进行中，不要切换了
		if (this.animate) {
			return;
		}
		// 结束循环器
		clearInterval(this.timebar)
		// 开始动画
		this.animate = true
		// 更新状态
		this.setState({ num })
		// 启动循环器
		this.startInterval();
	}
	// 启动循环
	startInterval() {
		this.timebar = setInterval(() => {
			// 获取num
			let num = this.state.num;
			// 显示下一张
			num++;
			// 更新状态
			this.setState({ num })
		}, this.props.time);
	}
	// 组件创建完成
	componentDidMount() {
		// 启动循环
		this.startInterval();
		// 监听css3动画
		// webkitTransitionStart, webkitTransitionEnd, webkitAnimationStart, webkitAnimationEnd
		// 监听container元素过渡结束
		this.container.current.addEventListener('webkitTransitionEnd', () => {
			// console.log('webkitTransitionEnd')
			// 过渡动画结束
			this.animate = false;
		})
	}
	// 选人
	render() {
		// 解构数据
		let { width, height, urls } = this.props;
		return (
			<div ref={this.container} className="ickt-swiper" style={{
				backgroundImage: `url(${urls[this.getIndex(urls.length)]})`,
				width,
				height
			}}>
				<div className="btns">{this.createBtns()}</div>
			</div>
		)
	}
}

// 默认属性
Swiper.defaultProps = {
	width: '100%',
	height: '100px',
	urls: [],
	time: 3000
}