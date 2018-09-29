'use strict';

var Map = require('./railroad-map'),
    map = new Map(),
    Parser = require('./parser'),
    parser = new Parser();

exports.addAllRoutesToGraph = function(param){
    var routes = parser.parseInput(param);
    routes.forEach(map.addRouteToGraph);
};

exports.cleanMap = function(){
    map = new Map();
};

exports.calculatePathDistance = function(fullRoute, graph) {
    var distance = 0;

    fullRoute = fullRoute.split('');
    fullRoute.reduce(function(from, to){
        distance += map.getDistanceFromOneTrip(from, to);
        return to;
    });
    return distance;
};

exports.findPathsWithMaxStops = function(origin, destination, maxStops){
    var foundPathCount = 0;

    function iterate(node, stopCount) {

        if(stopCount > maxStops) return;
        if (node === destination && stopCount !== 0) foundPathCount++;

        var neighbors = map.getNeighbors(node);
        for(var key in neighbors) {
            iterate(key, stopCount + 1);
        }
    }
    iterate(origin, 0);
    if (foundPathCount === 0 ) throw Error('NO PATH FOUND FROM ' + origin + ' TO ' + destination); 
    return foundPathCount
};

exports.findPathsWithExactStops = function(origin, destination, stops){
    var foundPathCount = 0;

    function iterate(node, stopsCount) {
        if (node === destination && stopsCount === stops) foundPathCount++;
        if(stopsCount > stops) return;

        var neighbors = map.getNeighbors(node);
        for(var key in neighbors) {
            iterate(key, stopsCount + 1);
        }
    }

    iterate(origin, 0);
    if (foundPathCount === 0 ) throw Error('NO PATH FOUND FROM ' + origin + ' TO ' + destination); 
    return foundPathCount;
};

exports.findShortestPathLenght = function(origin, destination) {
    var shortestLength = 9999;
    function iterate(node, totalDistance) {
        if(totalDistance > shortestLength) return;
        if (node === destination && totalDistance !== 0) shortestLength = totalDistance;
        var neighbors = map.getNeighbors(node);
        for(var key in neighbors) {
            iterate(key.toString(), totalDistance + neighbors[key].distance);
        }
    }
    iterate(origin, 0);
    if (shortestLength === 9999 ) throw Error('NO PATH FOUND FROM ' + origin + ' TO ' + destination); 
    return shortestLength;
};

exports.findAllPaths = function(origin, destination, maxDistance) {
    var discoveredRoutes = [];
    function iterate(node, totalDistance, path) {
        if (totalDistance >= maxDistance) return;
        if (node === destination && totalDistance) {
            var routeExists = discoveredRoutes.filter(function(r){
                return r === path;
            }).length > 0;
            if (!routeExists)  discoveredRoutes.push(path);
        }
        var neighbors = map.getNeighbors(node);
        for(var key in neighbors) {
            iterate(key, totalDistance + neighbors[key].distance, path + key);
        }
    }
    iterate(origin, 0, origin);
    if (discoveredRoutes.length === 0 ) throw Error('NO PATH FOUND FROM ' + origin + ' TO ' + destination); 
    return discoveredRoutes.length;
};