function loadBaseMap(parentId)
{
	fetch('pinecrest.svg')
		.then(r => r.text())
		.then(text => {
			document.getElementById(parentId).innerHTML = text;
			centerBackground(parentId,'all');
		})
		.catch(console.error.bind(console));
}





function centerBackground(parentId,target)
{
	var el = document.getElementById(parentId).children[0];
	var bgImg = document.getElementById('image1');
	if(el)
	{
		switch(target)
		{
			case 'all':
			{
				const elements = el.querySelectorAll('[inkscape\\:label]');

				// Filter elements where the inkscape:label attribute starts with "Hole"
				const filteredElements = Array.from(elements).filter(element => {
					const label = element.getAttribute('inkscape:label');
					return label && label.startsWith('Hole');
				
				});
				// Initialize variables to track the combined bounding box
				let minX = Infinity;
				let minY = Infinity;
				let maxX = -Infinity;
				let maxY = -Infinity;

				// Iterate through the filtered elements
				filteredElements.forEach(element => {
					let bbox;
					if (element instanceof SVGGraphicsElement) {
						// For SVG elements, use getBBox()
						bbox = element.getBBox();
					} else {
						// For HTML elements, use getBoundingClientRect()
						bbox = element.getBoundingClientRect();
					}

					// Update the combined bounding box
					minX = Math.min(minX, bbox.x);
					minY = Math.min(minY, bbox.y);
					maxX = Math.max(maxX, bbox.x + bbox.width);
					maxY = Math.max(maxY, bbox.y + bbox.height);
				});

				// Calculate the combined bounding box
				const combinedBBox = {
					x: minX,
					y: minY,
					width: maxX - minX,
					height: maxY - minY
				};
								
				console.log(filteredElements);
				el.setAttribute('viewBox',`${combinedBBox.x} ${combinedBBox.y} 2000 2000`);
				break;
			}
			
		}
	}
}