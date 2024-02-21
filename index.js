
  //Dikstras Algorithm
  class Graph {
    constructor() {
      this.nodes = new Map();
    }
  
    addNode(node) {
      this.nodes.set(node, []);
    }
  
    addEdge(node1, node2, weight) {
      this.nodes.get(node1).push({ node: node2, weight });
      this.nodes.get(node2).push({ node: node1, weight });
    }

    dijkstra(startNode, endNode) {
      const distances = new Map();
      const previous = new Map();
      const priorityQueue = new PriorityQueue();
  
      // Initialize distances and priority queue
      for (const node of this.nodes.keys()) {
        distances.set(node, node === startNode ? 0 : Infinity);
        priorityQueue.enqueue(node, distances.get(node));
        previous.set(node, null);
      }
  
      while (!priorityQueue.isEmpty()) {
        const currentNode = priorityQueue.dequeue();
  
        if (currentNode === endNode) {
          // Reconstruct the path from endNode to startNode
          const path = [];
          let current = endNode;
          while (current !== null) {
            path.unshift(current);
            current = previous.get(current);
          }
          return path;
        }
  
        const neighbors = this.nodes.get(currentNode);
        for (const neighbor of neighbors) {
          const newDistance = distances.get(currentNode) + neighbor.weight;
          if (newDistance < distances.get(neighbor.node)) {
            distances.set(neighbor.node, newDistance);
            previous.set(neighbor.node, currentNode);
            priorityQueue.enqueue(neighbor.node, newDistance);
          }
        }
      }
  
      return null; // No path found
    }
  }

  class PriorityQueue {
    constructor() {
      this.items = [];
    }
  
    enqueue(item, priority) {
      this.items.push({ item, priority });
      this.items.sort((a, b) => a.priority - b.priority);
    }
  
    dequeue() {
      return this.items.shift().item;
    }
  
    isEmpty() {
      return this.items.length === 0;
    }
  }
  // Example usage:
const graph = new Graph();

// graph.addNode("A");
// graph.addNode("B");
// graph.addNode("C");
// graph.addNode("D");
// graph.addNode("E");

// graph.addEdge("A", "B", 4);
// graph.addEdge("A", "C", 2);
// graph.addEdge("B", "E", 3);
// graph.addEdge("C", "D", 2);
// graph.addEdge("D", "E", 3);

// const shortestPath = graph.dijkstra("A", "E");
// console.log("Shortest Path:", shortestPath);
 
let vertices = [];
let edges = [];
const citiesSet = new Set();


const cities = [
  'New York',
  'Los Angeles',
  'Chicago',
  'Houston',
  'Phoenix',
  'Philadelphia',
  'San Antonio',
  'San Diego',
  'Dallas',
  'San Jose',
  'Austin',
  'Jacksonville',
  'San Francisco',
  'Indianapolis',
  'Columbus',
  'Fort Worth',
  'Charlotte',
  'Seattle',
  'Denver',
  'Washington'
];

const map = document.getElementById('map');
const vertexButton = document.querySelector('#vertexButton');
const edgesButton = document.querySelector('#edgesButton');
const startNodeButton = document.querySelector('#startNodeButton');
const deleteNodeButton = document.querySelector('#deleteNode');
const algorithmHighlight = document.querySelector('#algorithmHighlight');

let vertexEnabled = true;
let edgesEnabled = false;
let startNodeEnabled = false;
let deleteNodeEnabled = false;
let algorithmEnabled = false;

  // Add event listener to the container div using event delegation
document.getElementById('map').addEventListener('click', handleVertexClick);

vertexButton.addEventListener('click', function(){
  vertexEnabled = true;
  edgesEnabled = false;
  startNodeEnabled = false;
  deleteNodeEnabled = false;
  algorithmEnabled = false;
  console.log('vertex button clicked')
})

edgesButton.addEventListener('click', function(){
  vertexEnabled = false;
  edgesEnabled = true;
  startNodeEnabled = false;
  deleteNodeEnabled = false;
  algorithmEnabled = false;
  console.log('edges button clicked', edgesEnabled)
  console.log(edgesEnabled)
})

