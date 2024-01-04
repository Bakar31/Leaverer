import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  signup() {
    return { msg: 'Signing Up' };
  }

  signin() {
    return { msg: 'Signing In' };
  }
}
