import {
  GraphQLEnumType,
  GraphQLFloat,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLInt,
} from 'graphql';

import { UUIDType } from './uuid.js';
import { GqlContext } from '../query.js';

export const MemberTypeIdEnum = new GraphQLEnumType({
  name: 'MemberTypeId',
  values: {
    BASIC: { value: 'BASIC' },
    BUSINESS: { value: 'BUSINESS' },
  },
});

export const MemberType = new GraphQLObjectType({
  name: 'MemberType',
  fields: {
    id: { type: new GraphQLNonNull(MemberTypeIdEnum) },
    discount: { type: new GraphQLNonNull(GraphQLFloat) },
    postsLimitPerMonth: { type: new GraphQLNonNull(GraphQLInt) },
  },
});

export const PostType = new GraphQLObjectType({
  name: 'Post',
  fields: {
    id: { type: new GraphQLNonNull(UUIDType) },
    title: { type: new GraphQLNonNull(GraphQLString) },
    content: { type: new GraphQLNonNull(GraphQLString) },
  },
});

export const ProfileType = new GraphQLObjectType({
  name: 'Profile',
  fields: {
    id: { type: new GraphQLNonNull(UUIDType) },
    isMale: { type: new GraphQLNonNull(GraphQLBoolean) },
    yearOfBirth: { type: new GraphQLNonNull(GraphQLInt) },

    memberType: {
      type: new GraphQLNonNull(MemberType),
      resolve: async (source:{memberTypeId:string}, _args, { prisma }: GqlContext) => {
        return prisma.memberType.findUnique({
          where: { id: source.memberTypeId },
        });
      },
    },
  },
});


export const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: new GraphQLNonNull(UUIDType) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    balance: { type: new GraphQLNonNull(GraphQLFloat) },
    profile: {
      type: ProfileType,
      resolve: async (source: { id: string }, _args, { prisma }: GqlContext) => {
        return prisma.profile.findUnique({
          where: { userId: source.id },   // нужно брать source.id
        });
      },
    },

    posts: {
      type: new GraphQLNonNull(
        new GraphQLList(new GraphQLNonNull(PostType)),
      ),
      resolve: async (source: { id: string }, _args, { prisma }: GqlContext) => {
        return prisma.post.findMany({
          where: { authorId: source.id },
        });
      },
    },

    userSubscribedTo: {
      type: new GraphQLNonNull(
        new GraphQLList(new GraphQLNonNull(UserType)),
      ),
      resolve: async (source, _args, { prisma }: GqlContext) => {
        const subs = await prisma.subscribersOnAuthors.findMany({
          where: { subscriberId: source.id },
          include: { author: true },
        });
        return subs.map((sub) => sub.author);
      },
    },

    subscribedToUser: {
      type: new GraphQLNonNull(
        new GraphQLList(new GraphQLNonNull(UserType)),
      ),
      resolve: async (source, _args, { prisma }: GqlContext) => {
        const subsToUsers = await prisma.subscribersOnAuthors.findMany({
          where: { authorId: source.id },
          include: { subscriber: true },
        })
        return subsToUsers.map((sub) => sub.subscriber);
      }
    },
  }),
});
