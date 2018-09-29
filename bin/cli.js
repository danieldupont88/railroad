#!/usr/bin/env node

var args = require('minimist')(process.argv.slice(2))
var pathCtrl = require('../bin/railroad-path-ctrl.js');

processInput(args);

function processInput(params) {

    if(params.v){
        var version = require('../package.json').version;
        process.stdout.write(version + '\n');
    }
    else if (params.f) {
        processFile(params.f);
    }
    else {
        params._ = params._.toString().replace(/,,/g,',');
        run(params._);
    }
};

function processFile(filePath) {
    var fs = require('fs');
    fs.readFile(filePath, 'utf8', function(err, contents) {
        contents.split('\n').forEach(run);
    });
}

function run (input) {
    
    var functionsToExecute = [
        { function: pathCtrl.calculatePathDistance, input: ['ABC'] },
        { function: pathCtrl.calculatePathDistance, input: ['AD'] },
        { function: pathCtrl.calculatePathDistance, input: ['ADC'] },
        { function: pathCtrl.calculatePathDistance, input: ['AEBCD'] },
        { function: pathCtrl.calculatePathDistance, input: ['AED'] },
        { function: pathCtrl.findPathsWithMaxStops, input: ['C','C', 3]},
        { function: pathCtrl.findPathsWithExactStops, input: ['A', 'C', 4] },
        { function: pathCtrl.findShortestPathLenght, input: ['A', 'C'] },
        { function: pathCtrl.findShortestPathLenght, input: ['B', 'B'] },
        { function: pathCtrl.findAllPaths, input: ['C', 'C', 30] }
    ];

    try {
        pathCtrl.addAllRoutesToGraph(input);

        functionsToExecute.forEach(function(fte, idx) {
            try {
                var output = fte.function.apply(this, fte.input) ;
            }
            catch(error){
                output = error.message;
            }
            output = 'Output#' + (Number(idx) + 1) + ': ' + output + '\n';
            process.stdout.write(output);
        });
        pathCtrl.cleanMap();
    }
    catch(error){
        process.stdout.write(error.message + '\n');
    }


};


