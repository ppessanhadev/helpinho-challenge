import { sign } from 'jsonwebtoken';
import { randomUUID } from 'crypto';
import { AuthModule, AuthService } from '@core';
import { Test, TestingModule } from '@nestjs/testing';
import { UnauthorizedException } from '@nestjs/common';

describe('AuthService()', () => {
  let authService: AuthService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AuthModule],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  describe('generateToken()', () => {
    it('should return a jwt token', () => {
      const token = authService.generateToken({ id: randomUUID() });

      expect(token).toMatchObject(expect.any(String));
    });
  });

  describe('validateToken()', () => {
    it('should throw an error if token is undefined', () => {
      try {
        authService.validateToken(undefined);
      } catch (error) {
        const status = error.getStatus();

        expect(error).toBeInstanceOf(UnauthorizedException);
        expect(error.message).toStrictEqual(`Bearer in authorization header is required`);
        expect(status).toBe(401);
      }
    });

    it('should throw an error if token only contains a bearer', () => {
      try {
        authService.validateToken('Bearer');
      } catch (error) {
        const status = error.getStatus();

        expect(error).toBeInstanceOf(UnauthorizedException);
        expect(error.message).toStrictEqual(
          `Bearer in authorization doesn't contains a token`,
        );
        expect(status).toBe(401);
      }
    });

    it('should throw an error when token is expired', () => {
      try {
        const token = sign({ id: randomUUID() }, 'secret', {
          expiresIn: '1ms',
        });
        const authorization = `Bearer ${token}`;

        authService.validateToken(authorization);
      } catch (error) {
        const status = error.getStatus();

        expect(error).toBeInstanceOf(UnauthorizedException);
        expect(error.message).toStrictEqual('Token has expired');
        expect(status).toBe(401);
      }
    });

    it('should throw an error if token is not a jwt token', () => {
      try {
        const invalidToken = 'Bearer invalid-token';
        authService.validateToken(invalidToken);
      } catch (error) {
        const status = error.getStatus();

        expect(error).toBeInstanceOf(UnauthorizedException);
        expect(error.message).toStrictEqual('Token value is not a jwt token');
        expect(status).toBe(401);
      }
    });

    it('should throw an error if token is invalid', () => {
      try {
        const token = sign({ id: randomUUID() }, 'secret');
        const authorization = `Bearer ${token}`;

        authService.validateToken(authorization);
      } catch (error) {
        const status = error.getStatus();

        expect(error).toBeInstanceOf(UnauthorizedException);
        expect(error.message).toStrictEqual('Token value is not a jwt token');
        expect(status).toBe(401);
      }
    });

    it('should return a jwt token', () => {
      const id = randomUUID();
      const token = authService.generateToken({ id });
      const authorization = `Bearer ${token}`;

      const result = authService.validateToken(authorization);

      expect(result).toStrictEqual({
        id,
        exp: expect.any(Number),
        iat: expect.any(Number),
      });
    });
  });
});
