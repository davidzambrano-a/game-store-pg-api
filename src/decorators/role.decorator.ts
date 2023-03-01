import { SetMetadata } from '@nestjs/common';
import { Roles } from 'src/auth/enums/roles.enum';

// Fill the Roles enum
export const ROLES_KEY = 'roleName'; // This roles. It's a property set on: src/interfaces/IJwtPayload
export const RoleDecorator = (...roles: Roles[]) => SetMetadata(ROLES_KEY, roles);
