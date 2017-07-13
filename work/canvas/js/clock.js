var dom = document.getElementById("clock");
var ctx = dom.getContext('2d');
var width = ctx.canvas.width;//获取canvas画布的宽
var height = ctx.canvas.height;
var r = width / 2;

//
function drawBackground(){
	ctx.save();
	ctx.translate(r,r);//将原点移至正方形的中心
	ctx.beginPath();//定义开始路径
	ctx.lineWidth = 10;//定义线条的宽度
	ctx.arc( 0 , 0 , r , 0 , 2*Math.PI , false);//定义画圆的路径坐标（0,0）半径r,开始0-结束2*Math.PI，false表示顺时针
	ctx.stroke();//线条填充

	var hourNumber = [3,4,5,6,7,8,9,10,11,12,1,2];
	ctx.font = '18px Arial';//设置字体
	ctx.textAlign = "center";
	ctx.textBaseline = "middle";
	hourNumber.forEach(function(number , i){//循环打印出小时数

		var rad = 2 * Math.PI / 12 * i;//计算每个小时对应的角度大小
		var x = Math.cos(rad) * (r - 30);//计算x坐标
		var y = Math.sin(rad) * (r - 30);//计算y坐标
		ctx.fillText(number , x , y);//将数字填充到canvas中

	});

	for(var  i = 0 ; i < 60 ; i++){//画小圆点60个
		var rad = 2 * Math.PI /60 *i;//计算每个小圆点所占的角度
		var x = Math.cos(rad) * (r - 18);//计算x坐标
		var y = Math.sin(rad) * (r - 18);//计算y坐标
		ctx.beginPath();//设置开始
		if(i % 5 === 0 ){//判断当为整点时，小圆点颜色为黑色
			ctx.fillStyle = '#000';
			ctx.arc(x, y , 2 , 0 , 2 * Math.PI , false);
		}else{//当不为整点事，小圆点为灰色
			ctx.fillStyle = '#ccc';
			ctx.arc(x, y , 2 , 0 , 2 * Math.PI , false);
		}
		ctx.fill();//填充小圆点
	}
}

function drawHour(hour , minute){//画时针
	ctx.save();
	ctx.beginPath();
	var rad = 2 * Math.PI / 12 * hour; 
	var mrad = 2 * Math.PI / 12 / 60 * minute;
	ctx.rotate(rad + mrad);
	ctx.lineWidth = 6;
	ctx.lineCap = 'round';
	ctx.moveTo(0 , 10);
	ctx.lineTo(0 , -r/2);
	ctx.stroke(); 
	ctx.restore();
}

function drawMinute(minute){//画时针
	ctx.save();
	ctx.beginPath();
	var rad = 2 * Math.PI / 60 * minute;
	ctx.rotate(rad);
	ctx.lineWidth = 3;
	ctx.lineCap = 'round';
	ctx.moveTo(0 , 10);
	ctx.lineTo(0 , -r + 38);
	ctx.stroke();
	ctx.restore();
}

function drawSecond(second){//画时针
	ctx.save();
	ctx.beginPath();
	ctx.fillStyle = '#ddd';
	var rad = 2 * Math.PI / 60 * second;
	ctx.rotate(rad);
	ctx.moveTo(-2 , 18);
	ctx.lineTo(2 , 18);
	ctx.lineTo(1 , -r + 18);
	ctx.lineTo(-1 , -r + 18);
	ctx.fill();
	ctx.restore();
}

function drawDot(){
	ctx.beginPath();
	ctx.fillStyle = "#fff";
	ctx.arc(0 , 0 , 3 , 2 * Math.PI , false );
	ctx.fill();
}


function draw(){
	ctx.clearRect(0 , 0 , width , height)
	var now = new Date();
	var hour = now.getHours();
	var minute = now.getMinutes();
	var second = now.getSeconds();
	drawBackground();
	drawHour(hour , minute);
	drawMinute(minute);
	drawSecond(second)
	drawDot()
	ctx.restore();
}
draw()
setInterval(draw , 1000)

