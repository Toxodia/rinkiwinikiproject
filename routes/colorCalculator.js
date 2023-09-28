const express = require('express');
const router = express.Router();

router.get('/', function (req, res, next) {
    res.send('your in the calculator');
});

//http://localhost:8080/add_wall?width=100&height=100
// in cm
router.get('/add_wall', function (req, res, next) {
    totalArea = totalArea + calcArea(req.query.width, req.query.height);
    res.send(String(totalArea));
});

//http://localhost:8080/add_window?width=100&height=100
// in cm
router.get('/add_window', function (req, res, next) {
    if (calcArea(req.query.width, req.query.height) >= 250) {
        totalArea = totalArea - calcArea(req.query.width, req.query.height);
    }
    res.send(String(totalArea));
});

//http://localhost:8080/delete_area
router.delete('/delete_area', function (req, res, next) {
    totalArea = 0
    res.send(String(totalArea));
});

//http://localhost:8080/calculate_buckets?bucketSize=10000
// in cm²
router.get('/calculate_buckets', function (req, res, next) {
    res.send(String(calcPaintBuckets(totalArea,req.query.bucketSize)))
});

let totalArea = 0;


function calcArea(width, height) {
    return width * height;
}


function calcPaintBuckets(totalArea, paintCoverage) {
    return Math.ceil(totalArea / paintCoverage);
}

function calcLanes(wallpaperWidth, wallWidth) {
    return Math.ceil(wallWidth / wallpaperWidth);
}

function calcLangeLength(wallHeight, rapport) {
    const patterns = Math.ceil(wallHeight / rapport);
    return patterns * rapport;
}

function lanesPerRoll(wallpaperLength, laneLength) {
    return Math.floor(wallpaperLength / laneLength);
}

function calcWallpaperRolls(wallwidth, wallHeight, wallpaperLength, wallpaperWidth, rapport) {
    const lanes = calcLanes(wallpaperWidth, wallwidth);
    let laneLength;
    let lPR;
    if (rapport > 0) {
        laneLength = calcLangeLength(wallHeight, rapport);
    } else {
        laneLength = wallHeight;
    }
    lPR = lanesPerRoll(wallpaperLength, laneLength);
    return Math.ceil(lanes / lPR);
}

function calcPrice(count, price) {
    return count * price;
}


module.exports = router;
