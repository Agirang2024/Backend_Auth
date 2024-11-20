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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PoliticsController = void 0;
const common_1 = require("@nestjs/common");
const politics_service_1 = require("./politics.service");
const jwt_auth_guard_1 = require("../auth/Guards/jwt.auth-guard");
let PoliticsController = class PoliticsController {
    constructor(politicsService) {
        this.politicsService = politicsService;
    }
    async getAllPolitics(req) {
        const { userId } = req.user;
        return await this.politicsService.getAllPolitics(userId);
    }
    async getRecommendedPolitics(req) {
        const { userId } = req.user;
        return await this.politicsService.getRecommendedPolitics(userId);
    }
    async getLikedPolitics(req) {
        const { userId } = req.user;
        return await this.politicsService.getLikedPolitics(userId);
    }
    async getPoliticsById(politicsId, req) {
        const { userId } = req.user;
        return await this.politicsService.getPoliticsById(politicsId, userId);
    }
};
exports.PoliticsController = PoliticsController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PoliticsController.prototype, "getAllPolitics", null);
__decorate([
    (0, common_1.Get)("/recommended"),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PoliticsController.prototype, "getRecommendedPolitics", null);
__decorate([
    (0, common_1.Get)("/liked"),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PoliticsController.prototype, "getLikedPolitics", null);
__decorate([
    (0, common_1.Get)(":politicsId"),
    __param(0, (0, common_1.Param)("politicsId")),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PoliticsController.prototype, "getPoliticsById", null);
exports.PoliticsController = PoliticsController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JWTAuthGuard),
    (0, common_1.Controller)("politics"),
    __metadata("design:paramtypes", [politics_service_1.PoliticsService])
], PoliticsController);
//# sourceMappingURL=politics.controller.js.map