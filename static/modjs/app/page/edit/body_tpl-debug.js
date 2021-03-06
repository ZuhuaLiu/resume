//E:\ycx\git\resume\static\modjs\app\page\edit
define(function(require, exports, module) { 'use strict' 
	var Vue = require('vue/2.1.x/vue'),
		util = require('util/1.0.x/util'),
		MX = require('/vuex/mapmixin'),
		$ = require('dom/1.1.x/'),
		map = require('./map.js');

	var options={
			main:{
				bg:'green'
			},
			header:{
				name:"模板名字",
				style:{
					bgColor:'blue',
					fontSize:30,
					color:'#fff',
					left:20,
					top:20
				},
				city:{
					name:'广州',
					style:{
						color:'#fff',
						left:300,
						top:20
					}
				},
				phone:{
					name:'13710842956',
					style:{
						color:'#fff',
						left:300,
						top:50
					}
				},
				email:{
					name:'675036198@qq.com',
					style:{
						color:'#fff',
						left:300,
						top:80
					}
				},
				avatar:{
					url:'images/test.jpg',
					style:{
						width:100,
						height:100,
						left:480,
						top:4
					}
				}
			},
			education:{
				name:"教育背景",
				style:{
					fontSize:30,
					color:'red',
					left:20,
					top:120
				},
				time:{
					name:'201309-201706',
					style:{
						left:160,
						top:120
					}
				},
				detail:{
					name:'广东工业大学',
					style:{
						left:300,
						top:120
					}
				},
				supplement:{
					name:'信息管理与信息系统',
					style:{
						left:400,
						top:120
					}
				},
				desc:{
					name:'这是描述',
					style:{
						left:160,
						top:200
					}
				}
			},
			project:{
				name:"项目经验",
				style:{
					fontSize:30,
					color:'black',
					left:20,
					top:260
				},
				time:{
					name:'201309-201706',
					style:{
						left:160,
						top:260
					}
				},
				detail:{
					name:'XXX项目',
					style:{
						left:300,
						top:260
					}
				},
				supplement:{
					name:'补充一下',
					style:{
						left:400,
						top:260
					}
				},
				desc:{
					name:'这是描述',
					style:{
						left:160,
						top:360
					}
				}
			},
			work:{
				name:"工作经验",
				style:{
					fontSize:30,
					color:'blue',
					left:20,
					top:440
				},
				time:{
					name:'201309-201706',
					style:{
						left:160,
						top:440
					}
				},
				detail:{
					name:'XXX公司',
					style:{
						left:300,
						top:440
					}
				},
				supplement:{
					name:'补充一下',
					style:{
						left:400,
						top:440
					}
				},
				desc:{
					name:'这是描述',
					style:{
						left:160,
						top:540
					}
				}
			},
			profession:{
				name:"专业技能",
				style:{
					fontSize:30,
					color:'green',
					left:20,
					top:640
				},
				desc:{
					name:'这是描述',
					style:{
						left:160,
						top:640
					}
				}
			},
			footer:{
				bgColor:'#222222',
				style:{
					height:40
				},
			}
	}
	//处理options
	var computedOptions = {
		contactList: function(){
			var headerList = options.header;
			var newList = [];
			for (var attr in headerList) {
				if (attr === 'city' || attr === 'phone' || attr === 'email') {
					newList.push(headerList[attr]);
				}
			}
			return newList;
		},
		moduleList: function(){
			var optionList = options;
			var newList = [];
			for (var attr in optionList) {
				
				if (attr === 'main' || attr === 'header' || attr === 'footer') {
					continue;
				}
				newList.push(optionList[attr]);
			}
			return newList;
		},
		computedSrc: function(){

			var url = this.imgSrc ? this.imgSrc : options.header.avatar.url,
				index = url.indexOf('images/'),
				imgPath = url.substring(index);
				options.header.avatar.url = imgPath;

			return url;
		}
	}
	//自身方法
    var methods = {
		photoSubmit: function() {
			document.getElementById('photoSubmit').click();
		},
		// 图片上传回调
		uploadImageCallback: function(result) {
			this.imgSrc =  result.url;
		},
		events: function() {
			var vm = this;
			window.uploadImageCallbackFunc = function(result){
				vm.uploadImageCallback(result);
			}
			this.onSave();
			
		},
		// 保存按钮事件注册
		onSave: function() {
			var vm = this,
			    url = '',
			    doc = document,
				sectionTipTimer = null;

			doc.getElementById('save').addEventListener('click', function(){

				options.header.style.bgColor = map.radix[vm.currentBasicBg];
				url ='./save?'+'data='+encodeURIComponent(JSON.stringify(options));
				vm.$http.get(url).then(function(result){
	                if (result.status === 200) {
	                	vm.changeTipMsg("保存成功");
	                	doc.getElementById('sectionTip').classList.add('show');

	                	clearTimeout(sectionTip);
	                	sectionTipTimer = setTimeout(function () {
	                		doc.getElementById('sectionTip').classList.remove('show');
	                	},2000);

	                };
				});
			});
		},
		// 保存按钮事件注册
		onPreview: function() {
			var oSectionContent = document.getElementsByClassName('section-review__content')[0];
			var oSectionWrap = document.getElementsByClassName('section-review__wrap')[0];
			oSectionWrap.classList.add('active');
			var modules = [];
			var scale = 0.8;
			for (var index  in options ) {
				interval(options[index]);
			} 
			function interval(option) {
				var oDiv = document.createElement('div');
					oSectionContent.appendChild(oDiv);
				for (var attr in option) {
					if ( attr === 'name') {
						var oSpan = document.createElement('span');
						oSpan.innerHTML = option[attr];
						modules.push(oSpan);
					}
					else if ( attr === 'url' ) {
						var oImg = document.createElement('img');
						oImg.src = option[attr];
						modules.push(oImg);
					}else if ( attr === 'style' && modules[0]) {
						var styles = option[attr]; 
						var oSpan = modules.pop();
						oDiv.appendChild(oSpan);
						for (var i in styles){
							if ( i === 'color') {
								oSpan.style[i] = styles[i];
							}else if ( i === 'bgColor') {
								styles[i] === '#000000' ? (oSpan.style.backgroundColor = 'rgba(0,0,0,0)')
													 : (oSpan.style.backgroundColor = util.RGBToHex(styles[i]));
							}else {
								oSpan.style[i] = styles[i]+'px';
							}
					   			
						}
					}else if ( attr === 'style' && !modules[0]) {
						var styles = option[attr]; 
						for (var i in styles){
							if ( i === 'color') {
								oDiv.style[i] = styles[i];
							}else if ( i === 'bgColor') {
								styles[i] === '#000000' ? (oDiv.style.backgroundColor = 'rgba(0,0,0,0)')
													 : (oDiv.style.backgroundColor = util.RGBToHex(styles[i]));
							}else {
								oDiv.style[i] = styles[i]+'px';
							}
					   			
						}
						
					} else if ( typeof option[attr] === 'object'){
						interval(option[attr]);
					}

					
				}
			}
			
		}

	}
	var computedMix = util.extend(MX.mapState, MX.mapGetters, computedOptions);
	var methodsMix = util.extend(MX.mapMutations, MX.mapActions, methods);

	var bodyTpl = Vue.extend({
		template: '#tpl-body',
		mounted: function(){ //组件初始化
			this.events();
			// 获取简历数据
			var url='./getResume';
			this.$http.get(url).then(function(result){
				var message = result.body.message;
					delete message.id;
					delete message._id;
	   			if (Object.prototype.toString.call(message) === "[object Object]" ) {
	   				util.extend(this.options, message);
	   			};
			}.bind(this));
		},
		data: function(){
			return {
				options: options,
				imgSrc: ""
			}
		},
		computed: computedMix,
		methods: methodsMix,
		directives: {
		  	initStyle: {
		  		inserted: function (el, binding) {
				   	var computedStyle = {},
				   		scale = 0.8;

				   	map.attr.forEach(function(item){
				   		if(item === 'left' || item === 'top'){
				   			computedStyle[item] = parseInt( util.getPosition(el, item) ) * scale;
				   		}else if( item === 'backgroundColor' || item === 'color'){
				   			computedStyle[item] = util.RGBToHex( util.getStyle(el, item) );
				   		}else{
				   			computedStyle[item] = parseInt( util.getStyle(el, item) ) * scale;
				   		}
				   		
				   	});

					if (computedStyle.backgroundColor) {
	   					computedStyle.bgColor = computedStyle.backgroundColor;
	   					delete computedStyle.backgroundColor;
	   				}
				   	util.extend(binding.value, computedStyle); 	
				},
				update: function (el, binding) {
				   	var computedStyle = {},
				   		scale = 0.8;

				   	map.attr.forEach(function(item){
				   		if(item === 'left' || item === 'top'){
				   			computedStyle[item] = parseInt( util.getPosition(el, item) ) * scale;
				   		}else if( item === 'backgroundColor' || item === 'color'){
				   			computedStyle[item] = util.RGBToHex( util.getStyle(el, item) );
				   		}else{
				   			computedStyle[item] = parseInt( util.getStyle(el, item) ) * scale;
				   		}
				   		
				   	});

					if (computedStyle.backgroundColor) {
	   					computedStyle.bgColor = computedStyle.backgroundColor;
	   					delete computedStyle.backgroundColor;
	   				}
				   	util.extend(binding.value, computedStyle); 	
				}
		  	}
		}
	});
	return bodyTpl;

});
