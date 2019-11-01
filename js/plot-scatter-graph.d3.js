const margin = {top: 40, right: 40, bottom: 40, left: 50},
	  width = 550 - margin.left - margin.right,
	  height = 370 - margin.top - margin.bottom;

function plotScatterGraph(containerSelector, pointData, pathData) {
	const svg = d3.select(containerSelector)
		.append("svg")    
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)    
		.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	// Create the axis scales
	let xScale = d3.scaleLinear()
		.range([0, width]);
	let yScale = d3.scaleLinear()
		.range([height, 0]);	
	xScale.domain(d3.extent(pointData, (d)=> d.x)).nice();
	yScale.domain(d3.extent(pointData, (d)=> d.y)).nice();

	// Add the x-axis
	svg.append("g")
		.attr("class", "x axis")
		.attr("transform", "translate(0," + height + ")")
		.call(d3.axisBottom(xScale));

	// Add the y-axis
	svg.append("g")
		.attr("class", "y axis")
		.call(d3.axisLeft(yScale));

	//Add lines if paths supplied
	if (pathData) {
		var line = d3.line()
			 .x(function(d) { return xScale(d.x) })
			 .y(function(d) { return yScale(d.y) });
		var path = svg.append('path')
			.attr('d', line(pathData))
			.attr("stroke", "#ccc")
			.attr("stroke-width", 1)
			.attr("fill", "none");
	}

	// Add the points
	let points = svg.selectAll(".point")
		.data(pointData)
		.enter().append("g")
			.append("circle")
			.attr("class", "point")
			.attr("transform", (d)=> "translate(" + xScale(d.x) + "," + yScale(d.y) + ")")
			.attr("r", (d,i)=> i===0? 9 : 4)
			.attr("fill", (d,i)=> i===0? "#0f0" : "#000")			
			.attr("stroke", "#000")
			.attr("stroke-width", 1)
				.append("svg:title")
				.text((d,i) => d.label || `point #${i}`);

}
