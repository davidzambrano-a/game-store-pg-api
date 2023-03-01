export interface JwtPayload {
    readonly id: number;
    readonly userName: string;
    readonly email?: string; // In some case will be Optional but, in strategy.ts it’s required 
    readonly roles: string;
}
