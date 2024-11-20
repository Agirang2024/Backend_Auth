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
exports.PoliticsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let PoliticsService = class PoliticsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getAllPolitics(userId) {
        const politics = await this.prisma.politics.findMany({
            orderBy: { created_at: "desc" },
            include: { likes: true },
        });
        return this.addLikedStatus(politics, userId);
    }
    async getPoliticsById(politicsId, userId) {
        const politics = await this.prisma.politics.findUnique({
            where: { id: politicsId },
            include: { likes: true },
        });
        return {
            ...politics,
            liked: politics.likes.some((like) => like.user_id === userId),
        };
    }
    async getRecommendedPolitics(userId) {
        const politics = await this.prisma.politics.findMany({
            orderBy: { created_at: "desc" },
            include: { likes: true },
            take: 3,
        });
        return this.addLikedStatus(politics, userId);
    }
    async getLikedPolitics(userId) {
        const politics = await this.prisma.politics.findMany({
            where: {
                likes: {
                    some: { user_id: userId },
                },
            },
            include: { likes: true },
        });
        return this.addLikedStatus(politics, userId);
    }
    addLikedStatus(politics, userId) {
        return politics.map((politic) => ({
            ...politic,
            liked: politic.likes.some((like) => like.user_id === userId),
        }));
    }
};
exports.PoliticsService = PoliticsService;
exports.PoliticsService = PoliticsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PoliticsService);
//# sourceMappingURL=politics.service.js.map