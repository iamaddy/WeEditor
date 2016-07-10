(function (global) {
    
    function Editor(config){
        this.config = {
            inputTitleElem: 'title',
            inputContentElem: 'content',
            btnEmojiElem: 'btn_emoji',
            btnImgElem: 'btn_pic',
            btnSumbitElem: 'btn_sumbit',
            emojiEnable: 1,
            imgUploadEnable: 1,
            needTitle: 1,
            needTitleShow: 1,
            titleMaxLimit: 20,
            contentMinLimit: 5,
            contentMaxLimit: 3000,
            btnDisableClass: 'game-post__publish-btn_disable'
        };
        this.config = extend(this.config, config);

        this.inputTitleElement      = $(this.config.inputTitleElem);
        this.inputContentElement    = $(this.config.inputContentElem);
        this.btnSumbitElement       = $(this.config.btnSumbitElem);

        this.sumbitClickFunc        = this.config.sumbitClickFunc;

        this._init();
    }

    Editor.prototype = {
        constructor: Editor,
        _init: function(){
            this._loadPlugins();
            this._bindEvent();
            this.selection = new global.Selection({editorElem: this.config.inputContentElem});
        },
        _bindEvent: function(){
            this.inputTitleElement.addEventListener('focus', (function(){
                this._hidePlugins();
            }).bind(this), false);

            this.inputTitleElement.addEventListener('blur', (function(){
                this._showPlugins();
            }).bind(this), false);

            this.inputContentElement.addEventListener('focus', (function(){
                this._showPlugins();
                this.selection.saveSelection();
            }).bind(this), false);

            this.inputContentElement.addEventListener('blur', (function(){
                this.selection.saveSelection();
            }).bind(this), false);

            this.inputContentElement.addEventListener('input', (function(){
                this.selection.saveSelection();
                var len = this.getContent().length;
                if(len > this.config.contentMinLimit){
                    removeClass(this.btnSumbitElement, this.config.btnDisableClass);
                }else{
                    addClass(this.btnSumbitElement, this.config.btnDisableClass);
                }
            }).bind(this), false);

            this.btnSumbitElement.addEventListener('click', (function(){
                if(hasClass(this.btnSumbitElement, this.config.btnDisableClass)){
                    return;
                }

                var title = this._checkTitleLength();
                if(!title){
                    return;
                }

                var content = this._checkContentLength();
                if(!content){
                    return;
                }
                this._postDataToServer(title, content);
            }).bind(this), false);
        },
        _postDataToServer: function(title, content){
            this.sumbitClickFunc && this.sumbitClickFunc(title, content);
        },
        _showPlugins: function(){
            if(this.emojiPlugin){
                this.emojiPlugin.showEmojiIcon();
            }
            if(this.imgUploaderPlugin){
                this.imgUploaderPlugin.showIcon();
            }
        },
        _checkTitleLength: function(){
            var len = this.inputTitleElement.value.trim().length;
            if(len > this.titleMaxLimit){
                return false;
            }
            if(this.config.needTitle && len < 1){
                return false;
            }
            return this.inputTitleElement.value.trim();
        },
        _checkContentLength: function(){
            var len = this.inputContentElement.innerHTML.trim().length;
            if(len < this.contentMinLimit){
                return false;
            }else if(len > this.contentMaxLimit){
                return false;
            }
            return this.inputContentElement.innerHTML.trim();
        },
        _hidePlugins: function(){
            if(this.emojiPlugin){
                this.emojiPlugin.hideEmojiIcon();
            }
            if(this.imgUploaderPlugin){
                this.imgUploaderPlugin.hideIcon();
            }
        },
        _loadPlugins: function(){
            if(this.config.emojiEnable) {
                this.emojiPlugin = new global.EmojiPlugin({
                    elem: this.config.btnEmojiElem,
                    editor: this
                });
            }
            if(this.config.imgUploadEnable){
                this.imgUploaderPlugin = new global.ImgUploaderPlugin({
                    elem: this.config.btnImgElem,
                    editor: this
                });
            }
        },
        getConfig: function(key){
            return this.config[key];
        },
        setConfig: function(key, value){
            this.config[key] = value;
            return this;
        },
        getContent: function(){
            return this.inputContentElement.innerHTML;
        },
        getContentText: function(){
            return this.inputContentElement.innerText;
        },
        getTitle: function(){
            return this.inputTitleElement.value;
        },
        setTitle: function(value){
            this.inputTitleElement.value = value;
            return this;
        }
    };

    global.Editor = Editor;
})(WeEditor);