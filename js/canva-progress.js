
$(document).ready(function(){
    var canvas = document.getElementById('canvas');
    // canvas.width = 1980;	//这里写也可以
    // canvas.height = 1080;
    if (canvas.getContext('2d')) {
        var context = canvas.getContext('2d');

        var per = 87;	// 进度
        var r = 400;	// 圆环尺寸
        var left = 100;		// 左边距
        var top = left;		// 上边距
        var lineWidth = r/30;	// 背景圆环宽度
        var progressWidth = r/10;	// 前景圆环宽度
        var fontsize = 150;		// 中间文字大小

        var bgColor = [
            ["0", "magenta"],
            ["0.5", "blue"],
            ["1", "red"],
        ];
        var fgColor = [
            ["0", "magenta"],
            ["0.3", "blue"],
            ["0.6", "magenta"],
            ["1", "red"],
        ];
        var txColor = [
            ["0", "rgb(90,36,180)"],
            ["0.3", "rgb(56,124,163)"],
            ["0.6", "rgb(82,173,200)"],
            ["1", "rgb(85,195,158)"],
        ];
        var cirColor = 'rgb(255,0,0)';
        
        // console.log(r+left)

        
        function animPregress(context, progress){
            context.clearRect(0, 0, canvas.width, canvas.height);
            // console.log("画布尺寸：", canvas.width, canvas.height)

            // 1. 画圆环
            context.beginPath();
            context.arc(r+left, r+top, r, 0, 2*Math.PI, false);	
            /* 参数列表：
                centerx弧心x,
                centery弧心y,
                radius半径,
                startingAngle起始弧度,
                endingAngle结束弧度,
                anticlockwise=false逆时针吗 */
            context.closePath();	//closePath会自动封闭图形，若不希望图形封闭可以光写beginPath不写closePath，对fill没用
            context.lineWidth = lineWidth;
            // 配置渐变笔触，参数：x0,y0,x1,y1
            var gradient=context.createLinearGradient(left,top,r+left,r+top);
            // console.log("背景圆环渐变颜色");	
            for(i in bgColor){
                // console.log(bgColor[i])
                gradient.addColorStop(bgColor[i][0],bgColor[i][1]);
            }
            // gradient.addColorStop("0","magenta");
            // gradient.addColorStop("0.5","blue");
            // gradient.addColorStop("1.0","red");
            context.strokeStyle=gradient;	// 用渐变进行填充
            context.stroke();


            // 2. 中间文字
            var tWidth = fontsize * 2.1;
            var tHeight = fontsize * 1.2;
            var tPosX = r+left - tWidth/2;
            var tPosY = r+top + tHeight/4;
            context.beginPath();
            // 渐变范围
            var gradient=context.createLinearGradient(tPosX, tPosY - tHeight, tPosX + tWidth, tPosY - tHeight);
            // x0, y0, x1, y1
            // 阴影
            context.shadowColor = 'rgba(0,0,0,0.9)';
            context.shadowOffsetX = 2;
            context.shadowOffsetY = 2;
            context.shadowBlur = 2;
            // 渐变色
            // console.log("文本渐变颜色");
            for(i in txColor){
                // console.log(txColor[i])
                gradient.addColorStop(txColor[i][0],txColor[i][1]);
            }
            // gradient.addColorStop(0,'rgb(90,36,180)');
            // gradient.addColorStop(0.3,'rgb(56,124,163)');
            // gradient.addColorStop(0.6,'rgb(82,173,200)');
            // gradient.addColorStop(1,'rgb(85,195,158)');
            // 字符大小
            context.font = fontsize + "px Microsoft YaHei";
            context.fillStyle = gradient;
            // context.strokeStyle = '#f00';	//	红色笔触
            context.closePath();
            // 字符位置
            context.fillText(progress + "%", tPosX, tPosY);
            // context.restore();
            
            // 画矩形
            // context.rect(tPosX, tPosY - tHeight, tWidth, tHeight);
            // context.stroke();			

            // 3. 画圆弧
            context.beginPath();
            context.arc(r+left, r+top, r, -0.5*Math.PI, (2*progress/100-0.5)*Math.PI, false);	
            /* 参数列表：
                centerx弧心x,
                centery弧心y,
                radius半径,
                startingAngle起始弧度,
                endingAngle结束弧度,
                anticlockwise=false逆时针吗 */
            context.lineWidth = progressWidth;
            // 配置渐变笔触，参数：x0,y0,x1,y1
            var gradient=context.createLinearGradient(left,top,r+left,r+top);	
            // console.log("前景圆环渐变颜色");	
            for(i in fgColor){
                // console.log(fgColor[i])
                gradient.addColorStop(fgColor[i][0],fgColor[i][1]);
            }
            // gradient.addColorStop("0","magenta");
            // gradient.addColorStop("0.5","blue");
            // gradient.addColorStop("1.0","red");
            context.strokeStyle=gradient;	// 用渐变进行填充
            context.stroke();
            
            // per
            // 4. 小圆点
            var circleSize = r/20;

            context.beginPath();
            // -0.5*Math.PI, (progress/100-0.5)*Math.PI
            context.arc(r+left - Math.sin((progress/100-0.5)*2*Math.PI) * r, r+top + Math.cos((progress/100-0.5)*2*Math.PI)  * r, circleSize, 0, 2*Math.PI, false);	
            /* 参数列表：
                centerx弧心x,
                centery弧心y,
                radius半径,
                startingAngle起始弧度,
                endingAngle结束弧度,
                anticlockwise=false逆时针吗 */
            context.closePath();	//closePath会自动封闭图形，若不希望图形封闭可以光写beginPath不写closePath，对fill没用
            context.strokeStyle = cirColor;
            context.stroke();


        }

        
        
        // x: 0
        // t: current time
        // b: begining value
        // c: change in value
        // d: duration
        function easeOutExpo(x, t, b, c, d) {  
            return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;  
        }
        function easeOutBounce(x, t, b, c, d) {  
            if ((t/=d) < (1/2.75)) {  
                return c*(7.5625*t*t) + b;  
            } else if (t < (2/2.75)) {  
                return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;  
            } else if (t < (2.5/2.75)) {  
                return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;  
            } else {  
                return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;  
            }  
        }


        
        var progr = 0;
        function cons(){
            // console.log(progr);
            animPregress(context, progr);
            // progr = parseInt(easeOutExpo(0, 0, 0, 0, 0));
            progr += 1;
            if(progr > per) {
                int = window.clearInterval(int);
            }
        }
        var int=window.setInterval((progr)=>cons(progr), 30);

    } else {
        alert("当前浏览器不支持Canvas，请更换浏览器后再试");
    }
    
});

// -Math.pow(2, -10 * t/d) > 0
