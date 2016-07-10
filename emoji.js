(function(global){
	var QQ_FACE_2_TEXT = ["微笑", "撇嘴", "色", "发呆", "得意", "流泪", "害羞", "闭嘴", "睡", "大哭", "尴尬", "发怒", "调皮", "呲牙", "惊讶", "难过", "酷", "冷汗", "抓狂", "吐", "偷笑", "可爱", "白眼", "傲慢", "饥饿", "困", "惊恐", "流汗", "憨笑", "装逼", "奋斗", "咒骂", "疑问", "(嘘[.]{3}|嘘)", "晕", "折磨", "衰", "骷髅", "敲打", "再见", "擦汗", "抠鼻", "鼓掌", "糗大了", "坏笑", "左哼哼", "右哼哼", "哈欠", "鄙视", "委屈", "快哭了", "阴险", "亲亲", "吓", "可怜", "菜刀", "西瓜", "啤酒", "篮球", "乒乓", "咖啡", "饭", "猪头", "玫瑰", "凋谢", "示爱", "爱心", "心碎", "蛋糕", "闪电", "炸弹", "刀", "足球", "瓢虫", "便便", "月亮", "太阳", "礼物", "拥抱", "赞", "踩", "握手", "胜利", "抱拳", "勾引", "拳头", "差劲", "爱你", "NO", "OK", "爱情", "飞吻", "跳跳", "发抖", "怄火", "转圈", "磕头", "回头", "跳绳", "挥手", "激动", "街舞", "献吻", "左太极", "右太极", "双喜", "鞭炮", "灯笼", "发财", "K歌", "购物", "邮件", "帅", "喝彩", "祈祷", "爆筋", "棒棒糖", "喝奶", "下面", "香蕉", "飞机", "开车", "高铁左车头", "车厢", "高铁右车头", "多云", "下雨", "钞票", "熊猫", "灯泡", "风车", "闹钟", "打伞", "彩球", "钻戒", "沙发", "纸巾", "药", "手枪", "青蛙", "左车头", "右车头", "嘘", "嘘...", "大兵", "强", "弱"];

	function EmojiPlugin (config) {
		this.config = {
			emojiTextPrefix: '[',
			emojiTextSuffix: ']'
		};
		this.config 			= extend(this.config, config);
		this.emojiPanel 		= $('emojiPanel');
		this.activeClass 		= 'active';
		this.editor 			= config.editor;
		this.emojiIconElement 	= $(config.elem);

		this.init();
	}
	

	EmojiPlugin.prototype = {
		constructor: EmojiPlugin,
		init: function(){
			show(this.emojiIconElement);
			this.initEmojiPanel();
			this.bind();
		},
		getSingleEmojiText: function(text){
			return this.config.emojiTextPrefix + text + this.config.emojiTextSuffix;
		},
		bind: function(){
			this.emojiIconElement.addEventListener('click', (function(){
				if(this.emojiPanel.style.display === 'none'){
					this.showEmojiPopup();
				}else{
					this.hideEmojiPopup();
				}
			}).bind(this), false);

			this.emojiPanel.addEventListener('click', (function(e){
				var element = e.target;
				if(element.tagName.toUpperCase() === 'SPAN'){
					var index = element.getAttribute('index');
					if(index === '-1'){
						this.editor.selection.deleteNode();
					}else{
						var text = document.createTextNode(this.getSingleEmojiText(QQ_FACE_2_TEXT[+index]));
						this.editor.selection.insertNode(text);
					}
				}
			}).bind(this), false);
		},
		initEmojiPanel: function(){
			var html = ['<ul id="j-slider" class="ui-carousel-inner face-panel-wrap">'];
			var olHtml = ['<ol id="j-indicators" class="ui-carousel-indicators">'];
			for(var i = 0; i < 5; i++){ 
				html.push('<li class="ui-carousel-item face-panel face-panel-' + ( i + 1 ) + (i === 0 ? ' js-active' : '') + '">');
				for(var j = 0; j < 20; j++){
					html.push('<span index="' + j + '"></span>');
				}
				html.push('<span index="-1"></span>');
				html.push('</li>');
				olHtml.push('<li' + (i === 0 ? ' class="js-active"' : "") +  '></li>');
			}
			html.push('</ul>');
			olHtml.push('</ol>');
			$('emoji-panel').innerHTML = html.join('') + olHtml.join('');

			new Slider('j-slider', {});
		},
		softBankParser: function(){

		},
		qqFaceParser: function(){

		},
		showEmojiIcon: function(){
			show(this.emojiIconElement);
		},
		hideEmojiIcon: function(){
			hide(this.emojiIconElement);
			hide(this.emojiPanel);
			removeClass(this.emojiIconElement, this.activeClass);
		},
		showEmojiPopup: function(){
			addClass(this.emojiIconElement, this.activeClass);
			show(this.emojiPanel);
		},
		hideEmojiPopup: function(){
			hide(this.emojiPanel);
			removeClass(this.emojiIconElement, this.activeClass);
		}
	};

	WeEditor.EmojiPlugin = EmojiPlugin;
})(WeEditor);

