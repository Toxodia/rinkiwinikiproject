const express = require('express');
const router = express.Router();

router.get('/', function (req, res, next) {
    res.send('your in the calculator');
});

//http://localhost:8081/add_area?width=100&height=100
// in cm
router.get('/add_area', function (req, res, next) {
    totalArea = totalArea + calcArea(req.query.width, req.query.height);
    res.send(String(totalArea / 10000));
});

//http://localhost:8081/add_window?width=100&height=100
// in cm
router.delete('/remove_area', function (req, res, next) {
    if (calcArea(req.query.width, req.query.height) >= 250) {
        totalArea = totalArea - calcArea(req.query.width, req.query.height);
    }
    res.send(String(totalArea / 10000));
});

//http://localhost:8081/delete_area
router.delete('/delete_all_area', function (req, res, next) {
    totalArea = 0;
    res.send(String(totalArea));
});

router.post('/return_area', function (req, res, next) {
    res.send(String(totalArea / 10000));
});

//http://localhost:8081/set_price?price=2000
//in ct per bucket of paint
router.get('/set_price', function (req, res, next) {
    price = req.query.price;
    res.send(String(price / 100));
});

//http://localhost:8081/calculate_buckets?bucketSize=10000
// in cm²
router.get('/set_bucket_size', function (req, res, next) {
    bucketSize = calcPaintBuckets(totalArea, req.query.bucketSize);
    res.send(String(bucketSize));
});

router.post('/calc_price', function (req, res, next) {
    res.send(String(calcPrice(calcPaintBuckets(totalArea, bucketSize), price)));
});


let totalArea = 0;
let bucketSize = 0;
let price = 0;


function calcArea(width, height) {
    return width * height;
}


function calcPaintBuckets(totalArea, paintCoverage) {
    return Math.ceil(totalArea / paintCoverage);
}

function calcPrice(count, price) {
    return count * price;
}


module.exports = router;
