export class Huesped {
    name: string;
    phone: string;
    dateAdmission: string;
    departureDate: string;
    room: string;
    advance:number;
    token: string;
    gender: string;
}

export class Room{
    name: string;
    code: string;
}

export class Comment {
    name: string;
    month: string;
    comment: string;
    starts: number;
}

export class RoomV2 {
    key: string;
    name: string;
    avatarimg: string;
    price: string;
    photoscreen: string;
    photos: Array<string>;
    slogan: string;
    starts: number;
    abstract: string;
    description: string;
    commentsqty: string;
    comments: Array<Comment>;
    color: string;
}

