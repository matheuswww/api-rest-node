"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const http_status_codes_1 = require("http-status-codes");
const router = (0, express_1.Router)();
exports.router = router;
router.post('/teste/', (req, res) => {
    console.log(req.body);
    return res.status(http_status_codes_1.StatusCodes.ACCEPTED).json(req.body);
});
