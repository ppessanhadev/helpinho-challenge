import { Delete, Get, Patch, Post, Put } from '@nestjs/common';

export const baseMethod = {
  GET: {
    type: Get,
    statusCode: 200,
  },
  POST: {
    type: Post,
    statusCode: 201,
  },
  PATCH: {
    type: Patch,
    statusCode: 204,
  },
  PUT: {
    type: Put,
    statusCode: 204,
  },
  DELETE: {
    type: Delete,
    statusCode: 204,
  },
};
