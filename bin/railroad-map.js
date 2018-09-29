'use strict';

var graph = {};

var addRoute = function (route) {
    if (route.origin === route.destination) throw Error('ORIGIN AND DESTINATION ARE THE SAME');
    if (graph[route.origin].neighbors[route.destination]) throw Error('ROUTE ALREADY EXISTS');
    graph[route.origin].neighbors[route.destination] = {
        distance: route.distance,
        name: route.destination
    }
};

var addCity = function (name) {
    graph[name] = {
        name: name,
        neighbors: []
    };
};

module.exports = Map;

function Map(){

    graph = {};

    this.getDistanceFromOneTrip = function (fromNode, toNode) {
        if (graph[fromNode].neighbors[toNode]) return graph[fromNode].neighbors[toNode].distance;
        else throw new Error("NO SUCH ROUTE");
    };
    this.getNeighbors = function (node) {
        if (graph[node] && graph[node].neighbors) return  graph[node].neighbors;
        else throw new Error("NO SUCH ROUTE");
    };
    this.addRouteToGraph = function (route) {
        if (!graph[route.origin]) {
            addCity(route.origin);
        }
        if (!graph[route.destination]) {
            addCity(route.destination);
        }
        addRoute(route);
    };
    this.getGraph = function() {
        return graph;
    };
};

