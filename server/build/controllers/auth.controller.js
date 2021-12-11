"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logout = exports.AuthenticatedUser = exports.Login = exports.Register = void 0;
var register_validation_1 = require("../validation/register.validation");
var User = require('../models/User');
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var jsonwebtoken_1 = require("jsonwebtoken");
var Register = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var body, error, newUser, _a;
    var _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                body = req.body;
                error = register_validation_1.RegisterValidation.validate(body).error;
                if (error) {
                    return [2 /*return*/, res.status(400).send(error.details)];
                }
                if (body.password !== body.password_confirm) {
                    return [2 /*return*/, res.status(400).send({ message: "Password's do not match " })];
                }
                _a = User;
                _b = {
                    first_name: body.first_name,
                    last_name: body.last_name,
                    email: body.email
                };
                return [4 /*yield*/, bcryptjs_1.default.hash(body.password, 10)];
            case 1:
                newUser = _a.apply(void 0, [(_b.password = _c.sent(),
                        _b)]);
                return [4 /*yield*/, newUser.save(function (err) {
                        if (err) {
                            return res.status(400).json({
                                error: err,
                            });
                        }
                        res.json({
                            message: 'Success create a new User',
                        });
                    })];
            case 2:
                _c.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.Register = Register;
var Login = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, User.findOne({ email: req.body.email })];
            case 1:
                user = _a.sent();
                if (!user) {
                    return [2 /*return*/, res.status(404).send({
                            message: 'User not found!',
                        })];
                }
                return [4 /*yield*/, bcryptjs_1.default.compare(req.body.password, user.password)];
            case 2:
                if (!(_a.sent())) {
                    return [2 /*return*/, res.status(400).send({
                            message: 'Invalid credentials!',
                        })];
                }
                token = (0, jsonwebtoken_1.sign)({ id: user.id }, 'secret');
                res.cookie('jwt', token, {
                    httpOnly: true,
                    maxAge: 24 * 60 * 60 * 100, // 1day
                });
                res.send({
                    message: 'success',
                });
                return [2 /*return*/];
        }
    });
}); };
exports.Login = Login;
var AuthenticatedUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var jwt;
    return __generator(this, function (_a) {
        jwt = req.cookies['jwt'];
        console.log(jwt);
        res.send(jwt);
        return [2 /*return*/];
    });
}); };
exports.AuthenticatedUser = AuthenticatedUser;
var Logout = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        res.cookie('jwt', '', { maxAge: 0 });
        res.send({
            message: 'Success',
        });
        return [2 /*return*/];
    });
}); };
exports.Logout = Logout;
