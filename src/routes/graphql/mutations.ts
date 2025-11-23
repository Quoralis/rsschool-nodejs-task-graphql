import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import {
  ChangePostInput,
  ChangeProfileInput,
  ChangeUserInput,
  CreatePostInput,
  CreateProfileInput,
  CreateUserInput,
  PostType,
  ProfileType,
  UserType,
} from './types/types.js';
import { GqlContext } from './query.js';
import {
  ChangePostArgs,
  ChangeProfArgs,
  ChangeUserArgs,
  PostArgs,
  ProfileArgs,
  UserArgs,
} from './types/mutation-args.js';
import { UUIDType } from './types/uuid.js';

export const Mutations = new GraphQLObjectType({
  name: 'Mutations',
  fields: {
    createUser: {
      type: new GraphQLNonNull(UserType),
      args: {
        dto: { type: new GraphQLNonNull(CreateUserInput) },
      },
      resolve: async (_, args: UserArgs, { prisma }: GqlContext) => {
        return prisma.user.create({ data: args.dto });
      },
    },

    createProfile: {
      type: new GraphQLNonNull(ProfileType),
      args: {
        dto: { type: new GraphQLNonNull(CreateProfileInput) },
      },
      resolve: async (_, args: ProfileArgs, { prisma }: GqlContext) => {
        return prisma.profile.create({ data: args.dto });
      },
    },

    createPost: {
      type: new GraphQLNonNull(PostType),
      args: {
        dto: { type: new GraphQLNonNull(CreatePostInput) },
      },
      resolve: async (_, args: PostArgs, { prisma }: GqlContext) => {
        return prisma.post.create({ data: args.dto });
      },
    },

    changePost: {
      type: new GraphQLNonNull(PostType),
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
        dto: { type: new GraphQLNonNull(ChangePostInput) },
      },
      resolve: async (_, args: ChangePostArgs, { prisma }: GqlContext) => {
        return prisma.post.update({
          where: { id: args.id },
          data: args.dto,
        });
      },
    },

    changeProfile: {
      type: new GraphQLNonNull(ProfileType),
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
        dto: { type: new GraphQLNonNull(ChangeProfileInput) },
      },
      resolve: async (_, args: ChangeProfArgs, { prisma }: GqlContext) => {
        return prisma.profile.update({
          where: { id: args.id },
          data: args.dto,
        });
      },
    },
    changeUser: {
      type: new GraphQLNonNull(UserType),
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
        dto: { type: new GraphQLNonNull(ChangeUserInput) },
      },
      resolve: async (_, args: ChangeUserArgs, { prisma }: GqlContext) => {
        return prisma.user.update({
          where: { id: args.id },
          data: args.dto,
        });
      },
    },

    deleteUser: {
      type: new GraphQLNonNull(GraphQLString),
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: async (_, args: { id: string }, { prisma }: GqlContext) => {
        await prisma.user.delete({ where: { id: args.id } });
        return 'success';
      },
    },

    deletePost: {
      type: new GraphQLNonNull(GraphQLString),
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: async (_, args: { id: string }, { prisma }: GqlContext) => {
        await prisma.post.delete({ where: { id: args.id } });
        return 'success';
      },
    },
    deleteProfile: {
      type: new GraphQLNonNull(GraphQLString),
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: async (_, args: { id: string }, { prisma }: GqlContext) => {
        await prisma.profile.delete({ where: { id: args.id } });
        return 'success';
      },
    },
    subscribeTo: {
      type: new GraphQLNonNull(GraphQLString),
      args: {
        userId: { type: new GraphQLNonNull(UUIDType) },
        authorId: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: async (_, args: { userId: string; authorId: string }, { prisma }: GqlContext) => {
        await prisma.subscribersOnAuthors.create({
          data: {
            subscriberId: args.userId,
            authorId: args.authorId,
          },
        });
        return 'success';
      },
    },
    unsubscribeFrom: {
      type: new GraphQLNonNull(GraphQLString),
      args: {
        userId: { type: new GraphQLNonNull(UUIDType) },
        authorId: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: async (_, args: { userId: string; authorId: string }, { prisma }: GqlContext) => {
        await prisma.subscribersOnAuthors.delete({
          where: {
            subscriberId_authorId: {
              subscriberId: args.userId,
              authorId: args.authorId,
            },
          },
        });

        return "success";
      },
    },

  },
});
