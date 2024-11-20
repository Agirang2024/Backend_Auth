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
Object.defineProperty(exports, "__esModule", { value: true });
exports.LikeService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let LikeService = class LikeService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async checkLiked(politicsId, userId) {
        return await this.prisma.like.findUnique({
            where: {
                politics_id_user_id: {
                    politics_id: politicsId,
                    user_id: userId,
                },
            },
        });
    }
    async like(politicsId, userId) {
        const likeExists = await this.checkLiked(politicsId, userId);
        if (likeExists) {
            throw new common_1.HttpException("좋아요를 이미 누르고 있습니다", common_1.HttpStatus.BAD_REQUEST);
        }
        return await this.prisma.like.create({
            data: {
                politics_id: politicsId,
                user_id: userId,
            },
        });
    }
    async dislike(politicsId, userId) {
        const likeExists = await this.checkLiked(politicsId, userId);
        if (!likeExists) {
            throw new common_1.HttpException("이미 좋아요를 누르고 있지 않습니다.", common_1.HttpStatus.BAD_REQUEST);
        }
        await this.prisma.like.delete({
            where: {
                politics_id_user_id: {
                    politics_id: politicsId,
                    user_id: userId,
                },
            },
        });
    }
};
exports.LikeService = LikeService;
exports.LikeService = LikeService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], LikeService);
//# sourceMappingURL=like.service.js.map