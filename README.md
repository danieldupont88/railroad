# railroad

### Installation
The tool requires nodejs.
To install it, you just need to install it globally.
Inside the /railroad directory run:
```
npm install -g
```

###  Testing the Installation
To test the installation, run the command:
```
railroad -v
```
It should return the current version of the package `0.0.1`.

###  Running the tool
You can run the command passing the graph parameters inline:
```
railroad AB1, BC2, CD3
```
You can also specify a file as input, the tool will read it and execute each of its lines as input parameters:
```
railroad -f ./foo/bar.txt
```

###  Overall Design
- cli.js: Responsible for input reading, output writing and function execution;
- parser.js: Parser class, responsible for input parsing;
- railroad-map.js: - Map class, maintains the graph containing all the nodes.
                   - Exposes functions to manage node neighboors;
- railroad-path-ctrl.js:    - Consumes Parser and Map classes;
                            - Exposes functions to compose and clear map's graph;
                            - Exposes functions to find paths (max and exact stops), find path lenght, find shortest path and  find all pahs within a  given distance;

### Tools Used
- npm as package manager
- mocha as test runner
- chai as assertion library
- grunt as automation tool to watch files and run tests