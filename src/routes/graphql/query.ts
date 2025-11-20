import { GraphQLList, GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { MemberType, MemberTypeIdEnum, PostType, ProfileType, UserType } from './types/types.js';
import { UUIDType } from './types/uuid.js';

export const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    memberTypes: { type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(MemberType))) },
    memberType: {
      type: MemberType,
      args: {
        id: { type: new GraphQLNonNull(MemberTypeIdEnum) },
      },
    },
    users: { type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(UserType))) },
    user: {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
      },
    },
    posts: { type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(PostType))) },
    post: {
      type: PostType, args: {
        id: { type: new GraphQLNonNull(UUIDType) },
      },
    },
    profiles: { type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(ProfileType))) },
    profile: {
      type: ProfileType, args: {
        id: { type: new GraphQLNonNull(UUIDType) },
      },
    },
  },
});