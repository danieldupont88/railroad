'use strict';

var assert = require('chai').assert;
var pathCtrl = require('../bin/railroad-path-ctrl.js');

describe('acceptance criteria', function() {

    before(function(){
        var params = "AB5, BC4, CD8, DC8, DE6, AD5, CE2, EB3, AE7";
        pathCtrl.addAllRoutesToGraph(params);
    });

    it('The distance of the route A-B-C.', function() {
        var distance = pathCtrl.calculatePathDistance('ABC');
        assert.equal(9, distance);
    });
    it('The distance of the route  A-D.', function() {
        var distance = pathCtrl.calculatePathDistance('AD');
        assert.equal(5,distance);
    });
    it('The distance of the route  A-D-C.', function() {
        var distance = pathCtrl.calculatePathDistance('ADC');
        assert.equal(13, distance);
    });
    it('The distance of the route A-E-B-C-D', function() {
        var distance = pathCtrl.calculatePathDistance('AEBCD');
        assert.equal(22, distance);
    });
    it('The distance of the route A-E-D', function() {
        assert.throws(function(){ pathCtrl.calculatePathDistance('AED'); }, Error, "NO SUCH ROUTE");
    });
    it('The number of trips starting at C and ending at C with a maximum of 3 stops. ', function(){
        assert.equal(2, pathCtrl.findPathsWithMaxStops('C', 'C', 3));
    });
    it('The number of trips starting at A and ending at C with exactly 4 stops.', function(){
        assert.equal(3, pathCtrl.findPathsWithExactStops('A', 'C', 4));
    });
    it('The length of the shortest route (in terms of distance to travel) from A to C.', function(){
        assert.equal(9, pathCtrl.findShortestPathLenght('A', 'C'));
    });
    it('The length of the shortest route (in terms of distance to travel) from B to B.', function(){
        assert.equal(9, pathCtrl.findShortestPathLenght('B', 'B'));
    });
    it('The number of different routes from C to C with a distance of less then 30.', function(){
        assert.equal(7, pathCtrl.findAllPaths('C', 'C', 30));
    });

});