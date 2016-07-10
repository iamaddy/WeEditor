(function(global){
	
	function ImgUploaderPlugin (config) {
		this.config = {
			previewFile: function(file){
				new UploadImageView(file, {editor: config.editor});
			}
		};

		this.inputFileElement 	= $(config.elem);
		this.editor 			= config.editor;
		this.init();
	}
	ImgUploaderPlugin.prototype = {
		constructor: ImgUploaderPlugin,
		init: function(){
			show(this.inputFileElement);
			this.bind();
		},
		bind: function(){
			this.inputFileElement.addEventListener('change', (function(e){
				var files = e.target.files;
				for(var i = 0 ; i < files.length; i++){
					this._previewFile(files[i]);
				}
			}).bind(this), false);


		},
		_uploadFile: function(){

		},
		_previewFile: function(file){
			this._readFile(file, (function(url) {
				this.config.previewFile && this.config.previewFile(url);
				this._uploadFile();
			}).bind(this));
		},
		_readFile: function(file, callback) {
			if (typeof FileReader == 'undefied')
			 	return;

			var reader = new FileReader();

			reader.readAsDataURL(file);
			reader.onload = function() {
				callback && callback(this.result);
			};
		},
		showIcon: function(){
			show(this.inputFileElement);
		},
		hideIcon: function(){
			hide(this.inputFileElement);
		}
	};



	function UploadImageView(file, config){
		if(!file) return;
		this.config = {};
		this.config = extend(this.config, config);
		
		this.render(file);
	}
	UploadImageView.prototype = {
		constructor: UploadImageView,
		render: function(file){
			
			var div = document.createElement('div');
			div.className = 'insert-img-content';
			div.setAttribute('contenteditable', false);
			div.innerHTML = '<img src="' + file + '" /><span class="delete">x</span>';
			
			this.viewUI = div;
			this.config.editor.selection.insertNode(div);
			
			this.bind();
		},
		bind: function(){
			this.viewUI.addEventListener('click', (function(e){
				if(e.target.tagName.toUpperCase() === 'SPAN' && e.target.className === 'delete'){
					this._delete();
				}
			}).bind(this), false);
		},
		_delete: function(){
			var p = this.viewUI.parentNode;
			p && p.removeChild(this.viewUI);
		}
	},

	WeEditor.ImgUploaderPlugin = ImgUploaderPlugin;

})(WeEditor);

