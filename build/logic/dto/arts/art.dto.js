"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArtDto = void 0;
class ArtDto {
    constructor(id, name, artist, image, description, createdAt) {
        this.id = id;
        this.name = name;
        this.artist = artist;
        this.image = image;
        this.description = description;
        this.createdAt = createdAt;
    }
    static from(entity) {
        return new ArtDto(entity.id, entity.name, entity.artist, entity.image, entity.description, entity.createdAt);
    }
    static fromMany(arts) {
        return arts.map((art) => ArtDto.from(art));
    }
}
exports.ArtDto = ArtDto;
