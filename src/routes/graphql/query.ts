import { GraphQLList, GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { MemberType, MemberTypeIdEnum, PostType, ProfileType, UserType } from './types/types.js';
import { UUIDType } from './types/uuid.js';
import type { PrismaClient } from '@prisma/client';

export interface GqlContext {
  prisma: PrismaClient;
}

export const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    memberTypes: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(MemberType))),
      resolve: async (_, _args, { prisma }: GqlContext) => {
        return prisma.memberType.findMany();
      },
    },

    memberType: {
      type: MemberType,
      args: {
        id: { type: new GraphQLNonNull(MemberTypeIdEnum) },
      },
      resolve: async (_, args: { id: string }, { prisma }: GqlContext) => {
        return prisma.memberType.findUnique({
          where: { id: args.id },
        });
      },
    },

    users: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(UserType))),
      resolve: async (_, _args, { prisma }: GqlContext) => {
        return prisma.user.findMany();
      },
    },

    user: {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: async (_, args: { id: string }, { prisma }: GqlContext) => {
        return prisma.user.findUnique({
          where: { id: args.id },
        });
      },
    },

    posts: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(PostType))),
      resolve: async (_, _args, { prisma }: GqlContext) => {
        return prisma.post.findMany();
      },
    },

    post: {
      type: PostType,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: async (_, args: { id: string }, { prisma }: GqlContext) => {
        return prisma.post.findUnique({
          where: { id: args.id },
        });
      },
    },

    profiles: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(ProfileType))),
      resolve: async (_, _args, { prisma }: GqlContext) => {
        return prisma.profile.findMany({});
      },
    },

    profile: {
      type: ProfileType,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: async (_, args: { id: string }, { prisma }: GqlContext) => {
        return prisma.profile.findUnique({
          where: { id: args.id },
        });
      },
    },
  },
});
