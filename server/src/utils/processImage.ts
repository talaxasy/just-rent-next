import { createWriteStream } from 'fs';
import { nanoid } from "nanoid";
import { extension } from 'mime-types';
import { FileUpload, GraphQLUpload } from 'graphql-upload';
import mkdirp from 'mkdirp';

const storeUpload = async ({ createReadStream, mimetype, userId }: any): Promise<any> => {

    await mkdirp(`public/images/${userId}`).then(made => {
        if (!made) {
            console.log('UNSUCSESS', made)
        } else {
            console.log('SUCSESSSSS', made)
        }
    });

    const name = `${nanoid(10)}.${extension(mimetype)}`;
    const path = `public/images/${userId}/${name}`;


    return new Promise((resolve, reject) => createReadStream()
        .pipe(createWriteStream(path))
        .on("finish", () => resolve({ name }))
        .on("error", () => reject)
    );
};

export const processUpload = async (upload: any, userId: number | undefined) => {
    const files: FileUpload[] = await upload;
    let pictureUrl: string[] = await Promise.all(files.map(async (file) => {
        const { createReadStream, mimetype } = await file;
        const { name } = await storeUpload({ createReadStream, mimetype, userId });
        return name;
    }));

    return pictureUrl;

};