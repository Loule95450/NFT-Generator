//Settings//
var speed = 1000; //ms
var pixelSize = 20; //px
var seed = new Date().getTime().toString().slice(-6) + "1111";
var colors = ["#3498db", "#ffffff", "#1abc9c", "#e74c3c", "#9b59b6", "#2ecc71", "#f39c12", "#ffffff", "#f1c40f", "#c0392b"];
////

document.addEventListener("DOMContentLoaded", function() {
		function toggle() {
				seed = new Date().getTime().toString().slice(-6) + "1111";
				createCanvas();
		}

		toggle();
		document.querySelector("#reload").addEventListener("click", toggle);
	
		document.querySelector("#download").addEventListener("click", function() {
			var link = document.createElement('a');
			link.download = "NFT" + Date.now() + ".png";
			link.href = document.querySelector("canvas").toDataURL()
			link.click();
			toggle();
	}, false);
});

function createCanvas() {
		var rows = Math.round(window.innerHeight / 24);
		if (document.querySelector("canvas")) {
				var canvas = document.querySelector("canvas");
		} else {
				var canvas = document.createElement("canvas");
				document.body.appendChild(canvas);
		}

		var context = canvas.getContext("2d");
		canvas.style.marginLeft = -(rows * pixelSize / 2) + "px";
		canvas.style.marginTop = -(rows * pixelSize) / 2 + "px";
		canvas.width = rows * pixelSize;
		canvas.height = rows * pixelSize;

		var count = 0;
		var x = 0;
		var y = 0;

		for (var i = 0; i < rows * rows; i++) {
				if (i > 0) {
						if (i % rows === 0) {
								x = 0;
								y = y + pixelSize;
						}
				}

				var newColors = [];
				for (var j = 0; j < seed.length; j++) {
						var num = parseInt(seed.charAt(j));
						newColors.push(colors[num]);
				}

				context.clearRect(x, y, canvas.width, canvas.height);
				context.fillStyle = newColors[Math.floor(Math.random() * newColors.length) + 0];
				context.fillRect(x, y, pixelSize, pixelSize);
				x = x + pixelSize;
		}
}

function seedGen() {
		seed = document.querySelector("#seed").value;
		createCanvas();
}