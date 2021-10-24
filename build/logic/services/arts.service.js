"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArtsService = void 0;
const arts_repository_1 = require("../../data/art/arts.repository");
const arts_1 = require("../dto/arts");
const inversify_1 = require("inversify");
let ArtsService = class ArtsService {
    constructor(_artsRepo) {
        this._artsRepo = _artsRepo;
    }
    create(createArtDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const createdArt = yield this._artsRepo.create(createArtDto);
            return arts_1.ArtDto.from(createdArt);
        });
    }
    all() {
        return __awaiter(this, void 0, void 0, function* () {
            const subscribers = yield this._artsRepo.all();
            return arts_1.ArtDto.fromMany(subscribers);
        });
    }
    updateOne(updateArtDto) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._artsRepo.updateOne(updateArtDto);
        });
    }
    deleteOne({ id }) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._artsRepo.deleteOne(id);
            return true;
        });
    }
};
ArtsService = __decorate([
    (0, inversify_1.injectable)(),
    __metadata("design:paramtypes", [arts_repository_1.ArtsRepository])
], ArtsService);
exports.ArtsService = ArtsService;
