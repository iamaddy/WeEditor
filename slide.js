
    

    function Slider(element, config) {
        this.$element = $(element);
        this.$indicators = $('j-indicators');

        this.options = config;

        this.containerWidth = 256 || config.containerWidth || 
                            this.$element.clientWidth || 
                            window.innerWidth;

        this.activeClass = 'js-active';

        this.paused = this.sliding 
                    = this.interval 
                    = this.$active 
                    = this.$items 
                    = null;

        this.index = 0;
        this.init();
        this.swipeable();

    }


    Slider.prototype = {
        init: function(){
            this.$items = this.$element.children;
            this.size = this.$items.length;

            this.$element.style.width = this.size * this.containerWidth + 'px';
        },
        swipeable: function(){
            var that = this;
            var x, y, dixX, dixY, distance = 20;
            this.$element.addEventListener('touchstart', function(e){
                x = e.touches[0].clientX;
                y = e.touches[0].clientY;
            }, false);

            this.$element.addEventListener('touchmove', function(e){
                dixX = e.touches[0].clientX - x;
                dixY = e.touches[0].clientY - y;
                that.$element.style.transform = 'translate(' + (dixX -(that.index * that.containerWidth)) + 'px, 0px)';
            }, false);

            this.$element.addEventListener('touchend', function(e){
                dixX = e.changedTouches[0].clientX - x;
                dixY = e.changedTouches[0].clientY - y;
                if(dixX > distance){
                    that.prev();
                }else if(dixX < -distance){
                    that.next();
                }else{
                    that.slide();
                }
            }, false);

            this.$element.addEventListener('touchcancle', function(){
                that.slide();
            });

            function transitionEnd(){
                that.sliding = false;
                that.setIndicators();
            }

            this.$element.addEventListener('webkitTransitionEnd', transitionEnd);
            
            this.$element.addEventListener('transitionend', transitionEnd);
        },
        setIndicators: function(){
            var items = this.$indicators.children;
            for(var i = 0; i < items.length; i++){
                removeClass(items[i], this.activeClass);
            }
            addClass(items[this.index], this.activeClass);
            return this;
        },
        next: function(){
            !this.sliding && this.slide('right');
        },
        prev: function(){
            !this.sliding && this.slide('left');
        },
        slide: function(selection){
            this.sliding = true;
            var distance;
            if(selection === 'right' && this.index < this.size - 1){
                distance = -(this.index + 1) * this.containerWidth;
                this.index++;
            }else if(selection === 'left' && this.index > 0){
                distance = -(this.index - 1 ) * this.containerWidth;
                this.index--;
            }else{
                distance = - this.index * this.containerWidth;
            }
            this.$element.style.transition = 'transform .5s ease';

            this.$element.style.transform = 'translate(' + distance + 'px, 0px)';
        }
    };
    