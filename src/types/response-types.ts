export type TMeta = {
    page: number;
    limit: number;
    total: number;
}

export type TResponseSuccessType = {
    success: boolean;
    statusCode: number;
    message: string;
    data: any;
    meta?: TMeta | undefined;
}