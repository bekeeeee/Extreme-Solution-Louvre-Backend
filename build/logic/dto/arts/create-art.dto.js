"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateArtDto = void 0;
const validate_1 = require("../utils/validate");
class CreateArtDto {
    constructor(name, artist, image, description) {
        this.name = name;
        this.artist = artist;
        this.image = image;
        this.description = description;
    }
    static from(body) {
        validate_1.Validate.validateSize(body.name, 5, 'name');
        validate_1.Validate.validateSize(body.artist, 5, 'artist');
        validate_1.Validate.validateSize(body.image, 5, 'image');
        validate_1.Validate.validateSize(body.description, 15, 'description');
        return new CreateArtDto(body.name, body.artist, body.image, body.description);
    }
}
exports.CreateArtDto = CreateArtDto;
