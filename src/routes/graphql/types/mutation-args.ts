export type UserArgs = {
  dto: {
    name: string;
    balance: number;
  };
};

export type ProfileArgs = {
  dto: {
    isMale: boolean;
    yearOfBirth: number;
    userId: string;
    memberTypeId: "BASIC" | "BUSINESS";
  };
};

export type PostArgs = {
  dto: {
    title: string;
    content: string;
    authorId: string;
  };
};

export type ChangePostArgs = {
  id: string;
  dto: {
    title?: string;
    content?: string;
  };
};

export type ChangeProfArgs = {
  id: string;
  dto: {
    isMale?: boolean;
    yearOfBirth?: number;
    memberTypeId?: "BASIC" | "BUSINESS";
  };
};

export type ChangeUserArgs = {
  id: string;
  dto: {
    name: string;
    balance: number;
  };

}
