import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { AuthService } from '../auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      clientID: "아기랑꺼",
      clientSecret: "넣으시면 될것같아요",
      callbackURL: 'http://localhost:3000/auth/google/callback', //나중에 수정 필요
      scope: ['profile', 'email'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback) {
    const user = await this.authService.validateGoogleUser(profile);
    done(null, user);
  }
}
