import { FieldError } from "../generated/graphql";

export const toErrorMap = (errors: FieldError[]): { [key: string]: string } => {
    const errorMap: Record<string, string> = {}; // {username: 'Sorry, here is error'}
    errors.forEach(({ field, message }) => {
        errorMap[field] = message; // создаём ключ-значение, где ключ это field, а значение это message
    })
    return errorMap;
}