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
exports.GptController = void 0;
const common_1 = require("@nestjs/common");
const gpt_service_1 = require("./gpt.service");
const gpt_dto_1 = require("./dto/gpt.dto");
const jwt_auth_guard_1 = require("../auth/Guards/jwt.auth-guard");
let GptController = class GptController {
    constructor(gptService) {
        this.gptService = gptService;
    }
    async callGPT(callGptDTO, req) {
        const { userId } = req.user;
        return await this.gptService.callGPT(userId, callGptDTO);
    }
};
exports.GptController = GptController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [gpt_dto_1.CallGptDTO, Object]),
    __metadata("design:returntype", Promise)
], GptController.prototype, "callGPT", null);
exports.GptController = GptController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JWTAuthGuard),
    (0, common_1.Controller)("gpt"),
    __metadata("design:paramtypes", [gpt_service_1.GptService])
], GptController);
//# sourceMappingURL=gpt.controller.js.map