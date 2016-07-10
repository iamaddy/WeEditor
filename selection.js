(function(global){
    var supportRange = typeof document.createRange === 'function';

    function $(id){
        return document.getElementById(id);
    }

    function Selection(config){
        this.currentRange = null;
        this.editor = $(config.editorElem);
    }

    Selection.prototype = {
        constructor: Selection,
        getCurrentRange: function(){
            var selection,
                range,
                _parentElem;


            if(supportRange){
                selection = document.getSelection();
                if (selection.getRangeAt && selection.rangeCount) {
                    range = document.getSelection().getRangeAt(0);
                    _parentElem = range.commonAncestorContainer;
                }
            }else{
                range = document.selection.createRange();
                _parentElem = range.parentElement();
            }

            if( _parentElem && (contains(this.editor, _parentElem) || this.editor === _parentElem) ){
                this.parentElem = _parentElem;
                return range;
            }
            return range;
        },
        saveSelection: function(){
            // 手机端blur，不会保存最近的range，range为空了，因为保留最后一次range
            var range = this.getCurrentRange();
            if(range){
                this.currentRange = range;
            }
        },
        selectRange: function(){
            if(!this.currentRange){
                return;
            }
            var selection,
                range;
            if(supportRange){
                selection = document.getSelection();
                selection.removeAllRanges();
                selection.addRange(this.currentRange);
            }else{
                range = document.createRange();
                range.setEndPoint('EndToEnd', currentRange);
                if(currentRange.text.length === 0){
                    range.collapse(false);
                }else{
                    range.setEndPoint('StartToStart', currentRange);
                }
                range.select();
            }
        },
        insertImage: function(imgSrc){
            this.selectRange();
            if(document.selection){
                this.currentRange.pasteHTML(html); 
            }
            else{
                document.execCommand("insertImage", false, imgSrc);
            }
            this.saveSelection();
        },
        insertNode: function(node){
            var selection;

            if(this.currentRange){
                this.currentRange.insertNode(node);
            }else{
                this.editor.appendChild(node);
            }

            if(supportRange){
                if(this.currentRange){
                    this.currentRange.setStartAfter(node, 0);
                }else{
                    var tempRange = document.createRange();
                    tempRange.setStartAfter(node, 0);
                    this.currentRange = tempRange;
                }
                selection = document.getSelection();
                selection.removeAllRanges();
                selection.addRange(this.currentRange);
            }
        },
        deleteNode: function(){
            this.selectRange();
            document.execCommand('delete');
            this.editor.blur();
        }
    }


    function contains(a, b) {
        if (b) {
            while ((b = b.parentNode)) {
                if (b === a) {
                    return true;
                }
            }
        }
        return false;
    }

    global.Selection =  Selection;

})(WeEditor);