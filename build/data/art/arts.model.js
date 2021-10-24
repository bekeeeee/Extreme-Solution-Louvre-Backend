"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.artsModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.artsModel = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    artist: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
    },
});
