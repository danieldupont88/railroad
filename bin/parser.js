'use strict';

module.exports = Parser;

function Parser(){

    this.generateRoute = function(param){
        var pattern = /\b[A-Z]{2}\d+\b/g;
        param = param.trim();
        if (!pattern.test(param)) throw Error('INVALID ROUTE FORMAT');

        var route = {};
        route.origin = param.substr(0,1);
        route.destination = param.substr(1,1);
        route.distance = Number(param.substr(2));

        return route;
    };
    this.parseInput = function(param) {
        return param.split(',').map(this.generateRoute);
    }
}