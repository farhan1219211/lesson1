import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROLES_KEY } from './roles.decorator';
import { Role } from './roles.enum';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from 'src/auth/constants';

@Injectable()
export class RoleGuard implements CanActivate {

  constructor(private refluctor:Reflector,private jwtService: JwtService){}
  async canActivate(
    context: ExecutionContext,
  ){

    const requiredRoles = this.refluctor.getAllAndOverride<Role[]>(
      ROLES_KEY, [
        context.getHandler(),
        context.getClass()
      ]
    );
    console.log(requiredRoles)
    if(!requiredRoles) return true;
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
        // console.log("value of token from header is: ", token);
        if (!token) {
          throw new UnauthorizedException();
        }
    
          
          const payload = await this.jwtService.verifyAsync(
            token,
            {
              secret: jwtConstants.secret
            }
          );
    console.log(payload)
    if (!requiredRoles.includes(payload.role)) {
      throw new ForbiddenException('Access denied');
    }
    return true;
  }

    private extractTokenFromHeader(request: any): string | undefined {
      const [type, token] = request.headers.authorization?.split(' ') ?? [];
      return type === 'Bearer' ? token : undefined;
    }
}
