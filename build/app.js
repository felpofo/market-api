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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
exports.app = (0, express_1.default)();
exports.app.use(express_1.default.json());
exports.app.get("/", (req, res) => {
    res.json({ message: "alive" });
});
exports.app.post("/category", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const name = req.body.name;
    const category = yield prisma.category.create({ data: { name } });
    res.json({
        message: "Category Created",
        data: { category },
    });
}));
exports.app.get("/category/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const category = yield prisma.category.findUnique({ where: { id } });
    res.json({ data: { category } });
}));
exports.app.get("/categories", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const allCategories = yield prisma.category.findMany({});
    res.json({ data: allCategories });
}));
