import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { jwtConstants } from 'src/auth/constants';


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService){};
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean>  {

    const request = context.switchToHttp().getRequest();
    console.log("header contains:", request.headers);
    const token = this.extractTokenFromHeader(request);
    // console.log("value of token from header is: ", token);
    if (!token) {
      throw new UnauthorizedException();
    }

      try {
      const payload = await this.jwtService.verifyAsync(
        token,
        {
          secret: jwtConstants.secret
        }
      );
      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      request['user'] = payload;
      console.log("request.user is ", {user: request.user, id: request.user_id});
    } catch {
      throw new UnauthorizedException();
    }
    return true;  
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
