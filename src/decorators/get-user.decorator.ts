import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const GetUser = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest(); // Catch the Request
        // console.log(request.user);
        return request.user; 
        // Thus user. Is NOT the Entity user.  /  user. Come from: ch.password.strategy.ts
    },
);
