'use strict';

var assert = require('chai').assert;
var pathController = require('../bin/railroad-path-ctrl.js');


describe('Railroad Path Controller', function() {

    describe('Path finder functions', function() {

       before(function(){
            var param = "AB5, BC4, CA3";
            pathController.addAllRoutesToGraph(param);
        });

        describe('calculate distance from a given route', function() {
            it('should calculate the distance for a given route', function() {
                var distance = pathController.calculatePathDistance('ABC');
                assert.equal(9, distance);
            });
            it('should return NO SUCH ROUTE when a route does not exist', function() {
                assert.throws(function(){ pathController.calculatePathDistance('AED'); }, Error, 'NO SUCH ROUTE');
            })
        });

        describe('calculate number of possible trips with maximum stops', function() {
            it('should calculate the number of routes', function(){
                assert.equal(1, pathController.findPathsWithMaxStops('A', 'C', 3));
            });
            it('should return error if there is no path from origin to destination', function(){
                assert.throws(function(){ pathController.findPathsWithMaxStops('A', 'Z', 3); }, Error);
            });
        });

        describe('calculate number of possible paths with exact number of stops', function() {
            it('should calculate the number of paths', function(){
                assert.equal(1, pathController.findPathsWithExactStops('A', 'C', 2));
            });
            it('should return error if there is no path from origin to destination', function(){
                assert.throws(function(){ pathController.findPathsWithExactStops('A', 'Z', 3); }, Error);
            });
        });
        
        describe('find the shortest route lenght between origin and destination', function() {
            it('should calculate the shortest route lenght', function(){
                assert.equal(9, pathController.findShortestPathLenght('A', 'C'));
            });
            it('should return error if there is no path from origin to destination', function(){
                assert.throws(function(){ pathController.findShortestPathLenght('A', 'Z'); }, Error);
            });
        });

        describe('find all possible routes between origin and destination within a given distance limit', function() {
            it('should calculate the number of routes', function(){
                assert.equal(3, pathController.findAllPaths('A', 'C', 35));
            });
            it('should return error if there is no path from origin to destination', function(){
                assert.throws(function(){ pathController.findShortestPathLenght('A', 'Z', 20); }, Error);
            });
        });

    });



});
