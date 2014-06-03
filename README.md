# MySQL-Reference-Manual-Version-Checker

Chrome extension warns if referring version of [MySQL reference manual](http://dev.mysql.com/doc/#manual) is out of range.

## Overview

### In case of out of range

![https://dl.dropboxusercontent.com/u/14832699/mysql-reference-manual-version-checker/out_of_range.png](https://dl.dropboxusercontent.com/u/14832699/mysql-reference-manual-version-checker/out_of_range.png)

### In case of range

![https://dl.dropboxusercontent.com/u/14832699/mysql-reference-manual-version-checker/range.png](https://dl.dropboxusercontent.com/u/14832699/mysql-reference-manual-version-checker/range.png)

## Configurations

You can configure the following items;

- Version of Lower Limit (Default: 5.1)
- Version of Upper Limit (Default: 5.7)

## For developers

Operation procedure to setup the development environment.

### 1. Install [node](http://nodejs.org/)

### 2. Install dependent modules

```
npm install
```

### 3. Download the external libraries

```
./node_modules/.bin/bower install
./node_modules/.bin/gulp tsd
```

### 4. Build

```
./node_modules/.bin/gulp
```

## License

MIT