startNodeButton.addEventListener('click', function(){
  vertexEnabled = false;
  edgesEnabled = false;
  startNodeEnabled = true;
  deleteNodeEnabled = false;
  algorithmEnabled = false;
  console.log('startNode button clicked')
})

deleteNodeButton.addEventListener('click', function(){
  vertexEnabled = false;
  edgesEnabled = false;
  startNodeEnabled = false;
  deleteNodeEnabled = true;
  algorithmEnabled = false;
  console.log('deleteNode button clicked')
})

algorithmHighlight.addEventListener('click', function(){
  vertexEnabled = false;
  edgesEnabled = false;
  startNodeEnabled = false;
  deleteNodeEnabled = false;
  algorithmEnabled = true;
  console.log('algo button clicked')

})

function addVertex(x, y) {
  let count = 0;
  const vertex = document.createElement('div');
  vertex.classList.add('vertex');
  vertex.style.left = x - 10 + 'px';
  vertex.style.top = y - 10 + 'px';
  cityName = cities[getRandomInteger(0, cities.length-1)];

  while (citiesSet.has(cityName) && count < 21){
    cityName = cities[getRandomInteger(0, cities.length-1)];
    count += 1;
  }

  citiesSet.add(cityName)
  vertex.innerText = cityName
  //save info
  vertex.textContent = cityName;
  vertex.setAttribute('position', [x,y]); // Store position as a data attribute
  vertex.setAttribute('name', cityName); 

  map.appendChild(vertex);
  vertices.push({ x, y });
  graph.addNode(cityName);
}

function addEdge(startVertex, endVertex) {
  const edge = document.createElement('div');
  const distance = Math.sqrt(Math.pow(endVertex[0] - startVertex[0], 2) + Math.pow(endVertex[1] - startVertex[1], 2));
  edge.style.width = distance + 'px';
  edge.style.transformOrigin = 'top left';
  edge.style.transform = `rotate(${Math.atan2(endVertex.y - startVertex.y, endVertex.x - startVertex.x)}rad)`;
  edge.style.left = startVertex.x + 'px';
  edge.style.top = startVertex.y + 'px';
  edge.classList.add('edge');
  map.appendChild(edge);
  edges.push({ start: startVertex, end: endVertex, distance });
}

map.addEventListener('click', (event) => {
  const x = event.clientX - map.getBoundingClientRect().left;
  const y = event.clientY - map.getBoundingClientRect().top;
  if (vertexEnabled && !event.target.classList.contains('vertex')) {
    addVertex(x,y);
  } else if  (edgesEnabled && completed) {

    addEdge(distanceOne, distanceTwo)
    let cityOne = "";
    let cityTwo = "";
    let distanceOne = 0;
    let distanceTwo = 0;
    // TO DO
    completed = false;
  } else {
    console.log("Neither addVertex or addEdge ran")
  }

  if (vertices.length > 1) {
    edgesButton.disabled = false;
    startNodeButton.disabled = false;
    //addEdge(vertices[vertices.length - 2], vertices[vertices.length - 1]);
  }
});

let firstVertex = true;
let cityOne = "";
let cityTwo = "";
let distanceOne = 0;
let distanceTwo = 0;
let completed = false

  // Function to handle click events on vertices
  function handleVertexClick(event) {
    // Check if the clicked element has the class "vertex"
    
    if (event.target.classList.contains('vertex')) {
      const clickedPosition = event.target.getAttribute('position'); // Retrieve position
      const clickedName = event.target.getAttribute('name'); 
      console.log(`Clicked on div "${clickedName}" at position ${clickedPosition}`);
      console.log(edgesEnabled, firstVertex)
      console.log(
         "V", vertexEnabled,
         "E", edgesEnabled,
         "S", startNodeEnabled ,
         "D", deleteNodeEnabled,
         "A", algorithmEnabled 
      )
      if (edgesEnabled && firstVertex) {
          console.log("first vertex clicked")
          distanceOne = clickedPosition
          cityOne = clickedName
          firstVertex = !firstVertex
      } else {
        console.log("second vertex clicked")
        distanceTwo = clickedPosition
        cityTwo = clickedName
        completed = true;
      }

    }
  }

  function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

